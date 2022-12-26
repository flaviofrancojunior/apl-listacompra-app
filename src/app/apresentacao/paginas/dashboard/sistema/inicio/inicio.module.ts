import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SistemaCardAuditoriaModule } from '@/app/apresentacao/componentes/negocios/sistema/card-auditoria/card-auditoria.module';
import { SistemaCardMoedasModule } from '@/app/apresentacao/componentes/negocios/sistema/card-moedas/card-moedas.module';
import { SistemaCardParametrosModule } from '@/app/apresentacao/componentes/negocios/sistema/card-parametros/card-parametros.module';
import { SistemaInicioComponent } from './inicio.component';
import { TabsModule } from '@/app/apresentacao/componentes/base/tabs/tabs.module';

@NgModule({
    declarations: [SistemaInicioComponent],
    imports: [CommonModule, TabsModule, SistemaCardAuditoriaModule, SistemaCardParametrosModule, SistemaCardMoedasModule],
    exports: [SistemaInicioComponent]
})
export class SistemaInicioModule {}
