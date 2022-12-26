/* eslint-disable @angular-eslint/component-selector */

import { BibliotecaIcones, IRepositorioIcones, Icone } from '@/app/dominio/contratos/repositorios/icones.interface';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IconComponent } from './icon.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { PipesModule } from '@/app/apresentacao/pipes/pipes.module';

let mockData: Icone = {
    nome: 'eye-off',
    caminho: 'caminho-teste'
};

class RepositorioIconesMock {
    obter(chave: BibliotecaIcones): Icone | undefined {
        return mockData;
    }
}

describe('quando um novo icon for instanciado', () => {
    let sut: IconComponent;
    let fixture: ComponentFixture<IconComponent>;
    let element: HTMLElement;

    beforeEach(async () => {
        TestBed.configureTestingModule({
            declarations: [IconComponent],
            imports: [PipesModule],
            providers: [{ provide: IRepositorioIcones, useClass: RepositorioIconesMock }],
            schemas: [NO_ERRORS_SCHEMA]
        }).compileComponents();
        fixture = TestBed.createComponent(IconComponent);

        sut = fixture.componentInstance;

        fixture.detectChanges();
    });

    it('deve checar se o ícone selecionado é o correto', () => {
        let icone = BibliotecaIcones['eye-off'];
        sut.icon = icone;
        fixture.detectChanges();

        expect(sut._icone?.nome).toBe('eye-off');
        expect(sut.icon).toBe(icone);
    });

    it('deve checar se as classes personalizadas foram aplicadas', () => {
        sut.icon = BibliotecaIcones['eye-off'];
        const classes = ['s2', 'fg-neutral-dark'];
        sut.iconClass = classes;
        fixture.detectChanges();

        element = fixture.nativeElement.querySelector('.icon');

        expect([...element.classList].sort()).toStrictEqual(['icon', ...classes].sort());
    });
});
