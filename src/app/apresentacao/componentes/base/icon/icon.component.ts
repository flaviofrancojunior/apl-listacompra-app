import { BibliotecaIcones, IRepositorioIcones, Icone } from '@/app/dominio/contratos/repositorios/icones.interface';
import { Component, Input } from '@angular/core';

@Component({
    selector: 'sfr-icon',
    templateUrl: './icon.component.html',
    styleUrls: ['./icon.component.scss']
})
export class IconComponent {
    @Input() iconClass: string[];

    _icon: keyof typeof BibliotecaIcones | undefined;
    @Input()
    public get icon(): keyof typeof BibliotecaIcones | undefined {
        return this._icon;
    }
    public set icon(value: keyof typeof BibliotecaIcones | undefined) {
        if (value) {
            this._icon = value;
            this.atualizarIcone();
        }
    }

    _icone: Icone | undefined;

    constructor(private _repositorioIcones: IRepositorioIcones) {}

    /** Atualiza o ícone do componente */
    atualizarIcone(): void {
        let icone = this._repositorioIcones.obter(this._icon);

        if (icone) {
            this._icone = icone;
        }

        Object.keys(BibliotecaIcones);
    }
}
