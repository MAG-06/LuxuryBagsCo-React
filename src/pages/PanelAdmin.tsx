import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"

import { Bolso } from "../models/Bolso"
import { Persona } from "../models/Persona"
import { BolsoService } from "../services/BolsoService"
import { UserService } from "../services/UserService"

import Hero from "../components/Hero"

import "../css/Index.css"
import "../css/guardarBolso.css"

const bolsoService = new BolsoService()
const userService = new UserService()

export default function PanelAdmin() {
  const navigate = useNavigate()

  const [marca, setMarca] = useState("")
  const [nombre, setNombre] = useState("")
  const [descripcion, setDescripcion] = useState("")
  const [detalle1, setDetalle1] = useState("")
  const [detalle2, setDetalle2] = useState("")
  const [detalle3, setDetalle3] = useState("")
  const [precio, setPrecio] = useState("")
  const [img, setImg] = useState("")

  useEffect(() => {
    const correoSesion = localStorage.getItem("CurrentUser")

    if (!correoSesion) {
      navigate("/")
      return
    }

    const usuarioSesion = userService.buscarPorCorreo(correoSesion) as Persona | null

    if (!usuarioSesion) {
      navigate("/")
      return
    }

    if (usuarioSesion.rol === "USER") {
      navigate("/")
    }
  }, [navigate])

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const marcaBolso = marca.trim()
    const nombreBolso = nombre.trim()
    const descripcionBolso = descripcion.trim()
    const detallePrincipal = detalle1.trim()
    const detalleOpcional2 = detalle2.trim() || null
    const detalleOpcional3 = detalle3.trim() || null
    const precioBolso = Number(precio.trim())
    const imagenBolso = img.trim()

    if (!marcaBolso) {
      alert("Llene el campo de marca para registrar un bolso")
      return
    }

    if (!nombreBolso) {
      alert("Llene el campo de nombre para registrar un bolso")
      return
    }

    if (!descripcionBolso) {
      alert("Llene el campo de descripcion para registrar un bolso")
      return
    }

    if (!detallePrincipal) {
      alert("Debe llenar por lo menos un detalle")
      return
    }

    if (isNaN(precioBolso) || precioBolso <= 0) {
      alert("Llene el campo de precio con un número válido")
      return
    }

    if (!imagenBolso) {
      alert("Obligatoriamente tiene que poner la ruta de la imagen del bolso")
      return
    }

    const existeBolso = bolsoService.existeBolso(nombreBolso)

    if (existeBolso) {
      alert("Ya hay un bolso registrado con este nombre")
      return
    }

    const bolso = new Bolso(Date.now(), marcaBolso, nombreBolso, precioBolso, descripcionBolso, detallePrincipal, detalleOpcional2, detalleOpcional3, imagenBolso, false)

    const bolsos = bolsoService.getBolsos()
    bolsos.push(bolso)
    bolsoService.saveBolsos(bolsos)

    alert("Bolso guardado correctamente")

    setMarca("")
    setNombre("")
    setDescripcion("")
    setDetalle1("")
    setDetalle2("")
    setDetalle3("")
    setPrecio("")
    setImg("")
  }

  return (
    <>
      <Hero />

      <section className="products form-section">
        <h2>Registrar nuevo bolso</h2>

        <div className="form-card">
          <form id="bolsoRegistro" className="form-bolso" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="marca">Marca del bolso</label>
              <input
                type="text"
                id="marca"
                placeholder="Ej: Louis Vuitton"
                value={marca}
                onChange={(e) => setMarca(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="nombre">Nombre</label>
              <input
                type="text"
                id="nombre"
                placeholder="Ej: Neverfull MM"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="descripcion">Descripción</label>
              <input
                type="text"
                id="descripcion"
                placeholder="Descripción del bolso"
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="detalle1">Detalle 1</label>
              <input
                type="text"
                id="detalle1"
                placeholder="Detalle principal"
                value={detalle1}
                onChange={(e) => setDetalle1(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="detalle2">Detalle 2</label>
              <input
                type="text"
                id="detalle2"
                placeholder="Detalle opcional"
                value={detalle2}
                onChange={(e) => setDetalle2(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="detalle3">Detalle 3</label>
              <input
                type="text"
                id="detalle3"
                placeholder="Detalle opcional"
                value={detalle3}
                onChange={(e) => setDetalle3(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="precio">Precio</label>
              <input
                type="number"
                id="precio"
                placeholder="Ej: 8500000"
                value={precio}
                onChange={(e) => setPrecio(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="img">Ruta de imagen</label>
              <input
                type="text"
                id="img"
                placeholder="Ej: ./img/bolso1.jpg"
                value={img}
                onChange={(e) => setImg(e.target.value)}
              />
            </div>

            <div className="form-actions">
              <button type="submit" id="enviar">
                Guardar bolso
              </button>
            </div>
          </form>

          <div>
            <Link to="/panel-admin-v2">
              <button type="button" className="btn-admin">
                Cambiar Estado Del Bolso
              </button>
            </Link>
          </div>

          <div>
            <Link to="/panel-admin-v3">
              <button type="button" className="btn-admin">
                Gestion Cupones
              </button>
            </Link>
          </div>


        </div>
      </section>
    </>
  )
}