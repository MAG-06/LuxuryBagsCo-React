export class Cupon {

  codigo: string
  porcentaje: number
  descripcion: string
  titulo: string
  destacado: boolean
  estado: boolean

  constructor(codigo: string, porcentaje: number, descripcion: string, titulo: string, destacado: boolean, estado: boolean) {
    this.codigo = codigo
    this.porcentaje = porcentaje
    this.descripcion = descripcion
    this.titulo = titulo
    this.destacado = destacado
    this.estado = estado
  }
}