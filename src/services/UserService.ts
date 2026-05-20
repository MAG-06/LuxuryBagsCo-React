import { Persona } from "../models/Persona.js";
import { Carrito } from "../models/Carrito.js";

export class UserService {
    private KEY: string;

    constructor() {
        this.KEY = "Personas";
    }

    getPersonas(): Persona[] {
        const data = localStorage.getItem(this.KEY);
        return data ? JSON.parse(data) as Persona[] : [];
    }

    savePersonas(personas: Persona[]): boolean {
        try {
            localStorage.setItem(this.KEY, JSON.stringify(personas));
            return true;
        } catch (error) {
            console.log("Error al guardar las personas");
            return false;
        }
    }

    existeCorreo(correoBuscar: string): boolean {
        const personas: Persona[] = this.getPersonas();

        for (let persona of personas) {
            if (persona.email === correoBuscar) {
                return true;
            }
        }

        return false;
    }

    buscarCorreoAndContraseña(correoBuscado: string, contraseñaBuscada: string): Persona | null {
        const personas: Persona[] = this.getPersonas();

        for (let persona of personas) {
            if (persona.email === correoBuscado && persona.password === contraseñaBuscada) {
                return persona;
            }
        }

        return null;

    }


    buscarPorCorreo(correoBuscar: string): Persona | null {
        const personas: Persona[] = this.getPersonas();

        for (let persona of personas) {
            if (persona.email === correoBuscar) {
                return persona;
            }
        }

        return null;

    }


    actualizarUsuario(correo: string, direccionNueva?: string, ciudadNueva?: string, img64?: string | null): boolean {
        const personas: Persona[] = this.getPersonas();

        for (let persona of personas) {
            if (persona.email === correo) {

                if (direccionNueva !== undefined) {
                    persona.direccion = direccionNueva;
                }

                if (ciudadNueva !== undefined) {
                    persona.ciudad = ciudadNueva;
                }

                if (img64 !== undefined) {
                    persona.fotoPerfil = img64;
                }

                return this.savePersonas(personas);
            }
        }

        return false;
    }


    actualizarCarrito(correo: string, carrito: Carrito): boolean {
        const personas: Persona[] = this.getPersonas();

        for (let persona of personas) {
            if (persona.email === correo) {
                persona.carrito = carrito;
                return this.savePersonas(personas);
            }
        }
        return false;
    }

    getKey(): string {
        return this.KEY;
    }

}