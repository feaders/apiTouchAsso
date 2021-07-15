import express from 'express';

import sequelize from './utils/database.js';

import router from './routes/routes.js';

import { createServer } from "http";
import { Server } from "socket.io";

const app = express();
const httpServer = createServer(app);

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.use((_, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.use(router);

sequelize.sync(); 


const io = new Server(httpServer);

io.on("connection", socket => {
    console.log("a user connected :D");
    socket.on("chat message", msg => {
        console.log(msg);
        io.emit("chat message", msg);
    });
});


httpServer.listen(5000, ()=>{
    console.log('*******************Ecoute sur le port 5000*******************' )
});