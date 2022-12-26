import { TabsComponent, tabDirective } from './tabs.component';

import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { NgModule } from '@angular/core';

@NgModule({
    declarations: [TabsComponent, tabDirective],
    imports: [CommonModule, MatTabsModule],
    exports: [TabsComponent, tabDirective]
})
export class TabsModule {}
