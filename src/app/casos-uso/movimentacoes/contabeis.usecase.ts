import { Observable, forkJoin, map, throwError } from 'rxjs';

import { ErroNegocio } from '@/app/dominio/entidades/sistema/erro.model';
import { ICadastrosPlanoContaUseCase } from '@/app/dominio/contratos/casos-uso/cadastros/plano-conta.interface';
import { ID } from '@/app/dominio/entidades/sistema/types.model';
import { IMovimentacoesContabeisUseCase } from '@/app/dominio/contratos/casos-uso/movimentacoes/contabeis.interface';
import { IMovimentacoesServico } from '@/app/dominio/contratos/servicos/movimentacoes.interface';
import { Injectable } from '@angular/core';
import { MovimentacaoContabil } from '@/app/dominio/entidades/movimentacao/contabil.model';

@Injectable({
    providedIn: 'root'
})
export class MovimentacoesContabeisUseCase implements IMovimentacoesContabeisUseCase {
    constructor(private _movimentacoesServico: IMovimentacoesServico, private _cadastrosPlanoContaUseCase: ICadastrosPlanoContaUseCase) {}

    cadastrarMovimentacao(movimentacao: MovimentacaoContabil): Observable<ID> {
        return this._movimentacoesServico.cadastrarMovimentacaoContabil(movimentacao);
    }
    alterarMovimentacao(movimentacao: MovimentacaoContabil): Observable<any> {
        if (movimentacao?.id) {
            return this._movimentacoesServico.alterarMovimentacaoContabil(movimentacao);
        } else {
            const erro = {
                mensagem: 'Ocorreu um erro durante a alteração do movimento.',
                detalhes: 'Nao foi encontrado um [id] para realizar a ação.',
                fluxo: 'contabeis.usecase:alterarMovimentacao'
            };

            return throwError(() => new ErroNegocio(erro));
        }
    }
    removerMovimentacao(pessoaId: ID, movimentacaoId: ID): Observable<any> {
        if (pessoaId && movimentacaoId) {
            return this._movimentacoesServico.removerMovimentacaoContabil(pessoaId, movimentacaoId);
        } else {
            const erro = {
                mensagem: 'Ocorreu um erro durante a remoção da movimentação.',
                detalhes: 'Nao foram encontrados parâmetros [pessoaId, movimentacaoId] válidos para realizar a ação.',
                fluxo: 'contabeis.usecase:removerMovimentacao'
            };

            return throwError(() => new ErroNegocio(erro));
        }
    }
    obterListaMovimentacoes(pessoaId: ID, dataInicio: string, dataFim: string): Observable<MovimentacaoContabil[]> {
        if (pessoaId && dataInicio && dataFim) {
            const obterListaMovimentacoesContabeis = this._movimentacoesServico.obterListaMovimentacoesContabeis(pessoaId, dataInicio, dataFim);

            const obterListaPlanoContasFlat = this._cadastrosPlanoContaUseCase.obterListaPlanoContasFlat();

            return forkJoin([obterListaMovimentacoesContabeis, obterListaPlanoContasFlat]).pipe(
                map((resultados) => {
                    var listaMovimentacoes = resultados[0];
                    const listaPlanoConta = resultados[1];

                    listaMovimentacoes.forEach((movimentacao) => {
                        const planoContaCredito = listaPlanoConta.find((elemento) => elemento.id === movimentacao.planoContaCreditoId);
                        const planoContaDebito = listaPlanoConta.find((elemento) => elemento.id === movimentacao.planoContaDebitoId);

                        if (planoContaCredito) {
                            movimentacao.planoContaCreditoNumero = planoContaCredito.numero;
                            movimentacao.planoContaCreditoDescricao = planoContaCredito.descricao;
                        }

                        if (planoContaDebito) {
                            movimentacao.planoContaDebitoNumero = planoContaDebito.numero;
                            movimentacao.planoContaDebitoDescricao = planoContaDebito.descricao;
                        }

                        const min = Math.ceil(0);
                        const max = Math.floor(1);
                        const valorAleatorio = Math.floor(Math.random() * (max - min + 1)) + min;
                        movimentacao.movimentoContabilPai = valorAleatorio ? true : false;
                    });

                    return listaMovimentacoes;
                })
            );
        } else {
            const erro = {
                mensagem: 'Ocorreu um erro durante a obtenção da lista de movimentações.',
                detalhes: 'Nao foi encontrado um [pessoaId][dataInicio][dataFim] para realizar a ação.',
                fluxo: 'contabeis.usecase:obterListaMovimentacoes'
            };

            return throwError(() => new ErroNegocio(erro));
        }
    }

