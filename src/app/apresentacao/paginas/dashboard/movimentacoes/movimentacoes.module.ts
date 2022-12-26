import { MovimentacoesContabeisModule } from './contabeis/contabeis.module';
import { MovimentacoesExtratoModule } from './extrato/extrato.module';
import { MovimentacoesFinanceirasModule } from './financeiras/financeiras.module';
import { MovimentacoesInicioModule } from './inicio/inicio.module';
import { MovimentacoesNovaMovimentacaoModule } from './nova-movimentacao/nova-movimentacao.module';
import { MovimentacoesSincronizacaoModule } from './sincronizacao/sincronizacao.module';
import { NgModule } from '@angular/core';

@NgModule({
    declarations: [],
    imports: [MovimentacoesInicioModule, MovimentacoesNovaMovimentacaoModule, MovimentacoesFinanceirasModule, MovimentacoesContabeisModule, MovimentacoesSincronizacaoModule, MovimentacoesExtratoModule],
    exports: []
})
export class MovimentacoesModule {}
