import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { TranslateModule } from '@ngx-translate/core';
import { DaenaeDropdownComponent } from './daenae-dropdown/daenae-dropdown.component';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        TranslateModule,
        NgSelectModule
    ],
    declarations: [DaenaeDropdownComponent],
    exports: [DaenaeDropdownComponent]
})
export class ComponentsModule { }
