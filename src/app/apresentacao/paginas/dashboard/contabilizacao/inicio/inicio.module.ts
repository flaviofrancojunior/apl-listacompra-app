import { CommonModule } from '@angular/common';
import { ContabilizacaoCardLotesModule } from '@/app/apresentacao/componentes/negocios/contabilizacao/card-lotes/card-lotes.module';
import { ContabilizacaoInicioComponent } from './inicio.component';
import { ContabilizacaoPanelPessoaPesquisaModule } from '@/app/apresentacao/componentes/negocios/contabilizacao/panel-pessoa-pesquisa/panel-pessoa-pesquisa.module';
import { NgModule } from '@angular/core';

@NgModule({
    declarations: [ContabilizacaoInicioComponent],
    imports: [CommonModule, ContabilizacaoPanelPessoaPesquisaModule, ContabilizacaoCardLotesModule],
    exports: [ContabilizacaoInicioComponent]
})
export class ContabilizacaoInicioModule {}
