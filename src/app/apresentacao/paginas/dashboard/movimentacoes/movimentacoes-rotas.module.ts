import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '@/app/main/guards/auth.guard';
import { MovimentacoesContabeisComponent } from './contabeis/contabeis.component';
import { MovimentacoesExtratoComponent } from './extrato/extrato.component';
import { MovimentacoesFinanceirasComponent } from './financeiras/financeiras.component';
import { MovimentacoesNovaMovimentacaoComponent } from './nova-movimentacao/nova-movimentacao.component';
import { MovimentacoesSincronizacaoComponent } from './sincronizacao/sincronizacao.component';
import { NgModule } from '@angular/core';

const rotas: Routes = [
    { path: '', redirectTo: 'sincronizacao', pathMatch: 'full' },
    {
        path: 'financeiras',
        canActivate: [AuthGuard],
        component: MovimentacoesFinanceirasComponent
    },
    {
        path: 'contabeis',
        canActivate: [AuthGuard],
        component: MovimentacoesContabeisComponent
    },
    {
        path: 'extrato',
        canActivate: [AuthGuard],
        component: MovimentacoesExtratoComponent
    },
    {
        path: 'nova-movimentacao',
        component: MovimentacoesNovaMovimentacaoComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'sincronizacao',
        component: MovimentacoesSincronizacaoComponent,
        canActivate: [AuthGuard]
    }
];

@NgModule({
    imports: [RouterModule.forChild(rotas)],
    exports: [RouterModule]
})
export class MovimentacoesRotasModule {}
