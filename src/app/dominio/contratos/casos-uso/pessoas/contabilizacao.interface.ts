import { ID } from '@/app/dominio/entidades/sistema/types.model';
import { Lote } from '@/app/dominio/entidades/pessoas/contabilizacao.model';
import { Observable } from 'rxjs';

export abstract class IPessoasContabilizacaoUseCase {
    abstract obterListaLotes(pessoaId: ID, dataInicio: string, dataFim: string): Observable<Lote[]>;
    abstract alterarLote(lote: Lote): Observable<any>;
    abstract executarContabilizacao(pessoaId: ID, data: string): Observable<any>;
}
