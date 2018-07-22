import { Component, Input, Output, EventEmitter }              from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';

import { DynamicInputBase } from "../dynamic-base";

@Component({
  selector: 'dynamic-textarea-input',
  templateUrl: './dynamic-textarea.component.html',
  styleUrls: ['./dynamic-textarea.component.css']
})

export class DynamicTextareaComponent extends DynamicInputBase {

  @Input() group: FormGroup;
  @Input() arrayName: string;
  @Input() indexInArray: string;
  @Input() controlName: string;
  @Input() label: string;
  @Input() icon: string;
  @Input() placeholder: string;
  @Input() multiple: boolean;
  @Input() errorMessages: any;
  @Input() rows: number = 5;

  @Output() onSubmit: EventEmitter<any>;

  constructor() {
    super();
    this.onSubmit = new EventEmitter();
  }

  onEnter(insertBox: any) {
    if (this.multiple) {
      if (!this.formControl.errors || !this.formControl.errors['email']) {
        this.insertIntoFormControl(insertBox.value);
        insertBox.value = '';
      }
    }
  }

  onBlur(insertBox: any) {
    if (this.multiple) {
      insertBox.value = '';
    }
  }

  onKeystroke(value: string) {
    (<any> this.formControl).tempValue = value;
    this.formControl.updateValueAndValidity();
    //this.formControl.markAsDirty();
  }

  submit() {
    if (this.onSubmit)
      this.onSubmit.emit(this.formControl.value);
  }

}


