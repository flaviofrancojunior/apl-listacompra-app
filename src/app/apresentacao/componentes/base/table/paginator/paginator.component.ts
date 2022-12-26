import { AfterViewInit, Component, Input, ViewChild } from '@angular/core';

import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
    selector: 'sfr-table-paginator',
    templateUrl: './paginator.component.html',
    styleUrls: ['./paginator.component.scss']
})
export class TablePaginatorComponent implements AfterViewInit {
    _dadosTabela: MatTableDataSource<any>;
    @Input()
    public get dadosTabela(): MatTableDataSource<any> {
        return this._dadosTabela;
    }
    public set dadosTabela(value: MatTableDataSource<any>) {
        this._dadosTabela = value;

        if (this._dadosTabela && this.paginator) {
            this.inicializaPaginacao();
        }
    }

    @Input() pageSize: number = 50;

    @ViewChild(MatPaginator) paginator: MatPaginator;

    constructor() {}

    ngAfterViewInit(): void {
        this.inicializaPaginacao();
    }

    inicializaPaginacao() {
        this.paginator._intl.firstPageLabel = 'Primeira página';
        this.paginator._intl.itemsPerPageLabel = 'Itens por página:';
        this.paginator._intl.lastPageLabel = 'Última página';
        this.paginator._intl.nextPageLabel = 'Avançar';
        this.paginator._intl.previousPageLabel = 'Voltar';

        this.paginator._intl.getRangeLabel = (page: number, pageSize: number, length: number) => {
            const start = page * pageSize + 1;
            const end = (page + 1) * pageSize;
            return `${start} - ${end} de ${length}`;
        };

        if (this._dadosTabela) {
            this._dadosTabela.paginator = this.paginator;
        }
    }
}
