import { DiretivasModule } from './diretivas/diretivas.module';
import { HelpersModule } from './helpers/helpers.module';
import { ModaisModule } from './componentes/modais/modais.module';
import { NgModule } from '@angular/core';
import { PaginasModule } from './paginas/paginas.module';
import { PipesModule } from './pipes/pipes.module';

@NgModule({
    declarations: [],
    imports: [PaginasModule, HelpersModule, PipesModule, ModaisModule, DiretivasModule],
    exports: [PaginasModule]
})
export class ApresentacaoModule {}
