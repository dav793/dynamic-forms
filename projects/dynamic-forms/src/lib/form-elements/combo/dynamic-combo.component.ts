import { Component, Input, Output, EventEmitter, ViewChildren, QueryList, ElementRef, OnChanges, SimpleChange } from '@angular/core';
import { FormGroup, FormControl, AbstractControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

import { DynamicInputBase } from "../dynamic-base";

import { FilterSearchPipe } from '../../filter-search.pipe';

import { Option } from '../../models';

@Component({
  selector: 'dynamic-combo-input',
  host: {
    '(document:click)': 'handleClick($event)',
  },
  templateUrl: './dynamic-combo.component.html',
  styleUrls: ['./dynamic-combo.component.css']
})

export class DynamicComboComponent extends DynamicInputBase implements OnChanges {

  @Input() group: FormGroup;
  @Input() arrayName: string;
  @Input() indexInArray: string;
  @Input() controlName: string;
  @Input() label: string;
  @Input() icon: string;
  @Input() placeholder: string;
  @Input() multiple: boolean;
  @Input() searchEnabled: boolean;
  @Input() acceptAnyInput: boolean;
  @Input() removeSelectedFromOptions: boolean;
  @Input() errorMessages: any;
  @Input() options: Option[] = [];
  @Input() asyncOptions: Observable<Option[]>;

  @Output() onCustomUserInput = new EventEmitter();

  @ViewChildren("compBox") compBox: QueryList<any>;
  @ViewChildren("searchBox") searchBox: QueryList<any>;

  expanded: boolean;
  search: any;
  asyncOptionsSub: any;

  constructor(private elem: ElementRef) {
    super();
  }

  ngOnChanges(changes: {[ propName: string]: SimpleChange}) {
    if (changes['options'])
      this.updateOptions();

    if (changes['asyncOptions']) {
      if (this.asyncOptionsSub)
        this.asyncOptionsSub.unsubscribe();

      this.asyncOptionsSub = this.asyncOptions.subscribe((opts: Option[]) => {
        // console.log('test', opts);
        this.options = opts;
      });
    }
  }

  expand() {
    this.expanded = true;
    if (this.searchEnabled) {
      this.searchBox.first.nativeElement.value = '';
      this.focusSearchBox();
    }
  }

  collapse() {
    this.expanded = false;
    if (this.searchEnabled) {
      this.searchBox.first.nativeElement.value = '';
    }
    this.search = '';
  }

  selectOption(option: Option) {
    let selectedOption: any;
    if (this.formControl.value)
      selectedOption = this.options.find(o => o.key === this.formControl.value);
    if (selectedOption)
      selectedOption.hidden = false;

    option.hidden = true;
    this.formControl.setValue(option.key);
    this.formControl.markAsDirty();
    this.formControl.markAsTouched();
    this.collapse();
  }

  selectMultiOption(option: Option) {
    option.hidden = true;
    this.insertIntoFormControl(option.key);
    this.collapse();
  }

  updateOptions() {
    if (this.removeSelectedFromOptions && this.formControlValue) {
      if (!this.multiple) {
        let selected = this.options.find(o => o.key === this.formControlValue);
        if (selected)
          selected.hidden = true;
      }
      else {
        this.formControlValue.forEach((so: string) => {
          let selected = this.options.find(o => o.key === so);
          if (selected)
            selected.hidden = true;
        });
      }
    }
  }

  removeFromFormControl(index: number) {
    if (this.formControlValue) {
      let optKey = this.formControlValue[index];
      let option = this.options.find((o) => o.key === optKey);
      if (option)
        option.hidden = false;
    }

    super.removeFromFormControl(index);
  }

  get emptyOptions() {
    let filtered = new FilterSearchPipe().transform(this.options, [this.search]);
    if (!filtered || filtered.length === 0)
      return true;
    return false;
  }

  get searchBoxFocused() {
    if (this.searchEnabled && this.searchBox && this.searchBox.first)
      return this.searchBox.first.nativeElement === document.activeElement;
    return false;
  }

  get labelIsEmpty() {
    return !(this.label && this.label !== '');
  }

  focusSearchBox() {
    if (this.searchEnabled)
      this.searchBox.first.nativeElement.focus();
  }

  updateSearch(search: string) {
    this.search = search;
  }

  insertCustomUserOption(value: string) {
    if (!this.acceptAnyInput)
      return;

    //let optionKey = value.replace(/\s+/g, '_').toLowerCase();
    let optionKey = value;
    this.options.push({key: optionKey, label: value});

    if (!this.multiple)
      this.selectOption(this.options[this.options.length-1]);
    else
      this.selectMultiOption(this.options[this.options.length-1]);

    this.onCustomUserInput.emit(this.options[this.options.length-1]);
  }

  getOptionLabel(key: string) {
    if (!this.options)
      return null;

    if (!Array.isArray(this.options))
      console.error('options must be an array! given: ', this.options);

    let option = this.options.find((opt: Option) => {
      return opt.key === key;
    });
    if (option)
      return option.label;
    return null;
  }

  handleClick(event: any) {
    var clickedComponent = event.target;
    var inside = false;

    do {
      if (clickedComponent === this.elem.nativeElement)
        inside = true;
      clickedComponent = clickedComponent.parentNode;
    } while (clickedComponent);

    if(inside) {
      this.focusSearchBox();
      if (!this.expanded)
        this.expand();
      //console.log('clicked inside');
    } else {
      this.collapse();
      //console.log('clicked outside');
    }
  }

}


