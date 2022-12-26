import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CommonModule } from '@angular/common';
import { IconModule } from '../icon/icon.module';
import { InputModule } from '../input/input.module';
import { MatSelectModule } from '@angular/material/select';
import { NgModule } from '@angular/core';
import { SelectComponent } from './select.component';

@NgModule({
    declarations: [SelectComponent],
    imports: [CommonModule, MatSelectModule, FormsModule, ReactiveFormsModule, InputModule, IconModule],
    exports: [SelectComponent]
})
export class SelectModule {}
