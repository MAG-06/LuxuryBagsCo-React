type PromoCardProps = {
  descuento: string
  titulo: string
  descripcion: string
  codigo: string
  destacado?: boolean
}

export default function PromoCard({descuento,titulo,descripcion,codigo, destacado = false
}: PromoCardProps) {
  return (
    
    <div className="promo-card">
      <span className={`promo-badge ${destacado ? "destacado" : ""}`}>
        {descuento}
      </span>

      <h3>{titulo}</h3>

      <p className="promo-descripcion">
        {descripcion}
      </p>

      <div className="promo-codigo-box">
        <span className="promo-label">
          Código:
        </span>

        <span className="promo-codigo">
          {codigo}
        </span>
      </div>
    </div>
  )
}