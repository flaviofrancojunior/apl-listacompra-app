import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ButtonModule } from '@/app/apresentacao/componentes/base/button/button.module';
import { CommonModule } from '@angular/common';
import { InputModule } from '@/app/apresentacao/componentes/base/input/input.module';
import { MatDialogModule } from '@angular/material/dialog';
import { ModaisFormulariosNovoPlanoContaComponent } from './novo-plano-conta.component';
import { NgModule } from '@angular/core';
import { SelectModule } from '@/app/apresentacao/componentes/base/select/select.module';
import { SpinnerModule } from '@/app/apresentacao/componentes/base/spinner/spinner.module';

@NgModule({
    declarations: [ModaisFormulariosNovoPlanoContaComponent],
    imports: [CommonModule, MatDialogModule, ButtonModule, InputModule, FormsModule, ReactiveFormsModule, SpinnerModule, SelectModule],
    exports: [ModaisFormulariosNovoPlanoContaComponent]
})
export class ModaisFormulariosNovoPlanoContaModule {}
