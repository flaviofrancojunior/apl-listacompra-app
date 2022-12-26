import { EstadosHelper } from '@/app/apresentacao/helpers/estados.helper';
import { ISistemaMoedaUseCase, MensagensValidacaoMoeda } from '@/app/dominio/contratos/casos-uso/sistema/moeda.interface';
import { Estados, IEstadosHelper } from '@/app/dominio/contratos/helpers/estados.interface';
import { ListaValidacaoNovaMoeda, ModalFormularioConfiguracaoNovaMoeda, FormularioOperacao } from '@/app/dominio/contratos/helpers/modais.interface';
import { ISnackbarHelper } from '@/app/dominio/contratos/helpers/snackbar.interface';
import { Moeda } from '@/app/dominio/entidades/cadastros/moeda.model';
import { Erro } from '@/app/dominio/entidades/sistema/erro.model';
import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';

@Component({
    selector: 'sfr-modais-formulario-nova-moeda',
    templateUrl: './nova-moeda.component.html',
    styleUrls: ['./nova-moeda.component.scss'],
    providers: [{ provide: IEstadosHelper, useClass: EstadosHelper }]
})
export class ModaisFormulariosNovaMoedaComponent {
    _form: FormGroup;

    _listasValidacao: ListaValidacaoNovaMoeda = {
        simbolo: [],
        codigo: [],
        paisOrigemCodigo: []
    };

    _textos: { [chave in keyof typeof FormularioOperacao]: { titulo: string; botaoPrimario: string; acao: Function } } = {
        cadastrar: {
            titulo: 'Adicionar nova moeda',
            botaoPrimario: 'Cadastrar',
            acao: () => {
                return this.cadastrarMoeda();
            }
        },
        editar: {
            titulo: 'Alterar moeda',
            botaoPrimario: 'Alterar',
            acao: () => {
                return this.alterarMoeda();
            }
        },
        visualizar: {
            titulo: 'Alterar moeda',
            botaoPrimario: 'Alterar',
            acao: () => {
                return this.alterarMoeda();
            }
        }
    };

    MensagensValidacaoMoeda = MensagensValidacaoMoeda;

    @Output() cadastrarSucessoEvento = new EventEmitter();
    @Output() alterarSucessoEvento = new EventEmitter();

    constructor(
        @Inject(MAT_DIALOG_DATA) public _configuracao: ModalFormularioConfiguracaoNovaMoeda,
        public dialog: MatDialog,
        private _formBuilder: NonNullableFormBuilder,
        public estado: IEstadosHelper,
        private _sistemaMoedaUseCase: ISistemaMoedaUseCase,
        private _snackbarHelper: ISnackbarHelper
    ) {
        switch (this._configuracao.operacao) {
            case FormularioOperacao.cadastrar:
                this._configuracao.listasValidacao?.forEach((elemento) => {
                    this._listasValidacao[elemento.chave] = elemento.valor;
                });
                this.inicializarControle();

                break;
            case FormularioOperacao.editar:
                this._configuracao.listasValidacao?.forEach((elemento) => {
                    this._listasValidacao[elemento.chave] = elemento.valor.filter((simbolo) => simbolo !== this._configuracao.dados?.[elemento.chave]);
                });
                this.inicializarControle(this._configuracao.dados);

                if (this._form.get('importadoBC')?.value) {
                    this._form.disable();
                }

                this._form.get('id')?.addValidators(Validators.required);
                this._form.get('id')?.updateValueAndValidity();
                break;
            default:
                break;
        }
    }

    inicializarControle(moeda?: Moeda) {
        this._form = this._formBuilder.group(
            {
                id: [moeda?.id ?? ''],
                codigo: [moeda?.codigo ?? '', [Validators.required, this._sistemaMoedaUseCase.validarCodigoMoeda(this._listasValidacao.codigo)]],
                nome: [moeda?.nome ?? '', Validators.required],
                paisOrigemCodigo: [moeda?.paisOrigemCodigo ?? '', [this._sistemaMoedaUseCase.validarCodigoPaises(this._listasValidacao.paisOrigemCodigo)]],
                paisOrigem: [moeda?.paisOrigem ?? '', []],
                simbolo: [moeda?.simbolo ?? '', [this._sistemaMoedaUseCase.validarSimbolo]],
                importadoBC: [{ value: moeda?.importadoBC ?? false, disabled: true }, Validators.required]
            },
            { validators: [] }
        );
    }

    cancelar() {
        this.dialog.closeAll();
    }

    cadastrarMoeda() {
        this.estado.definirEstado(Estados.carregando, 'Cadastrando moeda...');
        const dados: Moeda = this._form.getRawValue();

        this._sistemaMoedaUseCase.cadastrarMoeda(dados).subscribe({
            next: () => {
                this.dialog.closeAll();
                this._snackbarHelper.exibirSucesso('Nova moeda adicionada com sucesso!');
                this.cadastrarSucessoEvento.emit();
            },
            error: (erro) => {
                this._form.setErrors({ Erro: true, message: erro.mensagem });
                this.estado.definirEstado(Estados.comDados);
                this._snackbarHelper.exibirErro(erro);
            }
        });
    }

    alterarMoeda() {
        this.estado.definirEstado(Estados.carregando, 'Alterando moeda...');
        const dados: Moeda = this._form.getRawValue();

        this._sistemaMoedaUseCase.alterarMoeda(dados).subscribe({
            next: () => {
                this.dialog.closeAll();
                this._snackbarHelper.exibirSucesso('Moeda alterada com sucesso!');
                this.alterarSucessoEvento.emit();
            },
            error: (erro) => {
                this._form.setErrors({ Erro: true, message: erro.mensagem });
                this.estado.definirEstado(Estados.comDados);
                this._snackbarHelper.exibirErro(erro);
            }
        });
    }
}
