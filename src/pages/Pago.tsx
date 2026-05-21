import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

import { Persona } from "../models/Persona"
import { UserService } from "../services/UserService"
import { CarritoService } from "../services/CarritoService"

import Header from "../components/Header"
import Footer from "../components/Footer"

import "../css/Pago.css"

const userService = new UserService()
const carritoService = new CarritoService()

export default function Pago() {
    const navigate = useNavigate()

    const [usuario, setUsuario] = useState<Persona | null>(null)
    const [telefono, setTelefono] = useState("")
    const [numeroTarjeta, setNumeroTarjeta] = useState("")
    const [nombreTarjeta, setNombreTarjeta] = useState("")
    const [mesExp, setMesExp] = useState("")
    const [anioExp, setAnioExp] = useState("")
    const [cvv, setCvv] = useState("")
    const [ciudad, setCiudad] = useState("")
    const [direccion, setDireccion] = useState("")

    useEffect(() => {
        const correo = localStorage.getItem("CurrentUser")
        if (!correo) { navigate("/login"); return }

        const usuarioSesion = userService.buscarPorCorreo(correo)
        if (!usuarioSesion) { navigate("/login"); return }

        setUsuario(usuarioSesion)
        setCiudad(usuarioSesion.ciudad || "")
        setDireccion(usuarioSesion.direccion || "")
    }, [navigate])

    const carrito = carritoService.getCarrito()
    const bolsos = carrito.bolsos
    const subtotal = carritoService.getTotalPrecio()
    const totalConDescuento = carritoService.getTotalConDescuento()
    const descuento = subtotal - totalConDescuento
    const cupon = carrito.cupon

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!usuario) return

        if (bolsos.length === 0) {
            alert("Tu carrito está vacío"); return
        }
        if (!telefono.trim() || !/^\d{9,10}$/.test(telefono)) {
            alert("El teléfono debe tener entre 9 y 10 dígitos numéricos"); return
        }
        if (!/^\d{16}$/.test(numeroTarjeta)) {
            alert("El número de tarjeta debe tener exactamente 16 dígitos"); return
        }
        if (!nombreTarjeta.trim() || !/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(nombreTarjeta)) {
            alert("El nombre del titular solo puede contener letras"); return
        }
        const mesNum = parseInt(mesExp)
        if (isNaN(mesNum) || mesNum < 1 || mesNum > 12) {
            alert("El mes debe ser un número entre 01 y 12"); return
        }
        const anioNum = parseInt(anioExp)
        const anioActual = new Date().getFullYear() % 100
        if (isNaN(anioNum) || anioNum < anioActual) {
            alert("El año de expiración es inválido o ya venció"); return
        }
        if (!/^\d{3}$/.test(cvv)) {
            alert("El CVV debe tener exactamente 3 dígitos"); return
        }
        if (!ciudad.trim()) {
            alert("Debe ingresar una ciudad de envío"); return
        }
        if (!direccion.trim()) {
            alert("Debe ingresar una dirección de envío"); return
        }

        const ahora = new Date()

        navigate("/factura", {
            state: {
                nombre: usuario.nombreCompleto,
                email: usuario.email,
                telefono,
                direccion,
                ciudad,
                tarjetaUltimos4: numeroTarjeta.slice(-4),
                productos: [...bolsos],
                subtotal,
                descuento,
                total: totalConDescuento,
                cuponCodigo: cupon?.codigo || "",
                cuponPorcentaje: cupon?.porcentaje || 0,
                fecha: ahora.toLocaleDateString("es-CO", {
                    year: "numeric", month: "long", day: "numeric",
                    hour: "2-digit", minute: "2-digit",
                }),
                numeroFactura: `LB-${ahora.getFullYear()}${String(ahora.getMonth() + 1).padStart(2, "0")}${String(ahora.getDate()).padStart(2, "0")}-${Math.floor(Math.random() * 9000 + 1000)}`,
            },
        })
    }

    if (!usuario) return null

    return (
        <>
            <Header />

            <section className="products form-section">
                <h2>Finalizar Compra</h2>

                <div className="pago-layout">

                    {/* ── FORMULARIO ── */}
                    <div className="form-card">
                        <form className="form-bolso" onSubmit={handleSubmit}>

                            <h3 className="pago-section-title">👤 Datos Personales</h3>

                            <div className="form-group">
                                <label>Nombre Completo</label>
                                <input type="text" value={usuario.nombreCompleto} readOnly />
                            </div>

                            <div className="form-group">
                                <label>Correo Electrónico</label>
                                <input type="email" value={usuario.email} readOnly />
                            </div>

                            <div className="form-group">
                                <label>Teléfono</label>
                                <input
                                    type="text"
                                    placeholder="Ej: 3147859618"
                                    value={telefono}
                                    onChange={(e) => setTelefono(e.target.value.replace(/\D/g, "").slice(0, 10))}
                                />
                            </div>

                            <div className="form-group">
                                <label>Ciudad</label>
                                <input
                                    type="text"
                                    placeholder="Ej: Bogotá"
                                    value={ciudad}
                                    readOnly={!!usuario.ciudad}
                                    onChange={(e) => setCiudad(e.target.value)}
                                />
                            </div>

                            <div className="form-group" style={{ gridColumn: "1 / -1" }}>
                                <label>Dirección de Envío</label>
                                <input
                                    type="text"
                                    placeholder="Ej: Calle 123 # 45-67"
                                    value={direccion}
                                    readOnly={!!usuario.direccion}
                                    onChange={(e) => setDireccion(e.target.value)}
                                />
                            </div>

                            <h3 className="pago-section-title">💳 Datos de Pago</h3>

                            <div className="form-group" style={{ gridColumn: "1 / -1" }}>
                                <label>Número de Tarjeta</label>
                                <input
                                    type="text"
                                    placeholder="0000 0000 0000 0000"
                                    value={numeroTarjeta}
                                    onChange={(e) => setNumeroTarjeta(e.target.value.replace(/\D/g, "").slice(0, 16))}
                                />
                            </div>

                            <div className="form-group" style={{ gridColumn: "1 / -1" }}>
                                <label>Nombre del Titular</label>
                                <input
                                    type="text"
                                    placeholder="Como aparece en la tarjeta"
                                    value={nombreTarjeta}
                                    onChange={(e) => setNombreTarjeta(e.target.value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g, ""))}
                                />
                            </div>

                            <div className="form-group">
                                <label>Mes (MM)</label>
                                <input
                                    type="text"
                                    placeholder="MM"
                                    value={mesExp}
                                    onChange={(e) => setMesExp(e.target.value.replace(/\D/g, "").slice(0, 2))}
                                    maxLength={2}
                                />
                            </div>

                            <div className="form-group">
                                <label>Año (AA)</label>
                                <input
                                    type="text"
                                    placeholder="AA"
                                    value={anioExp}
                                    onChange={(e) => setAnioExp(e.target.value.replace(/\D/g, "").slice(0, 2))}
                                    maxLength={2}
                                />
                            </div>

                            <div className="form-group">
                                <label>CVV</label>
                                <input
                                    type="password"
                                    placeholder="•••"
                                    value={cvv}
                                    onChange={(e) => setCvv(e.target.value.replace(/\D/g, "").slice(0, 3))}
                                    maxLength={3}
                                />
                            </div>

                            <div className="form-actions">
                                <button type="submit">
                                    💎 Pagar {carritoService.formatearPrecio(totalConDescuento)}
                                </button>
                            </div>

                        </form>
                    </div>

                    {/* ── RESUMEN DEL CARRITO ── */}
                    <div className="pago-resumen">
                        <h3>🛍️ Resumen del Pedido</h3>

                        <div className="resumen-items">
                            {bolsos.map((bolso, i) => (
                                <div className="resumen-item" key={i}>
                                    <img src={bolso.imagen} alt={bolso.nombre} />
                                    <div className="resumen-item-info">
                                        <div className="resumen-item-brand">{bolso.marca}</div>
                                        <div className="resumen-item-name">{bolso.nombre}</div>
                                        <div className="resumen-item-qty">Cantidad: {bolso.cantidad}</div>
                                    </div>
                                    <div className="resumen-item-price">
                                        {carritoService.formatearPrecio(bolso.precio * bolso.cantidad)}
                                    </div>
                                </div>
                            ))}
                        </div>

                        <hr />

                        <div className="resumen-row">
                            <span>Subtotal ({carritoService.getTotalItems()} items)</span>
                            <span>{carritoService.formatearPrecio(subtotal)}</span>
                        </div>

                        {cupon && (
                            <div className="resumen-row discount">
                                <span>Cupón ({cupon.codigo}) -{cupon.porcentaje}%</span>
                                <span>-{carritoService.formatearPrecio(descuento)}</span>
                            </div>
                        )}

                        <div className="resumen-row">
                            <span>Envío</span>
                            <span style={{ color: "#27ae60", fontWeight: 600 }}>Gratis</span>
                        </div>

                        <div className="resumen-total">
                            <span>Total</span>
                            <span>{carritoService.formatearPrecio(totalConDescuento)}</span>
                        </div>
                    </div>

                </div>
            </section>

            <Footer />
        </>
    )
}