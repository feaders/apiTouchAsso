import Groupe from '../models/groupe.js';
import Participe from "../models/participe.js";
import User from "../models/user.js";

const createGroupe = (req, res) => {

    Groupe.create(({
        nom: req.body.nom,
        description: req.body.description,
    }))
        .then(() => {
            res.status(200).json({message: "groupe créé"});
        })
        .catch(err => {
            console.log(err);
            res.status(502).json({message: "erreur lors de la création du groupe"});
        });
}
const getGroupeInfo = (req, res) => {
    Groupe.findOne()
        .then(gp => {
            if (gp) {
                res.status(200).json({message: gp});
            } else {
                res.status(404).json({message: "le groupe n'existe pas"});
            }
        });
}
const addToGroupe = (req, res) => {
    Participe.findOne({where: {groupe:req.body.groupe, user: req.body.user}})
        .then(participe => {
        if (participe){
            res.status(502).json({message: "erreur lors de l'ajout au groupe"});
        }
        else {
            Participe.create(({
                groupe: req.body.groupe,
                user: req.body.user,
            }))
                .then(() => {
                    res.status(200).json({message: "utilisateur ajouté au groupe"});
                })

        }
    })

}
const removeFromGroupe = (req, res) => {
    Participe.findOne({where: {groupe:req.body.groupe, user: req.body.user}})
        .then(participe => {
            if (participe){
                Participe.destroy(({where:
                {
                    groupe: req.body.groupe,
                    user: req.body.user,
                }
                }))
                    .then(() => {
                        res.status(200).json({message: "utilisateur supprimé du groupe"});
                    })
            }
            else {
                res.status(502).json({message: "utilisateur non trouvé"});



            }
        })
}
const getParticipantsGroupe = (req, res) => {


    Participe.findAll({
        where: {
                groupe: req.body.groupe,
        }
    }).then((data) => {
        let index=[];
        data.forEach(el=>index.push(el.user));
        User.findAll({
            attributes: ["id",'nom', "prenom", "email", "pdp"],
            where : { id: index}
        })
            .then((result) => {
            res.json(result);
        });
    });
}
const getGroupes = (req, res) => {


    Participe.findAll({
        where: {
            user: req.body.user,
        }
    }).then((data) => {
        let index=[];
        data.forEach(el=>index.push(el.groupe));
        Groupe.findAll({
            where : { id: index}
        })
            .then((result) => {
                res.json(result);
            });
    });
}
function getGroupesIds(user) {
    let index=[];

    Participe.findAll({
        where: {
            user: user,
        }
    }).then((data) => {
        data.forEach(el=>index.push(el.groupe));
        console.log(index)

    });

    return index;
}

export {createGroupe, addToGroupe, removeFromGroupe, getGroupeInfo, getParticipantsGroupe, getGroupesIds, getGroupes};
