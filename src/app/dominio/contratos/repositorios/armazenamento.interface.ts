export enum Local {
    sessao = 'sessao',
    local = 'local',
    memoria = 'memoria'
}

export abstract class IArmazenamentoServico {
    abstract existe(chave: string, local: Local): boolean;
    abstract definir(chave: string, valor: any, local: Local): any;
    abstract obter(chave: string, local: Local): any;
    abstract remover(chave: string, local: Local): void;
    abstract limpar(local: Local): void;
}
