import { ID } from './../sistema/types.model';

export class Conta {
    id?: ID;
    agencia: string;
    ativo: boolean;
    bancoId: ID;
    dataAbertura: string;
    descricao: string;
    moedaNome: string;
    moedaId: ID;
    moedaSimbolo: string;
    numero: string;
    pessoaId: ID;
    tipoDescricao: string;
    tipoId: ID;

    planoContaId: ID;
    planoContaNumero: string;
    planoContaDescricao: string;
}
