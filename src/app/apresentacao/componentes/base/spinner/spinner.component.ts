import { Component, Input } from '@angular/core';
import { IRepositorioImagens, Imagem } from '@/app/dominio/contratos/repositorios/imagens.interface';

import { Size } from 'ngx-spinner/lib/ngx-spinner.enum';

@Component({
    selector: 'sfr-spinner',
    templateUrl: './spinner.component.html',
    styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent {
    @Input() name: string;

    @Input() size: Size = 'small';

    @Input() text: string;

    _spinnerURL: Imagem;

    constructor(private _repositorioImagens: IRepositorioImagens) {
        const spinnerURL = this._repositorioImagens.obter('loading-safra');
        if (spinnerURL) {
            this._spinnerURL = spinnerURL;
        }
    }
}
