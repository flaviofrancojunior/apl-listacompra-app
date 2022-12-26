import { Observable, throwError } from 'rxjs';

import { Cartao } from '@/app/dominio/entidades/pessoas/cartao.model';
import { ErroNegocio } from '@/app/dominio/entidades/sistema/erro.model';
import { IPessoasCartoesUseCase } from '@/app/dominio/contratos/casos-uso/pessoas/cartoes.interface';
import { IPessoasServico } from '@/app/dominio/contratos/servicos/pessoas.interface';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class PessoasCartoesUseCase implements IPessoasCartoesUseCase {
    constructor(private _pessoasServico: IPessoasServico) {}

    cadastrarCartao(cartao: Cartao): Observable<any> {
        return this._pessoasServico.cadastrarCartao(cartao);
    }
    alterarCartao(cartao: Cartao): Observable<any> {
        if (cartao?.id) {
            return this._pessoasServico.alterarCartao(cartao);
        } else {
            const erro = {
                mensagem: 'Ocorreu um erro durante a alteração do cartão.',
                detalhes: 'Nao foi encontrado um [id] para realizar a ação.',
                fluxo: 'pessoas.usecase:alterarConta'
            };

            return throwError(() => new ErroNegocio(erro));
        }
    }
}
