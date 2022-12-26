import { Component, ViewChild } from '@angular/core';
import { Estados, IEstadosHelper } from '@/app/dominio/contratos/helpers/estados.interface';
import { FormularioOperacao, IModaisHelper } from '@/app/dominio/contratos/helpers/modais.interface';
import { INavegacaoHelper, ROTAS } from '@/app/dominio/contratos/helpers/navegacao.interface';
import { PlanoConta, ResponsabilidadePlanoConta, TipoPlanoConta } from '@/app/dominio/entidades/cadastros/plano-conta.model';

import { EstadosHelper } from '@/app/apresentacao/helpers/estados.helper';
import { Filtro } from '@/app/apresentacao/componentes/base/table/filter/filter.component';
import { ICadastrosPlanoContaUseCase } from '@/app/dominio/contratos/casos-uso/cadastros/plano-conta.interface';
import { ID } from '@/app/dominio/entidades/sistema/types.model';
import { ISnackbarHelper } from '@/app/dominio/contratos/helpers/snackbar.interface';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
    selector: 'sfr-cadastros-card-plano-contas',
    templateUrl: './card-plano-contas.component.html',
    styleUrls: ['./card-plano-contas.component.scss'],
    providers: [{ provide: IEstadosHelper, useClass: EstadosHelper }]
})
export class CadastrosCardPlanoContasComponent {
    _colunasExibidas: string[] = ['numero', 'grau', 'descricao', 'tipo', 'responsabilidade', 'acao-2'];
    _filtrosExibidos: Filtro[] = [
        { tipo: 'input', tipoDetalhe: 'texto', titulo: 'Nº da conta', placeholder: 'Busque um número', filtroGlobal: false, colunaFiltrada: 'numero', opcoes: [] },
        { tipo: 'input', tipoDetalhe: 'texto', titulo: 'Descrição', placeholder: 'Busque uma descrição', filtroGlobal: false, colunaFiltrada: 'descricao', opcoes: [] },
        { tipo: 'select', tipoDetalhe: '', titulo: 'Tipo de conta', placeholder: 'Selecione', filtroGlobal: false, colunaFiltrada: 'tipoDescricao', opcoes: [] },
        { tipo: 'input', tipoDetalhe: 'busca', titulo: '', placeholder: 'Pesquisar', filtroGlobal: true, colunaFiltrada: '', opcoes: [] },
        { tipo: 'select', tipoDetalhe: '', titulo: 'Credor/Devedor', placeholder: 'Selecione', filtroGlobal: false, colunaFiltrada: 'responsabilidadeDescricao', opcoes: [] }
    ];
    _listaPlanoContas: MatTableDataSource<any>;
    _listaPlanoContasArvore: PlanoConta[];

    @ViewChild(MatSort) sort: MatSort;

    constructor(public estado: IEstadosHelper, private _snackbarHelper: ISnackbarHelper, private _modaisHelper: IModaisHelper, private _navegacaoHelper: INavegacaoHelper, private _cadastrosPlanoContaUseCase: ICadastrosPlanoContaUseCase) {
        this.obterListaPlanoContas('Obtendo lista de contas...');
    }

    cadastrarPlanoConta() {
        this._navegacaoHelper.ir(ROTAS.dashboardCadastrosPlanoContasAdicionar);
    }

    alterarPlanoConta(planoConta: PlanoConta) {
        const modalRef = this._modaisHelper.exibirFomulario({
            tipo: 'cadastros_novo-plano-conta',
            operacao: FormularioOperacao.editar,
            dados: {
                idRaiz: this.obterNoRaiz(planoConta.id)?.id as ID,
                idPai: this.obterNoPai(planoConta.id)?.id as ID,
                planoConta: planoConta
            }
        });
        modalRef.componentInstance.alterarSucessoEvento.subscribe(() => {
            this.obterListaPlanoContas('Atualizando lista de contas...');
        });
    }

    obterNoPai(id: ID): PlanoConta | undefined {
        const noFilho = this._listaPlanoContasArvore.find((no) => no.id === id);

        if (noFilho) {
            const noPai = this._listaPlanoContasArvore.find((no) => no.id === noFilho.idPai);
            if (noPai) {
                return noPai;
            }
        }
        return undefined;
    }

    obterNoRaiz(id: ID): PlanoConta | undefined {
        let raiz = undefined;

        let indicePai = this._listaPlanoContasArvore.findIndex((no) => no.id === id);
        if (indicePai !== -1) {
            while (this._listaPlanoContasArvore[indicePai].grau !== 1) {
                indicePai--;
            }
            raiz = this._listaPlanoContasArvore[indicePai];
        }

        return raiz;
    }

    removerPlanoConta(id: string) {
        let idRaiz = this.obterNoRaiz(id)?.id as ID;
        let idPai = this.obterNoPai(id)?.id as ID;
        let idFilho = id;

        console.log('ID encontrados: ', idRaiz, idPai, idFilho);

        const modalRef = this._modaisHelper.exibirConfirmacao('cadastros_remover-plano-conta');
        modalRef.componentInstance.confirmarEvento.subscribe(() => {
            this.estado.definirEstado(Estados.carregando, 'Removendo conta...');
            this._cadastrosPlanoContaUseCase.removerPlanoConta(idRaiz, idPai, idFilho).subscribe({
                next: () => {
                    this._snackbarHelper.exibirSucesso('Conta removida com sucesso!');
                    this.estado.definirEstado(Estados.comDados);
                    this.obterListaPlanoContas('Atualizando lista de contas...');
                },
                error: (erro) => {
                    this._snackbarHelper.exibirErro(erro);
                    this.estado.definirEstado(Estados.comDados);
                }
            });
        });
    }

    obterListaPlanoContas(mensagemCarregamento: string) {
        this.estado.definirEstado(Estados.carregando, mensagemCarregamento);
        this._cadastrosPlanoContaUseCase.obterListaPlanoContasFlat().subscribe({
            next: (resultado) => {
                this._listaPlanoContas = new MatTableDataSource([...resultado]);
                this._listaPlanoContas.sort = this.sort;

                this._listaPlanoContasArvore = [...resultado];

                this.estado.definirEstado(Estados.comDados);
            },
            error: (erro) => {
                this._snackbarHelper.exibirErro(erro);
                this.estado.definirEstado(Estados.erro);
            }
        });
    }
}
