import { CommonModule } from '@angular/common';
import { MovimentacoesCardUltimosLancamentosModule } from '@/app/apresentacao/componentes/negocios/movimentacoes/card-ultimos-lancamentos/card-ultimos-lancamentos.module';
import { MovimentacoesFinanceirasComponent } from './financeiras.component';
import { MovimentacoesPanelPessoaPesquisaModule } from '@/app/apresentacao/componentes/negocios/movimentacoes/panel-pessoa-pesquisa/panel-pessoa-pesquisa.module';
import { NgModule } from '@angular/core';

@NgModule({
    declarations: [MovimentacoesFinanceirasComponent],
    imports: [CommonModule, MovimentacoesCardUltimosLancamentosModule, MovimentacoesPanelPessoaPesquisaModule],
    exports: [MovimentacoesFinanceirasComponent]
})
export class MovimentacoesFinanceirasModule {}
