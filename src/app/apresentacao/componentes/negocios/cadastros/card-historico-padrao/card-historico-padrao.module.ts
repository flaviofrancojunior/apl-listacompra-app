import { ButtonModule } from '@/app/apresentacao/componentes/base/button/button.module';
import { CadastrosCardHistoricoPadraoComponent } from './card-historico-padrao.component';
import { CommonModule } from '@angular/common';
import { IconModule } from '@/app/apresentacao/componentes/base/icon/icon.module';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NgModule } from '@angular/core';
import { SpinnerModule } from '@/app/apresentacao/componentes/base/spinner/spinner.module';
import { TableFilterModule } from '@/app/apresentacao/componentes/base/table/filter/filter.module';

@NgModule({
    declarations: [CadastrosCardHistoricoPadraoComponent],
    imports: [CommonModule, ButtonModule, IconModule, SpinnerModule, MatTableModule, MatSortModule, TableFilterModule, MatTooltipModule],
    exports: [CadastrosCardHistoricoPadraoComponent]
})
export class CadastrosCardHistoricoPadraoModule {}
