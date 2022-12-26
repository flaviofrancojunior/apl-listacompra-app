import { ButtonModule } from '@/app/apresentacao/componentes/base/button/button.module';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { ModaisHistoricoComponent } from './historico.component';
import { NgModule } from '@angular/core';

@NgModule({
    declarations: [ModaisHistoricoComponent],
    imports: [CommonModule, MatDialogModule, ButtonModule, MatTableModule, MatSortModule],
    exports: [ModaisHistoricoComponent]
})
export class ModaisHistoricoModule {}
