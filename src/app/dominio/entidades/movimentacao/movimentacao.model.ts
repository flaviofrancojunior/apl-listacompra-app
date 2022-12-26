import { ID } from '../sistema/types.model';
import { Pessoa } from '../pessoas/pessoa.model';

export class Resumo {
    totalNovasMovimentacoes: number;
    pessoas: (Pessoa & { totalNovasMovimentacoes: number })[];
}

export class MovimentacaoFinanceira {
    id?: string;
    pessoaId: ID;
    data: string;
    valor: number;

    bancoId: ID;
    bancoNome: string;

    contaId: ID;
    contaAgencia: string;
    contaNumero: string;
    contaMoedaId: string;
    contaMoedaSimbolo: string;

    planoContaCreditoId: ID;
    planoContaCreditoNumero: string;
    planoContaCreditoDescricao: string;

    planoContaDebitoId: ID;
    planoContaDebitoNumero: string;
    planoContaDebitoDescricao: string;

    descricao: string;
    complemento: string;

    lancamentoId: LancamentoTipo;
    lancamentoDescricao: string;

    contabilizar: boolean;

    loteAberto?: boolean;

    dataCadastro?: string;

    extratoId?: string;

    historico?: {
        dataAlteracao: string;
        descricao: string;
        usuarioId: string;
        usuarioNome: string;
    }[];
}

export class MovimentacaoRecente {
    id?: string;
    data: string;
    valor: number;
    lancamento: string;
}

export enum LancamentoTipo {
    automatico = 1,
    manual = 2
}
