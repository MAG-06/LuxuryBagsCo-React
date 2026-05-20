import { Routes, Route } from "react-router-dom"
import Index from "./pages/Index"
import DetalleProducto from "./pages/DetalleProducto"
import Registro from "./pages/Registro"
import Login from "./pages/Login"



export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Index />} />

        <Route path="/detalle-producto" element={<DetalleProducto />} />

        <Route path="/registro" element={<Registro />} />
        <Route path="/login" element={<Login />} />
      </Routes>


    </>
  )
}