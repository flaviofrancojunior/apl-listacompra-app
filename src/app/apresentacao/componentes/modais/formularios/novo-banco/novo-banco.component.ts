import { EstadosHelper } from '@/app/apresentacao/helpers/estados.helper';
import { ICadastrosBancoUseCase } from '@/app/dominio/contratos/casos-uso/cadastros/banco.interface';
import { Estados, IEstadosHelper } from '@/app/dominio/contratos/helpers/estados.interface';
import { FormularioOperacao, ModalFormularioConfiguracaoNovoBanco } from '@/app/dominio/contratos/helpers/modais.interface';
import { ISnackbarHelper } from '@/app/dominio/contratos/helpers/snackbar.interface';
import { Banco } from '@/app/dominio/entidades/cadastros/banco.model';
import { Erro } from '@/app/dominio/entidades/sistema/erro.model';
import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { FormBuilder, FormGroup, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';

@Component({
    selector: 'sfr-modais-formulario-novo-banco',
    templateUrl: './novo-banco.component.html',
    styleUrls: ['./novo-banco.component.scss'],
    providers: [{ provide: IEstadosHelper, useClass: EstadosHelper }]
})
export class ModaisFormulariosNovoBancoComponent {
    _form: FormGroup;

    _textos: { [chave in string]: { titulo: string; botaoPrimario: string; acao: Function } } = {
        cadastrar: {
            titulo: 'Adicionar novo banco',
            botaoPrimario: 'Cadastrar',
            acao: () => {
                return this.cadastrarBanco();
            }
        },
        editar: {
            titulo: 'Alterar banco',
            botaoPrimario: 'Alterar',
            acao: () => {
                return this.alterarBanco();
            }
        }
    };

    @Output() cadastrarSucessoEvento = new EventEmitter();
    @Output() alterarSucessoEvento = new EventEmitter();

    constructor(
        @Inject(MAT_DIALOG_DATA) public _configuracao: ModalFormularioConfiguracaoNovoBanco,
        public dialog: MatDialog,
        private _formBuilder: FormBuilder,
        public estado: IEstadosHelper,
        private _cadastrosBancoUseCase: ICadastrosBancoUseCase,
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

    inicializarControle(banco?: Banco) {
        this._form = this._formBuilder.group({
            id: [banco?.id ?? ''],
            nome: [banco?.nome ?? '', [Validators.required]],
            codigo: [banco?.codigo ?? '', [Validators.required]],
            ativo: [banco?.ativo != undefined ? banco.ativo : true, [Validators.required]]
        });
    }

    cancelar() {
        this.dialog.closeAll();
    }

    cadastrarBanco() {
        this.estado.definirEstado(Estados.carregando, 'Cadastrando banco...');
        const dados: Banco = this._form.getRawValue();

        this._cadastrosBancoUseCase.cadastrarBanco(dados).subscribe({
            next: () => {
                this.dialog.closeAll();
                this._snackbarHelper.exibirSucesso('Novo banco adicionado com sucesso!');
                this.cadastrarSucessoEvento.emit();
            },
            error: (erro) => {
                this._form.setErrors({ Erro: true, message: erro.mensagem });
                this.estado.definirEstado(Estados.comDados);
                this._snackbarHelper.exibirErro(erro);
            }
        });
    }

    alterarBanco() {
        this.estado.definirEstado(Estados.carregando, 'Alterando banco...');
        const dados: Banco = this._form.getRawValue();

        this._cadastrosBancoUseCase.alterarBanco(dados).subscribe({
            next: () => {
                this.dialog.closeAll();
                this._snackbarHelper.exibirSucesso('Banco alterado com sucesso!');
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
