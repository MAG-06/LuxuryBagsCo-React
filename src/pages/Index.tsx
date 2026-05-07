import { useEffect, useState } from "react"
import { Bolso } from "../models/Bolso"
import { BolsoService } from "../services/BolsoService"
import { CurrencyService } from "../services/CurrencyService"
import ProductCard from "../components/ProductCard"
import Hero from "../components/Hero"

import "../css/Index.css"

const bolsoService = new BolsoService()
const currencyService = new CurrencyService()

export default function Index() {
  const [bolsos, setBolsos] = useState<Bolso[]>([])
  const [tasaCOP, setTasaCOP] = useState<number | null>(null)

  useEffect(() => {
    const data = bolsoService.buscarTodosLosBolsosPorEstado(true)
    setBolsos(data)

    currencyService
      .obtenerTasaUSDaCOP()
      .then((tasa) => setTasaCOP(tasa))
      .catch((error) => {
        console.error(error)
        setTasaCOP(null)
      })
  }, [])

  return (
    <>
      <Hero />

      <div className="products">
        <h2>Todos los bolsos</h2>

        {tasaCOP && (
          <p className="currency-info">
            Tasa actual aproximada: 1 USD = ${tasaCOP.toLocaleString("es-CO")} COP
          </p>
        )}

        <div className="products-list">
          {bolsos.length === 0 ? (
            <p>No hay bolsos disponibles.</p>
          ) : (
            bolsos.map((bolso) => (
              <ProductCard
                key={bolso.id}
                bolso={bolso}
                tasaCOP={tasaCOP}
              />
            ))
          )}
        </div>
      </div>
    </>
  )
}