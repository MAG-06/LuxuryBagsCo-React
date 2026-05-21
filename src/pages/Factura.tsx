import { useLocation, useNavigate } from "react-router-dom"

import { CarritoService } from "../services/CarritoService"

import Header from "../components/Header"
import Footer from "../components/Footer"

import "../css/Pago.css"

const carritoService = new CarritoService()

export default function Factura() {
  const navigate = useNavigate()
  const location = useLocation()

  const datos = location.state


  const continuarComprando = () => {
    carritoService.vaciarCarrito()
    navigate("/")
  }

  return (
    <>
      <Header />

      <section className="products form-section">
        <h2>✓ ¡Compra Exitosa!</h2>
        <p style={{ textAlign: "center", color: "#888", marginBottom: 20 }}>
          Tu pedido ha sido procesado correctamente
        </p>

        <div className="factura-card">

          {/* Datos del cliente */}
          <div className="factura-seccion">
            <h3>👤 Datos del Cliente</h3>

            <div className="factura-grid">
              <div>
                <span className="factura-label">Nombre</span>
                <span className="factura-valor">{datos.nombre}</span>
              </div>
              <div>
                <span className="factura-label">Correo</span>
                <span className="factura-valor">{datos.email}</span>
              </div>
              <div>
                <span className="factura-label">Teléfono</span>
                <span className="factura-valor">{datos.telefono}</span>
              </div>
              <div>
                <span className="factura-label">Ciudad</span>
                <span className="factura-valor">{datos.ciudad}</span>
              </div>
              <div style={{ gridColumn: "1 / -1" }}>
                <span className="factura-label">Dirección</span>
                <span className="factura-valor">{datos.direccion}</span>
              </div>
            </div>
          </div>

          {/* Método de pago */}
          <div className="factura-seccion">
            <h3>💳 Método de Pago</h3>

            <div className="factura-grid">
              <div>
                <span className="factura-label">Tarjeta</span>
                <span className="factura-valor">**** **** **** {datos.tarjetaUltimos4}</span>
              </div>
              <div>
                <span className="factura-label">Fecha de compra</span>
                <span className="factura-valor">{datos.fecha}</span>
              </div>
            </div>
          </div>

          {/* Productos */}
          <div className="factura-seccion">
            <h3>🛍️ Productos ({datos.productos.length})</h3>

            {datos.productos.map((producto: any, i: number) => (
              <div className="factura-producto" key={i}>
                <img src={producto.imagen} alt={producto.nombre} />
                <div className="factura-producto-info">
                  <span className="factura-producto-marca">{producto.marca}</span>
                  <span className="factura-producto-nombre">{producto.nombre}</span>
                </div>
                <span className="factura-producto-qty">x{producto.cantidad}</span>
                <span className="factura-producto-precio">
                  {carritoService.formatearPrecio(producto.precio * producto.cantidad)}
                </span>
              </div>
            ))}
          </div>

          {/* Totales */}
          <div className="factura-seccion factura-totales">
            <div className="factura-total-row">
              <span>Subtotal</span>
              <span>{carritoService.formatearPrecio(datos.subtotal)}</span>
            </div>

            {datos.cuponCodigo && (
              <div className="factura-total-row descuento">
                <span>Descuento ({datos.cuponCodigo} -{datos.cuponPorcentaje}%)</span>
                <span>-{carritoService.formatearPrecio(datos.descuento)}</span>
              </div>
            )}

            <div className="factura-total-row">
              <span>Envío</span>
              <span style={{ color: "#27ae60" }}>Gratis</span>
            </div>

            <div className="factura-total-row final">
              <span>Total Pagado</span>
              <span>{carritoService.formatearPrecio(datos.total)}</span>
            </div>
          </div>

          <p className="factura-numero">Factura N° {datos.numeroFactura}</p>

          <div className="form-actions">
            <button type="button" onClick={continuarComprando}>
              Continuar Comprando
            </button>
          </div>

        </div>
      </section>

      <Footer />
    </>
  )
}
