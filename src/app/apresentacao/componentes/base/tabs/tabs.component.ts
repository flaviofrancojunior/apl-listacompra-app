/* eslint-disable @angular-eslint/directive-selector */

import { Component, ContentChildren, Directive, EventEmitter, Input, Output, QueryList, TemplateRef } from '@angular/core';

import { MatTabChangeEvent } from '@angular/material/tabs';

@Directive({
    selector: '[tab]'
})
export class tabDirective {
    @Input() label: string;

    constructor(public templateRef: TemplateRef<any>) {}
}

@Component({
    selector: 'sfr-tabs',
    templateUrl: './tabs.component.html',
    styleUrls: ['./tabs.component.scss']
})
export class TabsComponent {
    abaAtiva: number = 0;

    @Input() mode: 'horizontal' | 'vertical';
    @Input() theme: 'primary' | 'primary-outline' | 'support03';

    @ContentChildren(tabDirective)
    listaTabs: QueryList<tabDirective>;

    @Output() alterarAbaEvento = new EventEmitter<number>();

    constructor() {}

    definirNovaAbaAtiva(evento: MatTabChangeEvent) {
        this.abaAtiva = evento.index;
        this.alterarAbaEvento.emit(evento.index);
    }
}
