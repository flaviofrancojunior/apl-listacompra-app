import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { IArmazenamentoServico, Local } from '@/app/dominio/contratos/repositorios/armazenamento.interface';

import { IConfiguracaoHelper } from '@/app/dominio/contratos/helpers/configuracao.interface';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class RequestInterceptor implements HttpInterceptor {
    constructor(private _armazenamentoServico: IArmazenamentoServico, private _configuracaoHelper: IConfiguracaoHelper) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        req = req.clone({
            setHeaders: {
                'amc-message-id': this._armazenamentoServico.existe('correlation-id', Local.sessao) ? this._armazenamentoServico.obter('correlation-id', Local.sessao) : '',
                'amc-session-id': '',
                'amc-aplicacao': this._configuracaoHelper.configuracao?.aplicacao ? this._configuracaoHelper.configuracao.aplicacao : '',
                'amc-work-id': this._armazenamentoServico.existe('work-id', Local.sessao) ? this._armazenamentoServico.obter('work-id', Local.sessao) : '',
                'Safra-Correlation-ID': this._armazenamentoServico.existe('correlation-id', Local.sessao) ? this._armazenamentoServico.obter('correlation-id', Local.sessao) : '',
                'Access-Control-Allow-Origin': '*'
            }
        });

        if (this._armazenamentoServico.existe('family-key', Local.sessao)) {
            req = req.clone({
                setHeaders: {
                    'safra-family-key': this._armazenamentoServico.obter('family-key', Local.sessao)
                }
            });
        }

        req = req.clone({
            setHeaders: {
                bcsid: '',
                buuid: ''
            }
        });

        if (this._armazenamentoServico.existe('token', Local.sessao) && this.validarBackend(req.url)) {
            req = req.clone({
                setHeaders: {
                    authorization: `Bearer ${this._armazenamentoServico.obter('token', Local.sessao)}`
                }
            });
        }

        return next.handle(req.clone());
    }

    validarBackend(url: string) {
        if (this._configuracaoHelper.configuracao.comunicacao.container && url.includes(this._configuracaoHelper.configuracao.comunicacao.container.url)) {
            return false;
        }
        return true;
    }
}