    obterMovimentacaoDetalhe(pessoaId: ID, movimentacaoId: ID): Observable<MovimentacaoContabil[]> {
        if (pessoaId && movimentacaoId) {
            const obterListaMovimentacoesContabeis = this._movimentacoesServico.obterMovimentacaoContabilDetalhe(pessoaId, movimentacaoId);

            const obterListaPlanoContasFlat = this._cadastrosPlanoContaUseCase.obterListaPlanoContasFlat();

            return forkJoin([obterListaMovimentacoesContabeis, obterListaPlanoContasFlat]).pipe(
                map((resultados) => {
                    var listaMovimentacoes = resultados[0];
                    const listaPlanoConta = resultados[1];

                    listaMovimentacoes.forEach((movimentacao) => {
                        const planoContaCredito = listaPlanoConta.find((elemento) => elemento.id === movimentacao.planoContaCreditoId);
                        const planoContaDebito = listaPlanoConta.find((elemento) => elemento.id === movimentacao.planoContaDebitoId);

                        if (planoContaCredito) {
                            movimentacao.planoContaCreditoNumero = planoContaCredito.numero;
                            movimentacao.planoContaCreditoDescricao = planoContaCredito.descricao;
                        }

                        if (planoContaDebito) {
                            movimentacao.planoContaDebitoNumero = planoContaDebito.numero;
                            movimentacao.planoContaDebitoDescricao = planoContaDebito.descricao;
                        }
                    });

                    return listaMovimentacoes;
                })
            );
        } else {
            const erro = {
                mensagem: 'Ocorreu um erro durante a obtenção da lista de detalhe das movimentações.',
                detalhes: 'Nao foi encontrado um [pessoaId][movimentacaoId] para realizar a ação.',
                fluxo: 'contabeis.usecase:obterMovimentacaoDetalhe'
            };

            return throwError(() => new ErroNegocio(erro));
        }
    }

    calcularPlanosContabeisDetalhe(movimentacao: MovimentacaoContabil, novoValor: number, operacao: 'cadastrar' | 'editar'): [planoContabilCreditoId: ID, planoContabilDebitoId: ID] {
        if (operacao === 'cadastrar') {
            if (novoValor === 0 || novoValor === null) {
                return ['', ''];
            }

            if (movimentacao.valor >= 0) {
                if (novoValor > 0) {
                    return ['', movimentacao.planoContaDebitoId];
                } else {
                    return [movimentacao.planoContaDebitoId, ''];
                }
            } else {
                if (novoValor > 0) {
                    return ['', movimentacao.planoContaCreditoId];
                } else {
                    return [movimentacao.planoContaCreditoId, ''];
                }
            }
        } else {
            if (movimentacao.valor >= 0) {
                if (novoValor >= 0 || novoValor === null) {
                    return [movimentacao.planoContaCreditoId, movimentacao.planoContaDebitoId];
                } else {
                    return [movimentacao.planoContaDebitoId, movimentacao.planoContaCreditoId];
                }
            } else {
                if (novoValor >= 0 || novoValor === null) {
                    return [movimentacao.planoContaDebitoId, movimentacao.planoContaCreditoId];
                } else {
                    return [movimentacao.planoContaCreditoId, movimentacao.planoContaDebitoId];
                }
            }
        }
    }
}
