import { IRepositorioLocal } from '@/app/dominio/contratos/repositorios/local.interface';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class RepositorioLocal implements IRepositorioLocal {
    constructor() {}

    existe(chave: string): boolean {
        return localStorage.getItem(chave) == null ? false : true;
    }
    obter(chave: string): any {
        const item = localStorage.getItem(chave);

        try {
            if (item) {
                return JSON.parse(item);
            }
        } catch {
            return undefined;
        }
    }
    definir(chave: string, valor: any): void {
        localStorage.setItem(chave, JSON.stringify(valor));
    }
    remover(chave: string): void {
        localStorage.removeItem(chave);
    }
    limpar(): void {
        localStorage.clear();
    }
}
