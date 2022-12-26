export abstract class IRepositorioLocal {
    abstract existe(chave: string): boolean;
    abstract obter(chave: string): any;
    abstract definir(chave: string, valor: any): void;
    abstract remover(chave: string): void;
    abstract limpar(): void;
}
