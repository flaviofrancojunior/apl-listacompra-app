import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ButtonModule } from '@/app/apresentacao/componentes/base/button/button.module';
import { CommonModule } from '@angular/common';
import { InputModule } from '@/app/apresentacao/componentes/base/input/input.module';
import { MatDialogModule } from '@angular/material/dialog';
import { ModaisFormulariosNovoParametroComponent } from './novo-parametro.component';
import { NgModule } from '@angular/core';
import { SpinnerModule } from '@/app/apresentacao/componentes/base/spinner/spinner.module';
import { SwitchModule } from '@/app/apresentacao/componentes/base/switch/switch.module';

@NgModule({
    declarations: [ModaisFormulariosNovoParametroComponent],
    imports: [CommonModule, MatDialogModule, ButtonModule, InputModule, FormsModule, ReactiveFormsModule, SwitchModule, SpinnerModule],
    exports: [ModaisFormulariosNovoParametroComponent]
})
export class ModaisFormulariosNovoParametroModule {}
