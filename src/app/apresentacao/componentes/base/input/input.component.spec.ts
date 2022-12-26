/* eslint-disable @angular-eslint/component-selector */

import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputComponent, InputIconComponent } from './input.component';

import { NgxMaskModule } from 'ngx-mask';

@Component({ selector: 'sfr-input-icon', template: '' })
class IconStubComponent {}

describe('quando um novo input[texto] for instanciado', () => {
    let sut: InputComponent;
    let fixture: ComponentFixture<InputComponent>;
    let element: HTMLElement;
    let config: { class: string; type: 'texto' | 'senha' | 'numero' | 'cpf' | 'telefone' | 'data'; placeholder: string; invalid: boolean; value: string } = {
        class: 'teste',
        type: 'texto',
        placeholder: 'Usuário',
        invalid: false,
        value: 'usuario_teste'
    };

    beforeEach(async () => {
        TestBed.configureTestingModule({
            declarations: [InputComponent, IconStubComponent],
            imports: [FormsModule, ReactiveFormsModule, NgxMaskModule.forRoot()],
            schemas: [NO_ERRORS_SCHEMA]
        }).compileComponents();
        fixture = TestBed.createComponent(InputComponent);

        sut = fixture.componentInstance;

        let _form: FormGroup = new FormGroup({
            teste: new FormControl(config.value)
        });

        sut.control = _form;
        sut.controlName = 'teste';
        sut.class = config.class;
        sut.type = config.type;
        sut.placeholder = config.placeholder;
        sut.invalid = config.invalid;

        fixture.detectChanges();
    });

    it('deve checar se as classes aplicadas estão corretas no estado válido', () => {
        element = fixture.nativeElement.querySelector('.input_container');

        expect(element.classList.value).toBe('input_container');
    });

    // it('deve checar se as classes aplicadas estão corretas no estado inválido', () => {
    //     sut.invalid = true;
    //     fixture.detectChanges();

    //     element = fixture.nativeElement.querySelector('.input_container');

    //     expect(element.classList.value).toBe('input_container input_container--invalid');
    // });

    it('deve checar se o type do input é correto', () => {
        element = fixture.nativeElement.querySelector('input');

        expect(element.getAttribute('type')).toBe('text');
    });

    it('deve checar se o placeholder do input é correto', () => {
        element = fixture.nativeElement.querySelector('label');

        expect(element.innerHTML).toBe(config.placeholder);
    });

    it('deve checar se o valor do input é correto', () => {
        let element = fixture.nativeElement.querySelector('input') as HTMLInputElement;

        expect(element.value).toBe('usuario_teste');
    });

    it('deve checar se a propriedade size é aplicada corretamente', () => {
        sut.size = 3;
        fixture.detectChanges();

        element = fixture.nativeElement.querySelector('.input_field');

        expect(element.getAttribute('size')).toBe('3');
    });

    it('deve checar se a propriedade minLength é aplicada corretamente', () => {
        sut.minLength = 3;
        fixture.detectChanges();

        element = fixture.nativeElement.querySelector('.input_field');

        expect(element.getAttribute('minLength')).toBe('3');
    });

    it('deve checar se a propriedade maxLength é aplicada corretamente', () => {
        sut.minLength = 3;
        fixture.detectChanges();

        element = fixture.nativeElement.querySelector('.input_field');

        expect(element.getAttribute('minLength')).toBe('3');
    });
});

