import { AccountingPipe } from './accounting.pipe';
import { JoinPipe } from './join.pipe';
import { NgModule } from '@angular/core';

@NgModule({
    declarations: [JoinPipe, AccountingPipe],
    imports: [],
    exports: [JoinPipe, AccountingPipe],
    providers: []
})
export class PipesModule {}
