import { CardModule } from '@/app/apresentacao/componentes/base/card/card.module';
import { CommonModule } from '@angular/common';
import { DashboardInicioComponent } from './inicio.component';
import { IconModule } from '@/app/apresentacao/componentes/base/icon/icon.module';
import { NgModule } from '@angular/core';
import { ResumoCardMovimentacoesModule } from '@/app/apresentacao/componentes/negocios/resumo/card-movimentacoes/card-movimentacoes.module';
import { ResumoCardPessoasModule } from '@/app/apresentacao/componentes/negocios/resumo/card-pessoas/card-pessoas.module';

@NgModule({
    declarations: [DashboardInicioComponent],
    imports: [CommonModule, ResumoCardMovimentacoesModule, ResumoCardPessoasModule, CardModule, IconModule],
    exports: [DashboardInicioComponent]
})
export class DashboardInicioModule {}
