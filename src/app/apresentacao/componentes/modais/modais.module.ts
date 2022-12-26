import { CommonModule } from '@angular/common';
import { ModaisConfirmacaoModule } from './confirmacao/confirmacao.module';
import { ModaisInformacaoModule } from './informacao/informacao.module';
import { NgModule } from '@angular/core';

@NgModule({
    declarations: [],
    imports: [CommonModule, ModaisConfirmacaoModule, ModaisInformacaoModule],
    exports: []
})
export class ModaisModule {}

