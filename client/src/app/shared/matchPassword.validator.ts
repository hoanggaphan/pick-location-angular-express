import { AbstractControl, ValidationErrors } from '@angular/forms';

export default function matchPassword(p: string, cp: string) {
  return function (control: AbstractControl): ValidationErrors | null {
    let password = control.get(p);
    let confirmPassword = control.get(cp);

    if (
      password &&
      confirmPassword &&
      password.value &&
      confirmPassword.value &&
      password.value != confirmPassword.value
    ) {
      confirmPassword.setErrors({ passwordMissmatch: true });
      return {
        passwordMissmatch: true,
      };
    }

    if (confirmPassword?.hasError('passwordMissmatch')) {
      confirmPassword.setErrors(null);
    }
    return null;
  };
}
