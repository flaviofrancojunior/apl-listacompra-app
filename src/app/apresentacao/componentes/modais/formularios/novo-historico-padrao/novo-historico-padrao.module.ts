import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ButtonModule } from '@/app/apresentacao/componentes/base/button/button.module';
import { CheckboxModule } from '@/app/apresentacao/componentes/base/checkbox/checkbox.module';
import { CommonModule } from '@angular/common';
import { IconModule } from '@/app/apresentacao/componentes/base/icon/icon.module';
import { InputModule } from '@/app/apresentacao/componentes/base/input/input.module';
import { MatDialogModule } from '@angular/material/dialog';
import { ModaisFormulariosNovoHistoricoPadraoComponent } from './novo-historico-padrao.component';
import { NgModule } from '@angular/core';
import { SpinnerModule } from '@/app/apresentacao/componentes/base/spinner/spinner.module';
import { SwitchModule } from '@/app/apresentacao/componentes/base/switch/switch.module';

@NgModule({
    declarations: [ModaisFormulariosNovoHistoricoPadraoComponent],
    imports: [CommonModule, MatDialogModule, ButtonModule, InputModule, FormsModule, ReactiveFormsModule, SwitchModule, SpinnerModule, CheckboxModule, IconModule],
    exports: [ModaisFormulariosNovoHistoricoPadraoComponent]
})
export class ModaisFormulariosNovoHistoricoPadraoModule {}
