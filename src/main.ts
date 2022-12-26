import { CONFIG } from '@/app/dominio/entidades/sistema/configuracao.model';
import { RootModule } from '@/app/main/bootstrap/root.module';
import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

fetchSettings().then((config) => {
    if (config.producao) {
        enableProdMode();
    }
    platformBrowserDynamic([{ provide: CONFIG, useValue: config }])
        .bootstrapModule(RootModule)
        .catch((erro) => console.error('Falha crítica durante o bootstraping da aplicação', erro));
});

function fetchSettings(): Promise<any> {
    return new Promise((resolve) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = () => {
            if (Number(xhr.status) === 200) {
                resolve(JSON.parse(xhr.response));
            } else {
                resolve(undefined);
            }
        };
        xhr.open('GET', 'assets/config/appSettings.json');
        xhr.send(null);
    });
}
