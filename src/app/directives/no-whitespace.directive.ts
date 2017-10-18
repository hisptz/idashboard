import { Directive} from '@angular/core';
import {Validator, AbstractControl, NG_VALIDATORS, ValidatorFn} from '@angular/forms';

export function NoWhitespaceValidator(): ValidatorFn {

  return (control: AbstractControl): { [key: string]: any } => {

    // messy but you get the idea
    let isWhitespace = (control.value || '').trim().length === 0;
    let isValid = !isWhitespace;
    console.log(isValid)
    return isValid ? null : { 'whitespace': 'value is only whitespace' }

  };
}

/**
 * This validator works like "required" but it does not allow whitespace either
 *
 * @export
 * @class NoWhitespaceDirective
 * @implements {Validator}
 */
@Directive({
  selector: '[noWhiteSpace]',
  providers: [{ provide: NG_VALIDATORS, useExisting: NoWhitespaceDirective, multi: true }]
})
export class NoWhitespaceDirective implements Validator {

  private valFn = NoWhitespaceValidator();
  validate(control: AbstractControl): { [key: string]: any } {
    console.log(this.valFn(control))
    return this.valFn(control);
  }
}

