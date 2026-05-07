import { Link } from "react-router-dom"
import { Bolso } from "../models/Bolso"
import { CarritoService } from "../services/CarritoService"
import { formatoCOP, formatoUSD } from "../utils/formatPrice"

type Props = {
  bolso: Bolso
  tasaCOP: number | null
  onAgregar?: () => void
}

const carritoService = new CarritoService()

export default function ProductCard({ bolso, tasaCOP, onAgregar }: Props) {
  const agregarAlCarrito = () => {
    carritoService.agregarBolso(bolso)
    alert("Bolso agregado al carrito")
    onAgregar?.()
  }

  return (
    <div className="product-card">
      <Link
        to="/detalle-producto"
        className="card-link"
        onClick={() => {
          localStorage.setItem("bolsoSeleccionado", JSON.stringify(bolso))
        }}
      >
        <img src={bolso.imagen} alt={bolso.nombre} className="img" />

        <p className="brand">{bolso.marca}</p>
        <p className="name">{bolso.nombre}</p>

        <p className="price">{formatoCOP(bolso.precio)}</p>

        {tasaCOP && (
          <p className="price-usd">
            {formatoUSD(bolso.precio / tasaCOP)}
          </p>
        )}
      </Link>

      <button onClick={agregarAlCarrito}>
        🛒 Agregar al carrito
      </button>
    </div>
  )
}