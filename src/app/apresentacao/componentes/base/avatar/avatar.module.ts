import { AvatarComponent } from './avatar.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

@NgModule({
    declarations: [AvatarComponent],
    imports: [CommonModule],
    exports: [AvatarComponent]
})
export class AvatarModule {}
