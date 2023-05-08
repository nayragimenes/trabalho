import { Genero } from "./genero.enum";

export interface UsuarioInterface {
    id?: string,
    nome: string,
    apelido: string,
    email: string,
    nascimento: string,
    genero: Genero
}