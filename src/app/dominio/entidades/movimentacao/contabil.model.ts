import { ID } from '../sistema/types.model';

export class MovimentacaoContabil {
    id?: string;
    pessoaId: ID;

    data: string;
    valor: number;

    descricao: string;
    complemento: string;

    planoContaCreditoId: ID;
    planoContaCreditoNumero: string;
    planoContaCreditoDescricao: string;

    planoContaDebitoId: ID;
    planoContaDebitoNumero: string;
    planoContaDebitoDescricao: string;

    movimentoFinanceiroPaiId: ID;
    movimentoContabilPaiId: ID;
    movimentoContabilPai: boolean;

    loteAberto?: boolean;
    dataCadastro?: string;
    dataAtualizacao?: string;

    historico: {
        dataAlteracao: string;
        descricao: string;
        usuarioId: string;
        usuarioNome: string;
    };
}
