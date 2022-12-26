import { ListaOpcoesSelect } from '@/app/apresentacao/componentes/base/select/select.component';
import { EstadosHelper } from '@/app/apresentacao/helpers/estados.helper';
import { ICadastrosPlanoContaUseCase } from '@/app/dominio/contratos/casos-uso/cadastros/plano-conta.interface';
import { IMovimentacoesContabeisUseCase } from '@/app/dominio/contratos/casos-uso/movimentacoes/contabeis.interface';
import { Estados, IEstadosHelper } from '@/app/dominio/contratos/helpers/estados.interface';
import { FormularioOperacao, ModalFormularioConfiguracaoNovaMovimentacaoContabil } from '@/app/dominio/contratos/helpers/modais.interface';
import { ISnackbarHelper } from '@/app/dominio/contratos/helpers/snackbar.interface';
import { MovimentacaoContabil } from '@/app/dominio/entidades/movimentacao/contabil.model';
import { Erro } from '@/app/dominio/entidades/sistema/erro.model';
import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import dayjs from 'dayjs';
import { forkJoin } from 'rxjs';

@Component({
    selector: 'sfr-modais-formulario-nova-movimentacao-contabil',
    templateUrl: './nova-movimentacao-contabil.component.html',
    styleUrls: ['./nova-movimentacao-contabil.component.scss'],
    providers: [{ provide: IEstadosHelper, useClass: EstadosHelper }]
})
export class ModaisFormulariosNovaMovimentacaoContabilComponent {
    _form: FormGroup;

    _textos: { [chave in string]: { titulo: string; botaoPrimario: string; acao: Function } } = {
        cadastrar: {
            titulo: 'Adicionar nova movimentação',
            botaoPrimario: 'Cadastrar',
            acao: () => {
                return this.cadastrarMovimentacao();
            }
        },
        editar: {
            titulo: 'Alterar movimentação',
            botaoPrimario: 'Alterar',
            acao: () => {
                return this.alterarMovimentacao();
            }
        }
    };

    _listaPlanoContas: ListaOpcoesSelect[];

    @Output() cadastrarSucessoEvento = new EventEmitter();
    @Output() alterarSucessoEvento = new EventEmitter();

    constructor(
        @Inject(MAT_DIALOG_DATA) public _configuracao: ModalFormularioConfiguracaoNovaMovimentacaoContabil,
        public dialog: MatDialog,
        private _formBuilder: FormBuilder,
        public estado: IEstadosHelper,
        private _movimentacoesContabeisUseCase: IMovimentacoesContabeisUseCase,
        private _cadastrosPlanoContaUseCase: ICadastrosPlanoContaUseCase,
        private _snackbarHelper: ISnackbarHelper
    ) {
        this.obterListas();
        switch (this._configuracao.operacao) {
            case FormularioOperacao.cadastrar:
                if (this._configuracao.dados) {
                    this.inicializarControle(this._configuracao.dados);
                }

                break;
            case FormularioOperacao.editar:
                this.inicializarControle(this._configuracao.dados);

                if (this._configuracao.dados?.movimentoFinanceiroPaiId) {
                    this._form.get('data')?.disable();
                    this._form.get('valor')?.disable();
                    this._form.get('descricao')?.disable();
                }

                this._form.get('id')?.addValidators(Validators.required);
                this._form.updateValueAndValidity();
                break;
            default:
                break;
        }
    }

    inicializarControle(movimentacao?: MovimentacaoContabil) {
        this._form = this._formBuilder.group({
            id: [movimentacao?.id ?? ''],
            pessoaId: [movimentacao?.pessoaId ?? '', Validators.required],

            data: [movimentacao?.data ?? dayjs().format('YYYY-MM-DD'), Validators.required],
            valor: [movimentacao?.valor ?? 0, Validators.required],

            planoContaCreditoId: [movimentacao?.planoContaCreditoId ?? ''],
            planoContaDebitoId: [movimentacao?.planoContaDebitoId ?? ''],

            descricao: [movimentacao?.descricao ?? '', Validators.required],
            complemento: [movimentacao?.complemento ?? '', Validators.required],

            movimentoFinanceiroPaiId: [movimentacao?.movimentoFinanceiroPaiId ?? null],
            movimentoContabilPaiId: [movimentacao?.movimentoContabilPaiId ?? null],

            loteAberto: [movimentacao?.loteAberto ?? true, Validators.required]
        });
    }

    cancelar() {
        this.dialog.closeAll();
    }

    alterarMovimentacao() {
        this.estado.definirEstado(Estados.carregando, 'Alterando movimentação...');
        const dados: MovimentacaoContabil = this._form.getRawValue();

        this._movimentacoesContabeisUseCase.alterarMovimentacao(dados).subscribe({
            next: () => {
                this.dialog.closeAll();
                this._snackbarHelper.exibirSucesso('Movimentação alterada com sucesso!');
                this.alterarSucessoEvento.emit();
            },
            error: (erro) => {
                this._form.setErrors({ Erro: true, message: erro.mensagem });
                this.estado.definirEstado(Estados.comDados);
                this._snackbarHelper.exibirErro(erro);
            }
        });
    }

    cadastrarMovimentacao() {
        this.estado.definirEstado(Estados.carregando, 'Cadastrando movimentação...');
        const dados: MovimentacaoContabil = this._form.getRawValue();

        this._movimentacoesContabeisUseCase.cadastrarMovimentacao(dados).subscribe({
            next: () => {
                this.dialog.closeAll();
                this._snackbarHelper.exibirSucesso('Lançamento cadastrado com sucesso!');
                this.cadastrarSucessoEvento.emit();

                this.estado.definirEstado(Estados.comDados);
            },
            error: (erro) => {
                this._snackbarHelper.exibirErro(erro);
                this.estado.definirEstado(Estados.comDados);
            }
        });
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
}
