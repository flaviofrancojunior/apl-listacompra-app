import { ID } from '@/app/dominio/entidades/sistema/types.model';
import { Lote } from '@/app/dominio/entidades/pessoas/contabilizacao.model';
import { Observable } from 'rxjs';

export class RequisicaoExecutarContabilizacao {
    pessoaId: ID;
    data: string;
}

export class RequisicaoAlterarLote {
    id: ID;
    aberto: boolean;
}

export abstract class IContabilizacaoServico {
    abstract obterListaLotes(pessoaId: ID, dataInicio: string, dataFim: string): Observable<Lote[]>;
    abstract alterarLote(id: ID, aberto: boolean): Observable<any>;
    abstract executarContabilizacao(pessoaId: ID, data: string): Observable<any>;
}
