import 'dayjs/locale/pt-br';

import { CUSTOM_ELEMENTS_SCHEMA, DEFAULT_CURRENCY_CODE, LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { ApresentacaoModule } from '@/app/apresentacao/apresentacao.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { CasosUsoModule } from '@/app/casos-uso/casos-uso.module';
import { ErrorInterceptor } from '@/app/main/interceptors/error.interceptor';
import { InfraModule } from '@/app/infra/infra.module';
import { MatNativeDateModule } from '@angular/material/core';
import { RequestInterceptor } from '@/app/main/interceptors/request.interceptor';
import { RootComponent } from './root.component';
import localePt from '@angular/common/locales/pt';

registerLocaleData(localePt);

@NgModule({
    imports: [BrowserAnimationsModule, BrowserModule, CommonModule, HttpClientModule, ApresentacaoModule, InfraModule, CasosUsoModule, MatNativeDateModule],
    declarations: [RootComponent],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: RequestInterceptor,
            multi: true
        },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
        { provide: LOCALE_ID, useValue: 'pt-BR' },
        { provide: DEFAULT_CURRENCY_CODE, useValue: '' }
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    bootstrap: [RootComponent]
})
export class RootModule {}
