import { Component, EventEmitter, Input, Output } from '@angular/core';

import { UntypedFormGroup } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';

@Component({
    selector: 'sfr-checkbox',
    templateUrl: './checkbox.component.html',
    styleUrls: ['./checkbox.component.scss']
})
export class CheckboxComponent {
    @Input() control: UntypedFormGroup;
    @Input() controlName: any;

    @Input() class: string;

    @Output() clicarEvento = new EventEmitter<boolean>();

    onChange(checkbox: MatCheckboxChange) {
        this.clicarEvento.emit(checkbox.checked);
    }
}
