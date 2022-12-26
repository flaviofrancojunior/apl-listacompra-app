import { ButtonModule } from '@/app/apresentacao/componentes/base/button/button.module';
import { CardModule } from '@/app/apresentacao/componentes/base/card/card.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ResumoCardPessoasComponent } from './card-pessoas.component';
import { SpinnerModule } from '@/app/apresentacao/componentes/base/spinner/spinner.module';

@NgModule({
    declarations: [ResumoCardPessoasComponent],
    imports: [CommonModule, CardModule, ButtonModule, SpinnerModule],
    exports: [ResumoCardPessoasComponent]
})
export class ResumoCardPessoasModule {}
