import { CadastrosCardUsuariosModule } from '@/app/apresentacao/componentes/negocios/cadastros/card-usuarios/card-usuarios.module';
import { CadastrosUsuariosComponent } from './usuarios.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

@NgModule({
    declarations: [CadastrosUsuariosComponent],
    imports: [CommonModule, CadastrosCardUsuariosModule],
    exports: [CadastrosUsuariosComponent]
})
export class CadastrosUsuariosModule {}
