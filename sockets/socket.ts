import {Socket} from 'socket.io';
import { Usuario } from '../classes/usuario';
import { UsuarioLista } from '../classes/usuarios-lista';
import socketIO from 'socket.io';

export  const usuariosConectados=new UsuarioLista();

const desconectar = (cliente: Socket,io:socketIO.Server) => {
    cliente.on('disconnect',()=>{
        console.log('Cliente desconectado');
        usuariosConectados.borrarUsuario(cliente.id);
        io.emit('usuarios-activos',usuariosConectados.getLista());
    });
}
const mensaje=(cliente:Socket,io:socketIO.Server)=>{
    cliente.on('mensaje',(payload:{de:string,mensaje:string})=>{
        console.log(`Datos recibidos del cliente : ${payload.mensaje}`);
        io.emit('mensaje-nuevo',payload);
    });
}
const configurarUsuario=(cliente:Socket,io:socketIO.Server)=>{
    cliente.on('configurar-usuario',(payload:{nombre:string},callback:Function)=>{
        console.log("Nombre de usuario",payload.nombre);
        usuariosConectados.actualizarNombre(cliente.id,payload.nombre);
        io.emit('usuarios-activos',usuariosConectados.getLista());
        callback({
            ok:true,
            usuario:payload.nombre
        });
    });
}
const conectarCliente=(cliente:Socket)=>{
    const usuario=new Usuario(cliente.id);
    usuariosConectados.agregar(usuario);
}
const obtenerUsuarios=(cliente:Socket,io:socketIO.Server)=>{
    cliente.on('obtener-usuarios',()=>{
        io.to(cliente.id).emit('usuarios-activos',usuariosConectados.getLista());
    });
}

export {
    desconectar,
    mensaje,
    configurarUsuario,
    conectarCliente,
    obtenerUsuarios
}








