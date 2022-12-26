import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputComponent, InputIconComponent } from './input.component';

import { A11yModule } from '@angular/cdk/a11y';
import { CommonModule } from '@angular/common';
import { DiretivasModule } from '@/app/apresentacao/diretivas/diretivas.module';
import { IconModule } from '../icon/icon.module';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NgModule } from '@angular/core';
import { NgxCurrencyModule } from 'ngx-currency';
import { NgxMaskModule } from 'ngx-mask';

@NgModule({
    declarations: [InputComponent, InputIconComponent],
    imports: [CommonModule, FormsModule, ReactiveFormsModule, NgxMaskModule.forRoot(), IconModule, MatDatepickerModule, MatTooltipModule, NgxCurrencyModule, DiretivasModule],
    exports: [InputComponent, InputIconComponent]
})
export class InputModule {}
