import { EventEmitter } from '@angular/core';
import { UntypedFormArray, UntypedFormGroup, AbstractControl, UntypedFormControl } from '@angular/forms';

export function markAllControlsAsTouched(form: AbstractControl, touched = true) {

    // Hack to emit `statusChanges` when markedAsTouched
    if (form instanceof UntypedFormControl && !(form as any)._touchedFixed) {
        const oldMAT = form.markAsTouched;
        form.markAsTouched = (...args) => {
            oldMAT.bind(form)(...args);
            (form.statusChanges as EventEmitter<any>).emit({ touched });
        };
        (form as any)._touchedFixed = true;
    }

    if (touched) {
        form.markAsTouched({ onlySelf: true });
    } else {
        form.markAsUntouched({ onlySelf: true });
    }

    if ((form instanceof UntypedFormGroup || form instanceof UntypedFormArray) && form.controls && Object.keys(form.controls).length > 0) {
        for (const inner in form.controls) {
            if (Object.getOwnPropertyNames(inner)) {
                const control = form.get(inner);
                if (control) {
                    markAllControlsAsTouched(control, touched);
                }
            }
        }
    }
}

/**
 * Check if form is invalid but bypass not completed async validators
 */
 export function checkIfPendingFormIsInvalid(group: UntypedFormGroup | UntypedFormArray): boolean {
    return Object.values(group.controls).some(c => {
        if ((c instanceof UntypedFormGroup || c instanceof UntypedFormArray) && c.pending) {
            return checkIfPendingFormIsInvalid(c);
        }
        return c.invalid;
    });
}

