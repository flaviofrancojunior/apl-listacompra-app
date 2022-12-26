import { ErroConectividade, ErroDetalhe, ErroNegocio, ErroSistema, ErroValidacao } from '@/app/dominio/entidades/sistema/erro.model';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private router: Router) {}
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(
            catchError((err: any) => {
                if (err.status === 0) {
                    return throwError(() => new ErroConectividade());
                } else {
                    if (err.hasOwnProperty('error') && err.error.hasOwnProperty('tipo')) {
                        if (err.error.tipo === 'autenticacao') {
                            if (err.status === 401) {
                                return throwError(() => new ErroValidacao({ mensagem: err.error.statusProcessamento.message }));
                            } else if (err.status === 500) {
                                return throwError(() => new ErroSistema({ mensagem: err.error.statusProcessamento.message }));
                            } else if (err.status === 503) {
                                return throwError(() => new ErroSistema({ mensagem: 'A autenticação falhou por indisponibilidade do serviço.', detalhes: 'Por favor, aguarde um momento e tente novamente.' }));
                            } else {
                                return throwError(() => new ErroSistema({ mensagem: err.error.statusProcessamento.message }));
                            }
                        }
                        if (err.error.tipo === 'backend') {
                            let data: any;

                            if (err.status === 404) {
                                data = {
                                    codigo: err.error.statusProcessamento.code,
                                    mensagem: err.error.statusProcessamento.message,
                                    detalhes: ''
                                };
                            } else {
                                data = {
                                    codigo: JSON.parse(err.error.statusProcessamento.message).Code,
                                    mensagem: JSON.parse(err.error.statusProcessamento.message).Message,
                                    detalhes: JSON.parse(err.error.statusProcessamento.message).Details
                                };

                                if (JSON.parse(err.error.statusProcessamento.message).hasOwnProperty('Fields')) {
                                    data = {
                                        codigo: JSON.parse(err.error.statusProcessamento.message).Fields[0].Value,
                                        mensagem: JSON.parse(err.error.statusProcessamento.message).Fields[0].Message,
                                        detalhes: JSON.parse(err.error.statusProcessamento.message).Fields[0].Details
                                    };
                                } else {
                                    data = {
                                        codigo: JSON.parse(err.error.statusProcessamento.message).Code,
                                        mensagem: JSON.parse(err.error.statusProcessamento.message).Message,
                                        detalhes: JSON.parse(err.error.statusProcessamento.message).Details
                                    };
                                }
                            }

                            if ((err.status >= 400 && err.status <= 421) || (err.status >= 423 && err.status < 500)) {
                                return throwError(() => new ErroValidacao(data));
                            } else if (err.status === 422) {
                                return throwError(() => new ErroNegocio(data));
                            } else if (err.status >= 500) {
                                return throwError(() => new ErroSistema(data));
                            }
                        }
                        return throwError(() => new ErroSistema());
                    } else {
                        if (err.status == 400) {
                            let data: ErroDetalhe;

                            if (err.error.statusProcessamento.message == 'JWT inválido.') {
                                this.router.navigate(['/login']);

                                data = {
                                    codigo: err.error.statusProcessamento.code,
                                    mensagem: 'Sessão encerrada.',
                                    detalhes: ''
                                };
                            } else {
                                data = {
                                    codigo: err.error.statusProcessamento.code,
                                    mensagem: err.error.statusProcessamento.message,
                                    detalhes: ''
                                };
                            }

                            return throwError(() => new ErroValidacao(data));
                        }

                        return throwError(() => new ErroSistema());
                    }
                }
            })
        );
    }
}
