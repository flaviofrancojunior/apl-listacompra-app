import { Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';

import { Injectable } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
    providedIn: 'root'
})
export class CadastrosServico {
    _lista: any[] = [];

    constructor() {}

    cadastrar(objeto: any): Observable<any> {
        objeto.id = uuidv4();
        this._lista.push(objeto);

        return of({ id: objeto.id }).pipe(
            map((resultado) => resultado),
            delay(1000)
        );
    }

    alterar(objeto: any): Observable<any> {
        const indice = this._lista.findIndex((elemento) => elemento.id == objeto.id);

        this._lista[indice] = objeto;

        return of({ id: objeto.id }).pipe(
            map((resultado) => resultado),
            delay(1000)
        );
    }

    remover(id: string): Observable<any> {
        this._lista = this._lista.filter((elemento, indice) => {
            return elemento.id != id;
        });
        return of({}).pipe(
            map((result) => {
                result;
            }),
            delay(1000)
        );
    }

    obterLista(): Observable<any[]> {
        return of(this._lista).pipe(
            map((result) => result),
            delay(1000)
        );
    }
}
