import { Component, Input } from '@angular/core';

@Component({
    selector: `sfr-badge`,
    templateUrl: './badge.component.html',
    styleUrls: ['./badge.component.scss']
})
export class BadgeComponent {
    @Input() type: 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'danger' | 'alert' | 'notification' | 'negative';

    @Input() text: string | number;

    constructor() {}

    isString(value: any) {
        return typeof value === 'string';
    }
}
