import { AlertModule } from './../../../base/alert/alert.module';
import { ButtonModule } from '@/app/apresentacao/componentes/base/button/button.module';
import { CardModule } from '@/app/apresentacao/componentes/base/card/card.module';
import { CommonModule } from '@angular/common';
import { IconModule } from '@/app/apresentacao/componentes/base/icon/icon.module';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MovimentacoesCardExtratoComponent } from './card-extrato.component';
import { NgModule } from '@angular/core';
import { PipesModule } from '@/app/apresentacao/pipes/pipes.module';
import { SpinnerModule } from '@/app/apresentacao/componentes/base/spinner/spinner.module';
import { TableFilterModule } from '@/app/apresentacao/componentes/base/table/filter/filter.module';

@NgModule({
    declarations: [MovimentacoesCardExtratoComponent],
    imports: [CommonModule, ButtonModule, IconModule, SpinnerModule, MatTableModule, MatSortModule, TableFilterModule, MatTooltipModule, CardModule, AlertModule, PipesModule],
    exports: [MovimentacoesCardExtratoComponent]
})
export class MovimentacoesCardExtratoModule {}
