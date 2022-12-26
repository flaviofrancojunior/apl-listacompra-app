import { CanActivate, Router, UrlTree } from '@angular/router';

import { IAcessoUseCase } from '@/app/dominio/contratos/casos-uso/acesso/acesso.interface';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(private router: Router, private _acessoUseCase: IAcessoUseCase) {}

    canActivate(): Observable<boolean> | Promise<boolean> | boolean | UrlTree {
        if (this._acessoUseCase.validarLogin()) {
            return true;
        } else {
            return this.router.parseUrl('/login');
        }
    }
}
