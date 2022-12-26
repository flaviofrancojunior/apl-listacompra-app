import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { DateFilterFn, MatDatepicker } from '@angular/material/datepicker';
import { DayjsDateAdapter, MAT_DAYJS_DATE_FORMATS } from '@/app/apresentacao/adapters/dayjs-date.adapter';
import { Observable, map, pairwise, startWith } from 'rxjs';
import { UntypedFormGroup, ValidationErrors } from '@angular/forms';
import dayjs, { Dayjs } from 'dayjs';

import { BibliotecaIcones } from '@/app/dominio/contratos/repositorios/icones.interface';
import { TooltipConfig } from '@/app/dominio/entidades/componentes/tooltip.model';
import { v4 as uuidv4 } from 'uuid';

/* eslint-disable @angular-eslint/component-selector */

@Component({
    selector: `sfr-input`,
    templateUrl: './input.component.html',
    styleUrls: ['./input.component.scss'],
    providers: [
        { provide: DateAdapter, useClass: DayjsDateAdapter, deps: [MAT_DATE_LOCALE] },
        { provide: MAT_DATE_FORMATS, useValue: MAT_DAYJS_DATE_FORMATS }
    ]
})
export class InputComponent implements OnInit {
    @Input() type: 'texto' | 'senha' | 'numero' | 'cpf' | 'telefone' | 'data' | 'busca' | 'cartao' | 'moeda' | 'select' | 'data-ano-mes';

    @Input() control: UntypedFormGroup;
    @Input() controlName: any;

    @Input() placeholder: string;

    @Input() invalid: boolean = false;
    @Input() invalidText: string;

    @Input() validationMessages: { erro: string; mensagem: string }[];
    _listaErros: string[] = [];

    @Input() class: string;

    @Input() label: boolean = true;

    @Input() size: number;
    @Input() maxLength: number;
    @Input() minLength: number;

    @Input() filter: DateFilterFn<any>;

    @Input() transform: 'uppercase' | 'lowercase' | 'none' = 'none';

    _exibirSenha: boolean = false;

    _listaClassesAdicionais: string[] = [];

    _iconeBusca: 'search' | 'cancel' = 'search';

    _id: string;

    @Output() digitarEvento = new EventEmitter<string>();
    @Output() acaoEvento = new EventEmitter<'copiar'>();

    constructor() {
        this._id = uuidv4();
    }

    ngOnInit(): void {
        this.control
            .get(this.controlName)
            ?.valueChanges.pipe(startWith(this.control.get(this.controlName)), pairwise())
            .subscribe(([prev, next]: [any, any]) => {
                if (prev != next && next != '') {
                    if (this.type === 'data') {
                        this.control.get(this.controlName)?.setValue(dayjs(next).format('YYYY-MM-DD'));
                    }

                    if (this.type === 'texto') {
                        this.control.get(this.controlName)?.setValue(this.transformarEntrada(next), { emitEvent: false });
                    }

                    if (this.type === 'moeda') {
                        if (next === null) {
                            this.control.get(this.controlName)?.setValue(0);
                        }
                    }

                    this._listaErros = [];
                    const erros: ValidationErrors = this.control.get(this.controlName)?.errors as ValidationErrors;
                    if (erros) {
                        Object.keys(erros).forEach((erro) => {
                            if (this.validationMessages?.length > 0) {
                                const configErro = this.validationMessages.find((elemento) => elemento.erro === erro);
                                if (configErro) {
                                    this._listaErros.push(configErro.mensagem);
                                }
                            }
                        });
                    }

                    //console.log('Erros: ', this.control.get(this.controlName)?.errors, this.control.errors, Object.keys(controlErrors));
                }
            });
    }

    alternarVisibilidadeSenha() {
        this._exibirSenha = !this._exibirSenha;

        return this._exibirSenha;
    }

    emitirEventoDigitacao() {
        this.atualizarIcone();
        this.digitarEvento.emit(this.control.get(this.controlName)?.value);
    }

    limpar() {
        if (this.control.get(this.controlName)?.value != '') {
            this.control.get(this.controlName)?.setValue('');
            this.digitarEvento.emit(this.control.get(this.controlName)?.value);
            this.atualizarIcone();
        }
    }

    atualizarIcone() {
        this._iconeBusca = this.control.get(this.controlName)?.value != '' ? 'cancel' : 'search';
    }

    abrirCalendario() {}

    copiar() {
        const texto = this.control.get(this.controlName)?.value;
        if (texto) {
            navigator.clipboard.writeText(texto);
            this.acaoEvento.emit('copiar');
        }
    }

    transformarEntrada(valor: string) {
        switch (this.transform) {
            case 'uppercase':
                return valor.toUpperCase();
            case 'lowercase':
                return valor.toLowerCase();
            case 'none':
                return valor;
            default:
                return valor;
        }
    }

    definirMesAno(normalizedMonthAndYear: Dayjs, datepicker: MatDatepicker<Dayjs>) {
        this.control.get(this.controlName)?.setValue(dayjs().month(normalizedMonthAndYear.month()).year(normalizedMonthAndYear.year()).format('YYYY-MM'));
        datepicker.close();
    }
}

@Component({
    selector: `sfr-input-icon`,
    templateUrl: './input-icon.component.html',
    host: {
        '[class.sfr-input-icon]': 'true'
    }
})
export class InputIconComponent {
    @Input() class: string;
    @Input() icon: keyof typeof BibliotecaIcones;
    @Input() iconClass: string[];
    @Input() tooltip: TooltipConfig;

    @Output() clicarEvento = new EventEmitter();

    acionarAcao() {
        this.clicarEvento.emit();
    }
}
