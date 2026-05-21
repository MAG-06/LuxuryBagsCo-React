import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

import { Bolso } from "../models/Bolso"
import { BolsoService } from "../services/BolsoService"
import { UserService } from "../services/UserService"

import Hero from "../components/Hero"

import "../css/CambiarEstadoBolso.css"

const bolsoService = new BolsoService()
const userService = new UserService()

export default function PanelAdminV2() {
  const navigate = useNavigate()

  const [bolsos, setBolsos] = useState<Bolso[]>([])
  const [nombreBolso, setNombreBolso] = useState("")
  const [estadoBolso, setEstadoBolso] = useState("")

  const cargarBolsos = () => {
    setBolsos(bolsoService.getBolsos())
  }

  useEffect(() => {
    const correoSesion = localStorage.getItem("CurrentUser")

    if (!correoSesion) {
      navigate("/login")
      return
    }

    const usuarioSesion = userService.buscarPorCorreo(correoSesion)

    if (!usuarioSesion || usuarioSesion.rol !== "ADMIN") {
      navigate("/")
      return
    }

    cargarBolsos()
  }, [navigate])

  const handleActualizarEstado = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const nombre = nombreBolso.trim()

    if (!nombre) {
      alert("Llene el campo del nombre para poder cambiarle el estado al bolso")
      return
    }

    if (estadoBolso === "") {
      alert("Debes seleccionar una opcion")
      return
    }

    const estado = estadoBolso === "true"

    const cambioEstado = bolsoService.cambiarEstadoBolso(nombre, estado)

    if (!cambioEstado) {
      alert("El bolso no se encontro, escriba bien el nombre")
      return
    }

    alert(`El estado del bolso ${nombre} fue actualizado correctamente.`)

    setNombreBolso("")
    setEstadoBolso("")
    cargarBolsos()
  }

  const cerrarSesion = () => {
    localStorage.removeItem("CurrentUser")
    navigate("/login")
  }

  return (
    <>
      <Hero />

      <section className="products form-section">
        <h2>Panel de administración - Estado de bolsos</h2>
        <p className="subtitle">
          Busca un bolso por su nombre y cambia su disponibilidad en stock.
        </p>

        <div className="form-card">
          <form
            id="formEstadoBolso"
            className="form-bolso"
            onSubmit={handleActualizarEstado}
          >
            <div className="form-group">
              <label htmlFor="nombreBolso">Nombre del bolso</label>
              <input
                type="text"
                id="nombreBolso"
                placeholder="Ej: Neverfull MM"
                value={nombreBolso}
                onChange={(e) => setNombreBolso(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="SelectEstadoBolso">Disponible en stock</label>
              <select
                id="SelectEstadoBolso"
                value={estadoBolso}
                onChange={(e) => setEstadoBolso(e.target.value)}
              >
                <option value="">Selecciona una opción</option>
                <option value="true">Si</option>
                <option value="false">No</option>
              </select>
            </div>

            <div className="form-actions">
              <button type="submit" id="btnActualizar">
                Actualizar estado
              </button>
            </div>
          </form>
        </div>
      </section>

      <section className="products table-section">
        <div className="table-card">
          <div className="table-header">
            <h3>Bolsos registrados</h3>
          </div>

          <div className="table-responsive">
            <table className="tabla-bolsos" id="tablaBolsos">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Marca</th>
                  <th>Nombre</th>
                  <th>Precio</th>
                  <th>Estado</th>
                </tr>
              </thead>

              <tbody>
                {bolsos.map((bolso) => (
                  <tr key={bolso.id}>
                    <td>{bolso.id}</td>
                    <td>{bolso.marca}</td>
                    <td>{bolso.nombre}</td>
                    <td>${bolso.precio.toLocaleString("es-CO")}</td>
                    <td>
                      {bolso.estado ? "Disponible" : "No disponible"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div>
          <button
            type="button"
            id="CerrarSesion"
            className="btn-admin"
            onClick={cerrarSesion}
          >
            Cerrar sesión
          </button>
        </div>
      </section>
    </>
  )
}