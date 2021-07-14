import User from "../models/user.js";
import Parente from "../models/parente.js";
const updateUser =(req, res)=> {
    User.update({
        email: req.body.email,
        nom: req.body.nom,
        prenom: req.body.prenom,
        adresse: req.body.adresse,
        cp: req.body.cp,
        ville: req.body.ville,
        tel:req.body.tel
    }, {where: {id:req.body.id}})
    .then((user) => {
        if(user[0]===1)
            res.status(200).json({message: "profile mis a jour"});
        else
            res.status(502).json({message: "erreur lors de la mise à jour du profile"});
    })

}
const addEnfant=(req, res)=> {
    Parente.findOne({where: {parent:req.body.parent, enfant: req.body.enfant}})
        .then(parente => {
            if (parente){
                res.status(502).json({message: "parenté déjà exitente"});
            }
            else {
                Parente.create(({
                    parent: req.body.parent,
                    enfant: req.body.enfant,
                }))
                    .then(() => {
                        res.status(200).json({message: "parenté ajouté"});
                    })

            }
        })
}
const getParents= (req, res)=>{

    Parente.findAll({
        where: {
            enfant: req.body.enfant,
        }
    }).then((data) => {
        let index=[];
        data.forEach(el=>index.push(el.parent));
        User.findAll({
            attributes: ["id",'nom', "prenom", "email"],
            where : { id: index}
        })
            .then((result) => {
                res.json(result);
            });
    });
}
const getEnfants= (req, res)=>{

    Parente.findAll({
        where: {
            parent: req.body.parent,
        }
    }).then((data) => {
        let index=[];
        data.forEach(el=>index.push(el.enfant));
        User.findAll({
            attributes: ["id",'nom', "prenom", "email"],
            where : { id: index}
        })
            .then((result) => {
                res.json(result);
            });
    });
}
export {updateUser, addEnfant, getParents, getEnfants};
