import { UntypedFormControl, ValidationErrors } from '@angular/forms';

export function isHourValid(control: UntypedFormControl): ValidationErrors | null {
    const hoursRegex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
    return control.value && !control.value.match(hoursRegex) ? { invalidHour: true } : null;
}
