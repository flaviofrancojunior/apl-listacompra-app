import { ListaOpcoesSelect } from '@/app/apresentacao/componentes/base/select/select.component';
import { EstadosHelper } from '@/app/apresentacao/helpers/estados.helper';
import { ICadastrosPlanoContaUseCase } from '@/app/dominio/contratos/casos-uso/cadastros/plano-conta.interface';
import { Estados, IEstadosHelper } from '@/app/dominio/contratos/helpers/estados.interface';
import { FormularioOperacao, ModalFormularioConfiguracaoNovoPlanoConta } from '@/app/dominio/contratos/helpers/modais.interface';
import { ISnackbarHelper } from '@/app/dominio/contratos/helpers/snackbar.interface';
import { PlanoConta, ResponsabilidadePlanoConta, TipoPlanoConta } from '@/app/dominio/entidades/cadastros/plano-conta.model';
import { Erro } from '@/app/dominio/entidades/sistema/erro.model';
import { ID } from '@/app/dominio/entidades/sistema/types.model';
import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';

@Component({
    selector: 'sfr-modais-formulario-novo-plano-conta',
    templateUrl: './novo-plano-conta.component.html',
    styleUrls: ['./novo-plano-conta.component.scss'],
    providers: [{ provide: IEstadosHelper, useClass: EstadosHelper }]
})
export class ModaisFormulariosNovoPlanoContaComponent {
    _form: FormGroup;

    _modoEdicao: boolean = true;

    _listaTipos: ListaOpcoesSelect[];
    _listaResponsabilidades: ListaOpcoesSelect[];

    _idRaiz: ID;
    _idPai: ID;

    @Output() alterarSucessoEvento = new EventEmitter();

    constructor(
        @Inject(MAT_DIALOG_DATA) public _configuracao: ModalFormularioConfiguracaoNovoPlanoConta,
        public dialog: MatDialog,
        private _formBuilder: FormBuilder,
        public estado: IEstadosHelper,
        private _cadastrosPlanoContaUseCase: ICadastrosPlanoContaUseCase,
        private _snackbarHelper: ISnackbarHelper
    ) {
        this.inicializarListas();

        this._idRaiz = this._configuracao.dados?.idRaiz as ID;
        this._idPai = this._configuracao.dados?.idPai as ID;

        switch (this._configuracao.operacao) {
            case FormularioOperacao.editar:
                this.inicializarControle(this._configuracao.dados?.planoConta);

                this._form.get('numero')?.disable();
                this._form.get('subcontas')?.disable();
                break;

            default:
                break;
        }
    }

    inicializarControle(planoConta?: PlanoConta) {
        this._form = this._formBuilder.group({
            id: [planoConta?.id ?? '', [Validators.required]],
            numero: [planoConta?.numero ?? '', [Validators.required]],
            descricao: [planoConta?.descricao ?? '', [Validators.required]],
            tipoId: [planoConta?.tipoId ?? '', [Validators.required]],
            tipoDescricao: [planoConta?.tipoDescricao ?? '', [Validators.required]],
            responsabilidadeId: [planoConta?.responsabilidadeId ?? '', [Validators.required]],
            responsabilidadeDescricao: [planoConta?.responsabilidadeDescricao ?? '', [Validators.required]],
            subcontas: [planoConta?.subcontas ?? [], [Validators.required]]
        });

        this._form.get('tipoId')?.valueChanges.subscribe((novoValor) => {
            const opcao = this._listaTipos.find((elemento) => {
                return elemento.id === novoValor;
            });
            if (opcao) {
                this._form.get('tipoDescricao')?.setValue(opcao.descricao);
            }
        });

        this._form.get('responsabilidadeId')?.valueChanges.subscribe((novoValor) => {
            const opcao = this._listaResponsabilidades.find((elemento) => {
                return elemento.id === novoValor;
            });
            if (opcao) {
                this._form.get('responsabilidadeDescricao')?.setValue(opcao.descricao);
            }
        });
    }

    inicializarListas() {
        this._listaTipos = (Object.keys(TipoPlanoConta).filter((v) => isNaN(Number(v))) as (keyof typeof TipoPlanoConta)[]).map((chave) => {
            return { id: TipoPlanoConta[chave], descricao: chave };
        });

        this._listaResponsabilidades = (Object.keys(ResponsabilidadePlanoConta).filter((v) => isNaN(Number(v))) as (keyof typeof ResponsabilidadePlanoConta)[]).map((chave) => {
            return { id: ResponsabilidadePlanoConta[chave], descricao: chave };
        });
    }

    cancelar() {
        this.dialog.closeAll();
    }

    alterarPlanoConta() {
        this.estado.definirEstado(Estados.carregando, 'Alterando conta...');
        const dados: PlanoConta = this._form.getRawValue();

        this._cadastrosPlanoContaUseCase.alterarPlanoConta(this._idRaiz, this._idPai, dados.id, dados).subscribe({
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
}
