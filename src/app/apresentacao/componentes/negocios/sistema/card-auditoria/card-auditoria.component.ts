import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { Estados, IEstadosHelper } from '@/app/dominio/contratos/helpers/estados.interface';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';

import { EstadosHelper } from '@/app/apresentacao/helpers/estados.helper';
import { Filtro } from '@/app/apresentacao/componentes/base/table/filter/filter.component';
import { IAuditoriaUseCase } from '@/app/dominio/contratos/casos-uso/sistema/auditoria.interface';
import { ISnackbarHelper } from '@/app/dominio/contratos/helpers/snackbar.interface';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import dayjs from 'dayjs';

@Component({
    selector: 'sfr-sistema-card-auditoria',
    templateUrl: './card-auditoria.component.html',
    styleUrls: ['./card-auditoria.component.scss'],
    providers: [{ provide: IEstadosHelper, useClass: EstadosHelper }]
})
export class SistemaCardAuditoriaComponent implements AfterViewInit {
    _colunasExibidas: string[] = ['data', 'modulo', 'operacao', 'usuario', 'descricao'];
    _filtrosExibidos: Filtro[] = [
        { tipo: 'select', tipoDetalhe: '', titulo: 'Módulo', placeholder: 'Selecione', filtroGlobal: false, colunaFiltrada: 'modulo', opcoes: [] },
        { tipo: 'select', tipoDetalhe: '', titulo: 'Operação', placeholder: 'Selecione', filtroGlobal: false, colunaFiltrada: 'operacao', opcoes: [] },
        { tipo: 'input', tipoDetalhe: 'texto', titulo: 'Nome do usuário', placeholder: 'Busque um nome de usuário', filtroGlobal: false, colunaFiltrada: 'usuarioNome', opcoes: [] },
        { tipo: 'input', tipoDetalhe: 'busca', titulo: '', placeholder: 'Pesquisar', filtroGlobal: true, colunaFiltrada: '', opcoes: [] },
        { tipo: 'input', tipoDetalhe: 'texto', titulo: 'CPF do Usuário', placeholder: 'Busque um CPF de usuário', filtroGlobal: false, colunaFiltrada: 'usuarioCPF', opcoes: [] }
    ];
    _listaOperacoes: MatTableDataSource<any>;

    _form: UntypedFormGroup;

    @ViewChild(MatSort) sort: MatSort;
    @ViewChild(MatPaginator) paginator: MatPaginator;

    constructor(public estado: IEstadosHelper, private _formBuilder: UntypedFormBuilder, private _auditoriaUseCase: IAuditoriaUseCase, private _snackbarHelper: ISnackbarHelper) {
        this._form = this._formBuilder.group(
            {
                dataInicial: [dayjs().format('YYYY-MM-DD'), Validators.required],
                dataFinal: [dayjs().format('YYYY-MM-DD'), Validators.required]
            },
            { validators: [this.checarDatas] }
        );
        this.pesquisar();
    }

    ngAfterViewInit(): void {
        this.inicializaPaginacao();
    }

    obterListaOperacoes(dataInicial: string, dataFinal: string, mensagemCarregamento: string) {
        this.estado.definirEstado(Estados.carregando, mensagemCarregamento);
        this._auditoriaUseCase.obterOperacoesPorPeriodo(dataInicial, dataFinal).subscribe({
            next: (resultado) => {
                this._listaOperacoes = new MatTableDataSource([...resultado]);
                this._listaOperacoes.sort = this.sort;
                this._listaOperacoes.paginator = this.paginator;

                this.estado.definirEstado(Estados.comDados);
            },
            error: (erro) => {
                this._snackbarHelper.exibirErro(erro);
                this.estado.definirEstado(Estados.erro);
            }
        });
    }

    pesquisar() {
        this.obterListaOperacoes(this._form.get('dataInicial')?.value, this._form.get('dataFinal')?.value, 'Obtendo lista de operações...');
    }

    checarDatas(group: UntypedFormGroup) {
        let dataInicial = dayjs(group.get('dataInicial')?.value);
        let dataFinal = dayjs(group.get('dataFinal')?.value);

        if (dataInicial.isValid() && dataFinal.isValid()) {
            if (dataFinal.diff(dataInicial) < 0) {
                return { DataInicialMaiorQueDataFinal: true };
            }
            return null;
        } else {
            return { FormatoInvalido: true };
        }
    }

    inicializaPaginacao() {
        this.paginator._intl.firstPageLabel = 'Primeira página';
        this.paginator._intl.itemsPerPageLabel = 'Itens por página:';
        this.paginator._intl.lastPageLabel = 'Última página';
        this.paginator._intl.nextPageLabel = 'Avançar';
        this.paginator._intl.previousPageLabel = 'Voltar';

        this.paginator._intl.getRangeLabel = (page: number, pageSize: number, length: number) => {
            const start = page * pageSize + 1;
            const end = (page + 1) * pageSize;
            return `${start} - ${end} de ${length}`;
        };
    }
}
