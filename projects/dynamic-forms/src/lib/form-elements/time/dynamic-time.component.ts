import { Component, Input, OnChanges, SimpleChange, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';

import { DynamicInputBase } from "../dynamic-base";

declare var $: any;

@Component({
  selector: 'dynamic-time-input',
  templateUrl: './dynamic-time.component.html',
  styleUrls: ['./dynamic-time.component.css']
})

export class DynamicTimeComponent extends DynamicInputBase {

  @Input() group: FormGroup;
  @Input() arrayName: string;
  @Input() indexInArray: string;
  @Input() controlName: string;
  @Input() label: string;
  @Input() icon: string;
  @Input() disabled: boolean;
  @Input() errorMessages: any;

  @ViewChild('myTimepicker') myTimepicker: ElementRef;

  constructor() {
    super();
  }

  ngAfterViewInit() {
    this.initializeTimepicker();
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

  initializeTimepicker() {
    $(this.myTimepicker.nativeElement).timepicker({
      showMeridian: false,
      explicitMode: true,
      defaultTime: false,
      icons: {
        up: 'fa fa-chevron-up',
        down: 'fa fa-chevron-down'
      }
    });

    $(this.myTimepicker.nativeElement).timepicker()
      .on('changeTime.timepicker', (e: any) => {
        this.onChangeTime(e.time);
      });
  }

  onChangeTime(time: any) {
    let hours = parseInt(time.hours, 10);
    let minutes = parseInt(time.minutes, 10);
    let hoursStr = '';
    let minutesStr = '';

    if (time.meridian && time.meridian === 'PM')
      hours += 12;

    if (parseInt(time.hours, 10) === 12) {
      if (time.meridian === 'AM') {
        hours = 0;
      }
      else if (time.meridian === 'PM') {
        hours = 12;
      }
    }

    if (minutes < 10)
      minutesStr = '0'+minutes.toString();
    else
      minutesStr = minutes.toString();

    hoursStr = hours.toString();

    this.setFormControlValue(hoursStr+':'+minutesStr);
  }

  setFormControlValue(value: string) {
    this.formControl.setValue(value);
    this.formControl.markAsDirty();
    this.formControl.markAsTouched();
  }

}


