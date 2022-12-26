import { Component, ViewChild } from '@angular/core';
import { Estados, IEstadosHelper } from '@/app/dominio/contratos/helpers/estados.interface';
import { FormularioOperacao, IModaisHelper, ModalFormularioConfiguracaoNovoBanco } from '@/app/dominio/contratos/helpers/modais.interface';

import { Banco } from '@/app/dominio/entidades/cadastros/banco.model';
import { EstadosHelper } from '@/app/apresentacao/helpers/estados.helper';
import { Filtro } from '@/app/apresentacao/componentes/base/table/filter/filter.component';
import { ICadastrosBancoUseCase } from '@/app/dominio/contratos/casos-uso/cadastros/banco.interface';
import { ISnackbarHelper } from '@/app/dominio/contratos/helpers/snackbar.interface';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
    selector: 'sfr-cadastros-card-bancos',
    templateUrl: './card-bancos.component.html',
    styleUrls: ['./card-bancos.component.scss'],
    providers: [{ provide: IEstadosHelper, useClass: EstadosHelper }]
})
export class CadastrosCardBancosComponent {
    _colunasExibidas: string[] = ['nome', 'codigo', 'ativo', 'acao-2'];
    _filtrosExibidos: Filtro[] = [
        { tipo: 'input', tipoDetalhe: 'texto', titulo: 'Nome', placeholder: 'Busque um nome', filtroGlobal: false, colunaFiltrada: 'nome', opcoes: [] },
        { tipo: 'input', tipoDetalhe: 'texto', titulo: 'Código', placeholder: 'Busque um código', filtroGlobal: false, colunaFiltrada: 'codigo', opcoes: [] },
        { tipo: 'select', tipoDetalhe: '', titulo: 'Ativo', placeholder: 'Selecione', filtroGlobal: false, colunaFiltrada: 'ativoExibicao', opcoes: [] },
        { tipo: 'input', tipoDetalhe: 'busca', titulo: '', placeholder: 'Pesquisar', filtroGlobal: true, colunaFiltrada: '', opcoes: [] }
    ];
    _listaBancos: MatTableDataSource<any>;

    @ViewChild(MatSort) sort: MatSort;

    constructor(public estado: IEstadosHelper, private _snackbarHelper: ISnackbarHelper, private _modaisHelper: IModaisHelper, private _cadastrosBancoUseCase: ICadastrosBancoUseCase) {
        this.obterListaBancos('Obtendo lista de bancos...');
    }

    cadastrarBanco() {
        const modalRef = this._modaisHelper.exibirFomulario({
            tipo: 'cadastros_novo-banco',
            operacao: FormularioOperacao.cadastrar
        } as ModalFormularioConfiguracaoNovoBanco);

        modalRef.componentInstance.cadastrarSucessoEvento.subscribe(() => {
            this.obterListaBancos('Atualizando lista de bancos...');
        });
    }

    alterarBanco(banco: Banco) {
        const modalRef = this._modaisHelper.exibirFomulario({
            tipo: 'cadastros_novo-banco',
            operacao: FormularioOperacao.editar,
            dados: banco
        } as ModalFormularioConfiguracaoNovoBanco);

        modalRef.componentInstance.alterarSucessoEvento.subscribe(() => {
            this.obterListaBancos('Atualizando lista de bancos...');
        });
    }

    removerBanco(bancoId: string) {
        const modalRef = this._modaisHelper.exibirConfirmacao('cadastros_remover-banco');

        modalRef.componentInstance.confirmarEvento.subscribe(() => {
            this.estado.definirEstado(Estados.carregando, 'Removendo banco...');
            this._cadastrosBancoUseCase.removerBanco(bancoId).subscribe({
                next: () => {
                    this._snackbarHelper.exibirSucesso('Banco removido com sucesso!');
                    this.estado.definirEstado(Estados.comDados);
                    this.obterListaBancos('Atualizando lista de bancos...');
                },
                error: (erro) => {
                    this._snackbarHelper.exibirErro(erro);
                    this.estado.definirEstado(Estados.comDados);
                }
            });
        });
    }

    obterListaBancos(mensagemCarregamento: string) {
        this.estado.definirEstado(Estados.carregando, mensagemCarregamento);
        this._cadastrosBancoUseCase.obterListaBancos().subscribe({
            next: (resultado) => {
                resultado = resultado.map((elemento) => {
                    return { ...elemento, ativoExibicao: elemento.ativo ? 'Sim' : 'Não' };
                });
                this._listaBancos = new MatTableDataSource([...resultado]);
                this._listaBancos.sort = this.sort;

                this.estado.definirEstado(Estados.comDados);
            },
            error: (erro) => {
                this._snackbarHelper.exibirErro(erro);
                this.estado.definirEstado(Estados.erro);
            }
        });
    }
}
