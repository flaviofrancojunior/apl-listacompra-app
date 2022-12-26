import { AvatarModule } from '../avatar/avatar.module';
import { ButtonModule } from '../button/button.module';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header.component';
import { IconModule } from '../icon/icon.module';
import { MatMenuModule } from '@angular/material/menu';
import { NgModule } from '@angular/core';

@NgModule({
    declarations: [HeaderComponent],
    imports: [CommonModule, AvatarModule, ButtonModule, IconModule, MatMenuModule],
    exports: [HeaderComponent]
})
export class HeaderModule {}
