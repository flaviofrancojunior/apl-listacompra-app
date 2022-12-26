import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ButtonModule } from '@/app/apresentacao/componentes/base/button/button.module';
import { CheckboxModule } from '@/app/apresentacao/componentes/base/checkbox/checkbox.module';
import { CommonModule } from '@angular/common';
import { IconModule } from '@/app/apresentacao/componentes/base/icon/icon.module';
import { InputModule } from '@/app/apresentacao/componentes/base/input/input.module';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ModaisFormulariosNovaMovimentacaoContabilDetalheComponent } from './nova-movimentacao-contabil-detalhe.component';
import { NgModule } from '@angular/core';
import { PipesModule } from '@/app/apresentacao/pipes/pipes.module';
import { SelectModule } from '@/app/apresentacao/componentes/base/select/select.module';
import { SpinnerModule } from '@/app/apresentacao/componentes/base/spinner/spinner.module';
import { SwitchModule } from '@/app/apresentacao/componentes/base/switch/switch.module';
import { TabsModule } from '@/app/apresentacao/componentes/base/tabs/tabs.module';
import { TextareaModule } from '@/app/apresentacao/componentes/base/textarea/textarea.module';

@NgModule({
    declarations: [ModaisFormulariosNovaMovimentacaoContabilDetalheComponent],
    imports: [CommonModule, MatDialogModule, ButtonModule, InputModule, FormsModule, ReactiveFormsModule, SwitchModule, SpinnerModule, CheckboxModule, IconModule, SelectModule, TabsModule, PipesModule, MatTableModule, MatSortModule, MatTooltipModule, TextareaModule],
    exports: [ModaisFormulariosNovaMovimentacaoContabilDetalheComponent]
})
export class ModaisFormulariosNovaMovimentacaoContabilDetalheModule {}
