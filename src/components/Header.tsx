import { useState, useEffect } from "react"
import { Link } from "react-router-dom"

import { CarritoService } from "../services/CarritoService"
import { UserService } from "../services/UserService"
import { Persona } from "../models/Persona"

import CartDropdown from "./CarritoDesplegable"

const carritoService = new CarritoService()
const userService = new UserService()

const CURRENT_USER = "CurrentUser"

export default function Header() {
  const [cartOpen, setCartOpen] = useState(false)
  const [cartCount, setCartCount] = useState(0)
  const [usuario, setUsuario] = useState<Persona | null>(null)

  useEffect(() => {
    const emailLogueado = localStorage.getItem(CURRENT_USER)

    if (!emailLogueado) {
      setUsuario(null)
      return
    }

    const usuarioEncontrado = userService.buscarPorCorreo(emailLogueado)

    if (!usuarioEncontrado) {
      setUsuario(null)
      return
    }

    setUsuario(usuarioEncontrado)
  }, [])

  useEffect(() => {
    const updateCount = () => {
      setCartCount(carritoService.getTotalItems())
    }

    updateCount()

    window.addEventListener("storage", updateCount)

    const interval = setInterval(updateCount, 1000)

    return () => {
      window.removeEventListener("storage", updateCount)
      clearInterval(interval)
    }
  }, [])

  useEffect(() => {
    if (!cartOpen) {
      setCartCount(carritoService.getTotalItems())
    }
  }, [cartOpen])

  return (
    <>
      <div className="topbar">
        <div className="topbar-inner">
          <div className="logo">
            <h1>LuxuryBags Co</h1>
          </div>

          <div className="menu">
            <Link to="/">Inicio</Link>
            <Link to="/">Marcas</Link>
            <Link to="/">Tipos</Link>
            <Link to="/">Blog</Link>
            <Link to="/promociones">Promociones</Link>
            <Link to="/">Comunidad</Link>
          </div>

          <div className="auth">
            {usuario ? (
              <>
                <Link to="/perfil" className="btn-perfil">
                  {usuario.nombreCompleto}
                </Link>
              </>
            ) : (
              <Link to="/login">
                <button>Iniciar Sesión</button>
              </Link>
            )}

            <button
              className="cart-btn"
              onClick={() => setCartOpen(true)}
            >
              🛒 Carrito
              {cartCount > 0 && (
                <span className="cart-count">{cartCount}</span>
              )}
            </button>
          </div>
        </div>
      </div>

      <CartDropdown
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
      />
    </>
  )
}