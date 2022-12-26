import { Observable, forkJoin, map, throwError } from 'rxjs';
import { Pessoa, PessoaDetalhe, Resumo } from '@/app/dominio/entidades/pessoas/pessoa.model';

import { BancoPessoa } from '@/app/dominio/entidades/pessoas/banco.model';
import { Conta } from '@/app/dominio/entidades/pessoas/conta.model';
import { ErroNegocio } from '@/app/dominio/entidades/sistema/erro.model';
import { ICadastrosBancoUseCase } from '@/app/dominio/contratos/casos-uso/cadastros/banco.interface';
import { ICadastrosPlanoContaUseCase } from '@/app/dominio/contratos/casos-uso/cadastros/plano-conta.interface';
import { ID } from '@/app/dominio/entidades/sistema/types.model';
import { IPessoasServico } from '@/app/dominio/contratos/servicos/pessoas.interface';
import { IPessoasUseCase } from '@/app/dominio/contratos/casos-uso/pessoas/pessoas.interface';
import { ISistemaMoedaUseCase } from '@/app/dominio/contratos/casos-uso/sistema/moeda.interface';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class PessoasUseCase implements IPessoasUseCase {
    constructor(private _pessoasServico: IPessoasServico, private _cadastrosBancoUseCase: ICadastrosBancoUseCase, private _sistemaMoedaUseCase: ISistemaMoedaUseCase, private _cadastrosPlanoContaUseCase: ICadastrosPlanoContaUseCase) {}

    cadastrarPessoa(pessoa: Pessoa): Observable<any> {
        return this._pessoasServico.cadastrarPessoa(pessoa);
    }

    alterarPessoa(pessoa: Pessoa): Observable<any> {
        if (pessoa?.id) {
            return this._pessoasServico.alterarPessoa(pessoa);
        } else {
            const erro = {
                mensagem: 'Ocorreu um erro durante a alteração da pessoa.',
                detalhes: 'Nao foi encontrado um [id] para realizar a ação.',
                fluxo: 'pessoas.usecase:alterarPessoa'
            };

            return throwError(() => new ErroNegocio(erro));
        }
    }

    obterListaPessoas(): Observable<Pessoa[]> {
        return this._pessoasServico.obterListaPessoas();
    }

    removerPessoa(pessoaId: ID): Observable<void> {
        if (pessoaId) {
            return this._pessoasServico.removerPessoa(pessoaId);
        } else {
            const erro = {
                mensagem: 'Ocorreu um erro durante a remoção da pessoa.',
                detalhes: 'Nao foi encontrado um [id] para realizar a ação.',
                fluxo: 'pessoas.usecase:removerPessoa'
            };

            return throwError(() => new ErroNegocio(erro));
        }
    }

    obterPessoa(id: ID): Observable<PessoaDetalhe> {
        if (id) {
            const obterPessoa = this._pessoasServico.obterPessoa(id);
            const obterListaBancos = this._cadastrosBancoUseCase.obterListaBancos();
            const obterListaMoedas = this._sistemaMoedaUseCase.obterListaMoedas();
            const obterListaPlanoContasFlat = this._cadastrosPlanoContaUseCase.obterListaPlanoContasFlat();

            return forkJoin([obterPessoa, obterListaBancos, obterListaMoedas, obterListaPlanoContasFlat]).pipe(
                map((resultados) => {
                    var pessoaDetalhe = resultados[0];
                    const listaBancos = resultados[1];
                    const listaMoedas = resultados[2];
                    const listaPlanoConta = resultados[3];

                    if (listaBancos) {
                        pessoaDetalhe.bancos.forEach((banco) => {
                            const bancoEncontrado = listaBancos.find((elemento) => elemento.id === banco.bancoId);
                            if (bancoEncontrado) {
                                banco.nome = bancoEncontrado.nome;
                            }

                            banco.contas.forEach((conta) => {
                                const moedaEncontrada = listaMoedas.find((elemento) => elemento.id === conta.moedaId);
                                if (moedaEncontrada) {
                                    conta.moedaNome = moedaEncontrada.nome;
                                    conta.moedaSimbolo = moedaEncontrada.simbolo;
                                }

                                const planoContaEncontrado = listaPlanoConta.find((elemento) => elemento.id === conta.planoContaId);
                                if (planoContaEncontrado) {
                                    conta.planoContaDescricao = planoContaEncontrado.descricao;
                                    conta.planoContaNumero = planoContaEncontrado.numero;
                                }
                            });
                        });
                    }

                    return pessoaDetalhe;
                })
            );
        } else {
            const erro = {
                mensagem: 'Ocorreu um erro durante a obtenção dos detalhes da pessoa.',
                detalhes: 'Nao foi encontrado um [id] para realizar a ação.',
                fluxo: 'pessoas.usecase:obterPessoa'
            };

            return throwError(() => new ErroNegocio(erro));
        }
    }

    obterPessoaBancoDetalhe(pessoaId: ID, bancoId: ID): Observable<BancoPessoa | undefined> {
        if (pessoaId && bancoId) {
            return this._pessoasServico.obterPessoa(pessoaId).pipe(
                map((resultado) => {
                    const banco = resultado.bancos.find((banco) => banco.bancoId === bancoId);
                    return banco;
                })
            );
        } else {
            const erro = {
                mensagem: 'Ocorreu um erro durante a obtenção dos detalhes do banco da pessoa.',
                detalhes: 'Nao foram encontrados os [pessoaId] e [bancoId] para realizar a ação.',
                fluxo: 'pessoas.usecase:obterPessoaBancoDetalhe'
            };

            return throwError(() => new ErroNegocio(erro));
        }
    }
    obterPessoaBancoContaDetalhe(pessoaId: ID, bancoId: ID, contaId: ID): Observable<Conta | undefined> {
        if (pessoaId && bancoId && contaId) {
            return this._pessoasServico.obterPessoa(pessoaId).pipe(
                map((resultado) => {
                    const banco = resultado.bancos.find((banco) => banco.bancoId === bancoId);
                    if (banco) {
                        const conta = banco.contas.find((conta) => conta.id === contaId);
                        return conta;
                    }
                    return;
                })
            );
        } else {
            const erro = {
                mensagem: 'Ocorreu um erro durante a obtenção dos detalhes da conta da pessoa.',
                detalhes: 'Nao foram encontrados os [pessoaId], [bancoId] e [contaId] para realizar a ação.',
                fluxo: 'pessoas.usecase:obterPessoaBancoDetalhe'
            };

            return throwError(() => new ErroNegocio(erro));
        }
    }

    obterResumoCadastradas(): Observable<Resumo> {
        return this._pessoasServico.obterResumoCadastradas();
    }
}
