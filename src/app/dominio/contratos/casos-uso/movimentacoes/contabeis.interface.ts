import { ID } from '@/app/dominio/entidades/sistema/types.model';
import { MovimentacaoContabil } from '@/app/dominio/entidades/movimentacao/contabil.model';
import { Observable } from 'rxjs';

export abstract class IMovimentacoesContabeisUseCase {
    abstract cadastrarMovimentacao(movimentacao: MovimentacaoContabil): Observable<ID>;
    abstract alterarMovimentacao(movimentacao: MovimentacaoContabil): Observable<any>;
    abstract removerMovimentacao(pessoaId: ID, movimentacaoId: ID): Observable<any>;
    abstract obterListaMovimentacoes(pessoaId: ID, dataInicio: string, dataFim: string): Observable<MovimentacaoContabil[]>;
    abstract obterMovimentacaoDetalhe(pessoaId: ID, movimentacaoId: ID): Observable<MovimentacaoContabil[]>;

    abstract calcularPlanosContabeisDetalhe(movimentacao: MovimentacaoContabil, novoValor: number, operacao: 'cadastrar' | 'editar'): [planoContabilCreditoId: ID, planoContabilDebitoId: ID];
}
