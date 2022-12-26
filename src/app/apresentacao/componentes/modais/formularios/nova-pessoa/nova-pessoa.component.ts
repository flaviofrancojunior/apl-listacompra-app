import { EstadosHelper } from '@/app/apresentacao/helpers/estados.helper';
import { IPessoasUseCase } from '@/app/dominio/contratos/casos-uso/pessoas/pessoas.interface';
import { Estados, IEstadosHelper } from '@/app/dominio/contratos/helpers/estados.interface';
import { FormularioOperacao, ModalFormularioConfiguracaoNovaPessoa } from '@/app/dominio/contratos/helpers/modais.interface';
import { ISnackbarHelper } from '@/app/dominio/contratos/helpers/snackbar.interface';
import { Pessoa } from '@/app/dominio/entidades/pessoas/pessoa.model';
import { Erro } from '@/app/dominio/entidades/sistema/erro.model';
import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';

@Component({
    selector: 'sfr-modais-formulario-nova-pessoa',
    templateUrl: './nova-pessoa.component.html',
    styleUrls: ['./nova-pessoa.component.scss'],
    providers: [{ provide: IEstadosHelper, useClass: EstadosHelper }]
})
export class ModaisFormulariosNovaPessoaComponent {
    _form: FormGroup;

    _textos: { [chave in string]: { titulo: string; botaoPrimario: string; acao: Function } } = {
        cadastrar: {
            titulo: 'Adicionar nova pessoa',
            botaoPrimario: 'Cadastrar',
            acao: () => {
                return this.cadastrarPessoa();
            }
        },
        editar: {
            titulo: 'Alterar pessoa',
            botaoPrimario: 'Alterar',
            acao: () => {
                return this.alterarPessoa();
            }
        }
    };

    @Output() cadastrarSucessoEvento = new EventEmitter();
    @Output() alterarSucessoEvento = new EventEmitter();

    constructor(@Inject(MAT_DIALOG_DATA) public _configuracao: ModalFormularioConfiguracaoNovaPessoa, public dialog: MatDialog, private _formBuilder: FormBuilder, public estado: IEstadosHelper, private _snackbarHelper: ISnackbarHelper, private _pessoasUseCase: IPessoasUseCase) {
        switch (this._configuracao.operacao) {
            case FormularioOperacao.cadastrar:
                this.inicializarControle();
                break;
            case FormularioOperacao.editar:
                this.inicializarControle(this._configuracao.dados);

                this._form.get('id')?.addValidators(Validators.required);
                this._form.get('cpf')?.disable();
                this._form.updateValueAndValidity();
                break;
            default:
                break;
        }
    }

    inicializarControle(pessoa?: Pessoa) {
        this._form = this._formBuilder.group({
            id: [pessoa?.id ?? ''],
            cpf: [pessoa?.cpf ?? '', [Validators.required]],
            nome: [pessoa?.nome ?? '', [Validators.required]],
            ativo: [pessoa?.ativo ?? true, [Validators.required]]
        });
    }

    cancelar() {
        this.dialog.closeAll();
    }

    cadastrarPessoa() {
        this.estado.definirEstado(Estados.carregando, 'Cadastrando pessoa...');
        const dados: Pessoa = this._form.getRawValue();

        this._pessoasUseCase.cadastrarPessoa(dados).subscribe({
            next: () => {
                this.dialog.closeAll();
                this._snackbarHelper.exibirSucesso('Nova pessoa adicionada com sucesso!');
                this.cadastrarSucessoEvento.emit();
            },
            error: (erro) => {
                this._form.setErrors({ Erro: true, message: erro.mensagem });
                this.estado.definirEstado(Estados.comDados);
                this._snackbarHelper.exibirErro(erro);
            }
        });
    }

    alterarPessoa() {
        this.estado.definirEstado(Estados.carregando, 'Alterando pessoa...');
        const dados: Pessoa = this._form.getRawValue();

        this._pessoasUseCase.alterarPessoa(dados).subscribe({
            next: () => {
                this.dialog.closeAll();
                this._snackbarHelper.exibirSucesso('Pessoa alterada com sucesso!');
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
