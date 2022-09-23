import { UntypedFormControl } from '@angular/forms';
import { isNil } from 'lodash';

export class PriceRangeValidator {
    static outOfRange(
        range: { min?: number, max?: number }
    ) {
        return (control: UntypedFormControl): { [key: string]: any } | null => {
            let result = null;
            const value = parseFloat(control.value);
            if (!isNaN(value) && range?.min && range?.max && (!isNil(range.min) || !isNil(range.max))) {
                if ((!isNil(range.min) && value < range.min) || (!isNil(range.max) && value > range.max)) {
                    result = {
                        outOfRange: true
                    };
                }
            }
            return result;
        };
    }
}
