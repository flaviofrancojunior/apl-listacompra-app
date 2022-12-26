import { IRepositorioMemoria } from '@/app/dominio/contratos/repositorios/memoria.interface';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class RepositorioMemoria implements IRepositorioMemoria {
    _memoria: { [key: string]: any } = {};

    constructor() {}

    existe(chave: string): boolean {
        return this._memoria.hasOwnProperty(chave);
    }
    obter(chave: string): any {
        return JSON.parse(this._memoria[chave]);
    }
    definir(chave: string, valor: any): void {
        this._memoria[chave] = JSON.stringify(valor);
    }
    remover(chave: string): void {
        delete this._memoria[chave];
    }
    limpar(): void {
        this._memoria = {};
    }
}
