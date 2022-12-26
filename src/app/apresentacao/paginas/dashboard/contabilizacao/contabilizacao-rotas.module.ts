import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '@/app/main/guards/auth.guard';
import { ContabilizacaoInicioComponent } from './inicio/inicio.component';
import { NgModule } from '@angular/core';

const rotas: Routes = [
    {
        path: '',
        component: ContabilizacaoInicioComponent,
        canActivate: [AuthGuard]
    }
];

@NgModule({
    imports: [RouterModule.forChild(rotas)],
    exports: [RouterModule]
})
export class ContabilizacaoRotasModule {}
