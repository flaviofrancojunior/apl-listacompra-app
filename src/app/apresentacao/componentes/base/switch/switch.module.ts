import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CommonModule } from '@angular/common';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { NgModule } from '@angular/core';
import { SwitchComponent } from './switch.component';

@NgModule({
    declarations: [SwitchComponent],
    imports: [CommonModule, MatButtonToggleModule, MatSlideToggleModule, FormsModule, ReactiveFormsModule],
    exports: [SwitchComponent]
})
export class SwitchModule {}
