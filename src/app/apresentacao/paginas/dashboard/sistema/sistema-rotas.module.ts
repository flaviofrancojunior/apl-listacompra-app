import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '@/app/main/guards/auth.guard';
import { NgModule } from '@angular/core';
import { SistemaInicioComponent } from './inicio/inicio.component';

const rotas: Routes = [
    {
        path: '',
        component: SistemaInicioComponent,
        canActivate: [AuthGuard]
    }
];

@NgModule({
    imports: [RouterModule.forChild(rotas)],
    exports: [RouterModule]
})
export class SistemaRotasModule {}
