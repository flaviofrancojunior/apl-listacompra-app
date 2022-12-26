import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CommonModule } from '@angular/common';
import { MatRadioModule } from '@angular/material/radio';
import { NgModule } from '@angular/core';
import { RadioComponent } from './radio.component';

@NgModule({
    declarations: [RadioComponent],
    imports: [CommonModule, MatRadioModule, FormsModule, ReactiveFormsModule],
    exports: [RadioComponent]
})
export class RadioModule {}
