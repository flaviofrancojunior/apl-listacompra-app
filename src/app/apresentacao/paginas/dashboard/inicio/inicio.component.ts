import { INavegacaoHelper, ROTAS } from '@/app/dominio/contratos/helpers/navegacao.interface';

import { Component } from '@angular/core';

@Component({
    selector: 'sfr-dashboard-inicio',
    templateUrl: './inicio.component.html',
    styleUrls: ['./inicio.component.scss']
})
export class DashboardInicioComponent {
    constructor(private _navegacaoHelper: INavegacaoHelper) {}

    navegar() {
        this._navegacaoHelper.ir(ROTAS.dashboardCadastros);
    }

    navegarMovimentacao() {
        this._navegacaoHelper.ir(ROTAS.dashboardMovimentacoesFinanceiras);
    }
    navegarPlanoContas() {
        this._navegacaoHelper.ir(ROTAS.dashboardCadastrosPlanoContas);
    }
    navegarPessoas() {
        this._navegacaoHelper.ir(ROTAS.dashboardPessoas);
    }
    navegarUsuarios() {
        this._navegacaoHelper.ir(ROTAS.dashboardCadastrosUsuarios);
    }
}
