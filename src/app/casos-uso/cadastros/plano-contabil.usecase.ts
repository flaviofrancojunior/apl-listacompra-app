import { ICadastrosPlanoContabilUseCase } from '@/app/dominio/contratos/casos-uso/cadastros/plano-contabil.interface';
import { ICadastrosServico } from '@/app/dominio/contratos/servicos/cadastros.interface';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PlanoContabil } from '@/app/dominio/entidades/cadastros/plano-contabil.model';

@Injectable({
    providedIn: 'root'
})
export class CadastrosPlanoContabilUseCase implements ICadastrosPlanoContabilUseCase {
    constructor(private _cadastrosServico: ICadastrosServico) {}

    obterListaPlanosContabeis(): Observable<PlanoContabil[]> {
        return this._cadastrosServico.obterListaPlanosContabeis();
    }
}
