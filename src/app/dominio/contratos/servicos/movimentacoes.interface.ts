import { MovimentacaoFinanceira, Resumo } from '@/app/dominio/entidades/movimentacao/movimentacao.model';

import { ID } from '@/app/dominio/entidades/sistema/types.model';
import { MovimentacaoContabil } from '@/app/dominio/entidades/movimentacao/contabil.model';
import { Observable } from 'rxjs';

export abstract class IMovimentacoesServico {
    abstract obterResumoNovasMovimentacoes(): Observable<Resumo>;

    //#region Movimentações Financeiras
    abstract cadastrarMovimentacaoFinanceira(movimentacao: MovimentacaoFinanceira): Observable<ID>;
    abstract alterarMovimentacaoFinanceira(movimentacao: MovimentacaoFinanceira): Observable<any>;
    abstract removerMovimentacaoFinanceira(pessoaId: ID, bancoId: ID, contaId: ID, movimentacaoId: ID): Observable<any>;
    abstract obterListaMovimentacoesFinanceiras(pessoaId: ID, bancoId: ID, contaId: ID, dataInicio: string, dataFim: string): Observable<MovimentacaoFinanceira[]>;
    //#endregion

    //#region Movimentações Contábeis
    abstract cadastrarMovimentacaoContabil(movimentacao: MovimentacaoContabil): Observable<ID>;
    abstract alterarMovimentacaoContabil(movimentacao: MovimentacaoContabil): Observable<any>;
    abstract removerMovimentacaoContabil(pessoaId: ID, movimentacaoId: ID): Observable<any>;
    abstract obterListaMovimentacoesContabeis(pessoaId: ID, dataInicio: string, dataFim: string): Observable<MovimentacaoContabil[]>;
    abstract obterMovimentacaoContabilDetalhe(pessoaId: ID, movimentacaoId: ID): Observable<MovimentacaoContabil[]>;
    //#endregion
}
