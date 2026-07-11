import { useEffect, useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { UserService } from "../services/UserService"

import "../css/Loginyregistro.css"

const userService = new UserService()
const CURRENT_USER = "CurrentUser"

export default function Login() {
  const navigate = useNavigate()

  const [emailL, setEmailL] = useState("")
  const [passL, setPassL] = useState("")

  useEffect(() => {
    const emailLogueado = localStorage.getItem(CURRENT_USER)

    if (emailLogueado) {
      navigate("/")
    }
  }, [navigate])

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const emailLogin = emailL.trim()
    const passLogin = passL.trim()

    if (!emailLogin) {
      alert("Ingrese un correo")
      return
    }

    if (!passLogin) {
      alert("Ingrese una contraseña")
      return
    }

    const existeCorreo = userService.existeCorreo(emailLogin)

    if (existeCorreo === false) {
      alert("Este correo es invalido")
      return
    }

    const persona = userService.buscarCorreoAndContraseña(emailLogin, passLogin)

    if (persona === null) {
      alert("Contraseña incorrecta")
      return
    }

    localStorage.setItem(CURRENT_USER, persona.email)

    if (persona.rol === "USER") {
      navigate("/")
    } else if (persona.rol === "ADMIN") {
      navigate("/panel-admin")
    }
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
        <h1>Iniciar Sesión</h1>

        <form id="formLogin" onSubmit={handleLogin}>
          <p>Correo electrónico</p>
          <input
            type="email"
            id="emailL"
            placeholder="Ingrese su correo"
            value={emailL}
            onChange={(e) => setEmailL(e.target.value)}
          />

          <p>Contraseña</p>
          <input
            type="password"
            id="passL"
            placeholder="Ingrese su contraseña"
            value={passL}
            onChange={(e) => setPassL(e.target.value)}
          />

          <button type="submit">Ingresar</button>
        </form>

        <p className="extra">¿No tienes cuenta?</p>

        <Link to="/registro">
          <button className="secondary-btn">Crear cuenta</button>
        </Link>
      </div>
    </div>
  )
}