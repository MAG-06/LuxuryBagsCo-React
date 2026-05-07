import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { CarritoService } from "../services/CarritoService"
import CartDropdown from "./CarritoDesplegable"

const carritoService = new CarritoService()

export default function Header() {
  const [cartOpen, setCartOpen] = useState(false)
  const [cartCount, setCartCount] = useState(0)

  // Refresh cart count periodically and on storage changes
  useEffect(() => {
    const updateCount = () => {
      setCartCount(carritoService.getTotalItems())
    }

    updateCount()

    // Listen for storage events (when cart is updated from other components)
    window.addEventListener("storage", updateCount)

    // Poll for changes every second (for same-tab updates)
    const interval = setInterval(updateCount, 1000)

    return () => {
      window.removeEventListener("storage", updateCount)
      clearInterval(interval)
    }
  }, [])

  // Also refresh count when cart closes
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
            <Link to="/">Promociones</Link>
            <Link to="/">Comunidad</Link>
          </div>

          <div className="auth">
            <button
              className="cart-btn"
              onClick={() => setCartOpen(true)}
            >
              🛒 Carrito
              {cartCount > 0 && (
                <span className="cart-count">{cartCount}</span>
              )}
            </button>

            <button>Usuario</button>

            <a href="#" className="btn-perfil">
              Ver mi perfil
            </a>


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