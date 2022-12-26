import { Observable } from 'rxjs';
import { Operacao } from '@/app/dominio/entidades/sistema/auditoria.model';

export abstract class IAuditoriaUseCase {
    abstract obterOperacoesPorPeriodo(dataInicio: string, dataFim: string): Observable<Operacao[]>;
}
