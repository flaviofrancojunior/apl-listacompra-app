import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '@/app/main/guards/auth.guard';
import { MeuPerfilInicioComponent } from './inicio/inicio.component';
import { NgModule } from '@angular/core';

const rotas: Routes = [
    {
        path: '',
        component: MeuPerfilInicioComponent,
        canActivate: [AuthGuard]
    }
];

@NgModule({
    imports: [RouterModule.forChild(rotas)],
    exports: [RouterModule]
})
export class MeuPerfilRotasModule {}
