import * as XLSX from 'xlsx';

import { IExportarHelper } from '@/app/dominio/contratos/helpers/exportar.interface';
import { ISnackbarHelper } from '@/app/dominio/contratos/helpers/snackbar.interface';
import { Injectable } from '@angular/core';
import dayjs from 'dayjs';

@Injectable({ providedIn: 'any' })
export class ExportarHelper implements IExportarHelper {
    constructor(private _snackbarHelper: ISnackbarHelper) {}

    exportarXLS(arquivoNome: string, dados: any[]): void {
        if (arquivoNome && dados) {
            const nome = arquivoNome + '_' + dayjs().format('YYYYMMDDHHmmss') + '.xls';

            const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(dados);
            const wb: XLSX.WorkBook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(wb, ws, 'Dados');
            XLSX.writeFile(wb, nome);
        } else {
            this._snackbarHelper.exibirInformacao('Ocorreu uma falha ao exportar.');
        }
    }
    exportarXLSX(arquivoNome: string, dados: any[]): void {
        if (arquivoNome && dados) {
            const nome = arquivoNome + '_' + dayjs().format('YYYYMMDDHHmmss') + '.xlsx';

            const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(dados);
            const wb: XLSX.WorkBook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(wb, ws, 'Dados');
            XLSX.writeFile(wb, nome);
        } else {
            this._snackbarHelper.exibirInformacao('Ocorreu uma falha ao exportar.');
        }
    }
    exportarCSV(arquivoNome: string, dados: any[]): void {
        if (arquivoNome && dados) {
            const nome = arquivoNome + '_' + dayjs().format('YYYYMMDDHHmmss') + '.csv';

            const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(dados);
            const wb: XLSX.WorkBook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(wb, ws, 'Dados');
            XLSX.writeFile(wb, nome);
        } else {
            this._snackbarHelper.exibirInformacao('Ocorreu uma falha ao exportar.');
        }
    }
}
