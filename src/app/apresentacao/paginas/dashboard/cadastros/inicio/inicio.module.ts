import { CadastrosCardBancosModule } from '@/app/apresentacao/componentes/negocios/cadastros/card-bancos/card-bancos.module';
import { CadastrosCardHistoricoPadraoModule } from '@/app/apresentacao/componentes/negocios/cadastros/card-historico-padrao/card-historico-padrao.module';
import { CadastrosCardPlanoContasModule } from '@/app/apresentacao/componentes/negocios/cadastros/card-plano-contas/card-plano-contas.module';
import { CadastrosCardUsuariosModule } from '@/app/apresentacao/componentes/negocios/cadastros/card-usuarios/card-usuarios.module';
import { CadastrosInicioComponent } from './inicio.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TabsModule } from '@/app/apresentacao/componentes/base/tabs/tabs.module';

@NgModule({
    declarations: [CadastrosInicioComponent],
    imports: [CommonModule, TabsModule, CadastrosCardBancosModule, CadastrosCardUsuariosModule, CadastrosCardHistoricoPadraoModule, CadastrosCardPlanoContasModule],
    exports: [CadastrosInicioComponent]
})
export class CadastrosInicioModule {}
