import { ID } from '@/app/dominio/entidades/sistema/types.model';
import { Lancamento } from '@/app/dominio/entidades/movimentacao/extrato.model';
import { Observable } from 'rxjs';

export abstract class IMovimentacoesExtratoUseCase {
    abstract obterExtrato(pessoaId: ID, bancoId: ID, contaId: ID, dataInicio: string, dataFim: string): Observable<Lancamento[]>;
    abstract obterExtratoMensal(pessoaId: ID, bancoId: ID, contaId: ID, data: string): Observable<Lancamento[]>;
}
