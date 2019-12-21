import Server from './classes/server';
import express from 'express';
import router from './routes/router';
import cors from 'cors';

//instancia de server
const server:Server = Server.instance;
//cors
server.app.use(cors({origin:true,credentials:true}));
//para poder ingresar data a los formularios
server.app.use(express.urlencoded({extended:false}));
server.app.use(express.json())
//ruta 
server.app.use('/',router);

//listen server
server.start((err:string)=>{
    if(err) throw new Error(err);
    console.log(`Se esta corriendo correctamente en el puerto ${server.port}`);
});