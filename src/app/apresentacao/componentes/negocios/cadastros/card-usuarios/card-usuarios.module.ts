import { ButtonModule } from '@/app/apresentacao/componentes/base/button/button.module';
import { CadastrosCardUsuariosComponent } from './card-usuarios.component';
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
    declarations: [CadastrosCardUsuariosComponent],
    imports: [CommonModule, ButtonModule, SpinnerModule, MatTableModule, MatSortModule, IconModule, TableFilterModule, MatTooltipModule, TablePaginatorModule, CardModule],
    exports: [CadastrosCardUsuariosComponent]
})
export class CadastrosCardUsuariosModule {}
