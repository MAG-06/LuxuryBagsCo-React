import { Bolso } from "./Bolso"
import { Cupon } from "./Cupon"

export class Carrito {
  id: number
  bolsos: Array<Bolso & { cantidad: number }>
  cupon: Cupon | null

  constructor(id: number, bolsos: Array<Bolso & { cantidad: number }> = []) {
    this.id = id
    this.bolsos = bolsos
    this.cupon = null
  }
}