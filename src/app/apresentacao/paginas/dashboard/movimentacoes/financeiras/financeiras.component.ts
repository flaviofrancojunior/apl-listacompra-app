import { Component } from '@angular/core';
import { INavegacaoHelper } from '@/app/dominio/contratos/helpers/navegacao.interface';
import { Pesquisa } from '@/app/apresentacao/componentes/negocios/movimentacoes/panel-pessoa-pesquisa/panel-pessoa-pesquisa.component';

@Component({
    selector: 'sfr-movimentacoes-financeiras',
    templateUrl: './financeiras.component.html',
    styleUrls: ['./financeiras.component.scss']
})
export class MovimentacoesFinanceirasComponent {
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
