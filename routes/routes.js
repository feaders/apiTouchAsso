import express from 'express';

import {signup, login, isAuth, getUserInfo} from '../controllers/auth.js';
import {
    getMessagesPrive,
    getMessagesGroupe,
    sendMessage,
    getMessageNonLu,
    setVueMessagesGroupe,
    setVueMessagesUser
} from "../controllers/messagesController.js";
import {
    createGroupe,
    addToGroupe,
    removeFromGroupe,
    getGroupeInfo,
    getParticipantsGroupe,
    getGroupes
} from "../controllers/groupeController.js";
import {updateUser, addEnfant, getEnfants, getParents} from "../controllers/userController.js";

const router = express.Router();

//Accueil
router.get('/public', (req, res, next) => {
    res.status(200).json({message: "Accueil"});
});

//auth
router.post('/login', login);
router.post('/signup', signup);
router.get('/private', isAuth);
router.get('/me', getUserInfo);


//messages
router.post('/message/send', sendMessage);
router.get('/message/user', getMessagesPrive);
router.get('/message/groupe', getMessagesGroupe);
router.get('/message/nonlu', getMessageNonLu);
router.patch('/message/vuGroupe', setVueMessagesGroupe);
router.patch('/message/vuUser', setVueMessagesUser);

//groupe
router.post('/groupe/create', createGroupe);
router.post('/groupe/add', addToGroupe);
router.delete('/groupe/remove', removeFromGroupe);
router.get('/groupe', getGroupeInfo);
router.get('/groupe/participants', getParticipantsGroupe);

//user
router.patch('/user/update', updateUser);
router.get('/user/groupes', getGroupes);
router.post('/user/addEnfant', addEnfant);
router.post('/user/addEnfant', addEnfant);
router.get('/user/enfants', getEnfants);
router.get('/user/parents', getParents);


export default router;
