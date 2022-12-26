import { CadastrosBancosComponent } from './bancos.component';
import { CadastrosCardBancosModule } from '@/app/apresentacao/componentes/negocios/cadastros/card-bancos/card-bancos.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

@NgModule({
    declarations: [CadastrosBancosComponent],
    imports: [CommonModule, CadastrosCardBancosModule],
    exports: [CadastrosBancosComponent]
})
export class CadastrosBancosModule {}
