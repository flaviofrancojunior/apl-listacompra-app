import { CommonModule } from '@angular/common';
import { MovimentacoesCardMovimentacaoModule } from '@/app/apresentacao/componentes/negocios/movimentacoes/card-movimentacao/card-movimentacao.module';
import { MovimentacoesNovaMovimentacaoComponent } from './nova-movimentacao.component';
import { NgModule } from '@angular/core';

@NgModule({
    declarations: [MovimentacoesNovaMovimentacaoComponent],
    imports: [CommonModule, MovimentacoesCardMovimentacaoModule],
    exports: [MovimentacoesNovaMovimentacaoComponent]
})
export class MovimentacoesNovaMovimentacaoModule {}
