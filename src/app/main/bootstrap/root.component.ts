import 'dayjs/locale/pt-br';

import { IArmazenamentoServico, Local } from '@/app/dominio/contratos/repositorios/armazenamento.interface';
import dayjs, { Dayjs } from 'dayjs';

import { Component } from '@angular/core';
import { DateAdapter } from '@angular/material/core';
import { v4 as uuidv4 } from 'uuid';

@Component({
    selector: 'sfr-root',
    templateUrl: './root.component.html'
})
export class RootComponent {
    constructor(private _armazenamentoServico: IArmazenamentoServico, private dateAdapter: DateAdapter<Dayjs>) {
        dayjs.locale('pt-br');
        this.dateAdapter.setLocale('pt-br');
        this._armazenamentoServico.definir('correlation-id', uuidv4(), Local.sessao);
    }
}
