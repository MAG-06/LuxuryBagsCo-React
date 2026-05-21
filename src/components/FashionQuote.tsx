import { useEffect, useState } from "react"

import {
  DummyJsonService
} from "../services/DummyJsonService"

import type {
  DummyJsonQuote
} from "../services/DummyJsonService"

import "../css/FashionQuote.css"

const dummyJsonService =
  new DummyJsonService()

export default function FashionQuote() {

  const [quote, setQuote] =
    useState<DummyJsonQuote | null>(null)

  const [loading, setLoading] =
    useState(true)

  const cargarFrase = async () => {

    setLoading(true)

    const nuevaFrase =
      await dummyJsonService.obtenerFrase()

    setQuote(nuevaFrase)

    setLoading(false)
  }

  useEffect(() => {
    cargarFrase()
  }, [])

  return (

    <section className="fashion-quote">

      <div className="fashion-quote-content">

        <span className="fashion-label">
          Inspiración Fashion ✨
        </span>

        {loading ? (

          <p className="fashion-text">
            Cargando frase...
          </p>

        ) : (

          <>
            <p className="fashion-text">
              “{quote?.text}”
            </p>

            <p className="fashion-author">
              — {quote?.author}
            </p>
          </>

        )}

        <button
          className="fashion-button"
          onClick={cargarFrase}
        >
          Nueva frase
        </button>

      </div>

    </section>
  )
}