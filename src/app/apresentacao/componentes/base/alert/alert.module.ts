import { AlertComponent } from './alert.component';
import { CommonModule } from '@angular/common';
import { IconModule } from '../icon/icon.module';
import { NgModule } from '@angular/core';

@NgModule({
    declarations: [AlertComponent],
    imports: [CommonModule, IconModule],
    exports: [AlertComponent]
})
export class AlertModule {}
