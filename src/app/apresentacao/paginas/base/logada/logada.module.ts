import { BaseLogadaComponent } from './logada.component';
import { CommonModule } from '@angular/common';
import { HeaderModule } from '@/app/apresentacao/componentes/base/header/header.module';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SidenavModule } from '@/app/apresentacao/componentes/base/sidenav/sidenav.module';
import { SpinnerModule } from '@/app/apresentacao/componentes/base/spinner/spinner.module';
import { SubnavModule } from '@/app/apresentacao/componentes/base/subnav/subnav.module';

@NgModule({
    declarations: [BaseLogadaComponent],
    imports: [CommonModule, RouterModule, SidenavModule, HeaderModule, SpinnerModule, SubnavModule],
    exports: [BaseLogadaComponent]
})
export class BaseLogadaModule {}
