import { Component } from '@angular/core';
import { Pesquisa } from '@/app/apresentacao/componentes/negocios/movimentacoes/panel-pessoa-pesquisa/panel-pessoa-pesquisa.component';

@Component({
    selector: 'sfr-contabilizacao-inicio',
    templateUrl: './inicio.component.html',
    styleUrls: ['./inicio.component.scss']
})
export class ContabilizacaoInicioComponent {
    _dados: Pesquisa;

    constructor() {}

    pesquisar(dados: Pesquisa) {
        this._dados = dados;
    }
}
