import { AcessoServico } from './servicos/acesso/acesso.service';
import { ArmazenamentoServico } from './repositorios/armazenamento.service';
import { AuditoriaServico } from './servicos/sistema/auditoria.service';
import { CadastrosServico } from './servicos/cadastros/cadastros.service';
import { ContabilizacaoServico } from './servicos/pessoas/contabilizacao.service';
import { ExtratoServico } from './servicos/pessoas/extrato.service';
import { HttpServico } from './http/http.service';
import { IAcessoServico } from '@/app/dominio/contratos/servicos/acesso.interface';
import { IArmazenamentoServico } from '@/app/dominio/contratos/repositorios/armazenamento.interface';
import { IAuditoriaServico } from '@/app/dominio/contratos/servicos/auditoria.interface';
import { ICadastrosServico } from '@/app/dominio/contratos/servicos/cadastros.interface';
import { IContabilizacaoServico } from '@/app/dominio/contratos/servicos/contabilizacao.interface';
import { IExtratoServico } from '@/app/dominio/contratos/servicos/extrato.interface';
import { IHttpServico } from '@/app/dominio/contratos/servicos/http.interface';
import { IMovimentacoesServico } from '@/app/dominio/contratos/servicos/movimentacoes.interface';
import { IParametrosServico } from '@/app/dominio/contratos/servicos/parametros.interface';
import { IPessoasServico } from '@/app/dominio/contratos/servicos/pessoas.interface';
import { IRepositorioIcones } from '@/app/dominio/contratos/repositorios/icones.interface';
import { IRepositorioImagens } from '@/app/dominio/contratos/repositorios/imagens.interface';
import { IRepositorioLocal } from '@/app/dominio/contratos/repositorios/local.interface';
import { IRepositorioMemoria } from '@/app/dominio/contratos/repositorios/memoria.interface';
import { IRepositorioSessao } from '@/app/dominio/contratos/repositorios/sessao.interface';
import { IUsuariosServico } from '@/app/dominio/contratos/servicos/usuarios.interface';
import { MovimentacoesServico } from './servicos/pessoas/movimentacoes.service';
import { NgModule } from '@angular/core';
import { ParametrosServico } from './servicos/sistema/parametros.service';
import { PessoasServico } from './servicos/pessoas/pessoas.service';
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
        { provide: IAuditoriaServico, useClass: AuditoriaServico },
        { provide: ICadastrosServico, useClass: CadastrosServico },
        { provide: IContabilizacaoServico, useClass: ContabilizacaoServico },
        { provide: IExtratoServico, useClass: ExtratoServico },
        { provide: IHttpServico, useClass: HttpServico },
        { provide: IMovimentacoesServico, useClass: MovimentacoesServico },
        { provide: IParametrosServico, useClass: ParametrosServico },
        { provide: IPessoasServico, useClass: PessoasServico },
        { provide: IRepositorioIcones, useClass: RepositorioIcones },
        { provide: IRepositorioImagens, useClass: RepositorioImagens },
        { provide: IRepositorioLocal, useClass: RepositorioLocal },
        { provide: IRepositorioMemoria, useClass: RepositorioMemoria },
        { provide: IRepositorioSessao, useClass: RepositorioSessao },
        { provide: IUsuariosServico, useClass: UsuariosServico }
    ]
})
export class InfraModule {}
