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
                path: 'cadastros',
                loadChildren: (): any => import('./cadastros/cadastros-rotas.module').then((m) => m.CadastrosRotasModule),
                canActivate: [AuthGuard]
            },
            {
                path: 'meu-perfil',
                loadChildren: (): any => import('./meu-perfil/meu-perfil-rotas.module').then((m) => m.MeuPerfilRotasModule),
                canActivate: [AuthGuard]
            },
            {
                path: 'movimentacoes',
                loadChildren: (): any => import('./movimentacoes/movimentacoes-rotas.module').then((m) => m.MovimentacoesRotasModule),
                canActivate: [AuthGuard]
            },
            {
                path: 'relatorios',
                loadChildren: (): any => import('./relatorios/relatorios-rotas.module').then((m) => m.RelatoriosRotasModule),
                canActivate: [AuthGuard]
            },
            {
                path: 'contabilizacao',
                loadChildren: (): any => import('./contabilizacao/contabilizacao-rotas.module').then((m) => m.ContabilizacaoRotasModule),
                canActivate: [AuthGuard]
            },

            {
                path: 'notificacoes',
                loadChildren: (): any => import('./notificacoes/notificacoes-rotas.module').then((m) => m.NotificacoesRotasModule),
                canActivate: [AuthGuard]
            },
            {
                path: 'pessoas',
                loadChildren: (): any => import('./pessoas/pessoas-rotas.module').then((m) => m.PessoasRotasModule),
                canActivate: [AuthGuard]
            },
            {
                path: 'sistema',
                loadChildren: (): any => import('./sistema/sistema-rotas.module').then((m) => m.SistemaRotasModule),
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
