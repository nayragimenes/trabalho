import { UsuarioInterface } from "src/app/usuario/types/usuario.interface";
import { Categoria } from "./categoria.enum";

export interface DespesaInterface {
    id: number;
    descricao: string,
    categoria: Categoria,
    data: Date,
    valor: number,
    usuario?: UsuarioInterface; 
}