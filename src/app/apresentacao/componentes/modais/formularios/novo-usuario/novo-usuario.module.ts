import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ButtonModule } from '@/app/apresentacao/componentes/base/button/button.module';
import { CommonModule } from '@angular/common';
import { InputModule } from '@/app/apresentacao/componentes/base/input/input.module';
import { MatDialogModule } from '@angular/material/dialog';
import { ModaisFormulariosNovoUsuarioComponent } from './novo-usuario.component';
import { NgModule } from '@angular/core';
import { RadioModule } from '@/app/apresentacao/componentes/base/radio/radio.module';
import { SpinnerModule } from '@/app/apresentacao/componentes/base/spinner/spinner.module';
import { SwitchModule } from '@/app/apresentacao/componentes/base/switch/switch.module';
import { IconModule } from '@/app/apresentacao/componentes/base/icon/icon.module';

@NgModule({
    declarations: [ModaisFormulariosNovoUsuarioComponent],
    imports: [CommonModule, MatDialogModule, ButtonModule, InputModule, FormsModule, ReactiveFormsModule, SwitchModule, SpinnerModule, RadioModule, IconModule],
    exports: [ModaisFormulariosNovoUsuarioComponent]
})
export class ModaisFormulariosNovoUsuarioModule {}
