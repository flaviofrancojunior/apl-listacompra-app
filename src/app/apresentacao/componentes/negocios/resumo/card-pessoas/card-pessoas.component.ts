import { Estados, IEstadosHelper } from '@/app/dominio/contratos/helpers/estados.interface';
import { INavegacaoHelper, ROTAS } from '@/app/dominio/contratos/helpers/navegacao.interface';

import { Component } from '@angular/core';
import { EstadosHelper } from '@/app/apresentacao/helpers/estados.helper';
import { IPessoasUseCase } from '@/app/dominio/contratos/casos-uso/pessoas/pessoas.interface';
import { ISnackbarHelper } from '@/app/dominio/contratos/helpers/snackbar.interface';
import { Pessoa } from '@/app/dominio/entidades/pessoas/pessoa.model';

@Component({
    selector: 'sfr-resumo-card-pessoas',
    templateUrl: './card-pessoas.component.html',
    styleUrls: ['./card-pessoas.component.scss'],
    providers: [{ provide: IEstadosHelper, useClass: EstadosHelper }]
})
export class ResumoCardPessoasComponent {
    _pessoasCadastradas: Pessoa[];

    constructor(public estado: IEstadosHelper, private _navegacaoHelper: INavegacaoHelper, private _snackbarHelper: ISnackbarHelper, private _pessoasUseCase: IPessoasUseCase) {
        this.obterResumoPessoas();
    }

    obterResumoPessoas() {
        this.estado.definirEstado(Estados.carregando, 'Obtendo pessoas...');
        this._pessoasUseCase.obterListaPessoas().subscribe({
            next: (resultado) => {
                this._pessoasCadastradas = resultado.filter((pessoa) => pessoa.ativo);

                this.estado.definirEstado(Estados.comDados);
            },
            error: (erro) => {
                this._snackbarHelper.exibirErro(erro);
                this.estado.definirEstado(Estados.erro);
            }
        });
    }

    acessarPessoas() {
        this._navegacaoHelper.ir(ROTAS.dashboardPessoas);
    }
}
