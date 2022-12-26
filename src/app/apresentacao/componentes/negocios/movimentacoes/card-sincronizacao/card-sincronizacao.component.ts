import { ListaOpcoesSelect } from '@/app/apresentacao/componentes/base/select/select.component';
import { Filtro } from '@/app/apresentacao/componentes/base/table/filter/filter.component';
import { EstadosHelper } from '@/app/apresentacao/helpers/estados.helper';
import { ICadastrosPlanoContaUseCase } from '@/app/dominio/contratos/casos-uso/cadastros/plano-conta.interface';
import { IMovimentacoesExtratoUseCase } from '@/app/dominio/contratos/casos-uso/movimentacoes/extrato.interface';
import { IMovimentacoesFinanceirasUseCase } from '@/app/dominio/contratos/casos-uso/movimentacoes/financeiras.interface';
import { IPessoasUseCase } from '@/app/dominio/contratos/casos-uso/pessoas/pessoas.interface';
import { Estados, IEstadosHelper } from '@/app/dominio/contratos/helpers/estados.interface';
import { IModaisHelper, ModalTipoHistoricoDetalhe } from '@/app/dominio/contratos/helpers/modais.interface';
import { INavegacaoHelper, ROTAS } from '@/app/dominio/contratos/helpers/navegacao.interface';
import { ISnackbarHelper } from '@/app/dominio/contratos/helpers/snackbar.interface';
import { Lancamento } from '@/app/dominio/entidades/movimentacao/extrato.model';
import { LancamentoTipo, MovimentacaoFinanceira } from '@/app/dominio/entidades/movimentacao/movimentacao.model';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, Input, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import dayjs from 'dayjs';
import { forkJoin } from 'rxjs';

import { Pesquisa } from '../panel-pessoa-pesquisa/panel-pessoa-pesquisa.component';

