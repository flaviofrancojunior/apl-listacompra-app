import { IArmazenamentoServico, Local } from '@/app/dominio/contratos/repositorios/armazenamento.interface';

import { IRepositorioLocal } from '@/app/dominio/contratos/repositorios/local.interface';
import { IRepositorioMemoria } from '@/app/dominio/contratos/repositorios/memoria.interface';
import { IRepositorioSessao } from '@/app/dominio/contratos/repositorios/sessao.interface';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ArmazenamentoServico implements IArmazenamentoServico {
    constructor(private _repositorioSessao: IRepositorioSessao, private _repositorioLocal: IRepositorioLocal, private _repositorioMemoria: IRepositorioMemoria) {}

    private obterRepositorio(local: Local): IRepositorioSessao | IRepositorioLocal | IRepositorioMemoria | null {
        switch (local) {
            case Local.sessao:
                return this._repositorioSessao;
            case Local.local:
                return this._repositorioLocal;
            case Local.memoria:
                return this._repositorioMemoria;
            default:
                return null;
        }
    }

    existe(chave: string, local: Local): boolean {
        let repositorio = this.obterRepositorio(local);
        if (repositorio) {
            return repositorio.existe(chave);
        }
        return false;
    }

    definir(chave: string, valor: any, local: Local): any {
        let repositorio = this.obterRepositorio(local);
        if (repositorio) {
            repositorio.definir(chave, valor);
            return valor;
        }

        return null;
    }

    obter(chave: string, local: Local) {
        let repositorio = this.obterRepositorio(local);

        if (repositorio && repositorio.existe(chave)) {
            return repositorio.obter(chave);
        } else {
            return undefined;
        }
    }

    remover(chave: string, local: Local): void {
        let repositorio = this.obterRepositorio(local);

        if (repositorio) {
            repositorio.remover(chave);
        }
    }

    limpar(local: Local): void {
        let repositorio = this.obterRepositorio(local);

        if (repositorio) {
            repositorio.limpar();
        }
    }
}
