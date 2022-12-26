import { Component, Input, ViewChild } from '@angular/core';
import { Estados, IEstadosHelper } from '@/app/dominio/contratos/helpers/estados.interface';
import { FormularioOperacao, IModaisHelper, ModalFormularioConfiguracaoNovaMovimentacaoContabil, ModalTipoHistoricoDetalhe } from '@/app/dominio/contratos/helpers/modais.interface';
import { INavegacaoHelper, ROTAS } from './../../../../../dominio/contratos/helpers/navegacao.interface';
import { LancamentoTipo, MovimentacaoFinanceira } from '@/app/dominio/entidades/movimentacao/movimentacao.model';

import { EstadosHelper } from '@/app/apresentacao/helpers/estados.helper';
import { Filtro } from '@/app/apresentacao/componentes/base/table/filter/filter.component';
import { ID } from '@/app/dominio/entidades/sistema/types.model';
import { IExportarHelper } from '@/app/dominio/contratos/helpers/exportar.interface';
import { IMovimentacoesContabeisUseCase } from '@/app/dominio/contratos/casos-uso/movimentacoes/contabeis.interface';
import { ISnackbarHelper } from '@/app/dominio/contratos/helpers/snackbar.interface';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MovimentacaoContabil } from '@/app/dominio/entidades/movimentacao/contabil.model';
import { Pesquisa } from '@/app/apresentacao/componentes/negocios/movimentacoes/panel-pessoa-pesquisa/panel-pessoa-pesquisa.component';
import dayjs from 'dayjs';

@Component({
    selector: 'sfr-movimentacoes-card-movimentacao-contabil',
    templateUrl: './card-movimentacao-contabil.component.html',
    styleUrls: ['./card-movimentacao-contabil.component.scss'],
    providers: [{ provide: IEstadosHelper, useClass: EstadosHelper }]
})
export class MovimentacoesCardMovimentacaoContabilComponent {
    _colunasExibidas: string[] = ['data', 'descricao', 'valor', 'planoContaCredito', 'planoContaDebito', 'lote', 'acao-4'];
    _filtrosExibidos: Filtro[] = [
        { tipo: 'select', tipoDetalhe: 'texto', titulo: 'Data Movimento', placeholder: 'Selecione', filtroGlobal: false, colunaFiltrada: 'dataFormatada', opcoes: [] },
        { tipo: 'input', tipoDetalhe: 'texto', titulo: 'Lançamento', placeholder: 'Busque um lançamento', filtroGlobal: false, colunaFiltrada: 'descricao', opcoes: [] },
        { tipo: 'input', tipoDetalhe: 'texto', titulo: 'Complemento', placeholder: 'Busque um complemento', filtroGlobal: false, colunaFiltrada: 'complemento', opcoes: [] },
        { tipo: 'input', tipoDetalhe: 'busca', titulo: '', placeholder: 'Pesquisar', filtroGlobal: true, colunaFiltrada: '', opcoes: [] },

        { tipo: 'input', tipoDetalhe: 'texto', titulo: 'Valor', placeholder: 'Busque um valor', filtroGlobal: false, colunaFiltrada: 'valor', opcoes: [] },
        { tipo: 'select', tipoDetalhe: '', titulo: 'Conta Crédito', placeholder: 'Selecione', filtroGlobal: false, colunaFiltrada: 'planoContaCreditoExibicao', opcoes: [] },
        { tipo: 'select', tipoDetalhe: '', titulo: 'Conta Débito', placeholder: 'Selecione', filtroGlobal: false, colunaFiltrada: 'planoContaDebitoExibicao', opcoes: [] },

        { tipo: 'select', tipoDetalhe: '', titulo: 'Lote', placeholder: 'Selecione', filtroGlobal: false, colunaFiltrada: 'loteAbertoExibicao', opcoes: [] }
    ];
    _listaMovimentacoes: MatTableDataSource<any>;

    LancamentoTipo = LancamentoTipo;

    _dados: Pesquisa;
    @Input()
    public get dados(): Pesquisa {
        return this._dados;
    }
    public set dados(value: Pesquisa) {
        this._dados = value;

        this.obterListaMovimentacoes('Obtendo lista de movimentações...');
    }

    @ViewChild(MatSort) sort: MatSort;

    constructor(
        public estado: IEstadosHelper,
        private _snackbarHelper: ISnackbarHelper,
        private _modaisHelper: IModaisHelper,
        private _movimentacoesContabeisUseCase: IMovimentacoesContabeisUseCase,
        private _exportarHelper: IExportarHelper,
        private _navegacaoHelper: INavegacaoHelper
    ) {}

