import { Estados } from '@/app/dominio/contratos/helpers/estados.interface';
import { IEstadosHelper } from '@/app/dominio/contratos/helpers/estados.interface';
import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { v4 as uuidv4 } from 'uuid';

@Injectable({ providedIn: 'any' })
export class EstadosHelper implements IEstadosHelper {
    carregando: boolean;
    erro: boolean;
    semDados: boolean;
    comDados: boolean;
    etapa1: boolean;
    etapa2: boolean;
    etapa3: boolean;
    etapa4: boolean;
    etapa5: boolean;
    etapa6: boolean;
    etapa7: boolean;
    etapa8: boolean;
    etapa9: boolean;
    etapa10: boolean;

    spinnerId: string = uuidv4();
    spinnerMensagem: string;

    constructor(private _spinnerService: NgxSpinnerService) {}

    definirEstado(estado: keyof typeof Estados, mensagem?: string, idSpinner?: any) {
        Object.keys(Estados).forEach((elemento) => {
            (this[elemento as keyof EstadosHelper] as any) = elemento === estado;
        });

        if (mensagem != undefined) {
            this.spinnerMensagem = mensagem;
        } else {
            this.spinnerMensagem = '';
        }

        if (estado === Estados.carregando) {
            if (idSpinner != undefined) {
                this._spinnerService.show(idSpinner);
            } else {
                this._spinnerService.show(this.spinnerId);
            }
        } else {
            if (idSpinner != undefined) {
                this._spinnerService.hide(idSpinner);
            } else {
                this._spinnerService.hide(this.spinnerId);
            }
        }
    }

    definirCarregamentoGlobal(ativo: boolean) {
        if (ativo) {
            this._spinnerService.show('global');
        } else {
            this._spinnerService.hide('global');
        }
    }
}
