import { AbstractControl, ValidationErrors } from '@angular/forms';
import { some } from 'lodash';

    export function FormlySwitchListValidatorRequired(control: AbstractControl): ValidationErrors | null {
        if (!control.value) {
            return {switchRequired: true};
        }

        const allNull  = some(Object.keys(control.value), (keyControl) => control.value[keyControl]);

        return allNull ? null : {switchRequired: true};
    }
