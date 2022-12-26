import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '@/app/main/guards/auth.guard';
import { NgModule } from '@angular/core';
import { NotificacoesInicioComponent } from './inicio/inicio.component';

const rotas: Routes = [
    {
        path: '',
        component: NotificacoesInicioComponent,
        canActivate: [AuthGuard]
    }
];

@NgModule({
    imports: [RouterModule.forChild(rotas)],
    exports: [RouterModule]
})
export class NotificacoesRotasModule {}
