import { Estados, IEstadosHelper } from '@/app/dominio/contratos/helpers/estados.interface';
import { INavegacaoHelper, ROTAS } from '@/app/dominio/contratos/helpers/navegacao.interface';

import { Component } from '@angular/core';
import { EstadosHelper } from '@/app/apresentacao/helpers/estados.helper';
import { IMovimentacoesFinanceirasUseCase } from '@/app/dominio/contratos/casos-uso/movimentacoes/financeiras.interface';
import { ISnackbarHelper } from '@/app/dominio/contratos/helpers/snackbar.interface';
import { Resumo } from '@/app/dominio/entidades/movimentacao/movimentacao.model';

@Component({
    selector: 'sfr-resumo-card-movimentacoes',
    templateUrl: './card-movimentacoes.component.html',
    styleUrls: ['./card-movimentacoes.component.scss'],
    providers: [{ provide: IEstadosHelper, useClass: EstadosHelper }]
})
export class ResumoCardMovimentacoesComponent {
    _resumoNovasMovimentacoes: Resumo;

    constructor(public estado: IEstadosHelper, private _navegacaoHelper: INavegacaoHelper, private _snackbarHelper: ISnackbarHelper, private _movimentacoesFinanceirasUseCase: IMovimentacoesFinanceirasUseCase) {
        this.obterResumoMovimentacoes();
    }

    obterResumoMovimentacoes() {
        this.estado.definirEstado(Estados.carregando, 'Obtendo movimentações...');
        this._movimentacoesFinanceirasUseCase.obterResumoNovasMovimentacoes().subscribe({
            next: (resultado) => {
                this._resumoNovasMovimentacoes = resultado;

                this.estado.definirEstado(Estados.comDados);
            },
            error: (erro) => {
                this._snackbarHelper.exibirErro(erro);
                this.estado.definirEstado(Estados.erro);
            }
        });
    }

    acessarMovimentacoes() {
        this._navegacaoHelper.ir(ROTAS.dashboardMovimentacoes);
    }
}
