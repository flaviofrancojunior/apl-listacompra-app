import { EstadosHelper } from '@/app/apresentacao/helpers/estados.helper';
import { ICadastrosHistoricoPadraoUseCase } from '@/app/dominio/contratos/casos-uso/cadastros/historico-padrao.interface';
import { Estados, IEstadosHelper } from '@/app/dominio/contratos/helpers/estados.interface';
import { ISnackbarHelper } from '@/app/dominio/contratos/helpers/snackbar.interface';
import { HistoricoPadrao } from '@/app/dominio/entidades/cadastros/historico-padrao.model';
import { Erro } from '@/app/dominio/entidades/sistema/erro.model';
import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';

@Component({
    selector: 'sfr-modais-formulario-novo-historico-padrao',
    templateUrl: './novo-historico-padrao.component.html',
    styleUrls: ['./novo-historico-padrao.component.scss'],
    providers: [{ provide: IEstadosHelper, useClass: EstadosHelper }]
})
export class ModaisFormulariosNovoHistoricoPadraoComponent {
    _form: UntypedFormGroup;

    _modoEdicao: boolean = false;

    _listaCodigosExistentes: string[] = [];

    @Output() cadastrarSucessoEvento = new EventEmitter();
    @Output() alterarSucessoEvento = new EventEmitter();

    constructor(@Inject(MAT_DIALOG_DATA) private _dados: any, public dialog: MatDialog, private _formBuilder: UntypedFormBuilder, public estado: IEstadosHelper, private _cadastrosHistoricoPadraoUseCase: ICadastrosHistoricoPadraoUseCase, private _snackbarHelper: ISnackbarHelper) {
        //if (this._dados instanceof HistoricoPadrao) {
        if (this._dados?.id) {
            this._modoEdicao = true;
        } else {
            this._listaCodigosExistentes = this._dados;
        }

        this.inicializarControle(this._dados);

        if (this._modoEdicao) {
            this._form.get('id')?.addValidators(Validators.required);
            this._form.get('id')?.updateValueAndValidity();
        }
    }

    inicializarControle(historico: HistoricoPadrao) {
        this._form = this._formBuilder.group(
            {
                id: [historico?.id ? historico.id : ''],
                codigo: [{ value: historico?.codigo ? historico.codigo : '', disabled: this._modoEdicao }, [Validators.required]],
                historicoConta: [historico?.historicoConta ? historico.historicoConta : '', [Validators.required]],
                historicoCliente: [historico?.historicoCliente ? historico.historicoCliente : '', [Validators.required]],
                historicoBanco: [historico?.historicoBanco ? historico.historicoBanco : '', [Validators.required]],
                debitoCliente: [{ value: historico?.debitoCliente ? historico.debitoCliente : '', disabled: this._modoEdicao }, [Validators.required]],
                creditoCliente: [{ value: historico?.creditoCliente ? historico.creditoCliente : '', disabled: true }, [Validators.required]],
                debitoBanco: [{ value: historico?.debitoBanco ? historico.debitoBanco : '', disabled: this._modoEdicao }, [Validators.required]],
                creditoBanco: [{ value: historico?.creditoBanco ? historico.creditoBanco : '', disabled: true }, [Validators.required]],
                ativo: [historico?.ativo != undefined ? historico.ativo : true, [Validators.required]]
            },
            { validators: [this.validarCodigo.bind(this)] }
        );

        this._form.get('debitoCliente')?.valueChanges.subscribe((dados) => {
            this._form.get('creditoBanco')?.setValue(dados);
        });

        this._form.get('debitoBanco')?.valueChanges.subscribe((dados) => {
            this._form.get('creditoCliente')?.setValue(dados);
        });
    }

    cancelar() {
        this.dialog.closeAll();
    }

    cadastrarHistoricoPadrao() {
        this.estado.definirEstado(Estados.carregando, 'Cadastrando histórico padrão...');
        const dados: HistoricoPadrao = this._form.getRawValue();

        this._cadastrosHistoricoPadraoUseCase.cadastrarHistoricoPadrao(dados).subscribe({
            next: () => {
                this.dialog.closeAll();
                this._snackbarHelper.exibirSucesso('Novo histórico padrão adicionado com sucesso!');
                this.cadastrarSucessoEvento.emit();
            },
            error: (erro) => {
                this._form.setErrors({ Erro: true, message: erro.mensagem });
                this.estado.definirEstado(Estados.comDados);
                this._snackbarHelper.exibirErro(erro);
            }
        });
    }

    alterarHistoricoPadrao() {
        this.estado.definirEstado(Estados.carregando, 'Alterando banco...');
        const dados: HistoricoPadrao = this._form.getRawValue();

        this._cadastrosHistoricoPadraoUseCase.alterarHistoricoPadrao(dados).subscribe({
            next: () => {
                this.dialog.closeAll();
                this._snackbarHelper.exibirSucesso('Histórico padrão alterado com sucesso!');
                this.alterarSucessoEvento.emit();
            },
            error: (erro) => {
                this._form.setErrors({ Erro: true, message: erro.mensagem });
                this.estado.definirEstado(Estados.comDados);
                this._snackbarHelper.exibirErro(erro);
            }
        });
    }

    copiarHistoricoPadrao(controle: string) {
        const texto = this._form.get('historicoConta')?.value;
        this._form.get(controle)?.setValue(texto);
    }

    copiar(controle: string) {
        const texto = this._form.get(controle)?.value;
        if (texto) {
            navigator.clipboard.writeText(texto);
            this._snackbarHelper.exibirSucesso(`Texto copiado com sucesso!`);
        } else {
            this._snackbarHelper.exibirInformacao(`Não existe texto para ser copiado.`);
        }
    }

    validarCodigo(group: UntypedFormGroup) {
        if (this._listaCodigosExistentes) {
            const elemento = this._listaCodigosExistentes?.find((elemento) => {
                return elemento === group.get('codigo')?.value;
            });

            return elemento ? { CodigoExistente: true } : null;
        }

        return null;
    }
}
