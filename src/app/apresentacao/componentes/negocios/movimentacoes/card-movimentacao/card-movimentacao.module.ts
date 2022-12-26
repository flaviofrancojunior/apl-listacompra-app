import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ButtonModule } from '@/app/apresentacao/componentes/base/button/button.module';
import { CardModule } from '@/app/apresentacao/componentes/base/card/card.module';
import { CommonModule } from '@angular/common';
import { IconModule } from '@/app/apresentacao/componentes/base/icon/icon.module';
import { InputModule } from '@/app/apresentacao/componentes/base/input/input.module';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MovimentacoesCardMovimentacaoComponent } from './card-movimentacao.component';
import { NgModule } from '@angular/core';
import { SelectModule } from '@/app/apresentacao/componentes/base/select/select.module';
import { SpinnerModule } from '@/app/apresentacao/componentes/base/spinner/spinner.module';
import { TableFilterModule } from '@/app/apresentacao/componentes/base/table/filter/filter.module';
import { TablePaginatorModule } from './../../../base/table/paginator/paginator.module';

@NgModule({
    declarations: [MovimentacoesCardMovimentacaoComponent],
    imports: [CommonModule, ButtonModule, IconModule, SpinnerModule, MatTableModule, MatSortModule, TableFilterModule, MatTooltipModule, CardModule, InputModule, FormsModule, ReactiveFormsModule, SelectModule, TablePaginatorModule],
    exports: [MovimentacoesCardMovimentacaoComponent]
})
export class MovimentacoesCardMovimentacaoModule {}
