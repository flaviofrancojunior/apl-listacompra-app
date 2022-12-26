import { ListaOpcoesSelect } from '@/app/apresentacao/componentes/base/select/select.component';
import { EstadosHelper } from '@/app/apresentacao/helpers/estados.helper';
import { ICadastrosPlanoContaUseCase } from '@/app/dominio/contratos/casos-uso/cadastros/plano-conta.interface';
import { IMovimentacoesContabeisUseCase } from '@/app/dominio/contratos/casos-uso/movimentacoes/contabeis.interface';
import { Estados, IEstadosHelper } from '@/app/dominio/contratos/helpers/estados.interface';
import { ModalFormularioConfiguracaoNovaMovimentacaoContabil } from '@/app/dominio/contratos/helpers/modais.interface';
import { ISnackbarHelper } from '@/app/dominio/contratos/helpers/snackbar.interface';
import { MovimentacaoContabil } from '@/app/dominio/entidades/movimentacao/contabil.model';
import { Operacao } from '@/app/dominio/entidades/sistema/auditoria.model';
import { Component, EventEmitter, Inject, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { forkJoin, pairwise } from 'rxjs';

@Component({
    selector: 'sfr-modais-formulario-nova-movimentacao-contabil-detalhe',
    templateUrl: './nova-movimentacao-contabil-detalhe.component.html',
    styleUrls: ['./nova-movimentacao-contabil-detalhe.component.scss'],
    providers: [{ provide: IEstadosHelper, useClass: EstadosHelper }]
})
export class ModaisFormulariosNovaMovimentacaoContabilDetalheComponent {
    _form: FormGroup;

    _colunasExibidas: string[] = ['planoContaCredito', 'planoContaDebito', 'descricao', 'valor', 'acao-1'];

    _textos: { [chave in string]: { titulo: string; botaoPrimario: string; acao: Function } } = {
        cadastrar: {
            titulo: 'Detalhes da movimentação contábil',
            botaoPrimario: 'Adicionar',
            acao: () => {
                this.cadastrarMovimentacao();
            }
        },
        editar: {
            titulo: 'Detalhes da movimentação contábil',
            botaoPrimario: 'Alterar',
            acao: () => {
                this.alterarMovimentacao();
            }
        }
    };

    _listaMovimentacoesBase: MovimentacaoContabil[] = [];
    _listaMovimentacoes: MatTableDataSource<any>;

    _listaPlanoContas: ListaOpcoesSelect[];

    _movimentoContabilPai: MovimentacaoContabil;

    @Output() atualizarEvento = new EventEmitter();

    @ViewChild(MatSort) sort: MatSort;

    constructor(
        @Inject(MAT_DIALOG_DATA) public _configuracao: ModalFormularioConfiguracaoNovaMovimentacaoContabil,
        public dialog: MatDialog,
        public estado: IEstadosHelper,
        private _formBuilder: FormBuilder,
        private _movimentacoesContabeisUseCase: IMovimentacoesContabeisUseCase,
        private _cadastrosPlanoContaUseCase: ICadastrosPlanoContaUseCase,
        private _snackbarHelper: ISnackbarHelper
    ) {
        this.obterListas();

        if (this._configuracao.dados) {
            this._movimentoContabilPai = this._configuracao.dados;
            this.obterMovimentacaoDetalhe(this._configuracao.dados);
            this.inicializarControle(this._configuracao.dados);
        }
    }

    inicializarControle(movimentacaoPai: MovimentacaoContabil) {
        this._form = this._formBuilder.group({
            id: [''],
            pessoaId: [movimentacaoPai?.pessoaId, Validators.required],

            data: [movimentacaoPai?.data, Validators.required],
            valor: [0, Validators.required],

            planoContaCreditoId: [{ value: '', disabled: true }],
            planoContaDebitoId: [{ value: '', disabled: true }],

            descricao: ['', Validators.required],
            complemento: ['', Validators.required],

            movimentoFinanceiroPaiId: [null],
            movimentoContabilPaiId: [movimentacaoPai?.id],

            loteAberto: [movimentacaoPai?.loteAberto ?? true, Validators.required]
        });

        this._form
            .get('valor')
            ?.valueChanges.pipe(pairwise())
            .subscribe(([antigoValor, novoValor]: [any, any]) => {
                var movimentacao: MovimentacaoContabil;
                if (this._configuracao.operacao === 'cadastrar') {
                    movimentacao = movimentacaoPai;
                } else {
                    movimentacao = this._form.getRawValue();
                    movimentacao.valor = antigoValor;
                }

                var [planoContaCreditoId, planoContaDebitoId] = this._movimentacoesContabeisUseCase.calcularPlanosContabeisDetalhe(movimentacao, novoValor, this._configuracao.operacao as 'cadastrar' | 'editar');

                this._form.get('planoContaCreditoId')?.setValue(planoContaCreditoId);
                this._form.get('planoContaDebitoId')?.setValue(planoContaDebitoId);

                if (novoValor < 0) {
                    this._form.get('planoContaCreditoId')?.disable();
                    this._form.get('planoContaDebitoId')?.enable();
                } else if (novoValor > 0) {
                    this._form.get('planoContaDebitoId')?.disable();
                    this._form.get('planoContaCreditoId')?.enable();
                } else {
                    this._form.get('planoContaCreditoId')?.disable();
                    this._form.get('planoContaDebitoId')?.disable();
                }
            });
    }

    cancelar() {
        this.dialog.closeAll();
        this.atualizarEvento.emit();
    }

    editarMovimentacao(movimentacao: MovimentacaoContabil) {
        this.resetarFormulario();

        this._form.get('id')?.setValue(movimentacao.id);
        this._form.get('valor')?.setValue(movimentacao.valor);
        this._form.get('planoContaCreditoId')?.setValue(movimentacao.planoContaCreditoId);
        this._form.get('planoContaDebitoId')?.setValue(movimentacao.planoContaDebitoId);
        this._form.get('descricao')?.setValue(movimentacao.descricao);
        this._form.get('complemento')?.setValue(movimentacao.complemento);

        this._configuracao.operacao = 'editar';
    }

    alterarMovimentacao() {
        this.estado.definirEstado(Estados.carregando, 'Alterando movimentação...');
        const dados: MovimentacaoContabil = this._form.getRawValue();

        this._movimentacoesContabeisUseCase.alterarMovimentacao(dados).subscribe({
            next: () => {
                this.resetarFormulario();
                this._snackbarHelper.exibirSucesso('Movimentação alterada com sucesso!');
                if (this._configuracao.dados) {
                    this.obterMovimentacaoDetalhe(this._configuracao.dados);
                }

                this.estado.definirEstado(Estados.comDados);
            },
            error: (erro) => {
                this._form.setErrors({ Erro: true, message: erro.mensagem });
                this.estado.definirEstado(Estados.comDados);
                this._snackbarHelper.exibirErro(erro);
            }
        });
    }

    cadastrarMovimentacao() {
        console.log('Abre modal de adição', this._form);

        this.estado.definirEstado(Estados.carregando, 'Cadastrando movimentação...');
        const dados: MovimentacaoContabil = this._form.getRawValue();

        this._movimentacoesContabeisUseCase.cadastrarMovimentacao(dados).subscribe({
            next: () => {
                this.resetarFormulario();
                this._snackbarHelper.exibirSucesso('Lançamento cadastrado com sucesso!');
                if (this._configuracao.dados) {
                    this.obterMovimentacaoDetalhe(this._configuracao.dados);
                }

                this.estado.definirEstado(Estados.comDados);
            },
            error: (erro) => {
                this._snackbarHelper.exibirErro(erro);
                this.estado.definirEstado(Estados.comDados);
            }
        });
    }

    obterMovimentacaoDetalhe(movimentacao: MovimentacaoContabil) {
        if (movimentacao.id) {
            this.estado.definirEstado(Estados.carregando, 'Obtendo detalhe da movimentação...');

            const obterMovimentacaoDetalhe = this._movimentacoesContabeisUseCase.obterMovimentacaoDetalhe(movimentacao.pessoaId, movimentacao.id);

            forkJoin([obterMovimentacaoDetalhe]).subscribe({
                next: (resultados) => {
                    this._listaMovimentacoesBase = resultados[0];
                    this._listaMovimentacoesBase.unshift(movimentacao);

                    this._listaMovimentacoes = new MatTableDataSource([...this._listaMovimentacoesBase]);
                    this._listaMovimentacoes.sort = this.sort;

                    this.estado.definirEstado(Estados.comDados);
                },
                error: (erro) => {
                    this.estado.definirEstado(Estados.comDados);
                    this._snackbarHelper.exibirErro(erro);
                }
            });
        }
    }

    obterListas() {
        this.estado.definirEstado(Estados.carregando, 'Obtendo plano de contas...');

        const obterListaPlanoContasSelect = this._cadastrosPlanoContaUseCase.obterListaPlanoContasSelect();

        forkJoin([obterListaPlanoContasSelect]).subscribe({
            next: (resultados) => {
                this._listaPlanoContas = resultados[0];
                this.estado.definirEstado(Estados.comDados);
            },
            error: (erro) => {
                this.estado.definirEstado(Estados.comDados);
                this._snackbarHelper.exibirErro(erro);
            }
        });
    }

    resetarFormulario() {
        this._form.patchValue({
            id: '',
            valor: 0,
            planoContaCreditoId: '',
            planoContaDebitoId: '',
            descricao: '',
            complemento: ''
        });

        this._form.get('planoContaCreditoId')?.disable();
        this._form.get('planoContaDebitoId')?.disable();

        this._configuracao.operacao = 'cadastrar';
    }

    calcularTotalEntradas() {
        var valorInicial = 0;

        if (this._listaMovimentacoesBase.length > 0) {
            valorInicial = this._listaMovimentacoesBase.slice(1).reduce((soma, elemento) => {
                if (elemento.valor >= 0) {
                    return soma + elemento.valor;
                } else {
                    return soma;
                }
            }, 0);
        }

        return valorInicial;
    }
    calcularTotalSaidas() {
        var valorInicial = 0;
        if (this._listaMovimentacoesBase.length > 0) {
            valorInicial = this._listaMovimentacoesBase.slice(1).reduce((soma, elemento) => {
                if (elemento.valor < 0) {
                    return soma + elemento.valor;
                } else {
                    return soma;
                }
            }, 0);
        }

        return valorInicial;
    }

    cancelarAlteracao() {
        this.resetarFormulario();
    }
}
