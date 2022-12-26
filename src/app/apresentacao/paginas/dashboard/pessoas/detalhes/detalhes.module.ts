import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PessoasCardPessoaDetalheModule } from '@/app/apresentacao/componentes/negocios/pessoas/card-pessoa-detalhe/card-pessoa-detalhe.module';
import { PessoasDetalhesComponent } from './detalhes.component';

@NgModule({
    declarations: [PessoasDetalhesComponent],
    imports: [CommonModule, PessoasCardPessoaDetalheModule],
    exports: [PessoasDetalhesComponent]
})
export class PessoasDetalhesModule {}
