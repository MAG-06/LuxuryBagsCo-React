import { Bolso } from "./Bolso"
import { Cupon } from "./Cupon"

export type BolsoCarrito = Bolso & {
  cantidad: number
}

export class Carrito {
  id: number
  bolsos: BolsoCarrito[]
  cupon: Cupon | null

  constructor(id: number, bolsos: BolsoCarrito[] = []) {
    this.id = id
    this.bolsos = bolsos
    this.cupon = null
  }
}