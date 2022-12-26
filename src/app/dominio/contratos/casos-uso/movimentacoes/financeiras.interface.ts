import { MovimentacaoFinanceira, MovimentacaoRecente, Resumo } from '@/app/dominio/entidades/movimentacao/movimentacao.model';

import { ID } from '@/app/dominio/entidades/sistema/types.model';
import { Observable } from 'rxjs';

export abstract class IMovimentacoesFinanceirasUseCase {
    abstract obterResumoNovasMovimentacoes(): Observable<Resumo>;

    abstract cadastrarMovimentacao(movimentacao: MovimentacaoFinanceira): Observable<ID>;
    abstract alterarMovimentacao(movimentacao: MovimentacaoFinanceira): Observable<any>;
    abstract removerMovimentacao(pessoaId: ID, bancoId: ID, contaId: ID, movimentacaoId: ID): Observable<any>;
    abstract obterListaMovimentacoes(pessoaId: ID, bancoId: ID, contaId: ID, dataInicio: string, dataFim: string): Observable<MovimentacaoFinanceira[]>;
}
