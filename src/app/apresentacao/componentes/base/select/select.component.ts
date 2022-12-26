import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MAT_SELECT_CONFIG, MatSelectChange } from '@angular/material/select';
import { Observable, map, startWith } from 'rxjs';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';

export type ListaOpcoesSelect = {
    id: string | number;
    descricao: string;
    extra?: any;
};

@Component({
    selector: 'sfr-select',
    templateUrl: './select.component.html',
    styleUrls: ['./select.component.scss'],
    providers: [
        {
            provide: MAT_SELECT_CONFIG,
            useValue: { overlayPanelClass: 'select-container' }
        }
    ]
})
export class SelectComponent {
    _form: UntypedFormGroup;

    _listaOpcoesFiltrada: Observable<ListaOpcoesSelect[]> | undefined;

    @Input() control: UntypedFormGroup;
    @Input() controlName: any;

    @Input() class: string;

    @Input() invalid: boolean = false;
    @Input() invalidText: string;

    /** Define as opções do componente. */
    _options: ListaOpcoesSelect[];
    @Input()
    set options(input: ListaOpcoesSelect[]) {
        this._options = input !== undefined ? [...input] : [];

        if (this._options) {
            this._listaOpcoesFiltrada = this._form.get('pesquisa')?.valueChanges.pipe(
                startWith(''),
                map((pesquisa) => this.pesquisar(pesquisa || ''))
            );
        }
    }
    get options() {
        return this._options;
    }

    /** Define um placeholder. */
    @Input() placeholder: string = '';

    @Input() label: boolean = false;

    /** Define o evento a ser emitido quando uma opção for selecionada. */
    @Output() selectionChange = new EventEmitter<any>();

    constructor(private _formBuilder: UntypedFormBuilder) {
        this._form = this._formBuilder.group({
            pesquisa: ['']
        });
    }

    pesquisar(value: string): ListaOpcoesSelect[] {
        if (value === '') {
            return this._options;
        } else {
            const filterValue = value.toLowerCase();

            return this._options.filter((option) => option.descricao.toLowerCase().includes(filterValue));
        }
    }

    definirSelecao(select: MatSelectChange) {
        this._form.get('pesquisa')?.setValue('');
        this.selectionChange.emit(select.value);
    }

    removerSelecao(evento: any) {
        evento.stopPropagation();
        if (!this.control.get(this.controlName)?.disabled) {
            this._form.get('pesquisa')?.setValue('');
            this.control.get(this.controlName)?.setValue('');
            this.selectionChange.emit('');
        }
    }

    obterDescricao(value: any) {
        const elemento = this._options.find((elemento) => {
            return elemento.id == value;
        });

        return elemento?.descricao;
    }
}
