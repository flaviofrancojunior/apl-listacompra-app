import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AlertModule } from '@/app/apresentacao/componentes/base/alert/alert.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonModule } from '@/app/apresentacao/componentes/base/button/button.module';
import { CardModule } from '@/app/apresentacao/componentes/base/card/card.module';
import { CheckboxModule } from '@/app/apresentacao/componentes/base/checkbox/checkbox.module';
import { CommonModule } from '@angular/common';
import { IconModule } from '@/app/apresentacao/componentes/base/icon/icon.module';
import { InputModule } from '@/app/apresentacao/componentes/base/input/input.module';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MovimentacoesCardSincronizacaoComponent } from './card-sincronizacao.component';
import { NgModule } from '@angular/core';
import { SelectModule } from '@/app/apresentacao/componentes/base/select/select.module';
import { SpinnerModule } from '@/app/apresentacao/componentes/base/spinner/spinner.module';
import { TableFilterModule } from '@/app/apresentacao/componentes/base/table/filter/filter.module';

@NgModule({
    declarations: [MovimentacoesCardSincronizacaoComponent],
    imports: [CommonModule, ButtonModule, IconModule, SpinnerModule, MatTableModule, MatSortModule, TableFilterModule, MatTooltipModule, CardModule, AlertModule, BrowserAnimationsModule, SelectModule, InputModule, CheckboxModule, FormsModule, ReactiveFormsModule],
    exports: [MovimentacoesCardSincronizacaoComponent]
})
export class MovimentacoesCardSincronizacaoModule {}
