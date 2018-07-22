import { Component, Input }              from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';

import { DynamicInputBase } from "../dynamic-base";

@Component({
  selector: 'dynamic-check-input',
  templateUrl: './dynamic-check.component.html',
  styleUrls: ['./dynamic-check.component.css']
})

export class DynamicCheckComponent extends DynamicInputBase {

  @Input() group: FormGroup;
  @Input() arrayName: string;
  @Input() indexInArray: string;
  @Input() controlName: string;
  @Input() label: string;
  @Input() errorMessages: any;
  @Input() noMargins: boolean;

  constructor() {
    super();
  }

}


