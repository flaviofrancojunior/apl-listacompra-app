import { Component, ViewChild } from '@angular/core';
import { Estados, IEstadosHelper } from '@/app/dominio/contratos/helpers/estados.interface';
import { FormularioOperacao, IModaisHelper, ModalFormularioConfiguracaoNovaPessoa } from '@/app/dominio/contratos/helpers/modais.interface';
import { INavegacaoHelper, ROTAS } from '@/app/dominio/contratos/helpers/navegacao.interface';

import { ErroNegocio } from '@/app/dominio/entidades/sistema/erro.model';
import { EstadosHelper } from '@/app/apresentacao/helpers/estados.helper';
import { Filtro } from '@/app/apresentacao/componentes/base/table/filter/filter.component';
import { ID } from '@/app/dominio/entidades/sistema/types.model';
import { IPessoasUseCase } from '@/app/dominio/contratos/casos-uso/pessoas/pessoas.interface';
import { ISnackbarHelper } from '@/app/dominio/contratos/helpers/snackbar.interface';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Pessoa } from '@/app/dominio/entidades/pessoas/pessoa.model';

@Component({
    selector: 'sfr-pessoas-card-pessoas',
    templateUrl: './card-pessoas.component.html',
    styleUrls: ['./card-pessoas.component.scss'],
    providers: [{ provide: IEstadosHelper, useClass: EstadosHelper }]
})
export class PessoasCardPessoasComponent {
    _colunasExibidas: string[] = ['nome', 'cpf', 'ativo', 'acao-3'];
    _filtrosExibidos: Filtro[] = [
        { tipo: 'input', tipoDetalhe: 'texto', titulo: 'Nome', placeholder: 'Busque um nome', filtroGlobal: false, colunaFiltrada: 'nome', opcoes: [] },
        { tipo: 'input', tipoDetalhe: 'texto', titulo: 'CPF', placeholder: 'Busque um CPF', filtroGlobal: false, colunaFiltrada: 'cpf', opcoes: [] },
        { tipo: 'select', tipoDetalhe: '', titulo: 'Ativo', placeholder: 'Selecione', filtroGlobal: false, colunaFiltrada: 'ativoExibicao', opcoes: [] },
        { tipo: 'input', tipoDetalhe: 'busca', titulo: '', placeholder: 'Pesquisar', filtroGlobal: true, colunaFiltrada: '', opcoes: [] }
    ];
    _listaPessoas: MatTableDataSource<any>;

    @ViewChild(MatSort) sort: MatSort;

    constructor(public estado: IEstadosHelper, private _snackbarHelper: ISnackbarHelper, private _modaisHelper: IModaisHelper, private _navegacaoHelper: INavegacaoHelper, private _pessoasUseCase: IPessoasUseCase) {
        this.obterListaPessoas('Obtendo lista de pessoas...');
    }

    cadastrarPessoa() {
        const modalRef = this._modaisHelper.exibirFomulario({
            tipo: 'pessoas_nova-pessoa',
            operacao: FormularioOperacao.cadastrar
        } as ModalFormularioConfiguracaoNovaPessoa);

        modalRef.componentInstance.cadastrarSucessoEvento.subscribe(() => {
            this.obterListaPessoas('Atualizando lista de pessoas...');
        });
    }

    alterarPessoa(pessoa: Pessoa) {
        const modalRef = this._modaisHelper.exibirFomulario({
            tipo: 'pessoas_nova-pessoa',
            operacao: FormularioOperacao.editar,
            dados: pessoa
        } as ModalFormularioConfiguracaoNovaPessoa);

        modalRef.componentInstance.alterarSucessoEvento.subscribe(() => {
            this.obterListaPessoas('Atualizando lista de pessoas...');
        });
    }

    obterListaPessoas(mensagemCarregamento: string) {
        this.estado.definirEstado(Estados.carregando, mensagemCarregamento);
        this._pessoasUseCase.obterListaPessoas().subscribe({
            next: (resultado) => {
                resultado = resultado.map((elemento) => {
                    return { ...elemento, ativoExibicao: elemento.ativo ? 'Sim' : 'Não' };
                });
                this._listaPessoas = new MatTableDataSource([...resultado]);
                this._listaPessoas.sort = this.sort;

                this.estado.definirEstado(Estados.comDados);
            },
            error: (erro) => {
                this._snackbarHelper.exibirErro(erro);
                this.estado.definirEstado(Estados.erro);
            }
        });
    }

    removerPessoa(pessoaId: ID) {
        const modalRef = this._modaisHelper.exibirConfirmacao('pessoas_remover-pessoa');

        modalRef.componentInstance.confirmarEvento.subscribe(() => {
            this.estado.definirEstado(Estados.carregando, 'Removendo pessoa...');
            this._pessoasUseCase.removerPessoa(pessoaId).subscribe({
                next: () => {
                    this._snackbarHelper.exibirSucesso('Pessoa removida com sucesso!');
                    this.estado.definirEstado(Estados.comDados);
                    this.obterListaPessoas('Atualizando lista de pessoas...');
                },
                error: (erro) => {
                    this._snackbarHelper.exibirErro(erro);
                    this.estado.definirEstado(Estados.comDados);
                }
            });
        });
    }

    navegarParaDetalhes(id: string, nome: string) {
        if (id && nome) {
            this._navegacaoHelper.ir(ROTAS.dashboardPessoasDetalhes, { id: id, nome: nome });
        } else {
            const erro = {
                mensagem: 'Ocorreu um erro ao navegar para os detalhes.',
                detalhes: 'Nao foi encontrado um [id] e [nome] para realizar a ação.',
                fluxo: 'card-pessoas.component:navegarParaDetalhes'
            };

            this._snackbarHelper.exibirErro(new ErroNegocio(erro));
        }
    }
}