@Component({
    selector: 'sfr-movimentacoes-card-sincronizacao',
    templateUrl: './card-sincronizacao.component.html',
    styleUrls: ['./card-sincronizacao.component.scss'],
    providers: [{ provide: IEstadosHelper, useClass: EstadosHelper }],
    animations: [trigger('detailExpand', [state('collapsed', style({ height: '0px', minHeight: '0' })), state('expanded', style({ height: '*' })), transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)'))])]
})
export class MovimentacoesCardSincronizacaoComponent {
    _form: FormGroup;
    _listaPlanoContas: ListaOpcoesSelect[];
    _listaMovimentacaoTipo: ListaOpcoesSelect[] = [];

    _colunasExibidas: string[] = ['lancamento', 'valor', 'expand'];

    elementoExpandido: Lancamento;
    _filtrosExibidos: Filtro[] = [
        { tipo: 'input', tipoDetalhe: 'texto', titulo: 'Lançamento', placeholder: 'Selecione', filtroGlobal: false, colunaFiltrada: 'descricao', opcoes: [] },
        { tipo: 'input', tipoDetalhe: 'texto', titulo: 'Valor', placeholder: 'Selecione', filtroGlobal: false, colunaFiltrada: 'valor', opcoes: [] },
        { tipo: 'input', tipoDetalhe: 'busca', titulo: '', placeholder: 'Pesquisar', filtroGlobal: true, colunaFiltrada: '', opcoes: [] }
    ];

    _extrato: MatTableDataSource<any>;
    _extratoDados: Lancamento[];

    LancamentoTipo = LancamentoTipo;

    _dados: Pesquisa;
    @Input()
    public get dados(): Pesquisa {
        return this._dados;
    }
    public set dados(value: Pesquisa) {
        this._dados = value;

        if (this._dados) {
            this.obterListas();
        }
    }

    @ViewChild(MatSort) sort: MatSort;

    constructor(
        public estado: IEstadosHelper,
        private _snackbarHelper: ISnackbarHelper,
        private _formBuilder: FormBuilder,
        private _modaisHelper: IModaisHelper,
        private _movimentacoesExtratoUseCase: IMovimentacoesExtratoUseCase,
        private _navegacaoHelper: INavegacaoHelper,
        private _pessoasUseCase: IPessoasUseCase,
        private _cadastrosPlanoContaUseCase: ICadastrosPlanoContaUseCase,
        private _movimentacoesFinanceirasUseCase: IMovimentacoesFinanceirasUseCase
    ) {
        this.inicializarControle();
    }

    inicializarControle() {
        this._form = this._formBuilder.group({ extrato: this._formBuilder.array([], Validators.required) });
    }

    criarLinhaFormGroup(lancamento: Lancamento): FormGroup {
        return this._formBuilder.group({
            extratoId: [lancamento.id],
            pessoaId: [this._dados?.pessoaId, Validators.required],
            bancoId: [this._dados?.bancoId, Validators.required],
            contaId: [this._dados?.contaId, Validators.required],

            data: [dayjs(lancamento.data).format('YYYY-MM-DD'), Validators.required],
            valor: [lancamento.valor, Validators.required],
            descricao: [lancamento.descricao, Validators.required],

            planoContaCreditoId: [lancamento.valor < 0 ? this._dados.contaPlanoContaIdPadrao : '', Validators.required],
            planoContaDebitoId: [lancamento.valor >= 0 ? this._dados.contaPlanoContaIdPadrao : '', Validators.required],
            complemento: ['', Validators.required],

            lancamentoId: [1, Validators.required],
            lancamentoDescricao: ['Automático', Validators.required],

            contabilizar: [true, Validators.required]
        });
    }

    obterControleLinhas() {
        return <FormArray>this._form.get('extrato');
    }

    obterControlePorIndice(indice: number) {
        return this.obterControleLinhas().at(indice) as FormGroup;
    }

    cadastrarMovimentacao() {
        this._navegacaoHelper.ir(ROTAS.dashboardMovimentacoesNovaMovimentacao, { pessoaId: this._dados.pessoaId });
    }

    obterListaMovimentacoes(mensagemCarregamento: string) {
        const arrayVazio: any[] = [];
        if (this._dados) {
            this.estado.definirEstado(Estados.carregando, mensagemCarregamento);

            this._movimentacoesExtratoUseCase.obterExtratoMensal(this._dados.pessoaId, this._dados.bancoId, this._dados.contaId, this._dados.data).subscribe({
                next: (resultado) => {
                    resultado.sort((a, b) => {
                        if (a.data > b.data) return -1;
                        if (a.data < b.data) return 1;
                        return 0;
                    });

                    resultado = resultado.map((elemento) => {
                        return {
                            ...elemento,
                            expandido: false
                        };
                    });

                    this._extrato = new MatTableDataSource([...resultado]);
                    this._extrato.sort = this.sort;

                    const controle = this.obterControleLinhas();

                    resultado.forEach((linha) => {
                        controle.push(this.criarLinhaFormGroup(linha));
                    });

                    this._extratoDados = [...resultado];

                    this.estado.definirEstado(Estados.comDados);
                },
                error: (erro) => {
                    this._snackbarHelper.exibirErro(erro);

                    this._extrato = new MatTableDataSource(arrayVazio);
                    this._extrato.sort = this.sort;
                    this.estado.definirEstado(Estados.comDados);
                }
            });
        } else {
            this._extrato = new MatTableDataSource(arrayVazio);
            this._extrato.sort = this.sort;
            this.estado.definirEstado(Estados.comDados);
        }
    }

    obterListas() {
        this.estado.definirEstado(Estados.carregando, 'Obtendo dados...');
        const arrayVazio: any[] = [];

        const obterListaPlanoContas = this._cadastrosPlanoContaUseCase.obterListaPlanoContasSelect();
        const obterListaMovimentacoes = this._movimentacoesExtratoUseCase.obterExtratoMensal(this._dados.pessoaId, this._dados.bancoId, this._dados.contaId, this._dados.data);

        forkJoin([obterListaPlanoContas, obterListaMovimentacoes]).subscribe({
            next: (resultados) => {
                this._listaPlanoContas = resultados[0];

                resultados[1].sort((a, b) => {
                    if (a.data > b.data) return -1;
                    if (a.data < b.data) return 1;
                    return 0;
                });

                resultados[1] = resultados[1].map((elemento) => {
                    return {
                        ...elemento,
                        expandido: false
                    };
                });

                this._extrato = new MatTableDataSource([...resultados[1]]);
                this._extrato.sort = this.sort;

                const controle = this.obterControleLinhas();
                controle.clear();

                resultados[1].forEach((linha) => {
                    controle.push(this.criarLinhaFormGroup(linha));
                });

                this._extratoDados = [...resultados[1]];

                this.estado.definirEstado(Estados.comDados);
            },
            error: (erro) => {
                this._snackbarHelper.exibirErro(erro);

                this._extrato = new MatTableDataSource(arrayVazio);
                this._extrato.sort = this.sort;
                this.estado.definirEstado(Estados.comDados);
            }
        });
    }

    sincronizarMovimentacoes() {}

    visualizarHistorico(movimentacao: MovimentacaoFinanceira) {
        if (movimentacao?.historico) {
            const dados: ModalTipoHistoricoDetalhe[] = movimentacao.historico.map((historico) => {
                return { data: historico.dataAlteracao, descricao: historico.descricao, usuarioNome: historico.usuarioNome, usuarioId: historico.usuarioId };
            });

            this._modaisHelper.exibirHistorico(dados);
        }
    }

    salvar(indice: number) {
        this.estado.definirEstado(Estados.carregando, 'Cadastrando lançamento...');
        const dados: MovimentacaoFinanceira = this.obterControlePorIndice(indice).getRawValue();

        this._movimentacoesFinanceirasUseCase.cadastrarMovimentacao(dados).subscribe({
            next: () => {
                //this.expandirLinha(linha);
                this.obterListas();
                this._snackbarHelper.exibirSucesso('Lançamento salvo com sucesso');

                this.estado.definirEstado(Estados.comDados);
            },
            error: (erro) => {
                this._snackbarHelper.exibirErro(erro);
                this.estado.definirEstado(Estados.comDados);
            }
        });
    }

    expandirLinha(linha: Lancamento) {
        if (this.elementoExpandido && this.elementoExpandido != linha) {
            this.elementoExpandido.expandido = false;
        }
        this.elementoExpandido = linha;

        linha.expandido = !linha.expandido;
    }
}
