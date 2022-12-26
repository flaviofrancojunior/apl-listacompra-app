import { FormControl, ValidationErrors } from '@angular/forms';
import { IArmazenamentoServico, Local } from '@/app/dominio/contratos/repositorios/armazenamento.interface';
import { Observable, map, of, throwError } from 'rxjs';

import { ErroNegocio } from '@/app/dominio/entidades/sistema/erro.model';
import { ICadastrosServico } from '@/app/dominio/contratos/servicos/cadastros.interface';
import { ISistemaMoedaUseCase } from '@/app/dominio/contratos/casos-uso/sistema/moeda.interface';
import { Injectable } from '@angular/core';
import { ListaOpcoesSelect } from '@/app/apresentacao/componentes/base/select/select.component';
import { Moeda } from '@/app/dominio/entidades/cadastros/moeda.model';

@Injectable({
    providedIn: 'root'
})
export class SistemaMoedaUseCase implements ISistemaMoedaUseCase {
    constructor(private _cadastrosServico: ICadastrosServico, private _armazenamentoServico: IArmazenamentoServico) {}

    cadastrarMoeda(moeda: Moeda): Observable<any> {
        return this._cadastrosServico.cadastrarMoeda(moeda).pipe(
            map((resultado) => {
                if (this._armazenamentoServico.existe('SistemaMoedaUseCase:obterListaMoedas', Local.memoria)) {
                    this._armazenamentoServico.remover('SistemaMoedaUseCase:obterListaMoedas', Local.memoria);
                }
                return resultado;
            })
        );
    }

    alterarMoeda(moeda: Moeda): Observable<any> {
        if (moeda.id) {
            return this._cadastrosServico.alterarMoeda(moeda).pipe(
                map((resultado) => {
                    if (this._armazenamentoServico.existe('SistemaMoedaUseCase:obterListaMoedas', Local.memoria)) {
                        this._armazenamentoServico.remover('SistemaMoedaUseCase:obterListaMoedas', Local.memoria);
                    }
                    return resultado;
                })
            );
        } else {
            const erro = {
                mensagem: 'Ocorreu um erro durante a alteração da moeda.',
                detalhes: 'Nao foi encontrado um [id] para realizar a ação.',
                fluxo: 'cadastros.usecase:alterarMoeda'
            };

            return throwError(() => new ErroNegocio(erro));
        }
    }

    removerMoeda(moedaId: string): Observable<any> {
        if (moedaId) {
            return this._cadastrosServico.removerMoeda(moedaId).pipe(
                map((resultado) => {
                    if (this._armazenamentoServico.existe('SistemaMoedaUseCase:obterListaMoedas', Local.memoria)) {
                        this._armazenamentoServico.remover('SistemaMoedaUseCase:obterListaMoedas', Local.memoria);
                    }
                    return resultado;
                })
            );
        } else {
            const erro = {
                mensagem: 'Ocorreu um erro durante a remoção da moeda.',
                detalhes: 'Nao foi encontrado um [id] para realizar a ação.',
                fluxo: 'cadastros.usecase:removerMoeda'
            };

            return throwError(() => new ErroNegocio(erro));
        }
    }

    obterListaMoedas(): Observable<Moeda[]> {
        if (this._armazenamentoServico.existe('SistemaMoedaUseCase:obterListaMoedas', Local.memoria)) {
            return of(this._armazenamentoServico.obter('SistemaMoedaUseCase:obterListaMoedas', Local.memoria));
        } else {
            return this._cadastrosServico.obterListaMoedas().pipe(
                map((resultado) => {
                    this._armazenamentoServico.definir('SistemaMoedaUseCase:obterListaMoedas', resultado, Local.memoria);
                    return resultado;
                })
            );
        }
    }

    obterListaMoedasSelect(): Observable<ListaOpcoesSelect[]> {
        return this._cadastrosServico.obterListaMoedas().pipe(
            map((resultado) => {
                return resultado.map((moeda) => {
                    return { id: moeda?.id, descricao: moeda.simbolo + ' - ' + moeda.nome + (moeda.paisOrigem ? '(' + moeda.paisOrigem + ')' : '') + ' - ' + moeda.codigo, extra: moeda };
                }) as ListaOpcoesSelect[];
            })
        );
    }

    validarSimbolo(control: FormControl<any>): ValidationErrors | null {
        if (control.pristine) {
            return null;
        }

        if (control.value.length != 3) {
            return { simboloInvalido3Caracteres: true };
        }

        return null;
    }
    validarCodigoMoeda(listaCodigos: string[]): ValidationErrors | null {
        return (control: FormControl<any>) => {
            if (listaCodigos.length > 0) {
                const elemento = listaCodigos.find((elemento) => {
                    return elemento.toLowerCase() === String(control.value).toLowerCase();
                });

                if (elemento) {
                    return { codigoMoedaExistente: true };
                }
            }

            return null;
        };
    }
    validarCodigoPaises(listaCodigos: string[]): ValidationErrors | null {
        return (control: FormControl<any>) => {
            if (listaCodigos.length > 0) {
                const elemento = listaCodigos.find((elemento) => {
                    return elemento.toLowerCase() === String(control.value).toLowerCase();
                });

                if (elemento) {
                    return { codigoPaisExistente: true };
                }
            }

            return null;
        };
    }
}
