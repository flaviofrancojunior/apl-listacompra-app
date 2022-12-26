import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject, Observable, distinctUntilChanged, filter, map, of } from 'rxjs';
import { INavegacaoHelper, ROTAS, Rota } from '@/app/dominio/contratos/helpers/navegacao.interface';

import { Injectable } from '@angular/core';
import { Location } from '@angular/common';

@Injectable({ providedIn: 'root' })
export class NavegacaoHelper implements INavegacaoHelper {
    router: Router;
    activatedRoute: ActivatedRoute;

    urlAtual: string;
    parametrosAtual: any;
    rota: Rota;

    private _rotaAtual = new BehaviorSubject<Rota | undefined>(undefined);
    rotaAtual: Observable<Rota | undefined> = this._rotaAtual.asObservable();

    constructor(private _router: Router, private _activatedRoute: ActivatedRoute, private _location: Location) {
        this.router = this._router;
        this.activatedRoute = this._activatedRoute;

        this.router.events
            .pipe(
                filter((event) => event instanceof NavigationEnd),
                distinctUntilChanged()
            )
            .subscribe((event: any) => {
                this.urlAtual = event.urlAfterRedirects;
                this.obterParametrosRotaAtual();
            });

        this._activatedRoute.queryParams.subscribe((parametros) => {
            this.parametrosAtual = { ...parametros.keys, ...parametros };
        });
    }

    ir(rota: Rota, dados?: any): void {
        if (dados !== undefined) {
            this._router.navigate([rota.url], { state: dados });
        } else {
            this._router.navigate([rota.url]);
        }
    }

    voltar(rota?: string): void {
        if (rota) {
            this._router.navigate([rota]);
        } else {
            this._location.back();
        }
    }

    obterDados(): any {
        const existeDados = this._router.getCurrentNavigation()?.extras.hasOwnProperty('state') ? true : false;

        if (existeDados) {
            return this._router.getCurrentNavigation()?.extras.state;
        } else {
            return undefined;
        }
    }

    obterParametros(): any {
        return this.parametrosAtual;
    }

    obterParametrosRotaAtual(): void {
        const chaveEncontrada = Object.keys(ROTAS).find((chave) => {
            return ROTAS[chave as keyof typeof ROTAS].url === this.urlAtual;
        });
        this.rota = ROTAS[chaveEncontrada as keyof typeof ROTAS];
        this._rotaAtual.next(this.rota);
    }
}
