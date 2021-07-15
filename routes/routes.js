import express from 'express';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
var upload = multer({ dest: './public/uploads/temp/' })

import {signup, login, isAuth, getUserInfo} from '../controllers/auth.js';
import {
    getMessagesPrive,
    getMessagesGroupe,
    sendMessage,
    getMessageNonLu,
    setVueMessagesGroupe,
    setVueMessagesUser,
    getDiscussions
} from "../controllers/messagesController.js";
import {
    createGroupe,
    addToGroupe,
    removeFromGroupe,
    getGroupeInfo,
    getParticipantsGroupe,
    getGroupes
} from "../controllers/groupeController.js";
import {updateUser, addEnfant, getEnfants, getParents, updatePpd} from "../controllers/userController.js";

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
router.get('/user/:id/message/:id2', getMessagesPrive);
router.get('/groupe/:groupe/message', getMessagesGroupe);
router.get('/user/:id/message/nonlu', getMessageNonLu);
router.patch('/message/vuGroupe', setVueMessagesGroupe);
router.patch('/message/vuUser', setVueMessagesUser);
router.get('/user/:id/discussions', getDiscussions);

//groupe
router.post('/groupe/create', createGroupe);
router.post('/groupe/add', addToGroupe);
router.delete('/groupe/remove', removeFromGroupe);
router.get('/groupe', getGroupeInfo);
router.get('/groupe/:groupe/participants', getParticipantsGroupe);

//user
router.patch('/user/update', updateUser);
router.get('/user/:user/groupes', getGroupes);
router.post('/user/addEnfant', addEnfant);
router.post('/user/addEnfant', addEnfant);
router.get('/user/:parent/enfants', getEnfants);
router.get('/user/:enfant/parents', getParents);
router.post('/user/pdp', upload.single('pdp'), updatePpd);


router.get('/', function (req, res){
    res.sendFile(path.join(__dirname+'/../public/api.html'));
});

export default router;
