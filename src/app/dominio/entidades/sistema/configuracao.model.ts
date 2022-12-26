import { InjectionToken } from '@angular/core';

export const CONFIG = new InjectionToken('');

/** Modelo de configuração do startup da aplicação */
export class Configuracao {
    producao: boolean;
    aplicacao: string;
    comunicacao: {
        backend: {
            url: string;
            timeoutPadrao: number;
        };
        container: {
            url: string;
            timeoutPadrao: number;
        };
    };
    acesso: {
        estrategia: string;
        sessao: {
            expiracao: number;
        };
    };
    caminho: {
        icones: string;
        imagens: string;
    };
    chaveFamilia: string;
}
