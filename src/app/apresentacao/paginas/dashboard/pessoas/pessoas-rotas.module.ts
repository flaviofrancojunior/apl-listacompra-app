import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '@/app/main/guards/auth.guard';
import { NgModule } from '@angular/core';
import { PessoasDetalhesComponent } from './detalhes/detalhes.component';
import { PessoasInicioComponent } from './inicio/inicio.component';

const rotas: Routes = [
    {
        path: '',
        component: PessoasInicioComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'detalhes',
        component: PessoasDetalhesComponent,
        canActivate: [AuthGuard]
    }
];

@NgModule({
    imports: [RouterModule.forChild(rotas)],
    exports: [RouterModule]
})
export class PessoasRotasModule {}
