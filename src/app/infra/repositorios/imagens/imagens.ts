import { BibliotecaImagens, IRepositorioImagens, Imagem } from '@/app/dominio/contratos/repositorios/imagens.interface';

import { IConfiguracaoHelper } from '@/app/dominio/contratos/helpers/configuracao.interface';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class RepositorioImagens implements IRepositorioImagens {
    private _caminho: string;
    private _listaImagens: Imagem[];

    constructor(private _configuracaoHelper: IConfiguracaoHelper) {
        this._caminho = this._configuracaoHelper.configuracao.caminho.imagens;
        this._listaImagens = this.inicializarRepositorio();
    }

    obter(chave: keyof typeof BibliotecaImagens): Imagem | undefined {
        return this._listaImagens.find((imagem) => {
            return imagem.nome == chave;
        });
    }

    private inicializarRepositorio(): Imagem[] {
        let _listaImagens: Imagem[] = [];

        Object.keys(BibliotecaImagens).forEach((imagem) => {
            _listaImagens.push({ nome: imagem, nomeArquivo: BibliotecaImagens[imagem as keyof typeof BibliotecaImagens], caminho: this._caminho + BibliotecaImagens[imagem as keyof typeof BibliotecaImagens] });
        });

        return _listaImagens;
    }
}
