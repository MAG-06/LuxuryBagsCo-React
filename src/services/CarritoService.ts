import { Bolso } from "../models/Bolso"
import { Carrito } from "../models/Carrito"
import { Cupon } from "../models/Cupon"
import { CuponService } from "./CuponService"

const KEY_CARRITO = "Carrito"

const cuponService = new CuponService()

export class CarritoService {
  getCarrito(): Carrito {
    const data = localStorage.getItem(KEY_CARRITO)

    if (!data) {
      return new Carrito(Date.now(), [])
    }

    return JSON.parse(data) as Carrito
  }

  saveCarrito(carrito: Carrito): void {
    localStorage.setItem(KEY_CARRITO, JSON.stringify(carrito))
  }

  agregarBolso(bolso: Bolso): void {
    const carrito = this.getCarrito()

    const existe = carrito.bolsos.find(
      (item) => item.nombre === bolso.nombre
    )

    if (existe) {
      existe.cantidad += 1
    } else {
      carrito.bolsos.push({
        ...bolso,
        cantidad: 1,
      })
    }

    this.saveCarrito(carrito)
  }

  cambiarCantidad(nombreBolso: string, delta: number): void {
    const carrito = this.getCarrito()

    const item = carrito.bolsos.find(
      (bolso) => bolso.nombre === nombreBolso
    )

    if (!item) return

    item.cantidad += delta

    if (item.cantidad <= 0) {
      carrito.bolsos = carrito.bolsos.filter(
        (bolso) => bolso.nombre !== nombreBolso
      )
    }

    this.saveCarrito(carrito)
  }

  eliminarBolso(nombreBolso: string): void {
    const carrito = this.getCarrito()

    carrito.bolsos = carrito.bolsos.filter(
      (bolso) => bolso.nombre !== nombreBolso
    )

    this.saveCarrito(carrito)
  }

  aplicarCupon(codigoIngresado: string): Cupon | null {
    const carrito = this.getCarrito()

    const cupon = cuponService.buscarPorCodigo(codigoIngresado)

    if (!cupon) return null

    carrito.cupon = cupon
    this.saveCarrito(carrito)

    return cupon
  }

  getTotalItems(): number {
    const carrito = this.getCarrito()

    return carrito.bolsos.reduce(
      (total, bolso) => total + bolso.cantidad,
      0
    )
  }

  getTotalPrecio(): number {
    const carrito = this.getCarrito()

    return carrito.bolsos.reduce(
      (total, bolso) => total + bolso.precio * bolso.cantidad,
      0
    )
  }

  getTotalConDescuento(): number {
    const carrito = this.getCarrito()
    const total = this.getTotalPrecio()

    if (!carrito.cupon) return total

    return total - total * (carrito.cupon.porcentaje / 100)
  }

  formatearPrecio(valor: number): string {
    return "$" + valor.toLocaleString("es-CO")
  }
}