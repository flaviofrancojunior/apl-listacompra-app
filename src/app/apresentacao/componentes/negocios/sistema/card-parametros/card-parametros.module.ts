import { ButtonModule } from '@/app/apresentacao/componentes/base/button/button.module';
import { CommonModule } from '@angular/common';
import { IconModule } from '@/app/apresentacao/componentes/base/icon/icon.module';
import { InputModule } from '@/app/apresentacao/componentes/base/input/input.module';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NgModule } from '@angular/core';
import { SistemaCardParametrosComponent } from './card-parametros.component';
import { SpinnerModule } from '@/app/apresentacao/componentes/base/spinner/spinner.module';
import { TableFilterModule } from '@/app/apresentacao/componentes/base/table/filter/filter.module';

@NgModule({
    declarations: [SistemaCardParametrosComponent],
    imports: [CommonModule, ButtonModule, SpinnerModule, MatTableModule, MatSortModule, MatPaginatorModule, IconModule, TableFilterModule, InputModule, MatTooltipModule],
    exports: [SistemaCardParametrosComponent]
})
export class SistemaCardParametrosModule {}