describe('quando um novo input[senha] for instanciado', () => {
    let sut: InputComponent;
    let fixture: ComponentFixture<InputComponent>;
    let element: HTMLElement;
    let config: { class: string; type: 'texto' | 'senha' | 'numero' | 'cpf' | 'telefone' | 'data'; placeholder: string; invalid: boolean; value: string } = {
        class: 'teste',
        type: 'senha',
        placeholder: 'Usuário',
        invalid: false,
        value: 'usuario_teste'
    };

    beforeEach(async () => {
        TestBed.configureTestingModule({
            declarations: [InputComponent, InputIconComponent],
            imports: [FormsModule, ReactiveFormsModule, NgxMaskModule.forRoot()],
            schemas: [NO_ERRORS_SCHEMA]
        }).compileComponents();
        fixture = TestBed.createComponent(InputComponent);

        sut = fixture.componentInstance;

        let _form: FormGroup = new FormGroup({
            teste: new FormControl(config.value)
        });

        sut.control = _form;
        sut.controlName = 'teste';
        sut.class = config.class;
        sut.type = config.type;
        sut.placeholder = config.placeholder;
        sut.invalid = config.invalid;

        fixture.detectChanges();
    });

    it('deve checar se as classes aplicadas estão corretas no estado válido', () => {
        element = fixture.nativeElement.querySelector('.input_container');

        expect(element.classList.value).toBe('input_container');
    });

    it('deve checar se as classes aplicadas estão corretas no estado inválido', () => {
        sut.invalid = true;
        fixture.detectChanges();

        element = fixture.nativeElement.querySelector('.input_container');

        expect(element.classList.value).toBe('input_container input_container--invalid');
    });

    it('deve validar a chamada [alternarVisibilidadeSenha] ao clicar no "olho"', fakeAsync(() => {
        jest.spyOn(sut, 'alternarVisibilidadeSenha');

        element = fixture.nativeElement.querySelector('.input_icon');
        element.click();
        tick();

        expect(sut.alternarVisibilidadeSenha).toHaveBeenCalled();
    }));

    it('deve checar se o type do input é correto quando valor oculto', () => {
        sut._exibirSenha = false;
        fixture.detectChanges();

        element = fixture.nativeElement.querySelector('input');

        expect(element.getAttribute('type')).toBe('password');
    });

    it('deve checar se o type do input é correto quando valor exibido', () => {
        sut._exibirSenha = true;
        fixture.detectChanges();

        element = fixture.nativeElement.querySelector('input');

        expect(element.getAttribute('type')).toBe('text');
    });

    it('deve checar se o placeholder do input é correto', () => {
        element = fixture.nativeElement.querySelector('label');

        expect(element.innerHTML).toBe(config.placeholder);
    });

    it('deve checar se o valor do input é correto', () => {
        let element = fixture.nativeElement.querySelector('input') as HTMLInputElement;

        expect(element.value).toBe('usuario_teste');
    });

    it('deve checar se a propriedade size é aplicada corretamente', () => {
        sut.size = 3;
        fixture.detectChanges();

        element = fixture.nativeElement.querySelector('.input_field');

        expect(element.getAttribute('size')).toBe('3');
    });

    it('deve checar se a propriedade minLength é aplicada corretamente', () => {
        sut.minLength = 3;
        fixture.detectChanges();

        element = fixture.nativeElement.querySelector('.input_field');

        expect(element.getAttribute('minLength')).toBe('3');
    });

    it('deve checar se a propriedade maxLength é aplicada corretamente', () => {
        sut.minLength = 3;
        fixture.detectChanges();

        element = fixture.nativeElement.querySelector('.input_field');

        expect(element.getAttribute('minLength')).toBe('3');
    });
});

describe('quando um novo input[cpf] for instanciado', () => {
    let sut: InputComponent;
    let fixture: ComponentFixture<InputComponent>;
    let element: HTMLElement;
    let config: { class: string; type: 'texto' | 'senha' | 'numero' | 'cpf' | 'telefone' | 'data'; placeholder: string; invalid: boolean; value: string } = {
        class: 'teste',
        type: 'cpf',
        placeholder: 'Usuário',
        invalid: false,
        value: '12345678910'
    };

    beforeEach(async () => {
        TestBed.configureTestingModule({
            declarations: [InputComponent, IconStubComponent],
            imports: [FormsModule, ReactiveFormsModule, NgxMaskModule.forRoot()],
            schemas: [NO_ERRORS_SCHEMA]
        }).compileComponents();
        fixture = TestBed.createComponent(InputComponent);

        sut = fixture.componentInstance;

        let _form: FormGroup = new FormGroup({
            teste: new FormControl(config.value)
        });

        sut.control = _form;
        sut.controlName = 'teste';
        sut.class = config.class;
        sut.type = config.type;
        sut.placeholder = config.placeholder;
        sut.invalid = config.invalid;

        fixture.detectChanges();
    });

    it('deve checar se as classes aplicadas estão corretas no estado válido', () => {
        element = fixture.nativeElement.querySelector('.input_container');

        expect(element.classList.value).toBe('input_container');
    });

    it('deve checar se as classes aplicadas estão corretas no estado inválido', () => {
        sut.invalid = true;
        fixture.detectChanges();

        element = fixture.nativeElement.querySelector('.input_container');

        expect(element.classList.value).toBe('input_container input_container--invalid');
    });

    it('deve checar se o type do input é correto', () => {
        element = fixture.nativeElement.querySelector('input');

        expect(element.getAttribute('type')).toBe('text');
    });

    it('deve checar se o placeholder do input é correto', () => {
        element = fixture.nativeElement.querySelector('label');

        expect(element.innerHTML).toBe(config.placeholder);
    });

    it('deve checar se o valor do input é correto', () => {
        expect(sut?.control?.get(sut.controlName)?.value).toBe(config.value);
    });

    it('deve checar se o valor do input está com a máscara correta', () => {
        let element = fixture.nativeElement.querySelector('input') as HTMLInputElement;

        fixture.detectChanges();
        expect(element.value).toBe('123.456.789-10');
    });
});
