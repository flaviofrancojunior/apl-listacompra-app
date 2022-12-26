import { Imagem, IRepositorioImagens } from '@/app/dominio/contratos/repositorios/imagens.interface';
import { Component, EventEmitter, Inject, Output } from '@angular/core';

import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ModalTipoInformacaoDetalhe } from '@/app/dominio/contratos/helpers/modais.interface';

@Component({
    selector: 'sfr-modais-informacao',
    templateUrl: './informacao.component.html',
    styleUrls: ['./informacao.component.scss']
})
export class ModaisInformacaoComponent {
    _imagem: Imagem;
    _dados: ModalTipoInformacaoDetalhe;

    /** Evento emitido ao confirmar ação. */
    @Output() confirmarEvento = new EventEmitter();

    constructor(@Inject(MAT_DIALOG_DATA) public data: ModalTipoInformacaoDetalhe, public dialog: MatDialog, private _repositorioImagens: IRepositorioImagens) {
        if (data) {
            const imagem = this._repositorioImagens.obter(data.imagemNome);
            if (imagem) {
                this._imagem = imagem;
            }

            this._dados = this.data;
        }
    }

    acaoPrimaria() {
        this.dialog.closeAll();
        this.confirmarEvento.emit();
    }
}
