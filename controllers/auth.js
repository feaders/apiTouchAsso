import bcrypt from 'bcryptjs';

import jwt from 'jsonwebtoken';

import User from '../models/user.js';

import Message from '../models/message.js';
import Groupe from '../models/groupe.js';

import Parente from '../models/parente.js';
import Participe from '../models/participe.js';


const signup = (req, res, next) => {
    // checks if email already exists
    User.findOne({
        where: {
            email: req.body.email,
        }
    })
        .then(dbUser => {
            if (dbUser) {
                return res.status(409).json({message: "l'email existe déjà"});
            } else if (req.body.email && req.body.password) {
                // password hash
                bcrypt.hash(req.body.password, 12, (err, passwordHash) => {
                    if (err) {
                        return res.status(500).json({message: "n'a pas pu hacher le mot de passe"});
                    } else if (passwordHash) {
                        return User.create(({
                            email: req.body.email,
                            nom: req.body.nom,
                            prenom: req.body.prenom,
                            type: req.body.type,
                            password: passwordHash,
                            adresse: req.body.adresse,
                            cp: req.body.cp,
                            ville: req.body.ville,
                            tel:req.body.tel,
                            pdp:""

                        }))
                            .then(() => {
                                res.status(200).json({message: "utilisateur créé"});
                            })
                            .catch(err => {
                                console.log(err);
                                res.status(502).json({message: "erreur lors de la création de l'utilisateur"});
                            });
                    }
                    ;
                });
            } else if (!req.body.password) {
                return res.status(400).json({message: "mot de passe non fourni"});
            } else if (!req.body.email) {
                return res.status(400).json({message: "email non fourni"});
            }
            ;
        })
        .catch(err => {
            console.log('error', err);
        });
};

const login = (req, res, next) => {
    // checks if email exists
    User.findOne({
        where: {
            email: req.body.email,
        }
    })
        .then(dbUser => {
            if (!dbUser) {
                return res.status(404).json({message: "utilisateur non trouvé"});
            } else {
                // password hash
                bcrypt.compare(req.body.password, dbUser.password, (err, compareRes) => {
                    if (err) {
                        // error while comparing
                        res.status(502).json({message: "erreur lors de la vérification du mot de passe de l'utilisateur"});
                    } else if (compareRes) {
                        // password match
                        const token = jwt.sign({email: req.body.email}, 'secret', {expiresIn: '1h'});
                        res.status(200).json({message: "utilisateur connecté", "token": token, user: dbUser});
                    } else {
                        // password doesnt match
                        res.status(401).json({message: "informations d'identification non valides"});
                    }
                    ;
                });
            }
            ;
        })
        .catch(err => {
            console.log('error', err);
        });
};


const getUserInfo = (req, res) => {
    User.findAll().then((data) => {
        res.json(data);
    });
};

const isAuth = (req, res, next) => {
    const authHeader = req.get("Autorisation");
    if (!authHeader) {
        return res.status(401).json({message: 'non authentifié'});
    }
    ;
    const token = authHeader.split(' ')[1];
    let decodedToken;
    try {
        decodedToken = jwt.verify(token, 'secret');
    } catch (err) {
        return res.status(500).json({message: err.message || " n'a pas pu décoder le jeton"});
    }
    ;
    if (!decodedToken) {
        res.status(401).json({message: 'non autorisé'});
    } else {
        res.status(200).json({message: 'voici votre ressource'});
    }
    ;
};

export {signup, login, getUserInfo, isAuth};
