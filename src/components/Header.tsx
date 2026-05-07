import { Link } from "react-router-dom"

export default function Header() {
  return (
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
          <Link to="/carrito">Carrito</Link>

        </div>

        <div className="auth">
          <button>Iniciar Sesión</button>

          <a href="#" className="btn-perfil">
            Ver mi perfil
          </a>

          <p>Usuario</p>
        </div>
      </div>
    </div>

  )
}