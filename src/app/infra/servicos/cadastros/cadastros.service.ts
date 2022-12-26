import { Observable, of, throwError } from 'rxjs';
import { catchError, delay, map, retry } from 'rxjs/operators';

import { Banco } from '@/app/dominio/entidades/cadastros/banco.model';
import { HistoricoPadrao } from '@/app/dominio/entidades/cadastros/historico-padrao.model';
import { ICadastrosServico } from '@/app/dominio/contratos/servicos/cadastros.interface';
import { ID } from '@/app/dominio/entidades/sistema/types.model';
import { IHttpServico } from '@/app/dominio/contratos/servicos/http.interface';
import { Injectable } from '@angular/core';
import { Moeda } from '@/app/dominio/entidades/cadastros/moeda.model';
import { PlanoConta } from '@/app/dominio/entidades/cadastros/plano-conta.model';
import { PlanoContabil } from '@/app/dominio/entidades/cadastros/plano-contabil.model';
import { UsuarioCadastro } from '@/app/dominio/entidades/usuario/usuario.model';

@Injectable({
    providedIn: 'root'
})
export class CadastrosServico implements ICadastrosServico {
    constructor(private _http: IHttpServico) {}

    //#region Moedas
    cadastrarMoeda(moeda: Moeda): Observable<any> {
        return this._http.executar<any>('post', '/cadastros/moeda/post-moeda', { body: moeda }).pipe(
            map((result) => result),
            retry(0),
            catchError((err) => {
                return throwError(() => err);
            })
        );
    }

    alterarMoeda(moeda: Moeda): Observable<any> {
        return this._http.executar<{ dados: void }>('put', '/cadastros/moeda/put-moeda', { body: moeda }).pipe(
            map((result) => result?.dados),
            retry(0),
            catchError((err) => {
                return throwError(() => err);
            })
        );
    }

    removerMoeda(moedaId: string): Observable<any> {
        return this._http.executar<{ dados: void }>('post', `/cadastros/moeda/delete-moeda/${moedaId}`).pipe(
            map((result) => result?.dados),
            retry(0),
            catchError((err) => {
                return throwError(() => err);
            })
        );
    }

    obterListaMoedas(): Observable<Moeda[]> {
        return this._http.executar<{ lista: Moeda[] }>('get', '/cadastros/moeda/get-moedas-lista').pipe(
            map((result) => result.lista),
            retry(0),
            catchError((err) => {
                return throwError(() => err);
            })
        );
    }

    //#endregion

    //#region Bancos
    cadastrarBanco(banco: Banco): Observable<any> {
        return this._http.executar<any>('post', '/cadastros/banco/post-banco', { body: banco }).pipe(
            map((result) => result),
            retry(0),
            catchError((err) => {
                return throwError(() => err);
            })
        );
    }

    alterarBanco(banco: Banco): Observable<any> {
        return this._http.executar<{ dados: void }>('put', '/cadastros/banco/put-banco', { body: banco }).pipe(
            map((result) => result?.dados),
            retry(0),
            catchError((err) => {
                return throwError(() => err);
            })
        );
    }

    removerBanco(bancoId: string): Observable<any> {
        return this._http.executar<{ dados: void }>('post', `/cadastros/banco/delete-banco/${bancoId}`).pipe(
            map((result) => result?.dados),
            retry(0),
            catchError((err) => {
                return throwError(() => err);
            })
        );
    }

    obterListaBancos(): Observable<Banco[]> {
        return this._http.executar<{ lista: Banco[] }>('get', '/cadastros/banco/get-bancos-lista').pipe(
            map((result) => result.lista),
            retry(0),
            catchError((err) => {
                return throwError(() => err);
            })
        );
    }
    //#endregion

