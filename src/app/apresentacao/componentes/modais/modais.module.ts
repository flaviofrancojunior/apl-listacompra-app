import { CommonModule } from '@angular/common';
import { ModaisConfirmacaoModule } from './confirmacao/confirmacao.module';
import { ModaisContabilizacaoModule } from './contabilizacao/contabilizacao.module';
import { ModaisFormulariosNovaContaModule } from './formularios/nova-conta/nova-conta.module';
import { ModaisFormulariosNovaMoedaModule } from './formularios/nova-moeda/nova-moeda.module';
import { ModaisFormulariosNovaMovimentacaoContabilDetalheModule } from './formularios/nova-movimentacao-contabil-detalhe/nova-movimentacao-contabil-detalhe.module';
import { ModaisFormulariosNovaMovimentacaoContabilModule } from './formularios/nova-movimentacao-contabil/nova-movimentacao-contabil.module';
import { ModaisFormulariosNovaMovimentacaoFinanceiraModule } from './formularios/nova-movimentacao-financeira/nova-movimentacao-financeira.module';
import { ModaisFormulariosNovaPessoaModule } from './formularios/nova-pessoa/nova-pessoa.module';
import { ModaisFormulariosNovoBancoModule } from './formularios/novo-banco/novo-banco.module';
import { ModaisFormulariosNovoCartaoModule } from './formularios/novo-cartao/novo-cartao.module';
import { ModaisFormulariosNovoHistoricoPadraoModule } from './formularios/novo-historico-padrao/novo-historico-padrao.module';
import { ModaisFormulariosNovoParametroModule } from './formularios/novo-parametro/novo-parametro.module';
import { ModaisFormulariosNovoPlanoContaModule } from './formularios/novo-plano-conta/novo-plano-conta.module';
import { ModaisFormulariosNovoUsuarioModule } from './formularios/novo-usuario/novo-usuario.module';
import { ModaisHistoricoModule } from './historico/historico.module';
import { ModaisInformacaoModule } from './informacao/informacao.module';
import { NgModule } from '@angular/core';

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        ModaisConfirmacaoModule,
        ModaisContabilizacaoModule,
        ModaisFormulariosNovaContaModule,
        ModaisFormulariosNovaMoedaModule,
        ModaisFormulariosNovaMovimentacaoContabilDetalheModule,
        ModaisFormulariosNovaMovimentacaoContabilModule,
        ModaisFormulariosNovaMovimentacaoFinanceiraModule,
        ModaisFormulariosNovaPessoaModule,
        ModaisFormulariosNovoBancoModule,
        ModaisFormulariosNovoCartaoModule,
        ModaisFormulariosNovoHistoricoPadraoModule,
        ModaisFormulariosNovoParametroModule,
        ModaisFormulariosNovoPlanoContaModule,
        ModaisFormulariosNovoUsuarioModule,
        ModaisHistoricoModule,
        ModaisInformacaoModule
    ],
    exports: []
})
export class ModaisModule {}
