import { CollapseComponent, contentDirective, headerDirective } from './collapse.component';

import { CommonModule } from '@angular/common';
import { MatExpansionModule } from '@angular/material/expansion';
import { NgModule } from '@angular/core';

@NgModule({
    declarations: [CollapseComponent, headerDirective, contentDirective],
    imports: [CommonModule, MatExpansionModule],
    exports: [CollapseComponent, headerDirective, contentDirective]
})
export class CollapseModule {}
