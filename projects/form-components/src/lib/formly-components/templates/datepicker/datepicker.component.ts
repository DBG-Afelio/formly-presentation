import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FieldType, FormlyFieldConfig } from '@ngx-formly/core';

/**
 * TemplateOptions
 * - minDate: Date
 * - maxDate: Date
 */
@Component({
  selector: 'daenae-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class DatepickerComponent extends FieldType {

    override defaultOptions: FormlyFieldConfig = {
        templateOptions: {
            minDate : new Date('01/01/1900'),
            maxDate: new Date('01/01/2200'),
            shouldBlockMinMaxSelection: true
        }
    };
    
    public get control() : FormControl {
        return this.formControl as FormControl
    }
    
}
