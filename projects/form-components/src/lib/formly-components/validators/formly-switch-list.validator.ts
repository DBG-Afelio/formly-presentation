import { some } from 'lodash';
import { AbstractControl, FormControl, ValidationErrors } from '@angular/forms';

    export function FormlySwitchListValidatorRequired(control: AbstractControl): ValidationErrors | null {
        if (!control.value) {
            return {switchRequired: true};
        }

        const allNull  = some(Object.keys(control.value), (keyControl) => control.value[keyControl]);

        return allNull ? null : {switchRequired: true};
    }
