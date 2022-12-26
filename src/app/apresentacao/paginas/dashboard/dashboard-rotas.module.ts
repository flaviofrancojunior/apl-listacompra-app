import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '@/app/main/guards/auth.guard';
import { BaseLogadaComponent } from '../base/logada/logada.component';
import { DashboardInicioComponent } from './inicio/inicio.component';
import { NgModule } from '@angular/core';

const rotas: Routes = [
    {
        path: '',
        component: BaseLogadaComponent,
        canActivate: [AuthGuard],
        children: [
            {
                path: 'inicio',
                component: DashboardInicioComponent,
                canActivate: [AuthGuard]
            },
            {
                path: 'notificacoes',
                loadChildren: (): any => import('./notificacoes/notificacoes-rotas.module').then((m) => m.NotificacoesRotasModule),
                canActivate: [AuthGuard]
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(rotas)],
    exports: [RouterModule],
    providers: [AuthGuard]
})
export class DashboardRotasModule {}
