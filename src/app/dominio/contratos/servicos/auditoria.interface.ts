import { Observable } from 'rxjs';
import { Operacao } from '@/app/dominio/entidades/sistema/auditoria.model';

export abstract class IAuditoriaServico {
    //#region Auditoria
    abstract obterListaOperacoes(dataInicio: string, dataFim: string): Observable<Operacao[]>;
    //#endregion
}
