import { HttpMetodo, HttpRequisicao } from '@/app/dados/http/http.model';
import { IConfiguracaoHelper } from '@/app/dominio/contratos/helpers/configuracao.interface';
import { IHttpServico } from '@/app/dominio/contratos/servicos/http.interface';
import { ErroConectividade } from '@/app/dominio/entidades/sistema/erro.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError, TimeoutError } from 'rxjs';
import { catchError, map, timeout } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class HttpServico implements IHttpServico {
    constructor(private _http: HttpClient, private _configuracaoHelper: IConfiguracaoHelper) {}

    executar<R>(metodo: HttpMetodo, url: string, opcoes?: HttpRequisicao): Observable<R> {
        if (!url.startsWith('http')) {
            url = this._configuracaoHelper.configuracao.comunicacao.backend.url + url;
        }
        return this._http.request(metodo, url, opcoes).pipe(
            map((resposta) => <R>resposta),
            timeout(this._configuracaoHelper.configuracao.comunicacao.backend.timeoutPadrao),
            catchError((erro) => this.handleError(erro, url))
        );
    }

    handleError(error: any, url: string) {
        if (error instanceof TimeoutError) {
            const erro: ErroConectividade = new ErroConectividade({
                mensagem: 'Ocorreu um timeout',
                detalhes: url
            });

            return throwError(() => erro);
        }
        return throwError(() => error);
    }
}
