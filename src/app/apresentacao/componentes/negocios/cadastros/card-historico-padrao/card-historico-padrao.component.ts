import { Component, ViewChild } from '@angular/core';
import { Estados, IEstadosHelper } from '@/app/dominio/contratos/helpers/estados.interface';

import { EstadosHelper } from '@/app/apresentacao/helpers/estados.helper';
import { Filtro } from '@/app/apresentacao/componentes/base/table/filter/filter.component';
import { HistoricoPadrao } from '@/app/dominio/entidades/cadastros/historico-padrao.model';
import { ICadastrosHistoricoPadraoUseCase } from '@/app/dominio/contratos/casos-uso/cadastros/historico-padrao.interface';
import { IModaisHelper } from '@/app/dominio/contratos/helpers/modais.interface';
import { ISnackbarHelper } from '@/app/dominio/contratos/helpers/snackbar.interface';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
    selector: 'sfr-cadastros-card-historico-padrao',
    templateUrl: './card-historico-padrao.component.html',
    styleUrls: ['./card-historico-padrao.component.scss'],
    providers: [{ provide: IEstadosHelper, useClass: EstadosHelper }]
})
export class CadastrosCardHistoricoPadraoComponent {
    _colunasExibidas: string[] = ['historicoConta', 'codigo', 'debitoCliente', 'creditoCliente', 'ativo', 'acao-1'];
    _filtrosExibidos: Filtro[] = [
        { tipo: 'input', tipoDetalhe: 'texto', titulo: 'Histórico conta', placeholder: 'Busque um nome', filtroGlobal: false, colunaFiltrada: 'historicoConta', opcoes: [] },
        { tipo: 'input', tipoDetalhe: 'texto', titulo: 'Código', placeholder: 'Busque um código', filtroGlobal: false, colunaFiltrada: 'codigo', opcoes: [] },
        { tipo: 'select', tipoDetalhe: '', titulo: 'Ativo', placeholder: 'Selecione', filtroGlobal: false, colunaFiltrada: 'ativoExibicao', opcoes: [] },
        { tipo: 'input', tipoDetalhe: 'busca', titulo: '', placeholder: 'Pesquisar', filtroGlobal: true, colunaFiltrada: '', opcoes: [] }
    ];
    _listaHistoricos: MatTableDataSource<any>;

    _listaCodigosExistentes: string[] = [];

    @ViewChild(MatSort) sort: MatSort;

    constructor(public estado: IEstadosHelper, private _snackbarHelper: ISnackbarHelper, private _modaisHelper: IModaisHelper, private _cadastrosHistoricoPadraoUseCase: ICadastrosHistoricoPadraoUseCase) {
        this.obterListaHistoricoPadrao('Obtendo lista de históricos padrões...');
    }

    cadastrarHistoricoPadrao() {
        // const modalRef = this._modaisHelper.exibirFomulario('cadastros_novo-historico-padrao', this._listaCodigosExistentes);
        // modalRef.componentInstance.cadastrarSucessoEvento.subscribe(() => {
        //     this.obterListaHistoricoPadrao('Atualizando lista de históricos padrões...');
        // });
    }

    alterarHistoricoPadrao(historico: HistoricoPadrao) {
        // const modalRef = this._modaisHelper.exibirFomulario('cadastros_novo-historico-padrao', historico);
        // modalRef.componentInstance.alterarSucessoEvento.subscribe(() => {
        //     this.obterListaHistoricoPadrao('Atualizando lista de históricos padrões...');
        // });
    }

    obterListaHistoricoPadrao(mensagemCarregamento: string) {
        this.estado.definirEstado(Estados.carregando, mensagemCarregamento);
        this._cadastrosHistoricoPadraoUseCase.obterListaHistoricoPadroes().subscribe({
            next: (resultado) => {
                resultado = resultado.map((elemento) => {
                    return { ...elemento, ativoExibicao: elemento.ativo ? 'Sim' : 'Não' };
                });

                this._listaCodigosExistentes = resultado.map((elemento) => elemento.codigo);

                this._listaHistoricos = new MatTableDataSource([...resultado]);
                this._listaHistoricos.sort = this.sort;

                this.estado.definirEstado(Estados.comDados);
            },
            error: (erro) => {
                this._snackbarHelper.exibirErro(erro);
                this.estado.definirEstado(Estados.erro);
            }
        });
    }
}
