import { IArmazenamentoServico, Local } from '@/app/dominio/contratos/repositorios/armazenamento.interface';
import { Observable, map, of, throwError } from 'rxjs';

import { ErroNegocio } from '@/app/dominio/entidades/sistema/erro.model';
import { ICadastrosPlanoContaUseCase } from '@/app/dominio/contratos/casos-uso/cadastros/plano-conta.interface';
import { ICadastrosServico } from '@/app/dominio/contratos/servicos/cadastros.interface';
import { ID } from '@/app/dominio/entidades/sistema/types.model';
import { Injectable } from '@angular/core';
import { ListaOpcoesSelect } from '@/app/apresentacao/componentes/base/select/select.component';
import { PlanoConta } from '@/app/dominio/entidades/cadastros/plano-conta.model';

@Injectable({
    providedIn: 'root'
})
export class CadastrosPlanoContaUseCase implements ICadastrosPlanoContaUseCase {
    constructor(private _cadastrosServico: ICadastrosServico, private _armazenamentoServico: IArmazenamentoServico) {}

    cadastrarPlanoConta(idRaiz: ID, idPai: ID, dados: PlanoConta): Observable<ID> {
        return this._cadastrosServico.cadastrarPlanoConta(idRaiz, idPai, dados).pipe(
            map((resultado) => {
                if (this._armazenamentoServico.existe('CadastrosPlanoContaUseCase:obterListaPlanoContas', Local.memoria)) {
                    this._armazenamentoServico.remover('CadastrosPlanoContaUseCase:obterListaPlanoContas', Local.memoria);
                }
                return resultado;
            })
        );
    }

    alterarPlanoConta(idRaiz: ID, idPai: ID, idFilho: ID, dados: PlanoConta): Observable<any> {
        if (idRaiz && idPai && idFilho && dados) {
            return this._cadastrosServico.alterarPlanoConta(idRaiz, idPai, idFilho, dados).pipe(
                map((resultado) => {
                    if (this._armazenamentoServico.existe('CadastrosPlanoContaUseCase:obterListaPlanoContas', Local.memoria)) {
                        this._armazenamentoServico.remover('CadastrosPlanoContaUseCase:obterListaPlanoContas', Local.memoria);
                    }
                    return resultado;
                })
            );
        } else {
            const erro = {
                mensagem: 'Ocorreu um erro durante a alteração do plano de conta.',
                detalhes: 'Nao foi encontrado um [idRaiz][idPai][idFilho][dados] para realizar a ação.',
                fluxo: 'plano-conta.usecase:alterarPlanoConta'
            };

            return throwError(() => new ErroNegocio(erro));
        }
    }

    removerPlanoConta(idRaiz: ID, idPai: ID, idFilho: string): Observable<any> {
        if (idRaiz && idPai && idFilho) {
            return this._cadastrosServico.removerPlanoConta(idRaiz, idPai, idFilho).pipe(
                map((resultado) => {
                    if (this._armazenamentoServico.existe('CadastrosPlanoContaUseCase:obterListaPlanoContas', Local.memoria)) {
                        this._armazenamentoServico.remover('CadastrosPlanoContaUseCase:obterListaPlanoContas', Local.memoria);
                    }
                    return resultado;
                })
            );
        } else {
            const erro = {
                mensagem: 'Ocorreu um erro durante a remoção do plano de conta.',
                detalhes: 'Nao foi encontrado um [idRaiz][idPai][idFilho] para realizar a ação.',
                fluxo: 'plano-conta.usecase:removerPlanoConta'
            };

            return throwError(() => new ErroNegocio(erro));
        }
    }

    obterListaPlanoContas(): Observable<PlanoConta[]> {
        if (this._armazenamentoServico.existe('CadastrosPlanoContaUseCase:obterListaPlanoContas', Local.memoria)) {
            return of(this._armazenamentoServico.obter('CadastrosPlanoContaUseCase:obterListaPlanoContas', Local.memoria));
        } else {
            return this._cadastrosServico.obterListaPlanoContas().pipe(
                map((resultado) => {
                    this._armazenamentoServico.definir('CadastrosPlanoContaUseCase:obterListaPlanoContas', resultado, Local.memoria);
                    return resultado;
                })
            );
        }
    }

    obterListaPlanoContasSelect(): Observable<ListaOpcoesSelect[]> {
        return this.obterListaPlanoContas().pipe(
            map((resultado) => {
                let listagem: PlanoConta[] = [];
                this.transformarArvoreEmLista(resultado, listagem, '');

                return listagem.map((planoConta) => {
                    return { id: planoConta.id, descricao: planoConta.numero + ' - ' + planoConta.descricao, extra: planoConta };
                }) as ListaOpcoesSelect[];
            })
        );
    }

    obterListaPlanoContasFlat(): Observable<PlanoConta[]> {
        return this.obterListaPlanoContas().pipe(
            map((resultado) => {
                let listagem: PlanoConta[] = [];
                this.transformarArvoreEmLista(resultado, listagem, '');

                return listagem;
            })
        );
    }

    private transformarArvoreEmLista(planoConta: PlanoConta[], listagem: any[], idPai: ID) {
        planoConta.forEach((plano) => {
            if (listagem) {
                listagem.push({ ...plano, idPai: idPai === '' ? plano.id : idPai });

                if (plano.subcontas.length == 0) {
                    return;
                } else {
                    this.transformarArvoreEmLista(plano.subcontas, listagem, plano.id);
                }
            }
        });
    }
}
