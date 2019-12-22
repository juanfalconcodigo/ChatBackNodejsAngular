import express from 'express';
import { SERVER_PORT } from '../global/environment';
import socketIO, { Socket } from 'socket.io';
import http from 'http';
import * as socket from '../sockets/socket';
export default class Server{

    public io:socketIO.Server;
    public httpServer:http.Server;
    public app:express.Application;
    public port:number;
    private static _instance:Server;

    private constructor(){
        this.port=SERVER_PORT;
        this.app=express();
        this.httpServer=new http.Server(this.app);
        this.io=socketIO(this.httpServer);
        this.escucharSockets();
    }

    start(callback:Function){
        this.httpServer.listen(this.port,callback());
    }

    private escucharSockets(){
        this.io.on('connection',(cliente:Socket)=>{
            console.log('Cliente conectado');
            socket.desconectar(cliente,this.io);
            socket.mensaje(cliente,this.io);
            socket.configurarUsuario(cliente,this.io);
            socket.conectarCliente(cliente);
            socket.obtenerUsuarios(cliente,this.io);
        });
    }

    public static get instance(){
        return this._instance || (this._instance= new this());
    }

}