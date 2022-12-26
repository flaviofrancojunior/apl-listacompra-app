import { CommonModule } from '@angular/common';
import { MovimentacoesCardSincronizacaoModule } from '@/app/apresentacao/componentes/negocios/movimentacoes/card-sincronizacao/card-sincronizacao.module';
import { MovimentacoesPanelPessoaPesquisaModule } from '@/app/apresentacao/componentes/negocios/movimentacoes/panel-pessoa-pesquisa/panel-pessoa-pesquisa.module';
import { MovimentacoesSincronizacaoComponent } from './sincronizacao.component';
import { NgModule } from '@angular/core';

@NgModule({
    declarations: [MovimentacoesSincronizacaoComponent],
    imports: [CommonModule, MovimentacoesPanelPessoaPesquisaModule, MovimentacoesCardSincronizacaoModule],
    exports: [MovimentacoesSincronizacaoComponent]
})
export class MovimentacoesSincronizacaoModule {}
