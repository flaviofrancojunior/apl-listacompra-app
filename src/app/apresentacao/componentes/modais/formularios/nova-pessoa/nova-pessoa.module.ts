import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AlertModule } from '@/app/apresentacao/componentes/base/alert/alert.module';
import { ButtonModule } from '@/app/apresentacao/componentes/base/button/button.module';
import { CommonModule } from '@angular/common';
import { InputModule } from '@/app/apresentacao/componentes/base/input/input.module';
import { MatDialogModule } from '@angular/material/dialog';
import { ModaisFormulariosNovaPessoaComponent } from './nova-pessoa.component';
import { NgModule } from '@angular/core';
import { SelectModule } from '@/app/apresentacao/componentes/base/select/select.module';
import { SpinnerModule } from '@/app/apresentacao/componentes/base/spinner/spinner.module';
import { SwitchModule } from '@/app/apresentacao/componentes/base/switch/switch.module';

@NgModule({
    declarations: [ModaisFormulariosNovaPessoaComponent],
    imports: [CommonModule, MatDialogModule, ButtonModule, InputModule, FormsModule, ReactiveFormsModule, SwitchModule, SpinnerModule, AlertModule, SelectModule],
    exports: [ModaisFormulariosNovaPessoaComponent]
})
export class ModaisFormulariosNovaPessoaModule {}
