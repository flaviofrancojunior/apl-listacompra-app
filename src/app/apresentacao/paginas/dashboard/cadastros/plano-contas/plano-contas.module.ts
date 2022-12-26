import { CadastrosCardPlanoContasModule } from '@/app/apresentacao/componentes/negocios/cadastros/card-plano-contas/card-plano-contas.module';
import { CadastrosPlanoContasComponent } from './plano-contas.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

@NgModule({
    declarations: [CadastrosPlanoContasComponent],
    imports: [CommonModule, CadastrosCardPlanoContasModule],
    exports: [CadastrosPlanoContasComponent]
})
export class CadastrosPlanoContasModule {}
