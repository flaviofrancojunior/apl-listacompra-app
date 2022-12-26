import { NgModule } from '@angular/core';
import { PessoasDetalhesModule } from './detalhes/detalhes.module';
import { PessoasInicioModule } from './inicio/inicio.module';

@NgModule({
    declarations: [],
    imports: [PessoasInicioModule, PessoasDetalhesModule],
    exports: []
})
export class PessoasModule {}