    cadastrarMovimentacao() {
        let dados: MovimentacaoContabil = new MovimentacaoContabil();
        dados.pessoaId = this._dados.pessoaId;

        const modalRef = this._modaisHelper.exibirFomulario({
            tipo: 'movimentacao_nova-movimentacao-contabil',
            operacao: FormularioOperacao.cadastrar,
            dados: dados
        } as ModalFormularioConfiguracaoNovaMovimentacaoContabil);

        modalRef.componentInstance.cadastrarSucessoEvento.subscribe(() => {
            this.obterListaMovimentacoes('Atualizando lista de movimentações...');
        });

        //this._navegacaoHelper.ir(ROTAS.dashboardMovimentacoesNovaMovimentacao, { pesquisa: this._dados });
    }

    alterarMovimentacao(movimentacao: MovimentacaoContabil) {
        movimentacao.pessoaId = this._dados.pessoaId;

        const modalRef = this._modaisHelper.exibirFomulario({
            tipo: 'movimentacao_nova-movimentacao-contabil',
            operacao: FormularioOperacao.editar,
            dados: movimentacao
        } as ModalFormularioConfiguracaoNovaMovimentacaoContabil);

        modalRef.componentInstance.alterarSucessoEvento.subscribe(() => {
            this.obterListaMovimentacoes('Atualizando lista de movimentações...');
        });
    }

    removerMovimentacao(movimentacaoId: ID) {
        const modalRef = this._modaisHelper.exibirConfirmacao('movimentacao_remover-lancamento');

        modalRef.componentInstance.confirmarEvento.subscribe(() => {
            this.estado.definirEstado(Estados.carregando, 'Removendo movimentação...');
            this._movimentacoesContabeisUseCase.removerMovimentacao(this._dados.pessoaId, movimentacaoId).subscribe({
                next: () => {
                    this._snackbarHelper.exibirSucesso('Movimentação removida com sucesso!');
                    this.estado.definirEstado(Estados.comDados);
                    this.obterListaMovimentacoes('Atualizando lista de movimentações...');
                },
                error: (erro) => {
                    this._snackbarHelper.exibirErro(erro);
                    this.estado.definirEstado(Estados.comDados);
                }
            });
        });
    }

    obterListaMovimentacoes(mensagemCarregamento: string) {
        if (this._dados) {
            this.estado.definirEstado(Estados.carregando, mensagemCarregamento);
            this._movimentacoesContabeisUseCase.obterListaMovimentacoes(this._dados.pessoaId, this._dados.dataInicial, this._dados.dataFinal).subscribe({
                next: (resultado) => {
                    resultado = resultado.map((elemento) => {
                        elemento.pessoaId = this._dados.pessoaId;

                        return {
                            ...elemento,
                            dataFormatada: dayjs(elemento.data).format('DD/MM/YYYY'),
                            loteAbertoExibicao: elemento.loteAberto ? 'Aberto' : 'Fechado',
                            planoContaCreditoExibicao: elemento.planoContaCreditoNumero + ' - ' + elemento.planoContaCreditoDescricao,
                            planoContaDebitoExibicao: elemento.planoContaDebitoNumero + ' - ' + elemento.planoContaDebitoDescricao
                        };
                    });
                    this._listaMovimentacoes = new MatTableDataSource([...resultado]);
                    this._listaMovimentacoes.sort = this.sort;

                    this.estado.definirEstado(Estados.comDados);
                },
                error: (erro) => {
                    this._snackbarHelper.exibirErro(erro);
                    this.estado.definirEstado(Estados.erro);
                }
            });
        } else {
            const arrayVazio: any[] = [];
            this._listaMovimentacoes = new MatTableDataSource(arrayVazio);
            this._listaMovimentacoes.sort = this.sort;
            this.estado.definirEstado(Estados.comDados);
        }
    }

    visualizarHistorico(movimentacao: MovimentacaoFinanceira) {
        if (movimentacao?.historico) {
            const dados: ModalTipoHistoricoDetalhe[] = movimentacao.historico.map((historico) => {
                return { data: historico.dataAlteracao, descricao: historico.descricao, usuarioNome: historico.usuarioNome, usuarioId: historico.usuarioId };
            });

            this._modaisHelper.exibirHistorico(dados);
        }
    }

    adicionarDetalhamento(movimentacao: MovimentacaoContabil) {
        movimentacao.pessoaId = this._dados.pessoaId;

        const modalRef = this._modaisHelper.exibirFomulario({
            tipo: 'movimentacao_nova-movimentacao-contabil-detalhe',
            operacao: FormularioOperacao.cadastrar,
            dados: movimentacao
        } as ModalFormularioConfiguracaoNovaMovimentacaoContabil);

        modalRef.componentInstance.atualizarEvento.subscribe(() => {
            this.obterListaMovimentacoes('Atualizando lista de movimentações...');
        });
    }

    exportarXLS(dados: MatTableDataSource<any>): void {
        this._exportarHelper.exportarXLSX('Movimentações_Contabeis', dados.filteredData);
    }

    exportarCSV(dados: MatTableDataSource<any>): void {
        this._exportarHelper.exportarCSV('Movimentações_Contabeis', dados.filteredData);
    }
}
