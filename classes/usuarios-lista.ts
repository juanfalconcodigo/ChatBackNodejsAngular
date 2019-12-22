import { Usuario } from "./usuario";

class UsuarioLista{
    lista:Usuario[]=[];
    constructor(){

    }
    agregar(usuario:Usuario):Usuario{
        this.lista.push(usuario);
        console.log(this.lista);
        return usuario;
    }
    actualizarNombre(id:string,nombre:string):any{
        for(let usuario of this.lista){
            if(usuario.id===id){
                usuario.nombre=nombre;
                break;
            }
        }
        console.log(this.lista);
    }
    getLista():Usuario[]{
        return this.lista.filter(usuario=>usuario.nombre!=='sin-nombre');
    }
    getUsuario(id:string):any{
        return this.lista.find((elemento)=>elemento.id===id);
    }
    getUsuariosEnSala(sala:string):Usuario[]{
        return this.lista.filter((elemento=>elemento.sala===sala));
    }
    borrarUsuario(id:string):Usuario{
        let usuarioBorrado=this.getUsuario(id);
        this.lista=this.lista.filter((elemento)=>elemento.id!==id)
        console.log(this.lista);
        return usuarioBorrado;
    }

}
export{
    UsuarioLista 
}