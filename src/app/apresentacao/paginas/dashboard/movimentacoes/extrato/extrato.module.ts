import { CommonModule } from '@angular/common';
import { MovimentacoesCardExtratoModule } from '@/app/apresentacao/componentes/negocios/movimentacoes/card-extrato/card-extrato.module';
import { MovimentacoesExtratoComponent } from './extrato.component';
import { MovimentacoesPanelPessoaPesquisaModule } from '@/app/apresentacao/componentes/negocios/movimentacoes/panel-pessoa-pesquisa/panel-pessoa-pesquisa.module';
import { NgModule } from '@angular/core';

@NgModule({
    declarations: [MovimentacoesExtratoComponent],
    imports: [CommonModule, MovimentacoesCardExtratoModule, MovimentacoesPanelPessoaPesquisaModule],
    exports: [MovimentacoesExtratoComponent]
})
export class MovimentacoesExtratoModule {}
