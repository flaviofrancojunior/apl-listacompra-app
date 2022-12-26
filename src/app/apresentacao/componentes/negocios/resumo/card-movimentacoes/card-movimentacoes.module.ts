import { BadgeModule } from '@/app/apresentacao/componentes/base/badge/badge.module';
import { ButtonModule } from '@/app/apresentacao/componentes/base/button/button.module';
import { CardModule } from '@/app/apresentacao/componentes/base/card/card.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ResumoCardMovimentacoesComponent } from './card-movimentacoes.component';
import { SpinnerModule } from '@/app/apresentacao/componentes/base/spinner/spinner.module';

@NgModule({
    declarations: [ResumoCardMovimentacoesComponent],
    imports: [CommonModule, CardModule, ButtonModule, SpinnerModule, BadgeModule],
    exports: [ResumoCardMovimentacoesComponent]
})
export class ResumoCardMovimentacoesModule {}
