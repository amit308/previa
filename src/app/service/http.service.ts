import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor() { }
  MatchPassword(new_password: string, confirm_new_password: string) {
    return (formGroup: FormGroup) => {
      const passwordControl = formGroup.controls[new_password];
      const confirmPasswordControl = formGroup.controls[confirm_new_password];

      if (!passwordControl || !confirmPasswordControl) {
        return null;
      }

      if (confirmPasswordControl.errors && !confirmPasswordControl.errors.passwordMismatch) {
        return null;
      }

      if (passwordControl.value !== confirmPasswordControl.value) {
        confirmPasswordControl.setErrors({ passwordMismatch: true });
      } else {
        confirmPasswordControl.setErrors(null);
      }
    }
  }
}
