import { AbstractControl, ValidatorFn } from '@angular/forms';

export function nameValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: string } | null => {
    const value = control.value;

    const latinRegex = /^[a-zA-Z]+$/;
    const georgianRegex = /^[ა-ჰ]+$/;
    const isLatin = latinRegex.test(value);
    const isGeorgian = georgianRegex.test(value);

    if (!value) {
      return { required: 'ველის შევსება სავალდებულოა' };
    }

    if (value.length < 2 || value.length > 50) {
      return { invalidLength: 'დასაშვებია მინ. 2 და მაქს. 50 სიმბოლო' };
    }

    if (!isLatin && !isGeorgian) {
      return {
        invalidCharacters:
          'შეიყვანეთ მხოლოდ ქართული ან მხოლოდ ლათინური სიმბოლოები',
      };
    }

    const hasLatinAndGeorgian = /(?=.*[a-zA-Z])(?=.*[ა-ჰ])/.test(value);
    if (hasLatinAndGeorgian) {
      return {
        invalidMixedCharacters:
          'შეიყვანეთ მხოლოდ ქართული ან მხოლოდ ლათინური სიმბოლოები',
      };
    }

    return null;
  };
}
