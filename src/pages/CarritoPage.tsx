import { useEffect, useState } from "react"
import { Carrito } from "../models/Carrito"
import { CarritoService } from "../services/CarritoService"
import { CurrencyService } from "../services/CurrencyService"
import { formatoCOP, formatoUSD } from "../utils/formatPrice"

const carritoService = new CarritoService()
const currencyService = new CurrencyService()

export default function CarritoPage() {
  const [carrito, setCarrito] = useState<Carrito>(carritoService.getCarrito())
  const [codigoCupon, setCodigoCupon] = useState("")
  const [mensaje, setMensaje] = useState("")
  const [tasaCOP, setTasaCOP] = useState<number | null>(null)

  const refrescarCarrito = () => {
    setCarrito(carritoService.getCarrito())
  }

  useEffect(() => {
    currencyService
      .obtenerTasaUSDaCOP()
      .then((tasa) => setTasaCOP(tasa))
      .catch((error) => {
        console.error(error)
        setTasaCOP(null)
      })
  }, [])

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
      setMensaje(`Cupón válido: ${cupon.porcentaje}% de descuento`)
      setCodigoCupon("")
    } else {
      setMensaje("Cupón inválido")
    }

    refrescarCarrito()
  }

  const subtotal = carritoService.getTotalPrecio()
  const totalConDescuento = carritoService.getTotalConDescuento()

  return (
    <div className="container">
      <h2>Mi carrito</h2>

      {carrito.bolsos.length === 0 ? (
        <p>Tu carrito está vacío.</p>
      ) : (
        <>
          {carrito.bolsos.map((item) => (
            <div className="cart-item" key={item.nombre}>
              <img src={item.imagen} alt={item.nombre} width="90" />

              <div>
                <p>{item.marca}</p>
                <p>{item.nombre}</p>
                <p>{formatoCOP(item.precio)}</p>

                {tasaCOP && (
                  <p>{formatoUSD(item.precio / tasaCOP)}</p>
                )}

                <button onClick={() => cambiarCantidad(item.nombre, -1)}>
                  -
                </button>

                <span> {item.cantidad} </span>

                <button onClick={() => cambiarCantidad(item.nombre, 1)}>
                  +
                </button>

                <button onClick={() => eliminarBolso(item.nombre)}>
                  Eliminar
                </button>
              </div>
            </div>
          ))}

          <div className="cart-total">
            <p>Subtotal: {formatoCOP(subtotal)}</p>

            {carrito.cupon && (
              <p>
                Cupón aplicado: {carrito.cupon.codigo} -{" "}
                {carrito.cupon.porcentaje}% OFF
              </p>
            )}

            <p>Total: {formatoCOP(totalConDescuento)}</p>

            {tasaCOP && (
              <p>
                Total aproximado en USD:{" "}
                {formatoUSD(totalConDescuento / tasaCOP)}
              </p>
            )}
          </div>

          {!carrito.cupon && (
            <div>
              <input
                type="text"
                placeholder="Código de cupón"
                value={codigoCupon}
                onChange={(e) => setCodigoCupon(e.target.value)}
              />

              <button onClick={aplicarCupon}>
                Aplicar cupón
              </button>
            </div>
          )}

          {mensaje && <p>{mensaje}</p>}
        </>
      )}
    </div>
  )
}