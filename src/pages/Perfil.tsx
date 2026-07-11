import { useEffect, useRef, useState } from "react"
import { Link, useNavigate } from "react-router-dom"

import { Persona } from "../models/Persona"
import { UserService } from "../services/UserService"

import "../css/Perfil.css"

const userService = new UserService()

export default function Perfil() {
  const navigate = useNavigate()

  const fileInputRef = useRef<HTMLInputElement | null>(null)

  const [usuario, setUsuario] = useState<Persona | null>(null)

  const [modalOpen, setModalOpen] = useState(false)

  const [direccion, setDireccion] = useState("")
  const [ciudad, setCiudad] = useState("")

  const [fotoPerfil, setFotoPerfil] = useState("")

  useEffect(() => {
    const correoSesion = localStorage.getItem("CurrentUser")

    if (!correoSesion) {
      navigate("/login")
      return
    }

    const usuarioSesion = userService.buscarPorCorreo(correoSesion)

    if (!usuarioSesion) {
      navigate("/login")
      return
    }

    setUsuario(usuarioSesion)

    setDireccion(usuarioSesion.direccion || "")
    setCiudad(usuarioSesion.ciudad || "")
    setFotoPerfil(usuarioSesion.fotoPerfil || "")
  }, [navigate])

  const cerrarSesion = () => {
    localStorage.removeItem("CurrentUser")
    navigate("/login")
  }

  const abrirModal = () => {
    setModalOpen(true)
  }

  const cerrarModal = () => {
    setModalOpen(false)
  }

  const cambiarFoto = () => {
    fileInputRef.current?.click()
  }

  const eliminarFoto = () => {
    setFotoPerfil("")
  }

  const handleFoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]

    if (!file) {
      return
    }

    const reader = new FileReader()

    reader.onloadend = () => {
      const imagenBase64 = reader.result as string
      setFotoPerfil(imagenBase64)
    }

    reader.readAsDataURL(file)
  }

  const guardarPerfil = () => {
    if (!usuario) {
      return
    }

    const correo = usuario.email;
    usuario.direccion = direccion
    usuario.ciudad = ciudad
    usuario.fotoPerfil = fotoPerfil


    userService.actualizarUsuario(correo, direccion, ciudad, fotoPerfil)

    alert("Perfil actualizado correctamente")

    setModalOpen(false)
  }

  if (!usuario) {
    return null
  }

  return (
    <>
      <div className="topbar">
        <div className="topbar-inner">
          <div className="logo">
            <h1>LuxuryBags Co</h1>
          </div>

          <div className="menu">
            <Link to="/">Inicio</Link>

            <button
              type="button"
              className="logout-btn"
              onClick={cerrarSesion}
            >
              Salir
            </button>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="card">
          <h2>Perfil de usuario</h2>

          <div className="avatar">
            <img
              src={
                fotoPerfil ||
                "https://cdn-icons-png.flaticon.com/512/149/149071.png"
              }
              className="FotoPerfil"
              referrerPolicy="no-referrer"
            />
          </div>

          <p className="label">Nombre</p>
          <p className="value">{usuario.nombreCompleto}</p>

          <p className="label">Correo</p>
          <p className="value">{usuario.email}</p>

          <p className="label">Direccion</p>
          <p className="value">{direccion || "No registrada"}</p>

          <p className="label">Ciudad</p>
          <p className="value">{ciudad || "No registrada"}</p>

          <div className="buttons">
            <button onClick={abrirModal}>
              Editar perfil
            </button>

            <button className="secondary">
              Mis compras
            </button>
          </div>
        </div>
      </div>

      <div className={`photoModal ${modalOpen ? "active" : ""}`}>
        <div className="photoContainer">
          <div className="photoHeader">
            <h3>Editar Perfil</h3>

            <button onClick={cerrarModal}>
              ✖
            </button>
          </div>

          <div className="formSection">
            <label>Agregar Direccion:</label>

            <input
              type="text"
              value={direccion}
              onChange={(e) => setDireccion(e.target.value)}
            />

            <label>Agregar Ciudad:</label>

            <input
              type="text"
              value={ciudad}
              onChange={(e) => setCiudad(e.target.value)}
            />
          </div>

          <div className="photoTitle">
            <p>Actualizar Foto de Perfil</p>
          </div>

          <div className="photoContent">
            <input
              type="file"
              accept="image/*"
              hidden
              ref={fileInputRef}
              onChange={handleFoto}
            />

            <div className="photoActions">
              <button
                className="btnPrimary"
                type="button"
                onClick={cambiarFoto}
              >
                Cambiar
              </button>

              <button
                className="btnDanger"
                type="button"
                onClick={eliminarFoto}
              >
                Eliminar
              </button>
            </div>
          </div>

          <div className="photoActions">
            <button
              className="btnGuardar"
              type="button"
              onClick={guardarPerfil}
            >
              Guardar
            </button>
          </div>

          <p className="fileInfo">
            JPG, PNG o GIF. Máximo 2MB
          </p>
        </div>
      </div>

      <div className="footer">
        <p>© 2026 LuxuryBags Co</p>
      </div>
    </>
  )
}