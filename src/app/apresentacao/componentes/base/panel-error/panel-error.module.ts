import { ButtonModule } from '@/app/apresentacao/componentes/base/button/button.module';
import { CardModule } from '@/app/apresentacao/componentes/base/card/card.module';
import { CommonModule } from '@angular/common';
import { IconModule } from '@/app/apresentacao/componentes/base/icon/icon.module';
import { NgModule } from '@angular/core';
import { PanelErrorComponent } from './panel-error.component';

@NgModule({
    declarations: [PanelErrorComponent],
    imports: [CommonModule, ButtonModule, IconModule, CardModule],
    exports: [PanelErrorComponent]
})
export class PanelErrorModule {}
