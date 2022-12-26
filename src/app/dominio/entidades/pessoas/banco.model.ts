import { Conta } from './conta.model';

export class Banco {
    id: string;
    nome: string;
    codigo: string;
    ativo: boolean;
    dataAtualizacao: string;
    contas: Conta[];
}

export class BancoPessoa {
    bancoId: string;
    nome: string;
    codigo: string;
    ativo: boolean;
    dataAtualizacao: string;
    contas: Conta[];
}
