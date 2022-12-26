import { Estados, IEstadosHelper } from '@/app/dominio/contratos/helpers/estados.interface';
import { FormGroup, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { INavegacaoHelper, ROTAS } from '@/app/dominio/contratos/helpers/navegacao.interface';
import { PlanoConta, ResponsabilidadePlanoConta, TipoPlanoConta } from '@/app/dominio/entidades/cadastros/plano-conta.model';

import { Component } from '@angular/core';
import { EstadosHelper } from '@/app/apresentacao/helpers/estados.helper';
import { ICadastrosPlanoContaUseCase } from '@/app/dominio/contratos/casos-uso/cadastros/plano-conta.interface';
import { IModaisHelper } from '@/app/dominio/contratos/helpers/modais.interface';
import { ISnackbarHelper } from '@/app/dominio/contratos/helpers/snackbar.interface';
import { ListaOpcoesSelect } from '@/app/apresentacao/componentes/base/select/select.component';

@Component({
    selector: 'sfr-cadastros-card-novo-plano-conta',
    templateUrl: './card-novo-plano-conta.component.html',
    styleUrls: ['./card-novo-plano-conta.component.scss'],
    providers: [{ provide: IEstadosHelper, useClass: EstadosHelper }]
})
export class CadastrosCardNovoPlanoContaComponent {
    _listaPlanoContas: PlanoConta[];

    constructor(public estado: IEstadosHelper, private _snackbarHelper: ISnackbarHelper, private _navegacaoHelper: INavegacaoHelper, private _cadastrosPlanoContaUseCase: ICadastrosPlanoContaUseCase) {
        this.obterListaPlanoConta('Obtendo plano de contas...');
    }

    obterListaPlanoConta(mensagemCarregamento: string) {
        this.estado.definirEstado(Estados.carregando, mensagemCarregamento);
        this._cadastrosPlanoContaUseCase.obterListaPlanoContas().subscribe({
            next: (resultado) => {
                this._listaPlanoContas = resultado;

                this.estado.definirEstado(Estados.comDados);
            },
            error: (erro) => {
                this._snackbarHelper.exibirErro(erro);
                this.estado.definirEstado(Estados.erro);
            }
        });
    }

    navegarParaCadastros() {
        this._navegacaoHelper.ir(ROTAS.dashboardCadastrosPlanoContas);
    }
}
