/* eslint-disable @angular-eslint/component-selector */

import { BUTTON_PROPRIEDADES, ButtonComponent } from './button.component';
import { Component, NgModule } from '@angular/core';
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { ButtonModule } from './button.module';

describe('quando um novo botão[sfr-button-flat--primary] for instanciado', () => {
    let sut: ButtonTestComponent;
    let fixture: ComponentFixture<ButtonTestComponent>;
    let element: HTMLElement;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [ButtonTestModule],
            declarations: [ButtonComponent]
        }).compileComponents();
        fixture = TestBed.createComponent(ButtonTestComponent);

        sut = fixture.componentInstance;

        fixture.detectChanges();
    });

    it('deve encontrar o botão[1] e checar se as classes aplicadas estão corretas', () => {
        element = fixture.nativeElement.querySelector('button:nth-child(1)');

        expect(element.classList.value).toBe(BUTTON_PROPRIEDADES['sfr-button-flat--primary'].join(' '));
    });

    it('deve validar o evento emitido [cliqueEvento] ao clicar no botão', fakeAsync(() => {
        jest.spyOn(sut, 'clicarEvento');

        element = fixture.nativeElement.querySelector('button:nth-child(1)');
        element.click();
        tick();

        expect(sut.clicarEvento).toHaveBeenCalled();
    }));

    it('deve encontrar o botão[2] e checar se a classe w-100 foi aplicada', () => {
        element = fixture.nativeElement.querySelector('button:nth-child(2)');

        expect(element.classList.value).toContain('w-100');
    });

    it('deve encontrar o botão[3] e checar se a classe w-100 não foi aplicada', () => {
        element = fixture.nativeElement.querySelector('button:nth-child(3)');

        expect(element.classList.value).not.toContain('w-100');
    });

    it('deve encontrar o botão[4] e checar se a classe is-active foi aplicada', () => {
        element = fixture.nativeElement.querySelector('button:nth-child(4)');

        expect(element.classList.value).toContain('is-active');
    });

    it('deve encontrar o botão[5] e validar se a classe is-active não foi aplicada', () => {
        element = fixture.nativeElement.querySelector('button:nth-child(5)');

        expect(element.classList.value).not.toContain('is-active');
    });
});

@Component({
    template: `
        <button sfr-button-flat--primary (clicarEvento)="clicarEvento()"></button>
        <button sfr-button-flat--primary size="full"></button>
        <button sfr-button-flat--primary size="fit"></button>
        <button sfr-button-flat--primary [active]="true"></button>
        <button sfr-button-flat--primary [active]="false"></button>
    `
})
class ButtonTestComponent {
    clicarEvento() {}
}
@NgModule({
    declarations: [ButtonTestComponent],
    imports: [ButtonModule],
    exports: [ButtonTestComponent]
})
class ButtonTestModule {}
