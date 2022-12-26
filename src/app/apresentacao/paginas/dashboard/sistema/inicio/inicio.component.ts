import { Component } from '@angular/core';

@Component({
    selector: 'sfr-sistema-inicio',
    templateUrl: './inicio.component.html',
    styleUrls: ['./inicio.component.scss']
})
export class SistemaInicioComponent {
    _abaAtiva: number = 0;
    constructor() {}

    definirAbaAtiva(abaIndice: number) {
        this._abaAtiva = abaIndice;
    }
}
