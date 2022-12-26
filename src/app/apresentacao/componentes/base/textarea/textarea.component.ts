import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, ValidationErrors } from '@angular/forms';
import { pairwise, startWith } from 'rxjs';

import { v4 as uuidv4 } from 'uuid';

/* eslint-disable @angular-eslint/component-selector */

@Component({
    selector: `sfr-textarea`,
    templateUrl: './textarea.component.html',
    styleUrls: ['./textarea.component.scss']
})
export class TextareaComponent implements OnInit {
    @Input() control: FormGroup;
    @Input() controlName: any;

    @Input() placeholder: string;

    @Input() invalid: boolean = false;
    @Input() invalidText: string;

    @Input() validationMessages: { erro: string; mensagem: string }[];
    _listaErros: string[] = [];

    @Input() class: string;

    @Input() maxLength: number;

    @Input() showCharacters: boolean = false;

    @Input() resize: boolean = false;

    @Input() label: boolean = true;

    _listaClassesAdicionais: string[] = [];

    _id: string;

    @Output() digitarEvento = new EventEmitter<string>();

    constructor() {
        this._id = uuidv4();
    }

    ngOnInit(): void {
        this.control
            .get(this.controlName)
            ?.valueChanges.pipe(startWith(this.control.get(this.controlName)), pairwise())
            .subscribe(([prev, next]: [any, any]) => {
                if (prev != next && next != '') {
                    this.control.get(this.controlName)?.setValue(next, { emitEvent: false });

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

    emitirEventoDigitacao() {
        this.digitarEvento.emit(this.control.get(this.controlName)?.value);
    }

    limpar() {
        if (this.control.get(this.controlName)?.value != '') {
            this.control.get(this.controlName)?.setValue('');
            this.digitarEvento.emit(this.control.get(this.controlName)?.value);
        }
    }
}
