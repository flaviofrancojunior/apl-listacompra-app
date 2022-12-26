import { ButtonModule } from '@/app/apresentacao/componentes/base/button/button.module';
import { CardModule } from '@/app/apresentacao/componentes/base/card/card.module';
import { CommonModule } from '@angular/common';
import { IconModule } from '@/app/apresentacao/componentes/base/icon/icon.module';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NgModule } from '@angular/core';
import { NgxMaskModule } from 'ngx-mask';
import { PessoasCardPessoaDetalheComponent } from './card-pessoa-detalhe.component';
import { SpinnerModule } from '@/app/apresentacao/componentes/base/spinner/spinner.module';
import { TableFilterModule } from '@/app/apresentacao/componentes/base/table/filter/filter.module';
import { TabsModule } from '@/app/apresentacao/componentes/base/tabs/tabs.module';

@NgModule({
    declarations: [PessoasCardPessoaDetalheComponent],
    imports: [CommonModule, ButtonModule, IconModule, SpinnerModule, MatTableModule, MatSortModule, CardModule, NgxMaskModule.forChild(), TabsModule, MatTooltipModule],
    exports: [PessoasCardPessoaDetalheComponent]
})
export class PessoasCardPessoaDetalheModule {}
