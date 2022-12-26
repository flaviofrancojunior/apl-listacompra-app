import { ListaOpcoesSelect } from '@/app/apresentacao/componentes/base/select/select.component';
import { EstadosHelper } from '@/app/apresentacao/helpers/estados.helper';
import { ICadastrosBancoUseCase } from '@/app/dominio/contratos/casos-uso/cadastros/banco.interface';
import { ICadastrosPlanoContaUseCase } from '@/app/dominio/contratos/casos-uso/cadastros/plano-conta.interface';
import { IPessoasContasUseCase } from '@/app/dominio/contratos/casos-uso/pessoas/contas.interface';
import { ISistemaMoedaUseCase } from '@/app/dominio/contratos/casos-uso/sistema/moeda.interface';
import { Estados, IEstadosHelper } from '@/app/dominio/contratos/helpers/estados.interface';
import { FormularioOperacao, ModalFormularioConfiguracaoNovaConta } from '@/app/dominio/contratos/helpers/modais.interface';
import { ISnackbarHelper } from '@/app/dominio/contratos/helpers/snackbar.interface';
import { PlanoConta } from '@/app/dominio/entidades/cadastros/plano-conta.model';
import { Conta } from '@/app/dominio/entidades/pessoas/conta.model';
import { ID } from '@/app/dominio/entidades/sistema/types.model';
import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { forkJoin } from 'rxjs';

@Component({
    selector: 'sfr-modais-formulario-nova-conta',
    templateUrl: './nova-conta.component.html',
    styleUrls: ['./nova-conta.component.scss'],
    providers: [{ provide: IEstadosHelper, useClass: EstadosHelper }]
})
export class ModaisFormulariosNovaContaComponent {
    _form: FormGroup;

    _listaBancos: any[] = [];
    _listaMoedas: any[] = [];
    _listaPlanoContas: ListaOpcoesSelect[] = [];

    _listaConta: ListaOpcoesSelect[] = [
        { id: 1, descricao: 'Conta Corrente' },
        { id: 2, descricao: 'Conta Poupança' }
    ];

    _textos: { [chave in string]: { titulo: string; botaoPrimario: string; acao: Function } } = {
        cadastrar: {
            titulo: 'Adicionar nova conta',
            botaoPrimario: 'Cadastrar',
            acao: () => {
                return this.cadastrarConta();
            }
        },
        editar: {
            titulo: 'Alterar conta',
            botaoPrimario: 'Alterar',
            acao: () => {
                return this.alterarConta();
            }
        }
    };

    @Output() cadastrarSucessoEvento = new EventEmitter();
    @Output() alterarSucessoEvento = new EventEmitter();

    constructor(
        @Inject(MAT_DIALOG_DATA) public _configuracao: ModalFormularioConfiguracaoNovaConta,
        public dialog: MatDialog,
        private _formBuilder: FormBuilder,
        public estado: IEstadosHelper,
        private _snackbarHelper: ISnackbarHelper,
        private _pessoasContasUseCase: IPessoasContasUseCase,
        private _cadastrosBancoUseCase: ICadastrosBancoUseCase,
        private _sistemaMoedaUseCase: ISistemaMoedaUseCase,
        private _cadastrosPlanoContaUseCase: ICadastrosPlanoContaUseCase
    ) {
        this.obterListas();

        switch (this._configuracao.operacao) {
            case FormularioOperacao.cadastrar:
                this.inicializarControle(this._configuracao.dados as ID);

                break;
            case FormularioOperacao.editar:
                this.inicializarControle((this._configuracao.dados as Conta).pessoaId, this._configuracao.dados as Conta);

                this._form.get('bancoId')?.disable();
                this._form.get('agencia')?.disable();
                this._form.get('numero')?.disable();
                this._form.get('id')?.addValidators(Validators.required);
                this._form.updateValueAndValidity();
                break;
            default:
                break;
        }
    }

    inicializarControle(pessoaId: ID, conta?: Conta) {
        this._form = this._formBuilder.group({
            id: [conta?.id ?? ''],
            pessoaId: [pessoaId, [Validators.required]],
            bancoId: [conta?.bancoId ?? '', [Validators.required]],
            agencia: [conta?.agencia ?? '', [Validators.required]],
            numero: [conta?.numero ?? '', [Validators.required]],
            descricao: [conta?.descricao ?? ''],
            dataAbertura: [conta?.dataAbertura ?? '', [Validators.required]],
            moedaId: [conta?.moedaId ?? '', [Validators.required]],
            tipoId: [conta?.tipoId ?? '', [Validators.required]],
            tipoDescricao: [conta?.tipoDescricao ?? '', [Validators.required]],
            planoContaId: [conta?.planoContaId ?? null],
            ativo: [conta?.ativo ?? true, [Validators.required]]
        });

        this._form.get('tipoId')?.valueChanges.subscribe((value) => {
            this._form.get('tipoDescricao')?.setValue(this._listaConta.find((banco) => banco.id == value)?.descricao);
        });
    }

    cancelar() {
        this.dialog.closeAll();
    }

    cadastrarConta() {
        this.estado.definirEstado(Estados.carregando, 'Cadastrando nova conta...');
        const dados: Conta = this._form.getRawValue();

        this._pessoasContasUseCase.cadastrarConta(dados).subscribe({
            next: () => {
                this.dialog.closeAll();
                this._snackbarHelper.exibirSucesso('Nova conta adicionada com sucesso!');
                this.cadastrarSucessoEvento.emit();
            },
            error: (erro) => {
                this._form.setErrors({ Erro: true, message: erro.mensagem });
                this.estado.definirEstado(Estados.comDados);
                this._snackbarHelper.exibirErro(erro);
            }
        });
    }

    alterarConta() {
        this.estado.definirEstado(Estados.carregando, 'Alterando conta...');
        const dados: Conta = this._form.getRawValue();

        this._pessoasContasUseCase.alterarConta(dados).subscribe({
            next: () => {
                this.dialog.closeAll();
                this._snackbarHelper.exibirSucesso('Conta alterada com sucesso!');
                this.alterarSucessoEvento.emit();
            },
            error: (erro) => {
                this._form.setErrors({ Erro: true, message: erro.mensagem });
                this.estado.definirEstado(Estados.comDados);
                this._snackbarHelper.exibirErro(erro);
            }
        });
    }

    obterListas() {
        this.estado.definirEstado(Estados.carregando, 'Obtendo informações...');

        const obterListaBancosSelect = this._cadastrosBancoUseCase.obterListaBancosSelect(this._configuracao.operacao === FormularioOperacao.cadastrar ? true : false);
        const obterListaMoedasSelect = this._sistemaMoedaUseCase.obterListaMoedasSelect();
        const obterListaPlanoContasSelect = this._cadastrosPlanoContaUseCase.obterListaPlanoContasSelect();

        forkJoin([obterListaBancosSelect, obterListaMoedasSelect, obterListaPlanoContasSelect]).subscribe({
            next: (resultados) => {
                this._listaBancos = resultados[0];
                this._listaMoedas = resultados[1];
                this._listaPlanoContas = resultados[2];

                this.estado.definirEstado(Estados.comDados);
            },
            error: (erros) => {
                this._form.setErrors({ Erro: true, message: erros.mensagem });
                this.estado.definirEstado(Estados.comDados);
                this._snackbarHelper.exibirErro(erros);
            }
        });
    }
}
