import { Component, Input } from '@angular/core';

import { IRepositorioImagens } from '@/app/dominio/contratos/repositorios/imagens.interface';

const enum AvatarTamanhos {
    'small' = 'small',
    'medium' = 'medium',
    'large' = 'large',
    'extra-large' = 'extra-large'
}

@Component({
    selector: 'sfr-avatar',
    templateUrl: './avatar.component.html',
    styleUrls: ['./avatar.component.scss']
})
export class AvatarComponent {
    /** Define a imagem */
    _picture: string;
    @Input()
    public get picture(): string {
        return this._picture;
    }
    public set picture(value: string) {
        if (value) {
            this._picture = 'data:image/jpg;base64,' + value;
        }
    }

    /** Define o tamanho */
    _size: keyof typeof AvatarTamanhos = 'medium';
    @Input()
    public get size(): keyof typeof AvatarTamanhos {
        return this._size;
    }
    public set size(value: keyof typeof AvatarTamanhos) {
        if (value) {
            this._size = value;
        }
    }

    constructor(public repositorioImagens: IRepositorioImagens) {}
}
