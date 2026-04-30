import { Bolso } from "../models/Bolso"

export class BolsoService {

    private KEY: string;

    constructor() {
        this.KEY = "Bolsos";
    }

    getBolsos() {
        const data = localStorage.getItem(this.KEY);
        return data ? JSON.parse(data) as Bolso[] : [];
    }

    saveBolsos(bolsos: Bolso[]) {
        localStorage.setItem(this.KEY, JSON.stringify(bolsos));
    }

    buscarBolsoPorNombre(nombre: string): Bolso | null {

        const bolsos: Bolso[] = this.getBolsos();

        for (let bolso of bolsos) {
            if (bolso.nombre === nombre) {
                return bolso;
            }
        }

        return null;

    }

    existeBolso(nombre: string): boolean {

        const bolsos: Bolso[] = this.getBolsos();

        for (let bolso of bolsos) {
            if (bolso.nombre === nombre) {
                return true;
            }
        }

        return false;

    }

    buscarTodosLosBolsosPorEstado(estado: boolean): Bolso[] {

        const bolsos: Bolso[] = this.getBolsos();

        let bolsosEstado: Bolso[] = [];

        for (let bolso of bolsos) {
            if (bolso.estado === estado) {
                bolsosEstado.push(bolso)
            }
        }
        return bolsosEstado;
    }

    cambiarEstadoBolso(nombre: string, estado: boolean): boolean {

        const bolsos: Bolso[] = this.getBolsos();

        const bolsosActivos:Bolso[] = this.buscarTodosLosBolsosPorEstado(true);

        for (let bolso of bolsos) {
            if (bolso.nombre === nombre && bolsosActivos.length <= 15) {
                bolso.estado = estado;

                this.saveBolsos(bolsos);

                return true;
            }
        }
        return false;
    }


    getKEY(): string {

        return this.KEY;

    }

}