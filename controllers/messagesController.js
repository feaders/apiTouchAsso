import Message from "../models/message.js";
import pkg from 'sequelize';
import Groupe from "../models/groupe.js";
import {getGroupesIds} from "./groupeController.js";
import Participe from "../models/participe.js";
import User from "../models/user.js";


const {Op} = pkg;

const getMessagesPrive = (req, res) => {

    const emetteur = req.params.id;
    const destinataire = req.params.id2;

    Message.findAll({
        where: {
            [Op.or]: [{
                typeDestinataire: "user",
                emetteur: emetteur,
                destinataire: destinataire
            }, {typeDestinataire: "user", emetteur: destinataire, destinataire: emetteur}]
        },
        order: [['id', 'DESC']]
    }).then((data) => {
        res.json(data);
    });
};
const getMessagesGroupe = (req, res) => {

    const groupe = req.params.groupe;

    Message.findAll({
        where: {typeDestinataire: "groupe", destinataire: groupe},
        order: [['id', 'DESC']]
    }).then((data) => {
        res.json(data);
    });
};
const getDiscussions = (req, res) => {

    const id = req.params.id;

    Message.findAll({
        where: {typeDestinataire: "user", destinataire: id},
        order: [['id', 'DESC']]
    }).then((data) => {

        let index=[]
        data.forEach(el=>{
            if(!index.includes(el.id))
                index.push(el.id)
        });
        User.findAll({
            where:{id:{[Op.in]:index}}
        }).then((data) => {
            res.json(data);
        });


    });
};
const sendMessage = (req, res) => {
    Message.create(({
        text: req.body.texte,
        emetteur: req.body.idEmetteur,
        typeDestinataire: req.body.typeDestinataire,
        destinataire: req.body.idDestinataire,
        vues:""

    }))
        .then(() => {
            res.status(200).json({message: "message envoyé"});
        })
        .catch(err => {
            console.log(err);
            res.status(502).json({message: "erreur lors de l'envoie du message"});
        });
};
const getMessageNonLu = (req, res) => {
    const id = req.params.id;


    Participe.findAll({
        where: {
            user: id,
        }
    }).then((data) => {
        let index=[]
        data.forEach(el=>index.push(el.groupe));
        Message.findAll({
            where: {
                [Op.or]:
                    [
                        {
                            vues:  {
                                [Op.and]:[
                                    {[Op.notLike]: '%,' + id + ',%'},
                                    {[Op.notLike]:  id + ',%'},
                                ]
                            },
                            typeDestinataire: "groupe",
                            destinataire : {[Op.in]:index},
                            emetteur : {[Op.not]:id}
                        },
                        {
                            vues:  {
                                [Op.and]:[
                                    {[Op.notLike]: '%,' + id + ',%'},
                                    {[Op.notLike]:  id + ',%'},
                                ]
                            },
                            typeDestinataire: "user",
                            destinataire: id
                        }
                    ]},
            order: [['id', 'DESC']]
        }).then((data) => {
            res.json(data);
        });
    });

}
const setVueMessagesUser = (req, res) => {
    const id = req.body.idDestinataire;
    const idEm = req.body.idEmetteur;
    Message.findAll({
        where: {
            vues:  {
                [Op.and]:[
                    {[Op.notLike]: '%,' + id + ',%'},
                    {[Op.notLike]:  id + ',%'},
                ]
            },
            typeDestinataire: "user",
            destinataire: id,
            emetteur: idEm,
        }
    }).then((data) => {
        let index = [];
        data.forEach(el => {
                const vues = el.vues !== null ? el.vues : "";
                el.update({vues: vues + (id + ",")}, {where: {id:id}});
                res.status(200).json({message: "vu effectué"});

            }
        );
        res.status(200).json({message: "aucun nouveau message"});
    });
}
const setVueMessagesGroupe = (req, res) => {
    const id = req.body.id;
    const idGroupe = req.body.idGroupe;

        Message.findAll({
            where: {
                vues: {
                    [Op.and]: [
                        {[Op.notLike]: '%,' + id + ',%'},
                        {[Op.notLike]: id + ',%'},
                    ]
                },
                typeDestinataire: "groupe",
                destinataire: idGroupe,


            },
            order: [['id', 'DESC']]
        }).then((data) => {
            let index = [];
            data.forEach(el => {
                const vues = el.vues !== null ? el.vues : "";
                el.update({vues: vues + (id + ",")}, {where: {id:id}});
                res.status(200).json({message: "vu effectué"});

                }
            );
            res.status(200).json({message: "aucun nouveau message"});
        });

}


export {getMessagesPrive, getMessagesGroupe, sendMessage, getMessageNonLu, setVueMessagesUser, setVueMessagesGroupe, getDiscussions};
