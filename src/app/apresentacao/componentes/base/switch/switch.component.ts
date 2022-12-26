import { Component, Input } from '@angular/core';

import { UntypedFormGroup } from '@angular/forms';

@Component({
    selector: 'sfr-switch',
    templateUrl: './switch.component.html',
    styleUrls: ['./switch.component.scss']
})
export class SwitchComponent {
    @Input() checkedText: string;
    @Input() uncheckedText: string;

    @Input() control: UntypedFormGroup;
    @Input() controlName: any;
}
