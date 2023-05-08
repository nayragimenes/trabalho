import { UsuarioInterface } from "src/app/usuario/types/usuario.interface";
import { Prioridade } from "./tarefa.enum";

export interface TarefaInterface {
    id: number,
    descricao: string,
    prioridade: Prioridade,
    dataInicial: Date,
    dataFinal: Date,
    usuario: UsuarioInterface,
}