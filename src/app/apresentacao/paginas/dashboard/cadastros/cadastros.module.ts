import { CadastrosBancosModule } from './bancos/bancos.module';
import { CadastrosInicioModule } from './inicio/inicio.module';
import { CadastrosNovoPlanoContaModule } from './novo-plano-conta/novo-plano-conta.module';
import { CadastrosPlanoContasModule } from './plano-contas/plano-contas.module';
import { CadastrosUsuariosModule } from './usuarios/usuarios.module';
import { NgModule } from '@angular/core';

@NgModule({
    declarations: [],
    imports: [CadastrosInicioModule, CadastrosBancosModule, CadastrosUsuariosModule, CadastrosPlanoContasModule, CadastrosNovoPlanoContaModule],
    exports: []
})
export class CadastrosModule {}
