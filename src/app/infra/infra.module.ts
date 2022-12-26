import { AcessoServico } from './servicos/acesso/acesso.service';
import { ArmazenamentoServico } from './repositorios/armazenamento.service';
import { HttpServico } from './http/http.service';
import { IAcessoServico } from '@/app/dominio/contratos/servicos/acesso.interface';
import { IArmazenamentoServico } from '@/app/dominio/contratos/repositorios/armazenamento.interface';
import { IHttpServico } from '@/app/dominio/contratos/servicos/http.interface';
import { IRepositorioIcones } from '@/app/dominio/contratos/repositorios/icones.interface';
import { IRepositorioImagens } from '@/app/dominio/contratos/repositorios/imagens.interface';
import { IRepositorioLocal } from '@/app/dominio/contratos/repositorios/local.interface';
import { IRepositorioMemoria } from '@/app/dominio/contratos/repositorios/memoria.interface';
import { IRepositorioSessao } from '@/app/dominio/contratos/repositorios/sessao.interface';
import { IUsuariosServico } from '@/app/dominio/contratos/servicos/usuarios.interface';
import { NgModule } from '@angular/core';
import { RepositorioIcones } from './repositorios/icones/icones';
import { RepositorioImagens } from './repositorios/imagens/imagens';
import { RepositorioLocal } from './repositorios/local/local';
import { RepositorioMemoria } from './repositorios/memoria/memoria';
import { RepositorioSessao } from './repositorios/sessao/sessao';
import { UsuariosServico } from './servicos/usuarios/usuarios.service';

@NgModule({
    declarations: [],
    imports: [],
    providers: [
        { provide: IAcessoServico, useClass: AcessoServico },
        { provide: IArmazenamentoServico, useClass: ArmazenamentoServico },
        { provide: IHttpServico, useClass: HttpServico },
        { provide: IRepositorioIcones, useClass: RepositorioIcones },
        { provide: IRepositorioImagens, useClass: RepositorioImagens },
        { provide: IRepositorioLocal, useClass: RepositorioLocal },
        { provide: IRepositorioMemoria, useClass: RepositorioMemoria },
        { provide: IRepositorioSessao, useClass: RepositorioSessao },
        { provide: IUsuariosServico, useClass: UsuariosServico }
    ]
})
export class InfraModule {}
