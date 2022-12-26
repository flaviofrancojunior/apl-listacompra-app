import { HttpMetodo, HttpRequisicao } from '@/app/dados/http/http.model';

import { Observable } from 'rxjs';

export abstract class IHttpServico {
    abstract executar<R>(metodo: HttpMetodo, url: string, opcoes?: HttpRequisicao): Observable<R>;
}
