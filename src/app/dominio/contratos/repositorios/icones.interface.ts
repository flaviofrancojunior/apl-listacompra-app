export enum BibliotecaIcones {
    'analytics',
    'bank',
    'calendar',
    'cancel',
    'cash-dollar',
    'chevron-down',
    'chevron-left',
    'chevron-right',
    'chevron-up',
    'circle-cancel',
    'circle-information',
    'circle-plus',
    'circle-tick',
    'customers',
    'customers-group',
    'data-visualization',
    'delete',
    'dollar-circular',
    'duplicate',
    'edit',
    'eye-off',
    'eye-on',
    'grammar',
    'home',
    'lock-closed',
    'lock-open',
    'mobile-back-arrow',
    'mobile-hamburguer',
    'notification',
    'page-plus',
    'page-search',
    'price-lookup',
    'refresh',
    'replace',
    'search',
    'sidebar-left',
    'sidebar-right',
    'text-block',
    'transaction'
}

export type Icone = { nome: string; caminho: string };

export abstract class IRepositorioIcones {
    abstract obter(chave: keyof typeof BibliotecaIcones | undefined): Icone | undefined;
}
