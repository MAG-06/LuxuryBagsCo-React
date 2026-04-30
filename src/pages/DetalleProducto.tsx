import { Link } from "react-router-dom"
import { useEffect, useState } from "react"
import { Bolso } from "../models/Bolso"
import "../css/Detalle.css"

export default function DetalleProducto() {
  const [bolso, setBolso] = useState<Bolso | null>(null)

  useEffect(() => {
    const data = localStorage.getItem("bolsoSeleccionado")

    if (data) {
      setBolso(JSON.parse(data))
    }
  }, [])

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
          <p className="price">
            ${bolso.precio.toLocaleString("es-CO")}
          </p>

          <p className="desc-title">Descripción</p>
          <p className="desc">{bolso.descripcion}</p>

          <p className="desc-title">Detalles</p>
          <p className="desc">{bolso.detalle1}</p>
          {bolso.detalle2 && <p className="desc">{bolso.detalle2}</p>}
          {bolso.detalle3 && <p className="desc">{bolso.detalle3}</p>}

          <div className="buttons">
            <button>🛒 Agregar al carrito</button>

            <Link to="/" className="back-link">
              <button className="secondary">⬅ Volver</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}