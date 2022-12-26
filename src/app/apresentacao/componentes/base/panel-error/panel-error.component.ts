import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'sfr-panel-error',
    templateUrl: './panel-error.component.html',
    styleUrls: ['./panel-error.component.scss']
})
export class PanelErrorComponent {
    @Output() reload = new EventEmitter<any>();

    recarregar() {
        this.reload.emit();
    }
}
