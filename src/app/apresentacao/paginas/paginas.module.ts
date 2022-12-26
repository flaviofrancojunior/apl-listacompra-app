import { BaseModule } from './base/base.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { LoginModule } from './login/login.module';
import { NgModule } from '@angular/core';
import { PaginasRotasModule } from './paginas-rotas.module';

@NgModule({
    declarations: [],
    imports: [PaginasRotasModule, BaseModule, LoginModule, DashboardModule],
    exports: [PaginasRotasModule]
})
export class PaginasModule {}
