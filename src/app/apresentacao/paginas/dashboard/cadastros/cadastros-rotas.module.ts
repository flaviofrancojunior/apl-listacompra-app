import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '@/app/main/guards/auth.guard';
import { CadastrosBancosComponent } from './bancos/bancos.component';
import { CadastrosNovoPlanoContaComponent } from './novo-plano-conta/novo-plano-conta.component';
import { CadastrosPlanoContasComponent } from './plano-contas/plano-contas.component';
import { CadastrosUsuariosComponent } from './usuarios/usuarios.component';
import { NgModule } from '@angular/core';

const rotas: Routes = [
    { path: '', redirectTo: 'bancos', pathMatch: 'full' },
    {
        path: 'bancos',
        canActivate: [AuthGuard],
        component: CadastrosBancosComponent
    },
    {
        path: 'usuarios',
        canActivate: [AuthGuard],
        component: CadastrosUsuariosComponent
    },
    {
        path: 'plano-de-contas',
        canActivate: [AuthGuard],
        component: CadastrosPlanoContasComponent
    },
    {
        path: 'plano-de-contas/criar',
        component: CadastrosNovoPlanoContaComponent,
        canActivate: [AuthGuard]
    }
];

@NgModule({
    imports: [RouterModule.forChild(rotas)],
    exports: [RouterModule]
})
export class CadastrosRotasModule {}
