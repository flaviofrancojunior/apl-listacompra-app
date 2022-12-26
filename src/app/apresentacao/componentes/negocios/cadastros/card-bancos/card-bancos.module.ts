import { ButtonModule } from '@/app/apresentacao/componentes/base/button/button.module';
import { CadastrosCardBancosComponent } from './card-bancos.component';
import { CardModule } from '@/app/apresentacao/componentes/base/card/card.module';
import { CommonModule } from '@angular/common';
import { IconModule } from '@/app/apresentacao/componentes/base/icon/icon.module';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NgModule } from '@angular/core';
import { SpinnerModule } from '@/app/apresentacao/componentes/base/spinner/spinner.module';
import { TableFilterModule } from '@/app/apresentacao/componentes/base/table/filter/filter.module';
import { TablePaginatorModule } from '@/app/apresentacao/componentes/base/table/paginator/paginator.module';

@NgModule({
    declarations: [CadastrosCardBancosComponent],
    imports: [CommonModule, ButtonModule, IconModule, SpinnerModule, MatTableModule, MatSortModule, TableFilterModule, MatTooltipModule, TablePaginatorModule, CardModule],
    exports: [CadastrosCardBancosComponent]
})
export class CadastrosCardBancosModule {}
