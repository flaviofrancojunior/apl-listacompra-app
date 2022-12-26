import { Component, Input, ViewChild } from '@angular/core';
import { Estados, IEstadosHelper } from '@/app/dominio/contratos/helpers/estados.interface';
import { IModaisHelper, ModalTipoHistoricoDetalhe } from '@/app/dominio/contratos/helpers/modais.interface';
import { INavegacaoHelper, ROTAS } from '@/app/dominio/contratos/helpers/navegacao.interface';
import { LancamentoTipo, MovimentacaoFinanceira } from '@/app/dominio/entidades/movimentacao/movimentacao.model';

import { EstadosHelper } from '@/app/apresentacao/helpers/estados.helper';
import { Filtro } from '@/app/apresentacao/componentes/base/table/filter/filter.component';
import { IPessoasContabilizacaoUseCase } from '@/app/dominio/contratos/casos-uso/pessoas/contabilizacao.interface';
import { ISnackbarHelper } from '@/app/dominio/contratos/helpers/snackbar.interface';
import { Lote } from '@/app/dominio/entidades/pessoas/contabilizacao.model';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Pesquisa } from '@/app/apresentacao/componentes/negocios/movimentacoes/panel-pessoa-pesquisa/panel-pessoa-pesquisa.component';

@Component({
    selector: 'sfr-contabilizacao-card-lotes',
    templateUrl: './card-lotes.component.html',
    styleUrls: ['./card-lotes.component.scss'],
    providers: [{ provide: IEstadosHelper, useClass: EstadosHelper }]
})
export class ContabilizacaoCardLotesComponent {
    _colunasExibidas: string[] = ['numeroLote', 'data', 'tipo', 'totalLote', 'totalLancado', 'saldoFaltante', 'totalDebitos', 'totalCreditos', 'dataFechamento', 'status', 'acao-2'];

    _filtrosExibidos: Filtro[] = [
        { tipo: 'select', tipoDetalhe: '', titulo: 'Tipo', placeholder: 'Busque um tipo', filtroGlobal: false, colunaFiltrada: 'tipoDescricao', opcoes: [] },
        { tipo: 'input', tipoDetalhe: 'data', titulo: 'Fechamento', placeholder: 'Busque um fechamento', filtroGlobal: false, colunaFiltrada: 'dataFechamento', opcoes: [] },
        { tipo: 'select', tipoDetalhe: '', titulo: 'Status', placeholder: 'Busque um status', filtroGlobal: false, colunaFiltrada: 'loteAbertoExibicao', opcoes: [] },
        { tipo: 'input', tipoDetalhe: 'busca', titulo: '', placeholder: 'Pesquisar', filtroGlobal: true, colunaFiltrada: '', opcoes: [] }
    ];

    _listaLotes: MatTableDataSource<any>;

    LancamentoTipo = LancamentoTipo;

    _dados: Pesquisa;
    @Input()
    public get dados(): Pesquisa {
        return this._dados;
    }
    public set dados(value: Pesquisa) {
        this._dados = value;

        this.obterListaLotes('Obtendo lista de lotes...');
    }

    @ViewChild(MatSort) sort: MatSort;

    constructor(public estado: IEstadosHelper, private _snackbarHelper: ISnackbarHelper, private _modaisHelper: IModaisHelper, private _pessoasContabilizacaoUseCase: IPessoasContabilizacaoUseCase, private _navegacaoHelper: INavegacaoHelper) {}

    cadastrarMovimentacao() {
        this._navegacaoHelper.ir(ROTAS.dashboardMovimentacoesNovaMovimentacao);
    }

    alterarLote(lote: Lote) {
        const modalRef = this._modaisHelper.exibirConfirmacao(lote.aberto ? 'contabilizacao_fechar-lote' : 'contabilizacao_abrir-lote');
        modalRef.componentInstance.confirmarEvento.subscribe(() => {
            this.estado.definirEstado(Estados.carregando, lote.aberto ? 'Fechando lote...' : 'Abrindo lote...');
            this._pessoasContabilizacaoUseCase.alterarLote(lote).subscribe({
                next: () => {
                    this._snackbarHelper.exibirSucesso('Lote alterado com sucesso!');
                    this.estado.definirEstado(Estados.comDados);
                    this.obterListaLotes('Atualizando lista de lotes...');
                },
                error: (erro) => {
                    this._snackbarHelper.exibirErro(erro);
                    this.estado.definirEstado(Estados.comDados);
                }
            });
        });
    }

    removerMovimentacao(movimentacaoId: string) {
        // const modalRef = this._modaisHelper.exibirConfirmacao('cadastros_remover-banco');
        // modalRef.componentInstance.confirmarEvento.subscribe(() => {
        //     this.estado.definirEstado(Estados.carregando, 'Removendo movimentação...');
        //     this._pessoasMovimentacoesUseCase.removerMovimentacao(this._dados.pessoaId, movimentacaoId).subscribe({
        //         next: () => {
        //             this._snackbarHelper.exibirSucesso('Movimentação removida com sucesso!');
        //             this.estado.definirEstado(Estados.comDados);
        //             this.obterListaMovimentacoes('Atualizando lista de movimentações...');
        //         },
        //         error: (erro) => {
        //             this._snackbarHelper.exibirErro(erro);
        //             this.estado.definirEstado(Estados.comDados);
        //         }
        //     });
        // });
    }

    obterListaLotes(mensagemCarregamento: string) {
        if (this._dados) {
            this.estado.definirEstado(Estados.carregando, mensagemCarregamento);
            this._pessoasContabilizacaoUseCase.obterListaLotes(this._dados.pessoaId, this._dados.dataInicial, this._dados.dataFinal).subscribe({
                next: (resultado) => {
                    resultado = resultado.map((elemento) => {
                        return { ...elemento, loteAbertoExibicao: elemento.aberto ? 'Aberto' : 'Fechado' };
                    });
                    this._listaLotes = new MatTableDataSource([...resultado]);
                    this._listaLotes.sort = this.sort;

                    this.estado.definirEstado(Estados.comDados);
                },
                error: (erro) => {
                    this._snackbarHelper.exibirErro(erro);
                    this.estado.definirEstado(Estados.erro);
                }
            });
        } else {
            const arrayVazio: any[] = [];
            this._listaLotes = new MatTableDataSource(arrayVazio);
            this._listaLotes.sort = this.sort;
            this.estado.definirEstado(Estados.comDados);
        }
    }

    sincronizarMovimentacoes() {}

    contabilizar() {
        this._modaisHelper.exibirContabilizacao(this._dados.pessoaId);
    }

    visualizarHistorico(movimentacao: MovimentacaoFinanceira) {
        if (movimentacao?.historico) {
            const dados: ModalTipoHistoricoDetalhe[] = movimentacao.historico.map((historico) => {
                return { data: historico.dataAlteracao, descricao: historico.descricao, usuarioNome: historico.usuarioNome, usuarioId: historico.usuarioId };
            });

            this._modaisHelper.exibirHistorico(dados);
        }
    }
}
