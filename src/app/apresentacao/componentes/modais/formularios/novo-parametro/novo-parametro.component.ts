import { EstadosHelper } from '@/app/apresentacao/helpers/estados.helper';
import { IParametrosUseCase } from '@/app/dominio/contratos/casos-uso/sistema/parametros.interface';
import { Estados, IEstadosHelper } from '@/app/dominio/contratos/helpers/estados.interface';
import { ModalFormularioConfiguracaoNovoParametro, FormularioOperacao } from '@/app/dominio/contratos/helpers/modais.interface';
import { ISnackbarHelper } from '@/app/dominio/contratos/helpers/snackbar.interface';
import { Erro } from '@/app/dominio/entidades/sistema/erro.model';
import { Parametro } from '@/app/dominio/entidades/sistema/parametro.model';
import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { FormBuilder, FormGroup, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';

@Component({
    selector: 'sfr-modais-formulario-novo-parametro',
    templateUrl: './novo-parametro.component.html',
    styleUrls: ['./novo-parametro.component.scss'],
    providers: [{ provide: IEstadosHelper, useClass: EstadosHelper }]
})
export class ModaisFormulariosNovoParametroComponent {
    _form: FormGroup;

    _textos: { [chave in string]: { titulo: string; botaoPrimario: string; acao: Function } } = {
        cadastrar: {
            titulo: 'Adicionar novo parâmetro',
            botaoPrimario: 'Cadastrar',
            acao: () => {
                return this.cadastrarParametro();
            }
        },
        editar: {
            titulo: 'Alterar parâmetro',
            botaoPrimario: 'Alterar',
            acao: () => {
                return this.alterarParametro();
            }
        }
    };

    @Output() cadastrarSucessoEvento = new EventEmitter();
    @Output() alterarSucessoEvento = new EventEmitter();

    constructor(
        @Inject(MAT_DIALOG_DATA) public _configuracao: ModalFormularioConfiguracaoNovoParametro,
        public dialog: MatDialog,
        private _formBuilder: FormBuilder,
        public estado: IEstadosHelper,
        private _parametrosUseCase: IParametrosUseCase,
        private _snackbarHelper: ISnackbarHelper
    ) {
        switch (this._configuracao.operacao) {
            case FormularioOperacao.cadastrar:
                this.inicializarControle();
                break;

            case FormularioOperacao.editar:
                this.inicializarControle(this._configuracao.dados);
                this._form.get('id')?.addValidators(Validators.required);
                this._form.get('id')?.updateValueAndValidity();
                break;

            default:
                break;
        }
    }

    inicializarControle(parametro?: Parametro) {
        this._form = this._formBuilder.group({
            id: [parametro?.id ?? ''],
            chave: [parametro?.chave ?? '', Validators.required],
            valor: [parametro?.valor ?? '', Validators.required]
        });
    }

    cancelar() {
        this.dialog.closeAll();
    }

    cadastrarParametro() {
        this.estado.definirEstado(Estados.carregando, 'Cadastrando parâmetro...');
        const dados: Parametro = this._form.getRawValue();

        this._parametrosUseCase.cadastrarParametro(dados).subscribe({
            next: () => {
                this.dialog.closeAll();
                this._snackbarHelper.exibirSucesso('Novo parâmetro adicionado com sucesso!');
                this.cadastrarSucessoEvento.emit();
            },
            error: (erro) => {
                this._form.setErrors({ Erro: true, message: erro.mensagem });
                this.estado.definirEstado(Estados.comDados);
                this._snackbarHelper.exibirErro(erro);
            }
        });
    }

    alterarParametro() {
        this.estado.definirEstado(Estados.carregando, 'Alterando parâmetro...');
        const dados: Parametro = this._form.getRawValue();

        this._parametrosUseCase.alterarParametro(dados).subscribe({
            next: () => {
                this.dialog.closeAll();
                this._snackbarHelper.exibirSucesso('Parâmetro alterado com sucesso!');
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
