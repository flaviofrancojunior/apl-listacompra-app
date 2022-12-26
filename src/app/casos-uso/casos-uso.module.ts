import { AcessoUseCase } from './acesso/acesso.usecase';
import { IAcessoUseCase } from '@/app/dominio/contratos/casos-uso/acesso/acesso.interface';
import { IUsuariosBuscaUseCase } from '@/app/dominio/contratos/casos-uso/usuarios/busca.interface';
import { IUsuariosDadosUseCase } from '@/app/dominio/contratos/casos-uso/usuarios/dados.interface';

import { NgModule } from '@angular/core';

import { UsuariosBuscaUseCase } from './usuarios/busca.usecase';
import { UsuariosDadosUseCase } from './usuarios/dados.usecase';

@NgModule({
    declarations: [],
    imports: [],
    providers: [
        { provide: IAcessoUseCase, useClass: AcessoUseCase },
        { provide: IUsuariosBuscaUseCase, useClass: UsuariosBuscaUseCase },
        { provide: IUsuariosDadosUseCase, useClass: UsuariosDadosUseCase }
    ]
})
export class CasosUsoModule {}
