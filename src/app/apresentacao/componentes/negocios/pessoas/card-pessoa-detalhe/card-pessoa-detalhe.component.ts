import { Component, ViewChild } from '@angular/core';
import { Estados, IEstadosHelper } from '@/app/dominio/contratos/helpers/estados.interface';
import { FormularioOperacao, IModaisHelper, ModalFormularioConfiguracaoNovaConta, ModalFormularioConfiguracaoNovoCartao } from '@/app/dominio/contratos/helpers/modais.interface';
import { INavegacaoHelper, ROTAS } from '@/app/dominio/contratos/helpers/navegacao.interface';

import { BancoPessoa } from '@/app/dominio/entidades/pessoas/banco.model';
import { Cartao } from '@/app/dominio/entidades/pessoas/cartao.model';
import { Conta } from '@/app/dominio/entidades/pessoas/conta.model';
import { EstadosHelper } from '@/app/apresentacao/helpers/estados.helper';
import { IPessoasContasUseCase } from '@/app/dominio/contratos/casos-uso/pessoas/contas.interface';
import { IPessoasUseCase } from '@/app/dominio/contratos/casos-uso/pessoas/pessoas.interface';
import { ISnackbarHelper } from '@/app/dominio/contratos/helpers/snackbar.interface';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { PessoaDetalhe } from '@/app/dominio/entidades/pessoas/pessoa.model';
import { PlanoContabil } from '@/app/dominio/entidades/cadastros/plano-contabil.model';
import dayjs from 'dayjs';

@Component({
    selector: 'sfr-pessoas-card-pessoa-detalhe',
    templateUrl: './card-pessoa-detalhe.component.html',
    styleUrls: ['./card-pessoa-detalhe.component.scss'],
    providers: [{ provide: IEstadosHelper, useClass: EstadosHelper }]
})
export class PessoasCardPessoaDetalheComponent {
    _colunasExibidasCartoes: string[] = ['descricao', 'numero', 'vencimento', 'bandeira', 'validade', 'ativo', 'acao'];
    _listaCartoes: MatTableDataSource<any>;

    _colunasExibidasContas: string[] = ['descricao', 'agencia', 'numero', 'dataAbertura', 'moeda', 'tipo', 'planoConta', 'ativo', 'acao-2'];

    _pessoaId: string;
    _pessoaNome: string;
    _pessoaDetalhe: PessoaDetalhe;

    _listaPlanosContabeis: PlanoContabil[];

    @ViewChild(MatSort) sort: MatSort;

    constructor(public estado: IEstadosHelper, private _snackbarHelper: ISnackbarHelper, private _modaisHelper: IModaisHelper, private _navegacaoHelper: INavegacaoHelper, private _pessoasUseCase: IPessoasUseCase, private _pessoasContasUseCase: IPessoasContasUseCase) {
        const dados: { id: string; nome: string } = this._navegacaoHelper.obterDados();
        if (dados) {
            this._pessoaId = dados.id;
            this._pessoaNome = dados.nome;
        }

        this.obterPessoa(this._pessoaId, 'Obtendo detalhes...');
    }

    cadastrarConta() {
        const modalRef = this._modaisHelper.exibirFomulario({
            tipo: 'pessoas_nova-conta',
            operacao: FormularioOperacao.cadastrar,
            dados: this._pessoaId
        } as ModalFormularioConfiguracaoNovaConta);

        modalRef.componentInstance.cadastrarSucessoEvento.subscribe(() => {
            this.obterPessoa(this._pessoaId, 'Atualizando detalhes...');
        });
    }

    alterarConta(conta: Conta, banco: BancoPessoa) {
        conta.bancoId = banco.bancoId;
        conta.pessoaId = this._pessoaId;

        const modalRef = this._modaisHelper.exibirFomulario({
            tipo: 'pessoas_nova-conta',
            operacao: FormularioOperacao.editar,
            dados: conta
        } as ModalFormularioConfiguracaoNovaConta);

        modalRef.componentInstance.alterarSucessoEvento.subscribe(() => {
            this.obterPessoa(this._pessoaId, 'Atualizando detalhes...');
        });
    }

    removerConta(conta: Conta, banco: BancoPessoa) {
        const modalRef = this._modaisHelper.exibirConfirmacao('pessoas_remover-conta');

        modalRef.componentInstance.confirmarEvento.subscribe(() => {
            this.estado.definirEstado(Estados.carregando, 'Removendo conta...');
            this._pessoasContasUseCase.removerConta(this._pessoaId, banco.bancoId, conta.id!).subscribe({
                next: () => {
                    this._snackbarHelper.exibirSucesso('Conta removida com sucesso!');
                    this.estado.definirEstado(Estados.comDados);
                    this.obterPessoa(this._pessoaId, 'Atualizando detalhes...');
                },
                error: (erro) => {
                    this._snackbarHelper.exibirErro(erro);
                    this.estado.definirEstado(Estados.comDados);
                }
            });
        });
    }

    cadastrarCartao() {
        const modalRef = this._modaisHelper.exibirFomulario({
            tipo: 'pessoas_novo-cartao',
            operacao: FormularioOperacao.cadastrar,
            dados: this._pessoaId
        } as ModalFormularioConfiguracaoNovoCartao);

        modalRef.componentInstance.cadastrarSucessoEvento.subscribe(() => {
            this.obterPessoa(this._pessoaId, 'Atualizando detalhes...');
        });
    }

    alterarCartao(cartao: Cartao) {
        cartao.pessoaId = this._pessoaId;
        const modalRef = this._modaisHelper.exibirFomulario({
            tipo: 'pessoas_novo-cartao',
            operacao: FormularioOperacao.cadastrar,
            dados: cartao
        } as ModalFormularioConfiguracaoNovoCartao);

        modalRef.componentInstance.alterarSucessoEvento.subscribe(() => {
            this.obterPessoa(this._pessoaId, 'Atualizando detalhes...');
        });
    }

    obterPessoa(id: string, mensagemCarregamento: string) {
        this.estado.definirEstado(Estados.carregando, mensagemCarregamento);
        this._pessoasUseCase.obterPessoa(id).subscribe({
            next: (resultado) => {
                this._pessoaDetalhe = resultado;

                const listaCartoes = resultado.cartoes.map((elemento) => {
                    return {
                        ...elemento,
                        ativoExibicao: elemento.ativo ? 'Sim' : 'Não',
                        validadeExibicao: dayjs()
                            .set('month', elemento.validadeMes - 1)
                            .set('year', elemento.validadeAno)
                            .format('MMM/YYYY')
                    };
                });
                this._listaCartoes = new MatTableDataSource([...listaCartoes]);
                this._listaCartoes.sort = this.sort;

                this.estado.definirEstado(Estados.comDados);
            },
            error: (erro) => {
                this._snackbarHelper.exibirErro(erro);
                this.estado.definirEstado(Estados.erro);
            }
        });
    }

    navegarParaPessoas() {
        this._navegacaoHelper.ir(ROTAS.dashboardPessoas);
    }
}
