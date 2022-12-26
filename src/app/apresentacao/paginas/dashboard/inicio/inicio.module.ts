import { CardModule } from '@/app/apresentacao/componentes/base/card/card.module';
import { CommonModule } from '@angular/common';
import { DashboardInicioComponent } from './inicio.component';
import { IconModule } from '@/app/apresentacao/componentes/base/icon/icon.module';
import { NgModule } from '@angular/core';

@NgModule({
    declarations: [DashboardInicioComponent],
    imports: [CommonModule, CardModule, IconModule],
    exports: [DashboardInicioComponent]
})
export class DashboardInicioModule {}
