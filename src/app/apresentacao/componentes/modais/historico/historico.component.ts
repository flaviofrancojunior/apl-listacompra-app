import { ModalTipoHistoricoDetalhe } from '@/app/dominio/contratos/helpers/modais.interface';
import { Component, EventEmitter, Inject, Output, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
    selector: 'sfr-modais-historico',
    templateUrl: './historico.component.html',
    styleUrls: ['./historico.component.scss']
})
export class ModaisHistoricoComponent {
    _colunasExibidas: string[] = ['data', 'usuario', 'descricao'];

    _listaHistoricos: MatTableDataSource<any>;

    /** Evento emitido ao confirmar ação. */
    @Output() confirmarEvento = new EventEmitter();

    @ViewChild(MatSort) sort: MatSort;

    constructor(@Inject(MAT_DIALOG_DATA) public data: ModalTipoHistoricoDetalhe[], public dialog: MatDialog) {
        if (data) {
            this._listaHistoricos = new MatTableDataSource([...data]);
            this._listaHistoricos.sort = this.sort;
        }
    }

    acaoPrimaria() {
        this.dialog.closeAll();
        this.confirmarEvento.emit();
    }
}
