import { Component, Input } from '@angular/core';

import { BibliotecaIcones } from '@/app/dominio/contratos/repositorios/icones.interface';

type Theme = {
    [key: string]: ThemeIcon;
};

type ThemeIcon = {
    icon: keyof typeof BibliotecaIcones;
    iconColor: string;
};

const ValidThemes: Theme = {
    basic: {
        icon: 'circle-information',
        iconColor: 'fg-neutral-darkest'
    },
    info: {
        icon: 'circle-information',
        iconColor: 'fg-info-darkest'
    },
    warning: {
        icon: 'circle-information',
        iconColor: 'fg-warning-darkest'
    },
    danger: {
        icon: 'circle-information',
        iconColor: 'fg-danger-darkest'
    }
};

@Component({
    selector: 'sfr-alert',
    templateUrl: './alert.component.html',
    styleUrls: ['./alert.component.scss']
})
export class AlertComponent {
    _themeDetail: ThemeIcon;

    _theme: keyof typeof ValidThemes;
    @Input()
    public get theme(): keyof typeof ValidThemes {
        return this._theme;
    }
    public set theme(value: keyof typeof ValidThemes) {
        if (value) {
            this._theme = value;
            this._themeDetail = ValidThemes[value];
        }
    }

    _text: string;
    @Input()
    public get text(): string {
        return this._text;
    }
    public set text(value: string) {
        this._text = value;
    }
}
