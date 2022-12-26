import { ButtonModule } from '@/app/apresentacao/componentes/base/button/button.module';
import { CollapseModule } from '@/app/apresentacao/componentes/base/collapse/collapse.module';
import { CommonModule } from '@angular/common';
import { IconModule } from '@/app/apresentacao/componentes/base/icon/icon.module';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NgModule } from '@angular/core';
import { SidenavComponent } from './sidenav.component';

@NgModule({
    declarations: [SidenavComponent],
    imports: [CommonModule, MatSidenavModule, MatTooltipModule, ButtonModule, IconModule, MatExpansionModule, CollapseModule],
    exports: [SidenavComponent]
})
export class SidenavModule {}
