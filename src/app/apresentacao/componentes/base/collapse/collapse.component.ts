import { Component, ContentChild, Directive, EventEmitter, Input, Output, TemplateRef } from '@angular/core';

/* eslint-disable @angular-eslint/directive-selector */

@Directive({
    selector: '[header]'
})
export class headerDirective {
    constructor(public templateRef: TemplateRef<any>) {}
}

@Directive({
    selector: '[content]'
})
export class contentDirective {
    constructor(public templateRef: TemplateRef<any>) {}
}

@Component({
    selector: 'sfr-collapse',
    templateUrl: './collapse.component.html',
    styleUrls: ['./collapse.component.scss']
})
export class CollapseComponent {
    /** Mapeia todos os slides com a diretiva 'slide' */
    @ContentChild(headerDirective)
    _header: headerDirective;

    @ContentChild(contentDirective)
    _content: contentDirective;

    @Input() expanded: boolean;
    /** Define a classe do collapse */
    @Input() theme: string;

    /** Define o estado de desativado do collapse */
    @Input() disabled: boolean;

    // Caso precise realizar alguma função após expandir collapse
    @Output() afterExpand = new EventEmitter();

    aposExpandirCollapse() {
        this.afterExpand.emit();
    }
}
