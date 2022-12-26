import { ButtonModule } from '@/app/apresentacao/componentes/base/button/button.module';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { ModaisConfirmacaoComponent } from './confirmacao.component';
import { NgModule } from '@angular/core';

@NgModule({
    declarations: [ModaisConfirmacaoComponent],
    imports: [CommonModule, MatDialogModule, ButtonModule],
    exports: [ModaisConfirmacaoComponent]
})
export class ModaisConfirmacaoModule {}
