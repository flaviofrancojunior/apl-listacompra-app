import { CommonModule } from '@angular/common';
import { ConfiguracaoHelper } from './configuracao.helper';
import { EstadosHelper } from './estados.helper';
import { ExportarHelper } from './exportar.helper';
import { IConfiguracaoHelper } from '@/app/dominio/contratos/helpers/configuracao.interface';
import { IEstadosHelper } from '@/app/dominio/contratos/helpers/estados.interface';
import { IExportarHelper } from '@/app/dominio/contratos/helpers/exportar.interface';
import { IModaisHelper } from '@/app/dominio/contratos/helpers/modais.interface';
import { INavegacaoHelper } from '@/app/dominio/contratos/helpers/navegacao.interface';
import { ISnackbarHelper } from '@/app/dominio/contratos/helpers/snackbar.interface';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ModaisHelper } from './modais.helper';
import { NavegacaoHelper } from './navegacao.helper';
import { NgModule } from '@angular/core';
import { SnackbarHelper } from './snackbar.helper';

@NgModule({
    declarations: [],
    imports: [CommonModule, MatSnackBarModule],
    providers: [
        { provide: IConfiguracaoHelper, useClass: ConfiguracaoHelper },
        { provide: IEstadosHelper, useClass: EstadosHelper },
        { provide: IExportarHelper, useClass: ExportarHelper },
        { provide: IModaisHelper, useClass: ModaisHelper },
        { provide: INavegacaoHelper, useClass: NavegacaoHelper },
        { provide: ISnackbarHelper, useClass: SnackbarHelper }
    ]
})
export class HelpersModule {}
