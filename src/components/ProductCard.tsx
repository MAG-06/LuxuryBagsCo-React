import { Link } from "react-router-dom"
import { Bolso } from "../models/Bolso"

type Props = {
  bolso: Bolso
}

export default function ProductCard({ bolso }: Props) {
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
        <p className="price">
          ${bolso.precio.toLocaleString("es-CO")}
        </p>
      </Link>

      <button>🛒 Agregar al carrito</button>
    </div>
  )
}