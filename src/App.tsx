import { Routes, Route } from "react-router-dom"
import Header from "./components/Header"
import Footer from "./components/Footer"
import Index from "./pages/Index"
import DetalleProducto from "./pages/DetalleProducto"
import CarritoPage from "./pages/CarritoPage"


export default function App() {
  return (
    <>
      <Header />

      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/detalle-producto" element={<DetalleProducto />} />
        <Route path="/carrito" element={<CarritoPage />} />
      </Routes>

      <Footer />
    </>
  )
}