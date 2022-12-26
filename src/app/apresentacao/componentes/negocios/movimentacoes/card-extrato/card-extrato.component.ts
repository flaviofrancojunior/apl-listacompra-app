import { Component, Input, ViewChild } from '@angular/core';
import { Estados, IEstadosHelper } from '@/app/dominio/contratos/helpers/estados.interface';

import { EstadosHelper } from '@/app/apresentacao/helpers/estados.helper';
import { Filtro } from '@/app/apresentacao/componentes/base/table/filter/filter.component';
import { IModaisHelper } from '@/app/dominio/contratos/helpers/modais.interface';
import { IMovimentacoesExtratoUseCase } from '@/app/dominio/contratos/casos-uso/movimentacoes/extrato.interface';
import { INavegacaoHelper } from '@/app/dominio/contratos/helpers/navegacao.interface';
import { IPessoasUseCase } from '@/app/dominio/contratos/casos-uso/pessoas/pessoas.interface';
import { ISnackbarHelper } from '@/app/dominio/contratos/helpers/snackbar.interface';
import { LancamentoTipo } from '@/app/dominio/entidades/movimentacao/movimentacao.model';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Pesquisa } from '@/app/apresentacao/componentes/negocios/movimentacoes/panel-pessoa-pesquisa/panel-pessoa-pesquisa.component';

@Component({
    selector: 'sfr-movimentacoes-card-extrato',
    templateUrl: './card-extrato.component.html',
    styleUrls: ['./card-extrato.component.scss'],
    providers: [{ provide: IEstadosHelper, useClass: EstadosHelper }]
})
export class MovimentacoesCardExtratoComponent {
    _colunasExibidas: string[] = ['data', 'descricao', 'valor', 'saldo', 'consolidado'];
    _filtrosExibidos: Filtro[] = [
        { tipo: 'input', tipoDetalhe: 'texto', titulo: 'Lançamento', placeholder: 'Busque um lançamento', filtroGlobal: false, colunaFiltrada: 'descricao', opcoes: [] },
        { tipo: 'input', tipoDetalhe: 'texto', titulo: 'Valor', placeholder: 'Busque um valor', filtroGlobal: false, colunaFiltrada: 'valor', opcoes: [] },
        { tipo: 'select', tipoDetalhe: '', titulo: 'Consolidado', placeholder: 'Selecione', filtroGlobal: false, colunaFiltrada: 'consolidadoExibicao', opcoes: [] },
        { tipo: 'input', tipoDetalhe: 'busca', titulo: '', placeholder: 'Pesquisar', filtroGlobal: true, colunaFiltrada: '', opcoes: [] }
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

        this.obterExtrato('Obtendo extrato...');
    }

    @ViewChild(MatSort) sort: MatSort;

    constructor(public estado: IEstadosHelper, private _snackbarHelper: ISnackbarHelper, private _movimentacoesExtratoUseCase: IMovimentacoesExtratoUseCase) {}

    obterExtrato(mensagemCarregamento: string) {
        if (this._dados) {
            this.estado.definirEstado(Estados.carregando, mensagemCarregamento);
            this._movimentacoesExtratoUseCase.obterExtrato(this._dados.pessoaId, this._dados.bancoId, this._dados.contaId, this._dados.dataInicial, this._dados.dataFinal).subscribe({
                next: (resultado) => {
                    resultado = resultado.map((elemento) => {
                        return {
                            ...elemento,
                            consolidadoExibicao: elemento.consolidado ? 'Sim' : 'Não'
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
}
