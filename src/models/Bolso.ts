export class Bolso{

    id : number;
    marca : string;
    nombre : string;
    precio : number;
    descripcion : string;
    detalle1 : string;
    detalle2 : string | null;
    detalle3 : string | null;
    imagen : string;
    estado : boolean;

    constructor(id : number, marca : string, nombre : string, precio : number, descripcion : string, detalle1 : string, detalle2 : string | null, detalle3 : string | null, imagen : string, estado : boolean){
        this.id = id;
        this.marca = marca;
        this.nombre = nombre;
        this.precio = precio;
        this.descripcion = descripcion;
        this.detalle1 = detalle1;
        this.detalle2 = detalle2;
        this.detalle3 = detalle3;
        this.imagen = imagen;
        this.estado = estado;
    }
}