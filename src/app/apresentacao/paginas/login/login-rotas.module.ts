import { RouterModule, Routes } from '@angular/router';

import { LoginInicioComponent } from './inicio/inicio.component';
import { NgModule } from '@angular/core';

const rotas: Routes = [
    {
        path: '',
        component: LoginInicioComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(rotas)],
    exports: [RouterModule]
})
export class LoginRotasModule {}
