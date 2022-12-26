import { ButtonModule } from '@/app/apresentacao/componentes/base/button/button.module';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { ModaisInformacaoComponent } from './informacao.component';
import { NgModule } from '@angular/core';

@NgModule({
    declarations: [ModaisInformacaoComponent],
    imports: [CommonModule, MatDialogModule, ButtonModule],
    exports: [ModaisInformacaoComponent]
})
export class ModaisInformacaoModule {}
