import { DashboardInicioModule } from './inicio/inicio.module';
import { MeuPerfilModule } from './meu-perfil/meu-perfil.module';
import { NgModule } from '@angular/core';
import { NotificacoesModule } from './notificacoes/notificacoes.module';

@NgModule({
    declarations: [],
    imports: [DashboardInicioModule, MeuPerfilModule, NotificacoesModule],
    exports: []
})
export class DashboardModule {}
