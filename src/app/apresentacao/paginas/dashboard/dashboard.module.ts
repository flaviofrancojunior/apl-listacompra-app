import { CadastrosModule } from './cadastros/cadastros.module';
import { ContabilizacaoModule } from './contabilizacao/contabilizacao.module';
import { DashboardInicioModule } from './inicio/inicio.module';
import { MeuPerfilModule } from './meu-perfil/meu-perfil.module';
import { MovimentacoesModule } from './movimentacoes/movimentacoes.module';
import { NgModule } from '@angular/core';
import { NotificacoesModule } from './notificacoes/notificacoes.module';
import { PessoasModule } from './pessoas/pessoas.module';
import { RelatoriosModule } from './relatorios/relatorios.module';
import { SistemaModule } from './sistema/sistema.module';

@NgModule({
    declarations: [],
    imports: [DashboardInicioModule, CadastrosModule, MovimentacoesModule, PessoasModule, SistemaModule, MeuPerfilModule, NotificacoesModule, ContabilizacaoModule, RelatoriosModule],
    exports: []
})
export class DashboardModule {}
