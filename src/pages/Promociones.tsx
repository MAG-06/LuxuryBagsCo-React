import { Link } from "react-router-dom"

import HeroPromociones from "../components/HeroPromociones"
import PromoCard from "../components/PromoCard"

import "../css/Promociones.css"

export default function Promociones() {


// aqui debe obtener los cupones del local storage

  return (
    <>
      <HeroPromociones />

      <div className="promociones-container">
        <h2>Nuestros cupones disponibles</h2>

        <p className="promociones-subtitle">
          Usa cualquiera de estos códigos al momento de validar tu cupón en el carrito.
        </p>

        <div className="promociones-grid">

          <PromoCard
            descuento="10% OFF"
            titulo="Descuento"
            descripcion="Obtén un 10% de descuento en tu compra."
            codigo="Descuento"
            
          />

          <PromoCard
            descuento="20% OFF"
            titulo="Nuevo Usuario"
            descripcion="Promoción especial para quienes realizan su primera compra."
            codigo="Nuevo Usuario"
          />

          <PromoCard
            descuento="40% OFF"
            titulo="Increible Descuento"
            descripcion="Aprovecha una rebaja increíble por tiempo limitado."
            codigo="Increible Descuento"
            destacado
          />

        </div>

        <div
          style={{
            textAlign: "center",
            marginTop: "30px"
          }}
        >
          <Link to="/">
            <button>
              Volver al inicio
            </button>
          </Link>
        </div>
      </div>
    </>
  )
}