import { ButtonModule } from '@/app/apresentacao/componentes/base/button/button.module';
import { CadastrosCardNovoPlanoContaComponent } from './card-novo-plano-conta.component';
import { CadastrosTreePlanoContasModule } from '../tree-plano-contas/tree-plano-contas.module';
import { CardModule } from '@/app/apresentacao/componentes/base/card/card.module';
import { CommonModule } from '@angular/common';
import { IconModule } from '@/app/apresentacao/componentes/base/icon/icon.module';
import { NgModule } from '@angular/core';
import { SpinnerModule } from '@/app/apresentacao/componentes/base/spinner/spinner.module';

@NgModule({
    declarations: [CadastrosCardNovoPlanoContaComponent],
    imports: [CommonModule, ButtonModule, IconModule, SpinnerModule, CardModule, CadastrosTreePlanoContasModule],
    exports: [CadastrosCardNovoPlanoContaComponent]
})
export class CadastrosCardNovoPlanoContaModule {}
