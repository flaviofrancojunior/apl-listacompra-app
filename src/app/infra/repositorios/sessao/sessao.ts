import { IRepositorioSessao } from '@/app/dominio/contratos/repositorios/sessao.interface';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class RepositorioSessao implements IRepositorioSessao {
    constructor() {}

    existe(chave: string): boolean {
        return sessionStorage.getItem(chave) == null ? false : true;
    }
    obter(chave: string): any {
        return sessionStorage.getItem(chave);
    }
    definir(chave: string, valor: any): void {
        sessionStorage.setItem(chave, valor);
    }
    remover(chave: string): void {
        sessionStorage.removeItem(chave);
    }
    limpar(): void {
        sessionStorage.clear();
    }
}
