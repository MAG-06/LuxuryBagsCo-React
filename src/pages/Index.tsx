import { useEffect, useState } from "react"
import { Bolso } from "../models/Bolso"
import { BolsoService } from "../services/BolsoService"
import ProductCard from "../components/ProductCard"
import Hero from "../components/Hero"

import "../css/Index.css"

const bolsoService = new BolsoService()

export default function Index() {
  const [bolsos, setBolsos] = useState<Bolso[]>([])

  useEffect(() => {
    const data = bolsoService.buscarTodosLosBolsosPorEstado(true)
    setBolsos(data)
  }, [])

  return (
    <>
      <Hero />

      <div className="products">
        <h2>Todos los bolsos</h2>

        <div className="products-list">
          {bolsos.length === 0 ? (<p>No hay bolsos disponibles.</p>) : (

            bolsos.map((bolso) => (
              <ProductCard key={bolso.id} bolso={bolso} />
              
            ))
          )}
        </div>
      </div>
    </>
  )
}