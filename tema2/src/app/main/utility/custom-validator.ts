import { FormControl, ValidationErrors } from '@angular/forms';

export class CustomValidator {
  public static ageValidator(age: FormControl): ValidationErrors | null {
    if (age?.value <= 0) {
      return { min: true };
    }
    return null;
  }
}
