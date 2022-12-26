import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '@/app/main/guards/auth.guard';
import { NgModule } from '@angular/core';

export const rotas: Routes = [
    {
        path: 'login',
        loadChildren: (): any => import('./login/login-rotas.module').then((m) => m.LoginRotasModule)
    },
    {
        path: 'dashboard',
        loadChildren: (): any => import('./dashboard/dashboard-rotas.module').then((m) => m.DashboardRotasModule)
    },
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: '**', redirectTo: '/login', pathMatch: 'full' }
];

@NgModule({
    imports: [RouterModule.forRoot(rotas, { useHash: true, scrollPositionRestoration: 'top' })],
    exports: [RouterModule],
    providers: [AuthGuard]
})
export class PaginasRotasModule {}
