import {Socket} from 'socket.io';
import { Usuario } from '../classes/usuario';
import { UsuarioLista } from '../classes/usuarios-lista';

export  const usuariosConectados=new UsuarioLista();

const desconectar = (cliente: Socket) => {
    cliente.on('disconnect',()=>{
        console.log('Cliente desconectado');
        usuariosConectados.borrarUsuario(cliente.id);
    });
}
const mensaje=(cliente:Socket,io:SocketIO.Server)=>{
    cliente.on('mensaje',(payload:{de:string,mensaje:string})=>{
        console.log(`Datos recibidos del cliente : ${payload.mensaje}`);
        io.emit('mensaje-nuevo',payload);
    });
}
const configurarUsuario=(cliente:Socket,io:SocketIO.Server)=>{
    cliente.on('configurar-usuario',(payload:{nombre:string},callback:Function)=>{
        console.log("Nombre de usuario",payload.nombre);
        usuariosConectados.actualizarNombre(cliente.id,payload.nombre);
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

export {
    desconectar,
    mensaje,
    configurarUsuario,
    conectarCliente
}