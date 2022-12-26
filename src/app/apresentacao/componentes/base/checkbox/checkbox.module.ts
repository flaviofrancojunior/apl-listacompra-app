import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CheckboxComponent } from './checkbox.component';
import { CommonModule } from '@angular/common';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { NgModule } from '@angular/core';
import { PipesModule } from '@/app/apresentacao/pipes/pipes.module';

@NgModule({
    declarations: [CheckboxComponent],
    imports: [CommonModule, FormsModule, ReactiveFormsModule, FormsModule, MatCheckboxModule, PipesModule],
    exports: [CheckboxComponent]
})
export class CheckboxModule {}
