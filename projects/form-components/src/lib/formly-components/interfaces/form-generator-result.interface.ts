import { FormlyFieldConfig } from '@ngx-formly/core';
import { UntypedFormGroup, AbstractControl } from '@angular/forms';

export interface FormGeneratorResult<ModelType = any> {
    formGroup: UntypedFormGroup;
    formlyConfig: FormlyFieldConfig[];
    model: ModelType;
    formState?: any;
}


export interface SubFormGeneratorResult<ModelType = any> {
    formGroup:  {[key: string]: AbstractControl};
    formlyConfig: FormlyFieldConfig[];
    model: ModelType;
}
