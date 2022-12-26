import { MatSnackBarRef, TextOnlySnackBar } from '@angular/material/snack-bar';

import { Erro } from '@/app/dominio/entidades/sistema/erro.model';

export abstract class ISnackbarHelper {
    abstract exibirSucesso(mensagem: string): MatSnackBarRef<TextOnlySnackBar>;
    abstract exibirErro(erro: Erro): MatSnackBarRef<TextOnlySnackBar>;
    abstract exibirInformacao(mensagem: string): MatSnackBarRef<TextOnlySnackBar>;
    abstract exibirAviso(mensagem: string): MatSnackBarRef<TextOnlySnackBar>;
}
