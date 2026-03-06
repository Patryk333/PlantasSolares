export interface Planta {
    id:number,
    created_at:number,
    nom:string,
    ubicacio:{latitude:number,longitude:number},
    capacitat:number,
    usuario:string,
    foto?:string,
    favorite: boolean
}
