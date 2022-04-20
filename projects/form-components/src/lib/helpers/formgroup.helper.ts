import { EventEmitter } from '@angular/core';
import { FormArray, FormGroup, AbstractControl, FormControl } from '@angular/forms';

export function markAllControlsAsTouched(form: AbstractControl, touched = true) {

    // Hack to emit `statusChanges` when markedAsTouched
    if (form instanceof FormControl && !(form as any)._touchedFixed) {
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

    if ((form instanceof FormGroup || form instanceof FormArray) && form.controls && Object.keys(form.controls).length > 0) {
        for (const inner in form.controls) {
            if (Object.getOwnPropertyNames(inner)) {
                markAllControlsAsTouched(form.get(inner), touched);
            }
        }
    }
}

/**
 * Check if form is invalid but bypass not completed async validators
 */
 export function checkIfPendingFormIsInvalid(group: FormGroup | FormArray): boolean {
    return Object.values(group.controls).some(c => {
        if ((c instanceof FormGroup || c instanceof FormArray) && c.pending) {
            return checkIfPendingFormIsInvalid(c);
        }
        return c.invalid;
    });
}

