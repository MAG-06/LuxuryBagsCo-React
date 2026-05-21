import { Cupon } from "../models/Cupon"

export class CuponService {
    private KEY: string;

    constructor() {
        this.KEY = "Cupones";
    }

    // metodo para obtener TODOS cupones del localstorage
    getCupones(): Cupon[] {
        const data = localStorage.getItem(this.KEY)

        if (!data) {
            return []
        }

        return JSON.parse(data) as Cupon[]
    }

    // metodo para guardar cupones del localstorage
    saveCupones(cupones: Cupon[]): void {
        localStorage.setItem(this.KEY, JSON.stringify(cupones))
    }

    // metodo para agregar un nuevo cupon al localstorage
    agregarCupon(cupon: Cupon): void {
        const cupones = this.getCupones()
        cupones.push(cupon)
        this.saveCupones(cupones)
    }

    // metodo para actualizar el estado de un cupon en el localstorage
    actualizarEstado(codigo: string, nuevoEstado: boolean): void {
        const cupones = this.getCupones()

        const cupon = cupones.find(
            (c) => c.codigo.toLowerCase() === codigo.toLowerCase()
        )

        if (cupon) {
            cupon.estado = nuevoEstado
            this.saveCupones(cupones)
        }
    }

    // metodo para obtener solo cupones que tengan estado en true
    getCuponesActivos(): Cupon[] {
        const cupones = this.getCupones()
        return cupones.filter((c) => c.estado === true)
    }

    // metodo para buscar un cupon por codigo
    buscarPorCodigo(codigo: string): Cupon | null {
        const cupones = this.getCuponesActivos()

        const cupon = cupones.find(
            (c) => c.codigo.toLowerCase() === codigo.trim().toLowerCase()
        )

        return cupon || null
    }

    // metodo para verificar si ya existe un cupon con ese codigo
    existeCupon(codigo: string): boolean {
        const cupones = this.getCupones()

        return cupones.some(
            (c) => c.codigo.toLowerCase() === codigo.trim().toLowerCase()
        )
    }
}
