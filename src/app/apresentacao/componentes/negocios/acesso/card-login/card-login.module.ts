import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AcessoCardLoginComponent } from './card-login.component';
import { ButtonModule } from '@/app/apresentacao/componentes/base/button/button.module';
import { CardModule } from '@/app/apresentacao/componentes/base/card/card.module';
import { CheckboxModule } from '@/app/apresentacao/componentes/base/checkbox/checkbox.module';
import { CommonModule } from '@angular/common';
import { InputModule } from '@/app/apresentacao/componentes/base/input/input.module';
import { NgModule } from '@angular/core';
import { SpinnerModule } from '@/app/apresentacao/componentes/base/spinner/spinner.module';

@NgModule({
    declarations: [AcessoCardLoginComponent],
    imports: [CommonModule, CardModule, InputModule, FormsModule, ReactiveFormsModule, ButtonModule, SpinnerModule, CheckboxModule],
    exports: [AcessoCardLoginComponent]
})
export class AcessoCardLoginModule {}
