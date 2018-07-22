import { FormGroup, AbstractControl, Validators } from '@angular/forms';
import { Subject } from 'rxjs';

import { Option } from '../models';

export class DynamicInputBase {

  group: FormGroup;
  arrayName: string;
  indexInArray: string;
  controlName: string;
  label: string;
  icon: string;
  placeholder: string;
  multiple: boolean;
  errorMessages: any;

  constructor() {}

  init() {}

  get isFormArrayMember() {
    return this.arrayName;
  }

  get formControl() {
    // is not in form array
    if (!this.isFormArrayMember)
      return this.group.get(this.controlName);

    // is in form array
    let idx = this.indexInArray;
    if (typeof idx !== 'string')
      idx = (<any>idx).toString();
    return this.group.get(this.arrayName).get(idx).get(this.controlName);
  }

  get formControlValue() {
    return this.formControl.value;
  }

  get emptySelection() {
    if (!this.formControlValue)
      return true;
    if (Array.isArray(this.formControlValue) && this.formControlValue.length === 0)
      return true;
    return false;
  }

  get errorKeys() {
    if (this.errorMessages)
      return Object.keys(this.errorMessages);
    return [];
  }

  hasError(key: string) {
    if (this.formControl && this.formControl.errors && key in this.formControl.errors)
      return true;
    return false;
  }

  getError(key: string) {
    if (this.hasError(key))
      return this.errorMessages[key];
    return '';
  }

  insertIntoFormControl(value: string | number) {
    let oldValue = this.formControlValue || [];
    oldValue.push(value);

    this.formControl.setValue(oldValue);
    this.formControl.markAsDirty();
    this.formControl.markAsTouched();
  }

  removeFromFormControl(index: number) {
    let oldValue = this.formControlValue || [];
    oldValue.splice(index, 1);

    this.formControl.setValue(oldValue);
    this.formControl.markAsDirty();
    this.formControl.markAsTouched();
  }

};
