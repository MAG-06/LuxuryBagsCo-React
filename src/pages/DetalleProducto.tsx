import { Link } from "react-router-dom"
import { useEffect, useState } from "react"
import { Bolso } from "../models/Bolso"
import { CurrencyService } from "../services/CurrencyService"
import { CarritoService } from "../services/CarritoService"
import { formatoCOP, formatoUSD } from "../utils/formatPrice"
import "../css/Detalle.css"

const currencyService = new CurrencyService()
const carritoService = new CarritoService()

export default function DetalleProducto() {
  const [bolso, setBolso] = useState<Bolso | null>(null)
  const [tasaCOP, setTasaCOP] = useState<number | null>(null)
  const [agregado, setAgregado] = useState(false)

  useEffect(() => {
    const data = localStorage.getItem("bolsoSeleccionado")

    if (data) {
      setBolso(JSON.parse(data))
    }

    currencyService
      .obtenerTasaUSDaCOP()
      .then((tasa) => setTasaCOP(tasa))
      .catch((error) => {
        console.error(error)
        setTasaCOP(null)
      })
  }, [])

  const agregarAlCarrito = () => {
    if (!bolso) return

    carritoService.agregarBolso(bolso)
    setAgregado(true)
    setTimeout(() => setAgregado(false), 2000)
  }

  if (!bolso) {
    return (
      <div className="container">
        <p>No se encontró ningún bolso seleccionado.</p>
        <Link to="/">Volver al inicio</Link>
      </div>
    )
  }

  return (
    <div className="container">
      <div className="product-box">
        <div className="product-img">
          <img src={bolso.imagen} alt={bolso.nombre} />
        </div>

        <div className="info">
          <h2>{bolso.marca}</h2>
          <p className="name">{bolso.nombre}</p>

          <p className="price">{formatoCOP(bolso.precio)}</p>

          {tasaCOP && (
            <p className="price-usd">
              {formatoUSD(bolso.precio / tasaCOP)}
            </p>
          )}

          <p className="desc-title">Descripción</p>
          <p className="desc">{bolso.descripcion}</p>

          <p className="desc-title">Detalles</p>
          <p className="desc">{bolso.detalle1}</p>
          {bolso.detalle2 && <p className="desc">{bolso.detalle2}</p>}
          {bolso.detalle3 && <p className="desc">{bolso.detalle3}</p>}

          <div className="buttons">
            <button onClick={agregarAlCarrito} style={agregado ? { background: "#4a7a5c" } : {}}>
              {agregado ? "✅ ¡Agregado!" : "🛒 Agregar al carrito"}
            </button>

            <Link to="/" className="back-link">
              <button className="secondary">⬅ Volver</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}