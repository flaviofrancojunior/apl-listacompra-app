import { Component, Input } from '@angular/core';

import { UntypedFormGroup } from '@angular/forms';

export type ListaOpcoesRadio = {
    id: string | number;
    descricao: string;
    descricaoDetalhe?: string;
};

@Component({
    selector: 'sfr-radio',
    templateUrl: './radio.component.html',
    styleUrls: ['./radio.component.scss']
})
export class RadioComponent {
    @Input() control: UntypedFormGroup;
    @Input() controlName: any;

    @Input() class: string;

    @Input() size: 'full' | 'fit';

    _options: ListaOpcoesRadio[];
    @Input()
    set options(input: ListaOpcoesRadio[]) {
        this._options = input !== undefined ? [...input] : [];
    }
    get options() {
        return this._options;
    }

    @Input() border: boolean = true;

    constructor() {}
}
