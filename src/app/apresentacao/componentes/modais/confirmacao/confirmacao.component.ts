import { ModalTipoConfirmacaoDetalhe } from '@/app/dominio/contratos/helpers/modais.interface';
import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';

@Component({
    selector: 'sfr-modais-confirmacao',
    templateUrl: './confirmacao.component.html',
    styleUrls: ['./confirmacao.component.scss']
})
export class ModaisConfirmacaoComponent {
    _dados: ModalTipoConfirmacaoDetalhe;

    @Output() cancelarEvento = new EventEmitter();
    @Output() confirmarEvento = new EventEmitter();

    constructor(@Inject(MAT_DIALOG_DATA) public data: ModalTipoConfirmacaoDetalhe, public dialog: MatDialog) {
        if (data) {
            this._dados = this.data;
        }
    }

    acaoSecundaria() {
        this.dialog.closeAll();
        this.cancelarEvento.emit();
    }

    acaoPrimaria() {
        this.dialog.closeAll();
        this.confirmarEvento.emit();
    }
}
