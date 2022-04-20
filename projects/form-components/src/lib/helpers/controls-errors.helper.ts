import { AbstractControl, ValidationErrors } from '@angular/forms';
import { omit } from 'lodash';

/**
 * Scroll to first error on the form
 * @param selector the class used to find the first error (:not(form).ng-invalid by default)
 */
export function scrollToError(selector: string = ':not(form).ng-invalid, .scrollable-error'): void {
    setTimeout(() => {
        const firstElementWithError = document.querySelector(selector);
        if (firstElementWithError) {
            firstElementWithError.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }, 0);
}

export function removeErrors(control: AbstractControl, errorsToRemove: string[]) {
    const errors = omit(control.errors, errorsToRemove);
    control.setErrors(errors);
    if (Object.keys(control.errors || {}).length === 0) {
        control.setErrors(null);
    }
}

export function addErrors(control: AbstractControl, errorsToAdd: ValidationErrors) {
    control.setErrors({ ...(control.errors || {}), ...errorsToAdd});
}

