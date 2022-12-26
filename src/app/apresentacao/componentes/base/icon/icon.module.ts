import { CommonModule } from '@angular/common';
import { IconComponent } from './icon.component';
import { NgModule } from '@angular/core';
import { PipesModule } from '@/app/apresentacao/pipes/pipes.module';

@NgModule({
    declarations: [IconComponent],
    imports: [CommonModule, PipesModule],
    exports: [IconComponent]
})
export class IconModule {}
