import { BibliotecaModalTipoConfirmacao, IModaisHelper, ModalFormularioConfiguracaoNovoParametro, ModalTipoConfirmacao, ModalTipoInformacao } from '@/app/dominio/contratos/helpers/modais.interface';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { CalendarioConfiguracao } from '@/app/dominio/entidades/componentes/calendario.model';

import { Injectable } from '@angular/core';
import { ModaisConfirmacaoComponent } from '@/app/apresentacao/componentes/modais/confirmacao/confirmacao.component';
import { ModaisInformacaoComponent } from '@/app/apresentacao/componentes/modais/informacao/informacao.component';

@Injectable({ providedIn: 'root' })
export class ModaisHelper implements IModaisHelper {
    modalRef: MatDialogRef<any>;

    constructor(public dialog: MatDialog) {}

    exibirInformacao(tipo: keyof typeof ModalTipoInformacao): MatDialogRef<any, any> {
        this.modalRef = this.dialog.open(ModaisInformacaoComponent, {
            data: tipo,
            disableClose: true,
            minWidth: '300px'
        });

        return this.modalRef;
    }
    exibirConfirmacao(tipo: keyof typeof ModalTipoConfirmacao): MatDialogRef<any, any> {
        this.modalRef = this.dialog.open(ModaisConfirmacaoComponent, {
            data: BibliotecaModalTipoConfirmacao[tipo],
            disableClose: true,
            width: '400px',
            panelClass: 'modal-base-container'
        });

        return this.modalRef;
    }

    exibirCalendario(dados: CalendarioConfiguracao): MatDialogRef<any, any> {
        throw new Error('Method not implemented.');
    }

    exibirFomulario(config: ModalFormularioConfiguracaoNovoParametro): MatDialogRef<any, any> {
        var configuracao: MatDialogConfig = {
            data: {
                operacao: config.operacao ?? '',
                dados: config.dados,
                listasValidacao: config.listasValidacao ?? []
            },
            disableClose: true,
            panelClass: 'modal-base-container'
        };

        switch (config.tipo) {
            // case 'sistema_nova-moeda':
            //     this.modalRef = this.dialog.open(ModaisFormulariosNovaMoedaComponent, configuracao);
            //     break;

            default:
                break;
        }

        return this.modalRef;
    }

    fechar(): void {
        this.dialog.closeAll();
    }
}
