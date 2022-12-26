import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ButtonModule } from '@/app/apresentacao/componentes/base/button/button.module';
import { CheckboxModule } from '@/app/apresentacao/componentes/base/checkbox/checkbox.module';
import { CommonModule } from '@angular/common';
import { IconModule } from '@/app/apresentacao/componentes/base/icon/icon.module';
import { InputModule } from '@/app/apresentacao/componentes/base/input/input.module';
import { MatDialogModule } from '@angular/material/dialog';
import { ModaisFormulariosNovaMovimentacaoFinanceiraComponent } from './nova-movimentacao-financeira.component';
import { NgModule } from '@angular/core';
import { SelectModule } from '../../../base/select/select.module';
import { SpinnerModule } from '@/app/apresentacao/componentes/base/spinner/spinner.module';
import { SwitchModule } from '@/app/apresentacao/componentes/base/switch/switch.module';

@NgModule({
    declarations: [ModaisFormulariosNovaMovimentacaoFinanceiraComponent],
    imports: [CommonModule, MatDialogModule, ButtonModule, InputModule, FormsModule, ReactiveFormsModule, SwitchModule, SpinnerModule, CheckboxModule, IconModule, SelectModule],
    exports: [ModaisFormulariosNovaMovimentacaoFinanceiraComponent]
})
export class ModaisFormulariosNovaMovimentacaoFinanceiraModule {}
