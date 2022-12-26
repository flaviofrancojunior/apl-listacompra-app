import { Observable } from 'rxjs';
import { Router } from '@angular/router';

export const ROTAS = {
    dashboard: { url: '/dashboard/inicio', descricao: { exibir: true, texto: 'Início' } },
    dashboardCadastros: { url: '/dashboard/cadastros', descricao: { exibir: true, texto: 'Cadastros' } },
    dashboardCadastrosBancos: { url: '/dashboard/cadastros/bancos', descricao: { exibir: true, texto: 'Cadastro de Bancos' } },
    dashboardCadastrosPlanoContas: { url: '/dashboard/cadastros/plano-de-contas', descricao: { exibir: true, texto: 'Cadastro de Plano de Contas' } },
    dashboardCadastrosPlanoContasAdicionar: { url: '/dashboard/cadastros/plano-de-contas/criar', descricao: { exibir: true, texto: 'Criar Plano de Contas' } },
    dashboardCadastrosUsuarios: { url: '/dashboard/cadastros/usuarios', descricao: { exibir: true, texto: 'Cadastro de Usuários' } },
    dashboardContabilizacao: { url: '/dashboard/contabilizacao', descricao: { exibir: true, texto: 'Contabilização' } },
    dashboardMeuPerfil: { url: '/dashboard/meu-perfil', descricao: { exibir: true, texto: 'Meu Perfil' } },
    dashboardMovimentacoes: { url: '/dashboard/movimentacoes', descricao: { exibir: true, texto: 'Movimentações' } },
    dashboardMovimentacoesContabeis: { url: '/dashboard/movimentacoes/contabeis', descricao: { exibir: true, texto: 'Movimentações Contábeis' } },
    dashboardMovimentacoesExtrato: { url: '/dashboard/movimentacoes/extrato', descricao: { exibir: true, texto: 'Extrato' } },
    dashboardMovimentacoesFinanceiras: { url: '/dashboard/movimentacoes/financeiras', descricao: { exibir: true, texto: 'Movimentações Financeiras' } },
    dashboardMovimentacoesNovaMovimentacao: { url: '/dashboard/movimentacoes/nova-movimentacao', descricao: { exibir: true, texto: 'Lançamento Manual' } },
    dashboardMovimentacoesSincronizacao: { url: '/dashboard/movimentacoes/sincronizacao', descricao: { exibir: true, texto: 'Sincronização de Movimentos' } },
    dashboardMovimentacoesLotes: { url: '/dashboard/movimentacoes/lotes', descricao: { exibir: true, texto: 'Lotes' } },

    dashboardRelatorios: { url: '/dashboard/relatorios', descricao: { exibir: true, texto: 'Relátorios' } },
    dashboardRelatoriosBalanco: { url: '/dashboard/relatorios/balanco', descricao: { exibir: true, texto: 'Balanço' } },
    dashboardRelatoriosBalancoConsolidado: { url: '/dashboard/relatorios/balanco-consolidado', descricao: { exibir: true, texto: 'Balanço Consolidado' } },
    dashboardRelatoriosDiario: { url: '/dashboard/relatorios/diario', descricao: { exibir: true, texto: 'Relatório Diário' } },
    dashboardRelatoriosRazao: { url: '/dashboard/relatorios/razao', descricao: { exibir: true, texto: 'Relatório Razão' } },

    dashboardNotificacoes: { url: '/dashboard/notificacoes', descricao: { exibir: true, texto: 'Notificações' } },
    dashboardPessoas: { url: '/dashboard/pessoas', descricao: { exibir: true, texto: 'Pessoas' } },
    dashboardPessoasDetalhes: { url: '/dashboard/pessoas/detalhes', descricao: { exibir: true, texto: 'Pessoa' } },
    dashboardSistema: { url: '/dashboard/sistema', descricao: { exibir: true, texto: 'Sistema' } },
    inicio: { url: '', descricao: { exibir: false, texto: '' } },
    login: { url: '/login', descricao: { exibir: false, texto: '' } }
};

export type Rota = {
    url: string;
    urlVoltar?: string;
    descricao: {
        exibir: boolean;
        texto?: string;
    };
};

export abstract class INavegacaoHelper {
    router: Router;
    urlAtual: string;
    rota: Rota;

    rotaAtual: Observable<Rota | undefined>;

    abstract ir(rota: Rota, dados?: any): void;
    abstract voltar(rota?: string): void;
    abstract obterDados(): any;
    abstract obterParametros(): any;
    abstract obterParametrosRotaAtual(): void;
}
