/* eslint-disable @angular-eslint/component-selector */

import { CARD_PROPRIEDADES, CardComponent } from './card.component';
import { Component, NgModule } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardModule } from './card.module';

describe('quando um novo card for instanciado', () => {
    let sut: CardTestComponent;
    let fixture: ComponentFixture<CardTestComponent>;
    let element: HTMLElement;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [CardTestModule],
            declarations: [CardComponent]
        }).compileComponents();
        fixture = TestBed.createComponent(CardTestComponent);

        sut = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('deve encontrar o card básico[id0] e checar se as classes aplicadas estão corretas', () => {
        element = fixture.nativeElement.querySelector('#id0');

        expect(element.classList.value).toBe(CARD_PROPRIEDADES['sfr-card'].join(' '));
    });

    it('deve encontrar o card de barras[id1] e checar se as classes aplicadas estão corretas', () => {
        element = fixture.nativeElement.querySelector('#id1');

        expect(element.classList.value).toBe(CARD_PROPRIEDADES['sfr-card-bars--primary'].join(' '));
    });

    it('deve encontrar o card básico[id2] e checar se as classes aplicadas estão corretas', () => {
        element = fixture.nativeElement.querySelector('#id2');

        expect(element.classList.value).toBe('classe-adicional ' + CARD_PROPRIEDADES['sfr-card'].join(' '));
    });

    it('deve encontrar o card de barras[id3] e checar se as classes aplicadas estão corretas', () => {
        element = fixture.nativeElement.querySelector('#id3');

        expect(element.classList.value).toBe('classe-adicional ' + CARD_PROPRIEDADES['sfr-card-bars--primary'].join(' '));
    });
});

@Component({
    template: `
        <div sfr-card id="id0"></div>
        <div sfr-card-bars--primary id="id1"></div>
        <div sfr-card id="id2" class="classe-adicional"></div>
        <div sfr-card-bars--primary id="id3" class="classe-adicional"></div>
    `
})
class CardTestComponent {}
@NgModule({
    declarations: [CardTestComponent],
    imports: [CardModule],
    exports: [CardTestComponent]
})
class CardTestModule {}
