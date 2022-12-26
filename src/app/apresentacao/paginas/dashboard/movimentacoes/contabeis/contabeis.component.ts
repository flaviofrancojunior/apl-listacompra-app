import { Component } from '@angular/core';
import { INavegacaoHelper } from '@/app/dominio/contratos/helpers/navegacao.interface';
import { Pesquisa } from '@/app/apresentacao/componentes/negocios/movimentacoes/panel-pessoa-pesquisa/panel-pessoa-pesquisa.component';

@Component({
    selector: 'sfr-movimentacoes-contabeis',
    templateUrl: './contabeis.component.html',
    styleUrls: ['./contabeis.component.scss']
})
export class MovimentacoesContabeisComponent {
    _dados: Pesquisa;
    _pessoaId: string;

    constructor(private _navegacaoHelper: INavegacaoHelper) {
        const dados: { pessoaId: string } = this._navegacaoHelper.obterDados();

        if (dados) {
            this._pessoaId = dados.pessoaId;
        }
    }

    pesquisar(dados: Pesquisa) {
        this._dados = dados;
    }
}
