import { Component, ViewChild } from '@angular/core';
import { Estados, IEstadosHelper } from '@/app/dominio/contratos/helpers/estados.interface';
import { FormularioOperacao, IModaisHelper, ModalFormularioConfiguracaoNovaMoeda } from '@/app/dominio/contratos/helpers/modais.interface';

import { EstadosHelper } from '@/app/apresentacao/helpers/estados.helper';
import { Filtro } from '@/app/apresentacao/componentes/base/table/filter/filter.component';
import { ISistemaMoedaUseCase } from '@/app/dominio/contratos/casos-uso/sistema/moeda.interface';
import { ISnackbarHelper } from '@/app/dominio/contratos/helpers/snackbar.interface';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Moeda } from '@/app/dominio/entidades/cadastros/moeda.model';

@Component({
    selector: 'sfr-sistema-card-moedas',
    templateUrl: './card-moedas.component.html',
    styleUrls: ['./card-moedas.component.scss'],
    providers: [{ provide: IEstadosHelper, useClass: EstadosHelper }]
})
export class SistemaCardMoedasComponent {
    _colunasExibidas: string[] = ['codigo', 'nome', 'simbolo', 'codigoPaisOrigem', 'paisOrigem', 'importadoBC', 'acao-2'];
    _filtrosExibidos: Filtro[] = [
        { tipo: 'input', tipoDetalhe: 'texto', titulo: 'Nome', placeholder: 'Busque um nome', filtroGlobal: false, colunaFiltrada: 'nome', opcoes: [] },
        { tipo: 'input', tipoDetalhe: 'texto', titulo: 'Símbolo', placeholder: 'Busque um símbolo', filtroGlobal: false, colunaFiltrada: 'simbolo', opcoes: [] },
        { tipo: 'select', tipoDetalhe: '', titulo: 'Importada BC', placeholder: 'Selecione', filtroGlobal: false, colunaFiltrada: 'importadoBCExibicao', opcoes: [] },
        { tipo: 'input', tipoDetalhe: 'busca', titulo: '', placeholder: 'Pesquisar', filtroGlobal: true, colunaFiltrada: '', opcoes: [] }
    ];
    _listaMoedas: MatTableDataSource<any>;
    _listaSimbolos: string[];
    _listaCodigoMoedas: string[];
    _listaCodigoPaises: string[];

    @ViewChild(MatSort) sort: MatSort;

    constructor(public estado: IEstadosHelper, private _sistemaMoedaUseCase: ISistemaMoedaUseCase, private _snackbarHelper: ISnackbarHelper, private _modaisHelper: IModaisHelper) {
        this.obterListaMoedas('Obtendo lista de moedas...');
    }

    cadastrarMoeda() {
        const modalRef = this._modaisHelper.exibirFomulario({
            tipo: 'sistema_nova-moeda',
            operacao: FormularioOperacao.cadastrar,
            listasValidacao: [
                { chave: 'simbolo', valor: this._listaSimbolos },
                { chave: 'codigo', valor: this._listaCodigoMoedas },
                { chave: 'paisOrigemCodigo', valor: this._listaCodigoPaises }
            ]
        } as ModalFormularioConfiguracaoNovaMoeda);

        modalRef.componentInstance.cadastrarSucessoEvento.subscribe(() => {
            this.obterListaMoedas('Atualizando lista de moedas...');
        });
    }

    alterarMoeda(moeda: Moeda) {
        const modalRef = this._modaisHelper.exibirFomulario({
            tipo: 'sistema_nova-moeda',
            operacao: FormularioOperacao.editar,
            dados: moeda,
            listasValidacao: [
                { chave: 'simbolo', valor: this._listaSimbolos },
                { chave: 'codigo', valor: this._listaCodigoMoedas },
                { chave: 'paisOrigemCodigo', valor: this._listaCodigoPaises }
            ]
        } as ModalFormularioConfiguracaoNovaMoeda);

        modalRef.componentInstance.alterarSucessoEvento.subscribe(() => {
            this.obterListaMoedas('Atualizando lista de moedas...');
        });
    }

    removerMoeda(moedaId: string) {
        const modalRef = this._modaisHelper.exibirConfirmacao('cadastros_remover-moeda');

        modalRef.componentInstance.confirmarEvento.subscribe(() => {
            this.estado.definirEstado(Estados.carregando, 'Removendo moeda...');
            this._sistemaMoedaUseCase.removerMoeda(moedaId).subscribe({
                next: () => {
                    this._snackbarHelper.exibirSucesso('Moeda removida com sucesso!');
                    this.estado.definirEstado(Estados.comDados);
                    this.obterListaMoedas('Atualizando lista de moedas...');
                },
                error: (erro) => {
                    this._snackbarHelper.exibirErro(erro);
                    this.estado.definirEstado(Estados.comDados);
                }
            });
        });
    }

    obterListaMoedas(mensagemCarregamento: string) {
        this.estado.definirEstado(Estados.carregando, mensagemCarregamento);
        this._sistemaMoedaUseCase.obterListaMoedas().subscribe({
            next: (resultado) => {
                resultado = resultado.map((elemento) => {
                    return { ...elemento, importadoBCExibicao: elemento.importadoBC ? 'Sim' : 'Não' };
                });
                this._listaMoedas = new MatTableDataSource([...resultado]);
                this._listaSimbolos = resultado.filter((elemento) => elemento.simbolo !== '').map((elemento) => elemento.simbolo);
                this._listaCodigoMoedas = resultado.filter((elemento) => elemento.codigo !== '').map((elemento) => elemento.codigo);
                this._listaCodigoPaises = resultado.filter((elemento) => elemento.paisOrigemCodigo !== '').map((elemento) => elemento.paisOrigemCodigo);
                this._listaMoedas.sort = this.sort;

                this.estado.definirEstado(Estados.comDados);
            },
            error: (erro) => {
                this._snackbarHelper.exibirErro(erro);
                this.estado.definirEstado(Estados.erro);
            }
        });
    }
}
