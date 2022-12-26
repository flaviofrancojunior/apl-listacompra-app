import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ButtonModule } from '@/app/apresentacao/componentes/base/button/button.module';
import { CadastrosTreePlanoContasComponent } from './tree-plano-contas.component';
import { CardModule } from '@/app/apresentacao/componentes/base/card/card.module';
import { CommonModule } from '@angular/common';
import { IconModule } from '@/app/apresentacao/componentes/base/icon/icon.module';
import { InputModule } from '@/app/apresentacao/componentes/base/input/input.module';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTreeModule } from '@angular/material/tree';
import { NgModule } from '@angular/core';
import { SelectModule } from '@/app/apresentacao/componentes/base/select/select.module';
import { SpinnerModule } from '@/app/apresentacao/componentes/base/spinner/spinner.module';

@NgModule({
    declarations: [CadastrosTreePlanoContasComponent],
    imports: [CommonModule, ButtonModule, IconModule, SpinnerModule, CardModule, InputModule, SelectModule, FormsModule, ReactiveFormsModule, MatTreeModule, FormsModule, ReactiveFormsModule, MatTooltipModule],
    exports: [CadastrosTreePlanoContasComponent]
})
export class CadastrosTreePlanoContasModule {}
