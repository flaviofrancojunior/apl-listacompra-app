import { CommonModule } from '@angular/common';
import { MatPaginatorModule } from '@angular/material/paginator';
import { NgModule } from '@angular/core';
import { TablePaginatorComponent } from './paginator.component';

@NgModule({
    declarations: [TablePaginatorComponent],
    imports: [CommonModule, MatPaginatorModule],
    exports: [TablePaginatorComponent]
})
export class TablePaginatorModule {}
