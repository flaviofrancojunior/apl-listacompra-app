import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ButtonModule } from '@/app/apresentacao/componentes/base/button/button.module';
import { CardModule } from '@/app/apresentacao/componentes/base/card/card.module';
import { CommonModule } from '@angular/common';
import { IconModule } from '@/app/apresentacao/componentes/base/icon/icon.module';
import { InputModule } from '@/app/apresentacao/componentes/base/input/input.module';
import { MovimentacoesPanelPessoaPesquisaComponent } from './panel-pessoa-pesquisa.component';
import { NgModule } from '@angular/core';
import { SelectModule } from '@/app/apresentacao/componentes/base/select/select.module';
import { SpinnerModule } from '@/app/apresentacao/componentes/base/spinner/spinner.module';

@NgModule({
    declarations: [MovimentacoesPanelPessoaPesquisaComponent],
    imports: [CommonModule, SpinnerModule, CardModule, FormsModule, ReactiveFormsModule, SelectModule, InputModule, ButtonModule, IconModule],
    exports: [MovimentacoesPanelPessoaPesquisaComponent]
})
export class MovimentacoesPanelPessoaPesquisaModule {}
