import { HttpHeaders, HttpParams } from '@angular/common/http';

export type HttpMetodo = 'post' | 'get' | 'put' | 'delete' | 'patch';

export type HttpRequisicao = {
    body?: any;
    headers?:
        | HttpHeaders
        | {
              [header: string]: string | string[];
          };
    params?:
        | HttpParams
        | {
              [param: string]: string | string[];
          };
    observe?: 'body';
    responseType?: 'json';
    reportProgress?: boolean;
    withCredentials?: boolean;
};
