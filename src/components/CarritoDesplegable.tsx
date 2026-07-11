import { useEffect, useState, useCallback } from "react"
import { useNavigate } from "react-router-dom"
import { Carrito } from "../models/Carrito"
import { CarritoService } from "../services/CarritoService"
import { CurrencyService } from "../services/CurrencyService"
import { formatoCOP, formatoUSD } from "../utils/formatPrice"

const carritoService = new CarritoService()
const currencyService = new CurrencyService()

type Props = {
  isOpen: boolean
  onClose: () => void
}

export default function CartDropdown({ isOpen, onClose }: Props) {
  const navigate = useNavigate()
  const [carrito, setCarrito] = useState<Carrito>(carritoService.getCarrito())
  const [codigoCupon, setCodigoCupon] = useState("")
  const [mensaje, setMensaje] = useState("")
  const [tasaCOP, setTasaCOP] = useState<number | null>(null)

  const refrescarCarrito = useCallback(() => {
    setCarrito(carritoService.getCarrito())
  }, [])

  // Refresh cart every time the panel opens
  useEffect(() => {
    if (isOpen) {
      refrescarCarrito()
    }
  }, [isOpen, refrescarCarrito])

  useEffect(() => {
    currencyService
      .obtenerTasaUSDaCOP()
      .then((tasa) => setTasaCOP(tasa))
      .catch((error) => {
        console.error(error)
        setTasaCOP(null)
      })
  }, [])

  // Close panel with Escape key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    if (isOpen) {
      document.addEventListener("keydown", handleEsc)
      document.body.style.overflow = "hidden"
    }
    return () => {
      document.removeEventListener("keydown", handleEsc)
      document.body.style.overflow = ""
    }
  }, [isOpen, onClose])

  const cambiarCantidad = (nombre: string, delta: number) => {
    carritoService.cambiarCantidad(nombre, delta)
    refrescarCarrito()
  }

  const eliminarBolso = (nombre: string) => {
    carritoService.eliminarBolso(nombre)
    refrescarCarrito()
  }

  const aplicarCupon = () => {
    const cupon = carritoService.aplicarCupon(codigoCupon)

    if (cupon) {
      setMensaje(`✅ Cupón válido: ${cupon.porcentaje}% de descuento`)
      setCodigoCupon("")
    } else {
      setMensaje("❌ Cupón inválido")
    }

    refrescarCarrito()

    setTimeout(() => setMensaje(""), 3000)
  }

  const subtotal = carritoService.getTotalPrecio()
  const totalConDescuento = carritoService.getTotalConDescuento()
  const totalItems = carritoService.getTotalItems()

  return (
    <>
      {/* Overlay */}
      <div
        className={`cart-overlay ${isOpen ? "active" : ""}`}
        onClick={onClose}
      />

      {/* Side Panel */}
      <div className={`cart-panel ${isOpen ? "open" : ""}`}>
        {/* Header */}
        <div className="cart-header">
          <h2>🛍 Mi Carrito ({totalItems})</h2>
          <button className="cart-close" onClick={onClose}>
            ✕
          </button>
        </div>

        {/* Items */}
        <div className="cart-items">
          {carrito.bolsos.length === 0 ? (
            <p className="cart-empty">
              Tu carrito está vacío.
              <br />
              <span style={{ fontSize: "32px", marginTop: "12px", display: "inline-block" }}>🛒</span>
            </p>
          ) : (
            carrito.bolsos.map((item) => (
              <div className="cart-item" key={item.nombre}>
                <img src={item.imagen} alt={item.nombre} />

                <div className="cart-item-info">
                  <p className="cart-item-brand">{item.marca}</p>
                  <p className="cart-item-name">{item.nombre}</p>
                  <p className="cart-item-price">{formatoCOP(item.precio)}</p>

                  {tasaCOP && (
                    <p style={{ fontSize: "11px", color: "#888" }}>
                      {formatoUSD(item.precio / tasaCOP)}
                    </p>
                  )}

                  <div className="cart-item-controls">
                    <button
                      className="qty-btn"
                      onClick={() => cambiarCantidad(item.nombre, -1)}
                    >
                      −
                    </button>
                    <span className="qty-value">{item.cantidad}</span>
                    <button
                      className="qty-btn"
                      onClick={() => cambiarCantidad(item.nombre, 1)}
                    >
                      +
                    </button>
                  </div>
                </div>

                <button
                  className="cart-item-remove"
                  onClick={() => eliminarBolso(item.nombre)}
                  title="Eliminar"
                >
                  🗑
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {carrito.bolsos.length > 0 && (
          <div className="cart-footer">
            {/* Coupon section */}
            {!carrito.cupon && (
              <div className="cart-coupon">
                <input
                  type="text"
                  placeholder="Código de cupón"
                  value={codigoCupon}
                  onChange={(e) => setCodigoCupon(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && aplicarCupon()}
                />
                <button className="btn-coupon" onClick={aplicarCupon}>
                  Aplicar
                </button>
              </div>
            )}

            {mensaje && (
              <p className="cart-message">{mensaje}</p>
            )}

            {carrito.cupon && (
              <p className="cart-discount-info">
                🏷 {carrito.cupon.codigo} — {carrito.cupon.porcentaje}% OFF
              </p>
            )}

            <div className="cart-total">
              <span>Total</span>
              <span>
                {carrito.cupon && subtotal !== totalConDescuento ? (
                  <>
                    <span style={{ textDecoration: "line-through", color: "#aaa", marginRight: "8px", fontSize: "13px" }}>
                      {formatoCOP(subtotal)}
                    </span>
                    {formatoCOP(totalConDescuento)}
                  </>
                ) : (
                  formatoCOP(subtotal)
                )}
              </span>
            </div>

            {tasaCOP && (
              <p style={{ fontSize: "12px", color: "#888", textAlign: "right", marginBottom: "10px" }}>
                ≈ {formatoUSD(totalConDescuento / tasaCOP)}
              </p>
            )}

            <button className="btn-checkout" onClick={() => { onClose(); navigate("/pago") }}>
              Proceder al pago
            </button>
          </div>
        )}
      </div>
    </>
  )
}
