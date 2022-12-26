import { Observable } from 'rxjs';
import { Parametro } from '@/app/dominio/entidades/sistema/parametro.model';

export abstract class IParametrosUseCase {
    abstract cadastrarParametro(parametro: Parametro): Observable<any>;
    abstract alterarParametro(parametro: Parametro): Observable<any>;
    abstract removerParametro(parametroId: string): Observable<any>;

    abstract obterListaParametros(): Observable<Parametro[]>;
    abstract obterParametroPorChave(chave: string): Observable<Parametro>;
}
