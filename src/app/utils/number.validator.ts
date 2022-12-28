import { AbstractControl, ValidationErrors, ValidatorFn, FormControl } from '@angular/forms';

export function checkPositiveNumberInput(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        if (isNaN(control.value)) {
            return {forbiddenName: {value: control.value}}
        }
        else if (control.value < 0) {
            return {forbiddenName: {value: control.value}}
        }
        else {
            return null;
        }
    }
}
