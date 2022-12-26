import { MatSnackBar, MatSnackBarRef, TextOnlySnackBar } from '@angular/material/snack-bar';

import { Erro } from '@/app/dominio/entidades/sistema/erro.model';
import { ISnackbarHelper } from '@/app/dominio/contratos/helpers/snackbar.interface';
import { Injectable } from '@angular/core';
import { take } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SnackbarHelper implements ISnackbarHelper {
    constructor(private _snackBar: MatSnackBar) {}

    exibirSucesso(mensagem: string): MatSnackBarRef<TextOnlySnackBar> {
        return this._snackBar.open(mensagem, '', {
            horizontalPosition: 'end',
            verticalPosition: 'top',
            duration: 5000,
            panelClass: ['bg-success-lightest', 'fg-success-darkest', 'mt-32', 'mr-12', 'p1']
        });
    }

    exibirErro(erro: Erro): MatSnackBarRef<TextOnlySnackBar> {
        const mensagem = erro.mensagem + (erro.detalhes ? ' ' + erro.detalhes : '');
        const ref = this._snackBar.open(mensagem, 'Relatar', {
            horizontalPosition: 'end',
            verticalPosition: 'top',
            duration: 5000,
            panelClass: ['bg-danger-lightest', 'fg-danger-darkest', 'mt-32', 'mr-12', 'p1']
        });

        ref.onAction()
            .pipe(take(1))
            .subscribe(() => {
                console.log('Registrou o erro: ', erro, erro.codigo, erro.mensagem, erro.detalhes, erro.fluxo);
            });

        return ref;
    }

    exibirInformacao(mensagem: string): MatSnackBarRef<TextOnlySnackBar> {
        return this._snackBar.open(mensagem, '', {
            horizontalPosition: 'end',
            verticalPosition: 'top',
            duration: 5000,
            panelClass: ['bg-info-lightest', 'fg-info-darkest', 'mt-32', 'mr-12', 'p1']
        });
    }

    exibirAviso(mensagem: string): MatSnackBarRef<TextOnlySnackBar> {
        return this._snackBar.open(mensagem, '', {
            horizontalPosition: 'end',
            verticalPosition: 'top',
            duration: 5000,
            panelClass: ['bg-warning-lightest', 'fg-warning-darkest', 'mt-32', 'mr-12', 'p1']
        });
    }
}
