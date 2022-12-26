import { CommonModule } from '@angular/common';
import { MovimentacoesCardMovimentacaoContabilModule } from '@/app/apresentacao/componentes/negocios/movimentacoes/card-movimentacao-contabil/card-movimentacao-contabil.module';
import { MovimentacoesContabeisComponent } from './contabeis.component';
import { MovimentacoesPanelPessoaPesquisaModule } from '@/app/apresentacao/componentes/negocios/movimentacoes/panel-pessoa-pesquisa/panel-pessoa-pesquisa.module';
import { NgModule } from '@angular/core';

@NgModule({
    declarations: [MovimentacoesContabeisComponent],
    imports: [CommonModule, MovimentacoesCardMovimentacaoContabilModule, MovimentacoesPanelPessoaPesquisaModule],
    exports: [MovimentacoesContabeisComponent]
})
export class MovimentacoesContabeisModule {}
