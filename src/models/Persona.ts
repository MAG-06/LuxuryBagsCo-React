import { Carrito } from "./Carrito.js";

export class Persona {

    id: number;
    nombreCompleto: string;
    email: string;
    password: string;
    carrito: Carrito | null = null
    fotoPerfil: string | null;
    direccion: string;
    ciudad: string;
    rol: string;

    constructor(id:number, nombreCompleto:string, email:string, password:string, rol:string) {
        this.id = id;
        this.nombreCompleto = nombreCompleto;
        this.email = email;
        this.password = password;
        this.rol = rol;

        this.carrito = null;
        this.fotoPerfil = "";
        this.direccion = "";
        this.ciudad = "";
    }

}