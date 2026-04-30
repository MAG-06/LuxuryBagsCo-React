import { Routes, Route } from "react-router-dom"
import Header from "./components/Header"
import Footer from "./components/Footer"
import Index from "./pages/Index"
import DetalleProducto from "./pages/DetalleProducto"


export default function App() {
  return (
    <>
      <Header />

      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/detalle-producto" element={<DetalleProducto />} />
      </Routes>

      <Footer />
    </>
  )
}