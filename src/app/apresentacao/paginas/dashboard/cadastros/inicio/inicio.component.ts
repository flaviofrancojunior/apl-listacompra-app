import { Component } from '@angular/core';

@Component({
    selector: 'sfr-cadastros-inicio',
    templateUrl: './inicio.component.html',
    styleUrls: ['./inicio.component.scss']
})
export class CadastrosInicioComponent {
    _abaAtiva: number = 0;
    constructor() {}

    definirAbaAtiva(abaIndice: number) {
        this._abaAtiva = abaIndice;
    }
}
