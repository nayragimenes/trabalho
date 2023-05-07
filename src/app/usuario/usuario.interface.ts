export interface UsuarioInterface {
    id?: number;
    nome: string,
    apelido: string,
    email: string,
    nascimento: Date | string,
    genero: string,
}