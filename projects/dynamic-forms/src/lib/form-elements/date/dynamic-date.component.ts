import { Component, Input, OnChanges, SimpleChange, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';

import { DynamicInputBase } from '../dynamic-base';

declare var $: any;
import * as momentImported from 'moment';
const moment = momentImported;

@Component({
  selector: 'dynamic-date-input',
  templateUrl: './dynamic-date.component.html',
  styleUrls: ['./dynamic-date.component.css']
})

export class DynamicDateComponent extends DynamicInputBase {

  @Input() group: FormGroup;
  @Input() arrayName: string;
  @Input() indexInArray: string;
  @Input() controlName: string;
  @Input() label: string;
  @Input() icon: string;
  @Input() disabled: boolean;
  @Input() errorMessages: any;

  @ViewChild('myDatepicker') myDatepicker: ElementRef;

  constructor() {
    super();
  }

  ngAfterViewInit() {
    this.initializeDatepicker();
  }

  ngOnChanges(changes: {[ propName: string]: SimpleChange}) {
    if (changes['disabled']) {
      if (this.formControl) {

        if (this.disabled) {
          this.formControl.disable();
        }
        else {
          this.formControl.enable();
        }

      }
    }
  }

  initializeDatepicker() {
    $(this.myDatepicker.nativeElement).datepicker({
      format: 'dd/mm/yyyy',
      forceParse: false
    });

    $(this.myDatepicker.nativeElement).datepicker()
      .on('changeDate', (e: any) => {
        this.onChangeDate(e.date);
      });
  }

  onChangeDate(date: any) {
    let dateText = moment(date).format('DD/MM/YYYY');
    this.setFormControlValue(dateText);
  }

  setFormControlValue(value: string) {
    this.formControl.setValue(value);
    this.formControl.markAsDirty();
    this.formControl.markAsTouched();
  }

}


