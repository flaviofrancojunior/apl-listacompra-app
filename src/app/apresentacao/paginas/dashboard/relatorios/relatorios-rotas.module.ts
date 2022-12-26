import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '@/app/main/guards/auth.guard';
import { NgModule } from '@angular/core';
import { RelatoriosInicioComponent } from './inicio/inicio.component';

const rotas: Routes = [
    {
        path: '',
        canActivate: [AuthGuard],
        component: RelatoriosInicioComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(rotas)],
    exports: [RouterModule]
})
export class RelatoriosRotasModule {}
