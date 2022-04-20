import { FormControl, ValidatorFn, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { FieldType } from '@ngx-formly/core';
import { isHourValid } from '../../validators/hour.validator';

@Component({
    selector: 'daenae-hour-input',
    templateUrl: './hour-input.component.html'
})
export class HourInputComponent extends FieldType implements OnInit {

    public placeholder = '00:00';

    ngOnInit(): void {
        this.formControl.setValidators([
            (control) => isHourValid(control as FormControl),
            this.to.required ? Validators.required as ValidatorFn : () => null
        ]);
    }

    public get control() : FormControl {
        return this.formControl as FormControl
    }
}
