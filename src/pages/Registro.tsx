import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"

import { Persona } from "../models/Persona"
import { UserService } from "../services/UserService"

import "../css/Loginyregistro.css"

const userService = new UserService()

export default function Registro() {
    const navigate = useNavigate()

    const [nombreCompletoP, setNombreCompletoP] = useState("")
    const [emailP, setEmailP] = useState("")
    const [passP, setPassP] = useState("")
    const [passP2, setPassP2] = useState("")

    const handleRegistro = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const id: number = Date.now();
        const nombre = nombreCompletoP.trim()
        const email = emailP.trim()
        const contraseña = passP.trim()
        const confirmarContraseña = passP2.trim()

        if (!nombre) {
            alert("Ingrese su nombre")
            return
        }

        if (!email) {
            alert("Ingrese un correo")
            return
        }

        if (!contraseña) {
            alert("Ingrese una contraseña")
            return
        }

        if (!confirmarContraseña) {
            alert("Confirme la contraseña")
            return
        }

        if (contraseña !== confirmarContraseña) {
            alert("Las contraseñas no coinciden")
            return
        }

        const existeCorreo = userService.existeCorreo(email)

        if (existeCorreo) {
            alert("Este correo ya está registrado")
            return
        }

        const persona = new Persona(id, nombre, email, contraseña, "USER")

        const personas: Persona[] = userService.getPersonas();
        personas.push(persona);
        const guardoUsuario: boolean = userService.savePersonas(personas);

        if (!guardoUsuario) {
            console.log("No se pudo guardar el usuario");
            return;
        }
        
        navigate("/login")
    }

    return (
        <div className="container">
            <div className="logo">
                <h1>
                    LuxuryBags
                    <br />
                    Co
                </h1>
            </div>

            <div className="form-box">
                <h1>Crear Cuenta</h1>

                <form id="formRegistro" onSubmit={handleRegistro}>
                    <p>Nombre completo</p>
                    <input
                        type="text"
                        id="nombreCompletoP"
                        placeholder="Ingrese su nombre"
                        value={nombreCompletoP}
                        onChange={(e) => setNombreCompletoP(e.target.value)}
                    />

                    <p>Correo electrónico</p>
                    <input
                        type="email"
                        id="emailP"
                        placeholder="Ingrese su correo"
                        value={emailP}
                        onChange={(e) => setEmailP(e.target.value)}
                    />

                    <p>Contraseña</p>
                    <input
                        type="password"
                        id="passP"
                        placeholder="Cree una contraseña"
                        value={passP}
                        onChange={(e) => setPassP(e.target.value)}
                    />

                    <p>Confirmar contraseña</p>
                    <input
                        type="password"
                        id="passP2"
                        placeholder="Repita la contraseña"
                        value={passP2}
                        onChange={(e) => setPassP2(e.target.value)}
                    />

                    <button type="submit" id="enviarReg">
                        Registrarse
                    </button>
                </form>

                <p className="extra">¿Ya tienes cuenta?</p>

                <Link to="/login">
                    <button className="secondary-btn">
                        Iniciar sesión
                    </button>
                </Link>
            </div>
        </div>
    )
}