    //#region Usuários
    cadastrarUsuario(cpf: string, nome: string): Observable<any> {
        return this._http.executar<any>('post', '/cadastros/usuarios/post-usuario', { body: { cpf: cpf, nome: nome } }).pipe(
            map((result) => result),
            retry(0),
            catchError((err) => {
                return throwError(() => err);
            })
        );
    }
    obterListaUsuarios(): Observable<UsuarioCadastro[]> {
        return this._http.executar<{ lista: UsuarioCadastro[] }>('get', '/cadastros/usuarios/get-usuarios-lista').pipe(
            map((result) => result.lista),
            retry(0),
            catchError((err) => {
                return throwError(() => err);
            })
        );
    }

    removerUsuario(cpf: string): Observable<any> {
        return this._http.executar<{ dados: void }>('post', `/cadastros/usuarios/delete-usuario/${cpf}`).pipe(
            map((result) => result?.dados),
            retry(0),
            catchError((err) => {
                return throwError(() => err);
            })
        );
    }
    //#endregion

    //#region Histórico Padrão
    cadastrarHistoricoPadrao(historico: HistoricoPadrao): Observable<any> {
        return this._http.executar<any>('post', '/cadastros/historico-padrao/post-historico-padrao', { body: historico }).pipe(
            map((result) => result),
            retry(0),
            catchError((err) => {
                return throwError(() => err);
            })
        );
    }
    alterarHistoricoPadrao(historico: HistoricoPadrao): Observable<any> {
        return this._http.executar<{ dados: void }>('put', '/cadastros/historico-padrao/put-historico-padrao', { body: historico }).pipe(
            map((result) => result?.dados),
            retry(0),
            catchError((err) => {
                return throwError(() => err);
            })
        );
    }
    obterListaHistoricoPadroes(): Observable<HistoricoPadrao[]> {
        return this._http.executar<{ lista: HistoricoPadrao[] }>('get', '/cadastros/historico-padrao/get-historico-padrao-lista').pipe(
            map((result) => result.lista),
            retry(0),
            catchError((err) => {
                return throwError(() => err);
            })
        );
    }
    //#endregion

    //#region Plano de Contas
    cadastrarPlanoConta(idRaiz: ID, idPai: ID, dados: PlanoConta): Observable<ID> {
        const requisicao = {
            idRaiz: idRaiz,
            idPai: idPai,
            dados: dados
        };
        return this._http.executar<{ dados: ID }>('post', '/cadastros/plano-contas/post-plano-conta', { body: requisicao }).pipe(
            map((result) => result?.dados),
            retry(0),
            catchError((err) => {
                return throwError(() => err);
            })
        );
    }

    alterarPlanoConta(idRaiz: ID, idPai: ID, idFilho: ID, dados: PlanoConta): Observable<any> {
        const requisicao = {
            idRaiz: idRaiz,
            idPai: idPai,
            idFilho: idFilho,
            dados: dados
        };

        return this._http.executar<{ dados: void }>('put', '/cadastros/plano-contas/put-plano-conta', { body: requisicao }).pipe(
            map((result) => result?.dados),
            retry(0),
            catchError((err) => {
                return throwError(() => err);
            })
        );
    }

    removerPlanoConta(idRaiz: ID, idPai: ID, idFilho: string): Observable<any> {
        return this._http.executar<{ dados: void }>('post', `/cadastros/plano-contas/delete-plano-conta/${idRaiz}/${idPai}/${idFilho}`).pipe(
            map((result) => result?.dados),
            retry(0),
            catchError((err) => {
                return throwError(() => err);
            })
        );
    }

    obterListaPlanoContas(): Observable<PlanoConta[]> {
        return this._http.executar<{ lista: PlanoConta[] }>('get', '/cadastros/plano-contas/get-plano-contas-lista').pipe(
            map((result) => result.lista),
            retry(0),
            catchError((err) => {
                return throwError(() => err);
            })
        );
    }
    //#endregion

    //#region Plano Contábil
    obterListaPlanosContabeis(): Observable<PlanoContabil[]> {
        return this._http.executar<{ lista: PlanoContabil[] }>('get', '/cadastros/planodecontas/get-planodecontas-lista').pipe(
            map((result) => result.lista),
            retry(0),
            catchError((err) => {
                return throwError(() => err);
            })
        );
    }
    //#endregion
}
