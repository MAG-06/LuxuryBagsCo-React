import Hero from "../components/Hero"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

import { Cupon } from "../models/Cupon"
import { CuponService } from "../services/CuponService"

import "../css/PanelAdminV3.css"

const cuponService = new CuponService()

export default function PanelAdminCupones() {

    const navigate = useNavigate()

    // ── Estado: registrar cupón ──
    const [codigo, setCodigo] = useState("")
    const [porcentaje, setPorcentaje] = useState("")
    const [descripcion, setDescripcion] = useState("")
    const [titulo, setTitulo] = useState("")
    const [destacado, setDestacado] = useState(false)
    const [estado, setEstado] = useState(true)

    // ── Estado: cambiar estado cupón ──
    const [codigoEstado, setCodigoEstado] = useState("")
    const [nuevoEstado, setNuevoEstado] = useState("")

    // ── Estado: tabla ──
    const [cupones, setCupones] = useState<Cupon[]>([])

    const cargarCupones = () => {
        setCupones(cuponService.getCupones())
    }

    const cerrarSesion = () => {
        localStorage.removeItem("CurrentUser")
        navigate("/login")
    }

    useEffect(() => {
        cargarCupones()
    }, [])

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const codigoLimpio = codigo.trim()
        const porcentajeNum = Number(porcentaje)
        const descripcionLimpia = descripcion.trim()
        const tituloLimpio = titulo.trim()

        if (!codigoLimpio) {
            alert("Debe ingresar un código para el cupón")
            return
        }

        if (isNaN(porcentajeNum) || porcentajeNum <= 0 || porcentajeNum > 100) {
            alert("Ingrese un porcentaje válido entre 1 y 100")
            return
        }

        if (!descripcionLimpia) {
            alert("Debe ingresar una descripción para el cupón")
            return
        }

        if (!tituloLimpio) {
            alert("Debe ingresar un título para el cupón")
            return
        }

        if (cuponService.existeCupon(codigoLimpio)) {
            alert("Ya existe un cupón con ese código")
            return
        }

        const tituloDescuento = porcentajeNum + "% OFF"

        const nuevoCupon = new Cupon(
            codigoLimpio,
            porcentajeNum,
            descripcionLimpia,
            tituloDescuento,
            destacado,
            estado
        )

        cuponService.agregarCupon(nuevoCupon)
        alert("Cupón guardado correctamente")

        setCodigo("")
        setPorcentaje("")
        setDescripcion("")
        setTitulo("")
        setDestacado(false)
        setEstado(true)

        cargarCupones()
    }


    const handleCambiarEstado = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const codigoLimpio = codigoEstado.trim()

        if (!codigoLimpio) {
            alert("Debe ingresar el código del cupón")
            return
        }

        if (nuevoEstado === "") {
            alert("Debe seleccionar un estado")
            return
        }

        const estadoBool = nuevoEstado === "true"
        const resultado = cuponService.cambiarEstadoCupon(codigoLimpio, estadoBool)

        if (!resultado) {
            alert("No se encontró un cupón con ese código")
            return
        }

        alert(`El estado del cupón ${codigoLimpio} fue actualizado correctamente`)

        setCodigoEstado("")
        setNuevoEstado("")
        cargarCupones()
    }



    return (
        <>
            <Hero />

            {/* ── REGISTRAR CUPÓN ── */}
            <section className="products form-section">
                <h2>Registrar nuevo cupón</h2>

                <div className="form-card">
                    <form
                        id="cuponRegistro"
                        className="form-bolso"
                        onSubmit={handleSubmit}
                    >
                        <div className="form-group">
                            <label htmlFor="codigo">Código del cupón</label>
                            <input
                                type="text"
                                id="codigo"
                                placeholder="Ej: DESCUENTO10"
                                value={codigo}
                                onChange={(e) => setCodigo(e.target.value)}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="porcentaje">Porcentaje de descuento</label>
                            <input
                                type="number"
                                id="porcentaje"
                                placeholder="Ej: 10"
                                value={porcentaje}
                                onChange={(e) => setPorcentaje(e.target.value)}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="descripcion">Descripción</label>
                            <input
                                type="text"
                                id="descripcion"
                                placeholder="Ej: Obtén un 10% de descuento"
                                value={descripcion}
                                onChange={(e) => setDescripcion(e.target.value)}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="titulo">Título del cupón</label>
                            <input
                                type="text"
                                id="titulo"
                                placeholder="Ej: Oferta Especial"
                                value={titulo}
                                onChange={(e) => setTitulo(e.target.value)}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="destacado">Cupón destacado</label>
                            <select
                                id="destacado"
                                value={destacado.toString()}
                                onChange={(e) => setDestacado(e.target.value === "true")}
                            >
                                <option value="true">Sí</option>
                                <option value="false">No</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label htmlFor="estado">Estado del cupón</label>
                            <select
                                id="estado"
                                value={estado.toString()}
                                onChange={(e) => setEstado(e.target.value === "true")}
                            >
                                <option value="true">Activo</option>
                                <option value="false">Inactivo</option>
                            </select>
                        </div>

                        <div className="form-actions">
                            <button type="submit" id="enviar">
                                Guardar cupón
                            </button>
                        </div>
                    </form>
                </div>
            </section>

            {/* ── TABLA DE CUPONES ── */}
            <section className="products table-section">
                <div className="table-card">
                    <div className="table-header">
                        <h3>Cupones registrados</h3>
                    </div>

                    <div className="table-responsive">
                        <table className="tabla-bolsos" id="tablaCupones">
                            <thead>
                                <tr>
                                    <th>Código</th>
                                    <th>Título</th>
                                    <th>Descripción</th>
                                    <th>Descuento</th>
                                    <th>Destacado</th>
                                    <th>Estado</th>
                                </tr>
                            </thead>

                            <tbody>
                                {cupones.map((cupon) => (
                                    <tr key={cupon.codigo}>
                                        <td>{cupon.codigo}</td>
                                        <td>{cupon.titulo}</td>
                                        <td>{cupon.descripcion}</td>
                                        <td>{cupon.porcentaje}%</td>
                                        <td>{cupon.destacado ? "Sí" : "No"}</td>
                                        <td>
                                            <span className={`estado-badge ${cupon.estado ? "disponible" : "no-disponible"}`}>
                                                {cupon.estado ? "Activo" : "Inactivo"}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

            {/* ── CAMBIAR ESTADO CUPÓN ── */}
            <section className="products form-section">
                <h2>Cambiar estado de cupón</h2>
                <p className="subtitle">
                    Busca un cupón por su código y cambia su estado entre activo e inactivo.
                </p>

                <div className="form-card">
                    <form
                        id="cambiarEstadoCupon"
                        className="form-bolso"
                        onSubmit={handleCambiarEstado}
                    >
                        <div className="form-group">
                            <label htmlFor="codigoEstado">Código del cupón</label>
                            <input
                                type="text"
                                id="codigoEstado"
                                placeholder="Ej: DESCUENTO10"
                                value={codigoEstado}
                                onChange={(e) => setCodigoEstado(e.target.value)}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="nuevoEstado">Nuevo estado</label>
                            <select
                                id="nuevoEstado"
                                value={nuevoEstado}
                                onChange={(e) => setNuevoEstado(e.target.value)}
                            >
                                <option value="">Selecciona una opción</option>
                                <option value="true">Activo</option>
                                <option value="false">Inactivo</option>
                            </select>
                        </div>

                        <div className="form-actions">
                            <button type="submit" id="btnCambiarEstado">
                                Actualizar estado
                            </button>
                        </div>
                    </form>
                </div>
                <section className="products table-section">
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
            </section>

        </>
    )
}