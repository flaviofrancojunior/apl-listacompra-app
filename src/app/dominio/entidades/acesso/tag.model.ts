import { ROTAS, Rota } from '@/app/dominio/contratos/helpers/navegacao.interface';

import { BibliotecaIcones } from '@/app/dominio/contratos/repositorios/icones.interface';

export enum BibliotecaTags {
    'dashboard',
    'dashboardCadastros',
    'dashboardCadastrosBancos',
    'dashboardCadastrosPlanoContas',
    'dashboardCadastrosUsuarios',
    'dashboardContabilizacao',
    'dashboardMovimentacoes',
    'dashboardMovimentacoesContabeis',
    'dashboardMovimentacoesExtrato',
    'dashboardMovimentacoesFinanceiras',
    'dashboardMovimentacoesLotes',
    'dashboardMovimentacoesSincronizacao',
    'dashboardPessoas',
    'dashboardRelatorios',
    'dashboardRelatoriosBalanco',
    'dashboardRelatoriosBalancoConsolidado',
    'dashboardRelatoriosDiario',
    'dashboardRelatoriosRazao',
    'login'
}

export class Tag {
    icone?: keyof typeof BibliotecaIcones;
    nomeExibicao: string;
    rota?: Rota;
    funcao?: string;
    rotaBase: Rota | undefined;
}

export type TagAcao = {
    rota?: Rota;
    funcao?: string;
};

export const TAGS: { [key in keyof typeof BibliotecaTags]: Tag } = {
    dashboard: {
        icone: 'home',
        nomeExibicao: 'Início',
        rota: ROTAS.dashboard,
        rotaBase: ROTAS.dashboard
    },
    dashboardCadastros: {
        icone: 'text-block',
        nomeExibicao: 'Cadastros',
        rota: ROTAS.dashboardCadastros,
        rotaBase: ROTAS.dashboardCadastros
    },
    dashboardCadastrosBancos: {
        nomeExibicao: 'Bancos',
        rota: ROTAS.dashboardCadastrosBancos,
        rotaBase: ROTAS.dashboardCadastrosBancos
    },
    dashboardCadastrosPlanoContas: {
        nomeExibicao: 'Plano de Contas',
        rota: ROTAS.dashboardCadastrosPlanoContas,
        rotaBase: ROTAS.dashboardCadastrosPlanoContas
    },
    dashboardCadastrosUsuarios: {
        nomeExibicao: 'Usuários',
        rota: ROTAS.dashboardCadastrosUsuarios,
        rotaBase: ROTAS.dashboardCadastrosUsuarios
    },
    dashboardContabilizacao: {
        icone: 'price-lookup',
        nomeExibicao: 'Contabilização',
        rota: ROTAS.dashboardContabilizacao,
        rotaBase: ROTAS.dashboardContabilizacao
    },
    dashboardMovimentacoes: {
        icone: 'transaction',
        nomeExibicao: 'Movimentações',
        rota: ROTAS.dashboardMovimentacoes,
        rotaBase: ROTAS.dashboardMovimentacoes
    },

    dashboardMovimentacoesContabeis: {
        icone: 'grammar',
        nomeExibicao: 'Movimentações Contábeis',
        rota: ROTAS.dashboardMovimentacoesContabeis,
        rotaBase: ROTAS.dashboardMovimentacoesContabeis
    },
    dashboardMovimentacoesExtrato: {
        icone: 'analytics',
        nomeExibicao: 'Extrato',
        rota: ROTAS.dashboardMovimentacoesExtrato,
        rotaBase: ROTAS.dashboardMovimentacoesExtrato
    },
    dashboardMovimentacoesFinanceiras: {
        icone: 'dollar-circular',
        nomeExibicao: 'Movimentações Financeiras',
        rota: ROTAS.dashboardMovimentacoesFinanceiras,
        rotaBase: ROTAS.dashboardMovimentacoesFinanceiras
    },
    dashboardMovimentacoesLotes: {
        icone: 'price-lookup',
        nomeExibicao: 'Lotes Contábeis',
        rota: ROTAS.dashboardMovimentacoesLotes,
        rotaBase: ROTAS.dashboardMovimentacoesLotes
    },
    dashboardMovimentacoesSincronizacao: {
        icone: 'replace',
        nomeExibicao: 'Sincronização de Movimentos',
        rota: ROTAS.dashboardMovimentacoesSincronizacao,
        rotaBase: ROTAS.dashboardMovimentacoesSincronizacao
    },
    dashboardPessoas: {
        icone: 'customers',
        nomeExibicao: 'Pessoas',
        rota: ROTAS.dashboardPessoas,
        rotaBase: ROTAS.dashboardPessoas
    },
    dashboardRelatorios: {
        icone: 'data-visualization',
        nomeExibicao: 'Relatórios',
        rota: ROTAS.dashboardRelatorios,
        rotaBase: ROTAS.dashboardRelatorios
    },
    dashboardRelatoriosBalanco: {
        nomeExibicao: 'Balanço',
        rotaBase: undefined
    },
    dashboardRelatoriosBalancoConsolidado: {
        nomeExibicao: 'Balanço Consolidado',
        rotaBase: undefined
    },
    dashboardRelatoriosDiario: {
        nomeExibicao: 'Diário',
        rotaBase: undefined
    },
    dashboardRelatoriosRazao: {
        nomeExibicao: 'Razão',
        rotaBase: undefined
    },
    login: {
        nomeExibicao: '',
        rotaBase: undefined
    }
};
