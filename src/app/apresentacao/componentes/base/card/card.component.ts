/* eslint-disable @angular-eslint/component-selector */

import { Component, ElementRef } from '@angular/core';

import { Propriedades } from '@/app/dominio/entidades/componentes/base.model';

export const CARD_PROPRIEDADES: Propriedades = {
    'sfr-card': ['sfr-card'],
    'sfr-card-bars--primary': ['sfr-card', 'sfr-card--bars-primary']
};

@Component({
    selector: `div[sfr-card], div[sfr-card-bars--primary]`,
    exportAs: 'sfr-card',
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.scss']
})
export class CardComponent {
    constructor(private _elemento: ElementRef) {
        Object.entries(CARD_PROPRIEDADES).forEach(([chave, valor]) => {
            if (this._elemento.nativeElement.hasAttribute(chave)) {
                (this._elemento.nativeElement as HTMLElement).classList.add(...valor);
            }
        });
    }
}
