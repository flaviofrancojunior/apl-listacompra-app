import { CadastrosCardNovoPlanoContaModule } from '@/app/apresentacao/componentes/negocios/cadastros/card-novo-plano-conta/card-novo-plano-conta.module';
import { CadastrosNovoPlanoContaComponent } from './novo-plano-conta.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

@NgModule({
    declarations: [CadastrosNovoPlanoContaComponent],
    imports: [CommonModule, CadastrosCardNovoPlanoContaModule],
    exports: [CadastrosNovoPlanoContaComponent]
})
export class CadastrosNovoPlanoContaModule {}
