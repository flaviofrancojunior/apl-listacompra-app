import { Component } from '@angular/core';
import { ID } from '@/app/dominio/entidades/sistema/types.model';
import { INavegacaoHelper } from '@/app/dominio/contratos/helpers/navegacao.interface';
import { Pesquisa } from '@/app/apresentacao/componentes/negocios/movimentacoes/panel-pessoa-pesquisa/panel-pessoa-pesquisa.component';

@Component({
    selector: 'sfr-movimentacoes-sincronizacao',
    templateUrl: './sincronizacao.component.html',
    styleUrls: ['./sincronizacao.component.scss']
})
export class MovimentacoesSincronizacaoComponent {
    _pessoaId: ID;
    _pesquisa: Pesquisa;

    constructor(private _navegacaoHelper: INavegacaoHelper) {
        const dados: { pessoaId: ID } = this._navegacaoHelper.obterDados();

        if (dados) {
            this._pessoaId = dados.pessoaId;
        }
    }

    pesquisar(dados: Pesquisa) {
        this._pesquisa = dados;
    }
}
