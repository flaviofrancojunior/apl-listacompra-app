import { AcessoUseCase } from './acesso/acesso.usecase';
import { AuditoriaUseCase } from './sistema/auditoria.usecase';
import { CadastrosBancoUseCase } from './cadastros/banco.usecase';
import { CadastrosHistoricoPadraoUseCase } from './cadastros/historico-padrao.usecase';
import { CadastrosPlanoContaUseCase } from './cadastros/plano-conta.usecase';
import { CadastrosPlanoContabilUseCase } from './cadastros/plano-contabil.usecase';
import { CadastrosUsuarioUseCase } from './cadastros/usuario.usecase';
import { IAcessoUseCase } from '@/app/dominio/contratos/casos-uso/acesso/acesso.interface';
import { IAuditoriaUseCase } from '@/app/dominio/contratos/casos-uso/sistema/auditoria.interface';
import { ICadastrosBancoUseCase } from '@/app/dominio/contratos/casos-uso/cadastros/banco.interface';
import { ICadastrosHistoricoPadraoUseCase } from '@/app/dominio/contratos/casos-uso/cadastros/historico-padrao.interface';
import { ICadastrosPlanoContaUseCase } from '@/app/dominio/contratos/casos-uso/cadastros/plano-conta.interface';
import { ICadastrosPlanoContabilUseCase } from '@/app/dominio/contratos/casos-uso/cadastros/plano-contabil.interface';
import { ICadastrosUsuarioUseCase } from '@/app/dominio/contratos/casos-uso/cadastros/usuario.interface';
import { IMovimentacoesContabeisUseCase } from '@/app/dominio/contratos/casos-uso/movimentacoes/contabeis.interface';
import { IMovimentacoesExtratoUseCase } from '@/app/dominio/contratos/casos-uso/movimentacoes/extrato.interface';
import { IMovimentacoesFinanceirasUseCase } from '@/app/dominio/contratos/casos-uso/movimentacoes/financeiras.interface';
import { IParametrosUseCase } from '@/app/dominio/contratos/casos-uso/sistema/parametros.interface';
import { IPessoasCartoesUseCase } from '@/app/dominio/contratos/casos-uso/pessoas/cartoes.interface';
import { IPessoasContabilizacaoUseCase } from '@/app/dominio/contratos/casos-uso/pessoas/contabilizacao.interface';
import { IPessoasContasUseCase } from '@/app/dominio/contratos/casos-uso/pessoas/contas.interface';
import { IPessoasUseCase } from '@/app/dominio/contratos/casos-uso/pessoas/pessoas.interface';
import { ISistemaMoedaUseCase } from '@/app/dominio/contratos/casos-uso/sistema/moeda.interface';
import { IUsuariosBuscaUseCase } from '@/app/dominio/contratos/casos-uso/usuarios/busca.interface';
import { IUsuariosDadosUseCase } from '@/app/dominio/contratos/casos-uso/usuarios/dados.interface';
import { MovimentacoesContabeisUseCase } from './movimentacoes/contabeis.usecase';
import { MovimentacoesExtratoUseCase } from './movimentacoes/extrato.usecase';
import { MovimentacoesFinanceirasUseCase } from './movimentacoes/financeiras.usecase';
import { NgModule } from '@angular/core';
import { ParametrosUseCase } from './sistema/parametros.usecase';
import { PessoasCartoesUseCase } from './pessoas/cartoes.usecase';
import { PessoasContabilizacaoUseCase } from './pessoas/contabilizacao.usecase';
import { PessoasContasUseCase } from './pessoas/contas.usecase';
import { PessoasUseCase } from './pessoas/pessoas.usecase';
import { SistemaMoedaUseCase } from './sistema/moeda.usecase';
import { UsuariosBuscaUseCase } from './usuarios/busca.usecase';
import { UsuariosDadosUseCase } from './usuarios/dados.usecase';

@NgModule({
    declarations: [],
    imports: [],
    providers: [
        { provide: IAcessoUseCase, useClass: AcessoUseCase },
        { provide: IAuditoriaUseCase, useClass: AuditoriaUseCase },
        { provide: ICadastrosBancoUseCase, useClass: CadastrosBancoUseCase },
        { provide: ICadastrosHistoricoPadraoUseCase, useClass: CadastrosHistoricoPadraoUseCase },
        { provide: ICadastrosPlanoContaUseCase, useClass: CadastrosPlanoContaUseCase },
        { provide: ICadastrosPlanoContabilUseCase, useClass: CadastrosPlanoContabilUseCase },
        { provide: ICadastrosUsuarioUseCase, useClass: CadastrosUsuarioUseCase },
        { provide: IParametrosUseCase, useClass: ParametrosUseCase },
        { provide: IPessoasCartoesUseCase, useClass: PessoasCartoesUseCase },
        { provide: IPessoasContabilizacaoUseCase, useClass: PessoasContabilizacaoUseCase },
        { provide: IPessoasContasUseCase, useClass: PessoasContasUseCase },
        { provide: IMovimentacoesFinanceirasUseCase, useClass: MovimentacoesFinanceirasUseCase },
        { provide: IMovimentacoesContabeisUseCase, useClass: MovimentacoesContabeisUseCase },
        { provide: IMovimentacoesExtratoUseCase, useClass: MovimentacoesExtratoUseCase },
        { provide: IPessoasUseCase, useClass: PessoasUseCase },
        { provide: ISistemaMoedaUseCase, useClass: SistemaMoedaUseCase },
        { provide: IUsuariosBuscaUseCase, useClass: UsuariosBuscaUseCase },
        { provide: IUsuariosDadosUseCase, useClass: UsuariosDadosUseCase }
    ]
})
export class CasosUsoModule {}
