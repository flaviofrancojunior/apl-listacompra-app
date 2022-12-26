import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PessoasCardPessoasModule } from '@/app/apresentacao/componentes/negocios/pessoas/card-pessoas/card-pessoas.module';
import { PessoasInicioComponent } from './inicio.component';

@NgModule({
    declarations: [PessoasInicioComponent],
    imports: [CommonModule, PessoasCardPessoasModule],
    exports: [PessoasInicioComponent]
})
export class PessoasInicioModule {}
