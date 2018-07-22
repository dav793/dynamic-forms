import { Component, Input, Output, EventEmitter, ViewChildren, QueryList }              from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';

import { DynamicInputBase } from "../dynamic-base";
import { StringManipulator } from '../../string-manipulator';

declare var $: any;

@Component({
  selector: 'dynamic-money-input',
  templateUrl: './dynamic-money.component.html',
  styleUrls: ['./dynamic-money.component.css', './../styles.css']
})

export class DynamicMoneyComponent extends DynamicInputBase {

  @Input() group: FormGroup;
  @Input() arrayName: string;
  @Input() indexInArray: string;
  @Input() controlName: string;
  @Input() label: string;
  @Input() icon: string;
  @Input() placeholder: string;
  @Input() multiple: boolean;
  @Input() errorMessages: any;

  @Output() onSubmit: EventEmitter<any>;

  @ViewChildren("textBox") textBox: QueryList<any>;
  @ViewChildren("insertBox") insertBox: QueryList<any>;

  constructor() {
    super();
    this.onSubmit = new EventEmitter();
  }

  ngAfterViewInit() {
    this.init();
  }

  ngOnDestroy() {}

  ngOnChanges(changes: any) {
    if (this.textBox)
      this.init();
  }

  init() {
    if (!this.multiple)
      this.updatePreview(StringManipulator.convertToMoney(this.formControlValue));
    this.watchChanges();
  }

  watchChanges() {
    this.formControl.valueChanges
      .subscribe((chg: any) => {
        this.updatePreview(StringManipulator.convertToMoney(chg));
    });
  }

  caretBeforeFirstComma(formattedValue: string, caretPosition: number): boolean {
    let beforeCaret = formattedValue.substring(0, caretPosition);
    if (beforeCaret.indexOf(',') > -1)  // there is at least 1 comma before caret
      return false;
    else                                // there are no commas before caret
      return true;
  }

  updatePreview(value: string) {
    let caretPosition = this.getCaretPosition(this.textBox.first.nativeElement);

    // if difference is X > 0, increase caret position by X spaces
    // if difference is X < 0, decrease caret position by X spaces
    // BUT if caret is before first comma, ignore (do no change caret position)
    let diff = value.length - this.textBox.first.nativeElement.value.length;
    if (diff !== 0) {
      if (!this.caretBeforeFirstComma(value, caretPosition))
        caretPosition += diff;
    }

    // if difference is -1 (one character was removed) and erased the last comma (so there are no more commas left)..
    // ..and caret is not at start of string, decrease caret position by 1
    if (diff === -1 && caretPosition > 0 && this.textBox.first.nativeElement.value.indexOf(',') > -1 && value.indexOf(',') === -1)
      caretPosition -= 1;

    // console.log(
    //   'new: ' + value,
    //   'old: ' + this.textBox.first.nativeElement.value,
    //   'diff: ' + diff
    // );

    this.textBox.first.nativeElement.value = value;
    this.setCaretPosition(this.textBox.first.nativeElement, caretPosition);
  }

  updateFormControl(value: number, emitEvent: boolean = true) {
    if (emitEvent) {
      this.formControl.setValue(value);
      this.formControl.markAsDirty();
      this.formControl.markAsTouched();
    }
    else
      this.formControl.setValue(value, {emitEvent: false});
  }

  onTextValueChange(event: any) {
    let newValue = StringManipulator.convertToNumber(event.target.value);
    this.updatePreview(StringManipulator.convertToMoney(newValue));
    if (!this.multiple)
      this.updateFormControl(newValue);
  }

  onEnter(insertBox: any) {
    if (this.multiple) {
      if (!this.formControl.errors) {
        let newValue = StringManipulator.convertToNumber(insertBox.value);
        this.insertIntoFormControl(newValue);
        insertBox.value = '';
      }
    }
  }

  onBlur(insertBox: any) {
    if (this.multiple) {
      insertBox.value = '';
    }
  }

  formatMoney(value: number): string {
    return StringManipulator.convertToMoney(value);
  }

  submit() {
    if (this.onSubmit)
      this.onSubmit.emit(this.formControl.value);
  }

  /*
   ** Returns the caret (cursor) position of the specified text field.
   ** Return value range is 0-oField.value.length.
   */
  getCaretPosition(oField: any) {

    // Initialize
    var iCaretPos = 0;

    // IE Support
    if ((<any> document).selection) {

      // Set focus on the element
      oField.focus();

      // To get cursor position, get empty selection range
      var oSel = (<any> document).selection.createRange();

      // Move selection start to 0 position
      oSel.moveStart('character', -oField.value.length);

      // The caret position is selection length
      iCaretPos = oSel.text.length;
    }

    // Firefox support
    else if (oField.selectionStart || oField.selectionStart == '0')
      iCaretPos = oField.selectionStart;

    // Return results
    return iCaretPos;
  }

  setCaretPosition(oField: any, pos: number) {
    if (oField.setSelectionRange) {
      oField.focus();
      oField.setSelectionRange(pos,pos);
    }
    else if (oField.createTextRange) {
      var range = oField.createTextRange();
      range.collapse(true);
      range.moveEnd('character', pos);
      range.moveStart('character', pos);
      range.select();
    }
  }

}


