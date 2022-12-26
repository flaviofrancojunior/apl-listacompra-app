import { INavegacaoHelper, ROTAS } from '@/app/dominio/contratos/helpers/navegacao.interface';

import { Component } from '@angular/core';
import { Pesquisa } from '@/app/apresentacao/componentes/negocios/movimentacoes/panel-pessoa-pesquisa/panel-pessoa-pesquisa.component';

@Component({
    selector: 'sfr-movimentacoes-nova-movimentacao',
    templateUrl: './nova-movimentacao.component.html',
    styleUrls: ['./nova-movimentacao.component.scss']
})
export class MovimentacoesNovaMovimentacaoComponent {
    _dados: Pesquisa;

    constructor(private _navegacaoHelper: INavegacaoHelper) {
        const dados: { pesquisa: Pesquisa } = this._navegacaoHelper.obterDados();
        if (dados) {
            this._dados = dados.pesquisa;
        }
    }
}
