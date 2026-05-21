import Hero from "../components/Hero"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

import "../css/PanelAdminV3.css"

export default function PanelAdminCupones() {

    const navigate = useNavigate()

    const [codigo, setCodigo] = useState("")
    const [porcentaje, setPorcentaje] = useState("")
    const [descripcion, setDescripcion] = useState("")
    const [titulo, setTitulo] = useState("")
    const [destacado, setDestacado] = useState(false)
    const [estado, setEstado] = useState(true)

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const nuevoCupon = {
            codigo,
            porcentaje,
            descripcion,
            titulo,
            destacado,
            estado
        }

        console.log(nuevoCupon)

        // Aquí puedes hacer el fetch al backend

        navigate("/promociones")
    }

    return (
        <>
            <Hero />

            <section className="products form-section">

                <h2>Registrar nuevo cupón</h2>

                <div className="form-card">

                    <form
                        id="cuponRegistro"
                        className="form-bolso"
                        onSubmit={handleSubmit}
                    >

                        <div className="form-group">
                            <label htmlFor="codigo">
                                Código del cupón
                            </label>

                            <input
                                type="text"
                                id="codigo"
                                placeholder="Ej: DESCUENTO10"
                                value={codigo}
                                onChange={(e) => setCodigo(e.target.value)}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="porcentaje">
                                Porcentaje de descuento
                            </label>

                            <input
                                type="number"
                                id="porcentaje"
                                placeholder="Ej: 10"
                                value={porcentaje}
                                onChange={(e) => setPorcentaje(e.target.value)}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="descripcion">
                                Descripción
                            </label>

                            <input
                                type="text"
                                id="descripcion"
                                placeholder="Ej: Obtén un 10% de descuento"
                                value={descripcion}
                                onChange={(e) => setDescripcion(e.target.value)}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="titulo">
                                Título del cupón
                            </label>

                            <input
                                type="text"
                                id="titulo"
                                placeholder="Ej: Oferta Especial"
                                value={titulo}
                                onChange={(e) => setTitulo(e.target.value)}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="destacado">
                                Cupón destacado
                            </label>

                            <select
                                id="destacado"
                                value={destacado.toString()}
                                onChange={(e) =>
                                    setDestacado(e.target.value === "true")
                                }
                            >
                                <option value="true">
                                    Sí
                                </option>

                                <option value="false">
                                    No
                                </option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label htmlFor="estado">
                                Estado del cupón
                            </label>

                            <select
                                id="estado"
                                value={estado.toString()}
                                onChange={(e) =>
                                    setEstado(e.target.value === "true")
                                }
                            >
                                <option value="true">
                                    Activo
                                </option>

                                <option value="false">
                                    Inactivo
                                </option>
                            </select>
                        </div>

                        <div className="form-actions">
                            <button
                                type="submit"
                                id="enviar"
                            >
                                Guardar cupón
                            </button>
                        </div>

                    </form>
                </div>
            </section>
        </>
    )
}