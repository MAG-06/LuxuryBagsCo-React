import { useState, useEffect } from "react"
import { Link } from "react-router-dom"

import Header from "../components/Header"
import Hero from "../components/Hero"
import Footer from "../components/Footer"
import PromoCard from "../components/PromoCard"

import { Cupon } from "../models/Cupon"
import { CuponService } from "../services/CuponService"

import "../css/Promociones.css"

const cuponService = new CuponService()

export default function Promociones() {

  const [cupones, setCupones] = useState<Cupon[]>([])

  useEffect(() => {
    const cuponesActivos = cuponService.getCuponesActivos()
    setCupones(cuponesActivos)
  }, [])

  return (
    <>
      <Header />
      <Hero />

      <div className="promociones-container">
        <h2>Nuestros cupones disponibles</h2>

        <p className="promociones-subtitle">
          Usa cualquiera de estos códigos al momento de validar tu cupón en el carrito.
        </p>

        <div className="promociones-grid">

          {cupones.length === 0 ? (
            <p>No hay cupones disponibles en este momento.</p>
          ) : (
            cupones.map((cupon) => (
              <PromoCard
                key={cupon.codigo}
                descuento={cupon.titulo}
                titulo={cupon.codigo}
                descripcion={cupon.descripcion}
                codigo={cupon.codigo}
                destacado={cupon.destacado}
              />
            ))
          )}

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

      <Footer />
    </>
  )
}