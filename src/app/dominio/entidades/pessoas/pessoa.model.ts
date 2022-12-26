import { Banco, BancoPessoa } from './banco.model';

import { Cartao } from './cartao.model';

export class Pessoa {
    id?: string;
    nome: string;
    cpf: string;
    planoContabilId: string;
    ativo: boolean;
}

export class PessoaDetalhe {
    id: string;
    nome: string;
    cpf: string;
    ativo: boolean;
    dataCadastro: string;
    dataAtualizacao: string;
    bancos: (BancoPessoa & { dataAtualizacao: string })[];
    cartoes: (Cartao & { dataAtualizacao: string })[];
}

export class Resumo {
    totalCadastradas: number;
    pessoas: Pessoa[];
}
