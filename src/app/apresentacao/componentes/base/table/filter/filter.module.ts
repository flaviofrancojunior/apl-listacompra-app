import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CommonModule } from '@angular/common';
import { IconModule } from '@/app/apresentacao/componentes/base/icon/icon.module';
import { InputModule } from '@/app/apresentacao/componentes/base/input/input.module';
import { MatChipsModule } from '@angular/material/chips';
import { MatExpansionModule } from '@angular/material/expansion';
import { NgModule } from '@angular/core';
import { SelectModule } from '@/app/apresentacao/componentes/base/select/select.module';
import { TableFilterComponent } from './filter.component';

@NgModule({
    declarations: [TableFilterComponent],
    imports: [CommonModule, FormsModule, ReactiveFormsModule, SelectModule, InputModule, IconModule, MatExpansionModule, MatChipsModule],
    exports: [TableFilterComponent]
})
export class TableFilterModule {}
