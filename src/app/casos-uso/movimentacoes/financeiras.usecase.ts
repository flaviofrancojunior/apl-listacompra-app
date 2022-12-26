import { MovimentacaoFinanceira, Resumo } from '@/app/dominio/entidades/movimentacao/movimentacao.model';
import { Observable, forkJoin, map, throwError } from 'rxjs';

import { ErroNegocio } from '@/app/dominio/entidades/sistema/erro.model';
import { ICadastrosBancoUseCase } from '@/app/dominio/contratos/casos-uso/cadastros/banco.interface';
import { ICadastrosPlanoContaUseCase } from '@/app/dominio/contratos/casos-uso/cadastros/plano-conta.interface';
import { ID } from '@/app/dominio/entidades/sistema/types.model';
import { IMovimentacoesFinanceirasUseCase } from '@/app/dominio/contratos/casos-uso/movimentacoes/financeiras.interface';
import { IMovimentacoesServico } from '@/app/dominio/contratos/servicos/movimentacoes.interface';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class MovimentacoesFinanceirasUseCase implements IMovimentacoesFinanceirasUseCase {
    constructor(private _movimentacoesServico: IMovimentacoesServico, private _cadastrosPlanoContaUseCase: ICadastrosPlanoContaUseCase, private _cadastrosBancoUseCase: ICadastrosBancoUseCase) {}

    obterResumoNovasMovimentacoes(): Observable<Resumo> {
        return this._movimentacoesServico.obterResumoNovasMovimentacoes();
    }

    cadastrarMovimentacao(movimentacao: MovimentacaoFinanceira): Observable<ID> {
        return this._movimentacoesServico.cadastrarMovimentacaoFinanceira(movimentacao);
    }

    alterarMovimentacao(movimentacao: MovimentacaoFinanceira): Observable<any> {
        if (movimentacao?.id) {
            return this._movimentacoesServico.alterarMovimentacaoFinanceira(movimentacao);
        } else {
            const erro = {
                mensagem: 'Ocorreu um erro durante a alteração do movimento.',
                detalhes: 'Nao foi encontrado um [id] para realizar a ação.',
                fluxo: 'financeiras.usecase:alterarMovimentacao'
            };

            return throwError(() => new ErroNegocio(erro));
        }
    }

    removerMovimentacao(pessoaId: ID, bancoId: ID, contaId: ID, movimentacaoId: ID): Observable<any> {
        if (pessoaId && bancoId && contaId && movimentacaoId) {
            return this._movimentacoesServico.removerMovimentacaoFinanceira(pessoaId, bancoId, contaId, movimentacaoId);
        } else {
            const erro = {
                mensagem: 'Ocorreu um erro durante a remoção da movimentação.',
                detalhes: 'Nao foram encontrados parâmetros [pessoaId, bancoId, contaId, movimentacaoId] válidos para realizar a ação.',
                fluxo: 'financeiras.usecase:removerMovimentacao'
            };

            return throwError(() => new ErroNegocio(erro));
        }
    }

    obterListaMovimentacoes(pessoaId: ID, bancoId: ID, contaId: ID, dataInicio: string, dataFim: string): Observable<MovimentacaoFinanceira[]> {
        if (pessoaId && bancoId && contaId && dataInicio && dataFim) {
            const obterListaMovimentacoesFinanceiras = this._movimentacoesServico.obterListaMovimentacoesFinanceiras(pessoaId, bancoId, contaId, dataInicio, dataFim);
            const obterListaBancos = this._cadastrosBancoUseCase.obterListaBancos();
            //const obterListaMoedas = this._sistemaMoedaUseCase.obterListaMoedas();
            const obterListaPlanoContasFlat = this._cadastrosPlanoContaUseCase.obterListaPlanoContasFlat();

            return forkJoin([obterListaMovimentacoesFinanceiras, obterListaBancos, obterListaPlanoContasFlat]).pipe(
                map((resultados) => {
                    var listaMovimentacoes = resultados[0];
                    const listaBancos = resultados[1];
                    const listaPlanoConta = resultados[2];

                    listaMovimentacoes.forEach((movimentacao) => {
                        const planoContaCredito = listaPlanoConta.find((elemento) => elemento.id === movimentacao.planoContaCreditoId);
                        const planoContaDebito = listaPlanoConta.find((elemento) => elemento.id === movimentacao.planoContaDebitoId);
                        const banco = listaBancos.find((elemento) => elemento.id === movimentacao.bancoId);

                        if (planoContaCredito) {
                            movimentacao.planoContaCreditoNumero = planoContaCredito.numero;
                            movimentacao.planoContaCreditoDescricao = planoContaCredito.descricao;
                        }

                        if (planoContaDebito) {
                            movimentacao.planoContaDebitoNumero = planoContaDebito.numero;
                            movimentacao.planoContaDebitoDescricao = planoContaDebito.descricao;
                        }

                        if (banco) {
                            movimentacao.bancoNome = banco.nome;
                        }
                    });

                    return listaMovimentacoes;
                })
            );
        } else {
            const erro = {
                mensagem: 'Ocorreu um erro durante a obtenção da lista de movimentações.',
                detalhes: 'Nao foi encontrado um [pessoaId][bancoId][contaId][dataInicio][dataFim] para realizar a ação.',
                fluxo: 'financeiras.usecase:obterListaMovimentacoes'
            };

            return throwError(() => new ErroNegocio(erro));
        }
    }
}
