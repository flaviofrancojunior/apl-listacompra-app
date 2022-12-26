import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { Estados, IEstadosHelper } from '@/app/dominio/contratos/helpers/estados.interface';
import { IModaisHelper, ModalFormularioConfiguracaoNovoParametro } from '@/app/dominio/contratos/helpers/modais.interface';

import { EstadosHelper } from '@/app/apresentacao/helpers/estados.helper';
import { IParametrosUseCase } from '@/app/dominio/contratos/casos-uso/sistema/parametros.interface';
import { ISnackbarHelper } from '@/app/dominio/contratos/helpers/snackbar.interface';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Parametro } from '@/app/dominio/entidades/sistema/parametro.model';
import { UntypedFormGroup } from '@angular/forms';

@Component({
    selector: 'sfr-sistema-card-parametros',
    templateUrl: './card-parametros.component.html',
    styleUrls: ['./card-parametros.component.scss'],
    providers: [{ provide: IEstadosHelper, useClass: EstadosHelper }]
})
export class SistemaCardParametrosComponent implements AfterViewInit {
    _colunasExibidas: string[] = ['id', 'chave', 'valor', 'dataAtualizacao', 'acao'];

    _listaParametros: MatTableDataSource<any>;

    _form: UntypedFormGroup;

    @ViewChild(MatSort) sort: MatSort;
    @ViewChild(MatPaginator) paginator: MatPaginator;

    constructor(public estado: IEstadosHelper, private _parametrosUseCase: IParametrosUseCase, private _snackbarHelper: ISnackbarHelper, private _modaisHelper: IModaisHelper) {
        this.obterListaParametros('Carregando parâmetros...');
    }

    ngAfterViewInit(): void {
        this.inicializaPaginacao();
    }

    cadastrarParametro() {
        const modalRef = this._modaisHelper.exibirFomulario({
            tipo: 'cadastros_novo-parametro',
            operacao: 'cadastrar'
        } as ModalFormularioConfiguracaoNovoParametro);

        modalRef.componentInstance.cadastrarSucessoEvento.subscribe(() => {
            this.obterListaParametros('Atualizando lista de parâmetros...');
        });
    }

    alterarParametro(parametro: Parametro) {
        const modalRef = this._modaisHelper.exibirFomulario({
            tipo: 'cadastros_novo-parametro',
            operacao: 'editar',
            dados: parametro
        } as ModalFormularioConfiguracaoNovoParametro);

        modalRef.componentInstance.alterarSucessoEvento.subscribe(() => {
            this.obterListaParametros('Atualizando lista de parâmetros...');
        });
    }

    removerParametro(parametroId: string) {
        const modalRef = this._modaisHelper.exibirConfirmacao('cadastros_remover-parametro');

        modalRef.componentInstance.confirmarEvento.subscribe(() => {
            this.estado.definirEstado(Estados.carregando, 'Removendo parâmetro...');
            this._parametrosUseCase.removerParametro(parametroId).subscribe({
                next: () => {
                    this._snackbarHelper.exibirSucesso('Parâmetro removido com sucesso!');
                    this.estado.definirEstado(Estados.comDados);
                    this.obterListaParametros('Atualizando lista de parâmetros...');
                },
                error: (erro) => {
                    this._snackbarHelper.exibirErro(erro);
                    this.estado.definirEstado(Estados.comDados);
                }
            });
        });
    }

    obterListaParametros(mensagemCarregamento: string) {
        this.estado.definirEstado(Estados.carregando, mensagemCarregamento);
        this._parametrosUseCase.obterListaParametros().subscribe({
            next: (resultado) => {
                this._listaParametros = new MatTableDataSource([...resultado]);
                this._listaParametros.sort = this.sort;
                this._listaParametros.paginator = this.paginator;

                this.estado.definirEstado(Estados.comDados);
            },
            error: (erro) => {
                this._snackbarHelper.exibirErro(erro);
                this.estado.definirEstado(Estados.erro);
            }
        });
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
