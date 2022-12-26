/* eslint-disable max-len */

import { Component, ElementRef, EventEmitter, Input, Output } from '@angular/core';

import { Propriedades } from '@/app/dominio/entidades/componentes/base.model';

/* eslint-disable @angular-eslint/component-selector */

export const BUTTON_PROPRIEDADES: Propriedades = {
    'sfr-button-flat--primary': ['sfr-button', 'sfr-button-flat--primary'],
    'sfr-button-flat--primary--rounded': ['sfr-button', 'sfr-button-flat--primary', 'is-rounded', 'p-4'],
    'sfr-button-flat--transparent': ['sfr-button', 'sfr-button-flat--transparent'],
    'sfr-button-flat--transparent--rounded': ['sfr-button', 'sfr-button-flat--transparent', 'is-rounded', 'p-4'],
    'sfr-button-outline--primary': ['sfr-button', 'sfr-button-outline--primary'],
    'sfr-button-link': ['sfr-button', 'sfr-button-link']
};

@Component({
    selector: `button[sfr-button-flat--primary], button[sfr-button-flat--primary--rounded], button[sfr-button-flat--transparent], button[sfr-button-flat--transparent--rounded], button[sfr-button-outline--primary], button[sfr-button-link]`,
    exportAs: 'sfr-button',
    host: {
        '[attr.disabled]': 'disabled || null',
        '[class.is-disabled]': 'disabled',
        '[attr.size]': 'full || fit || null',
        '[attr.active]': 'true || false'
    },
    templateUrl: './button.component.html',
    styleUrls: ['./button.component.scss']
})
export class ButtonComponent {
    @Input() disabled: boolean;

    _size: 'full' | 'fit' = 'fit';
    @Input()
    public get size(): 'full' | 'fit' {
        return this._size;
    }
    public set size(value: 'full' | 'fit') {
        this._size = value;
        if (this.size == 'full') {
            this._elemento.nativeElement.classList.add('w-100');
        } else {
            this._elemento.nativeElement.classList.remove('w-100');
        }
    }

    _active: boolean;
    @Input()
    public get active(): boolean {
        return this._active;
    }
    public set active(value: boolean) {
        this._active = value;
        if (this.active) {
            this._elemento.nativeElement.classList.add('is-active');
        } else {
            this._elemento.nativeElement.classList.remove('is-active');
        }
    }

    _align: 'start' | 'center' | 'end';
    @Input()
    public get align(): 'start' | 'center' | 'end' {
        return this._align;
    }
    public set align(value: 'start' | 'center' | 'end') {
        this._elemento.nativeElement.classList.remove('flex-justify-start_i', 'flex-justify-center_i', 'flex-justify-end_i', 'text-start_i', 'text-center_i', 'text-end_i');
        this._align = value;
        if (this._align === 'start') {
            this._elemento.nativeElement.classList.add('flex-justify-start_i', 'text-start_i');
        }
        if (this._align === 'center') {
            this._elemento.nativeElement.classList.add('flex-justify-center_i', 'text-center_i');
        }
        if (this._align === 'end') {
            this._elemento.nativeElement.classList.add('flex-justify-end_i', 'text-end_i');
        }
    }

    @Output() clicarEvento = new EventEmitter();

    constructor(private _elemento: ElementRef) {
        Object.entries(BUTTON_PROPRIEDADES).forEach(([chave, valor]) => {
            if (this._elemento.nativeElement.hasAttribute(chave)) {
                (this._elemento.nativeElement as HTMLElement).classList.add(...valor);
            }
        });

        _elemento.nativeElement.addEventListener('click', () => {
            this.clicarEvento.emit();
        });
    }
}
