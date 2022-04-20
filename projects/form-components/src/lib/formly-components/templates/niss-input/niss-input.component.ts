import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FieldType } from '@ngx-formly/core';

@Component({
    selector: 'daenae-niss-input',
    templateUrl: './niss-input.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class NissInputComponent extends FieldType {
    public get control() : FormControl {
        return this.formControl as FormControl
    }
}
