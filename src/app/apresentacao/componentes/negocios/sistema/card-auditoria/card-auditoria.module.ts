import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ButtonModule } from '@/app/apresentacao/componentes/base/button/button.module';
import { CommonModule } from '@angular/common';
import { IconModule } from '@/app/apresentacao/componentes/base/icon/icon.module';
import { InputModule } from '@/app/apresentacao/componentes/base/input/input.module';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { NgModule } from '@angular/core';
import { SistemaCardAuditoriaComponent } from './card-auditoria.component';
import { SpinnerModule } from '@/app/apresentacao/componentes/base/spinner/spinner.module';
import { TableFilterModule } from '@/app/apresentacao/componentes/base/table/filter/filter.module';

@NgModule({
    declarations: [SistemaCardAuditoriaComponent],
    imports: [CommonModule, ButtonModule, SpinnerModule, MatTableModule, MatSortModule, MatPaginatorModule, IconModule, TableFilterModule, FormsModule, ReactiveFormsModule, InputModule],
    exports: [SistemaCardAuditoriaComponent]
})
export class SistemaCardAuditoriaModule {}
