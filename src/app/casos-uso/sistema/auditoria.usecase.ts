import { IAuditoriaServico } from '@/app/dominio/contratos/servicos/auditoria.interface';
import { IAuditoriaUseCase } from '@/app/dominio/contratos/casos-uso/sistema/auditoria.interface';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Operacao } from '@/app/dominio/entidades/sistema/auditoria.model';

@Injectable({
    providedIn: 'root'
})
export class AuditoriaUseCase implements IAuditoriaUseCase {
    constructor(private _auditoriaServico: IAuditoriaServico) {}

    obterOperacoesPorPeriodo(dataInicio: string, dataFim: string): Observable<Operacao[]> {
        return this._auditoriaServico.obterListaOperacoes(dataInicio, dataFim);
    }
}
