import { AcessoCardLoginModule } from '@/app/apresentacao/componentes/negocios/acesso/card-login/card-login.module';
import { LoginInicioComponent } from './inicio.component';
import { NgModule } from '@angular/core';

@NgModule({
    declarations: [LoginInicioComponent],
    imports: [AcessoCardLoginModule],
    exports: [LoginInicioComponent]
})
export class LoginInicioModule {}
