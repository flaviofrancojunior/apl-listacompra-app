import { IArmazenamentoServico, Local } from '@/app/dominio/contratos/repositorios/armazenamento.interface';
import { Observable, concatMap, filter, find, first, firstValueFrom, from, map, of, throwError } from 'rxjs';

import { Banco } from '@/app/dominio/entidades/cadastros/banco.model';
import { ErroNegocio } from '@/app/dominio/entidades/sistema/erro.model';
import { ICadastrosBancoUseCase } from '@/app/dominio/contratos/casos-uso/cadastros/banco.interface';
import { ICadastrosServico } from '@/app/dominio/contratos/servicos/cadastros.interface';
import { ID } from '@/app/dominio/entidades/sistema/types.model';
import { Injectable } from '@angular/core';
import { ListaOpcoesSelect } from '@/app/apresentacao/componentes/base/select/select.component';

@Injectable({
    providedIn: 'root'
})
export class CadastrosBancoUseCase implements ICadastrosBancoUseCase {
    constructor(private _cadastrosServico: ICadastrosServico, private _armazenamentoServico: IArmazenamentoServico) {}

    cadastrarBanco(banco: Banco): Observable<any> {
        return this._cadastrosServico.cadastrarBanco(banco).pipe(
            map((resultado) => {
                if (this._armazenamentoServico.existe('CadastrosBancoUseCase:obterListaBancos', Local.memoria)) {
                    this._armazenamentoServico.remover('CadastrosBancoUseCase:obterListaBancos', Local.memoria);
                }
                return resultado;
            })
        );
    }

    alterarBanco(banco: Banco): Observable<any> {
        if (banco.id) {
            return this._cadastrosServico.alterarBanco(banco).pipe(
                map((resultado) => {
                    if (this._armazenamentoServico.existe('CadastrosBancoUseCase:obterListaBancos', Local.memoria)) {
                        this._armazenamentoServico.remover('CadastrosBancoUseCase:obterListaBancos', Local.memoria);
                    }
                    return resultado;
                })
            );
        } else {
            const erro = {
                mensagem: 'Ocorreu um erro durante a alteração do banco.',
                detalhes: 'Nao foi encontrado um [id] para realizar a ação.',
                fluxo: 'cadastros.usecase:alterarBanco'
            };

            return throwError(() => new ErroNegocio(erro));
        }
    }

    removerBanco(bancoId: string): Observable<any> {
        if (bancoId) {
            return this._cadastrosServico.removerBanco(bancoId).pipe(
                map((resultado) => {
                    if (this._armazenamentoServico.existe('CadastrosBancoUseCase:obterListaBancos', Local.memoria)) {
                        this._armazenamentoServico.remover('CadastrosBancoUseCase:obterListaBancos', Local.memoria);
                    }
                    return resultado;
                })
            );
        } else {
            const erro = {
                mensagem: 'Ocorreu um erro durante a remoção do banco.',
                detalhes: 'Nao foi encontrado um [id] para realizar a ação.',
                fluxo: 'cadastros.usecase:removerBanco'
            };

            return throwError(() => new ErroNegocio(erro));
        }
    }

    obterListaBancos(): Observable<Banco[]> {
        if (this._armazenamentoServico.existe('CadastrosBancoUseCase:obterListaBancos', Local.memoria)) {
            return of(this._armazenamentoServico.obter('CadastrosBancoUseCase:obterListaBancos', Local.memoria));
        } else {
            return this._cadastrosServico.obterListaBancos().pipe(
                map((resultado) => {
                    this._armazenamentoServico.definir('CadastrosBancoUseCase:obterListaBancos', resultado, Local.memoria);
                    return resultado;
                })
            );
        }
    }

    obterListaBancosSelect(somenteAtivos: boolean): Observable<ListaOpcoesSelect[]> {
        return this.obterListaBancos().pipe(
            map((resultado) => {
                return resultado
                    .filter((banco) => {
                        return somenteAtivos ? banco.ativo : banco;
                    })
                    .map((banco) => {
                        return { id: banco?.id, descricao: banco.nome + (!banco.ativo ? '(Inativo)' : ''), extra: banco };
                    }) as ListaOpcoesSelect[];
            })
        );
    }
}
