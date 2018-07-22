import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PreviewData, PreviewDataFormArrayElement } from "./preview-data.model";

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.css']
})
export class PreviewComponent implements OnInit {

  comboOptions = [
    {key: '1', label: 'lorem'},
    {key: '2', label: 'ipsum'},
    {key: '3', label: 'dolor'},
    {key: '4', label: 'sit'},
    {key: '5', label: 'amet'}
  ];

  previewForm: FormGroup;

  validationMessages = {
    'genericField': {
      'required': 'field is required'
    }
  };

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.buildFormGroup(new PreviewData({}));
  }

  buildFormGroup(previewData: PreviewData) {
    this.previewForm = this.fb.group({
      textSingle:     [previewData.textSingle,    [Validators.required]],
      textMulti:      [previewData.textMulti,     [Validators.required]],
      textArea:       [previewData.textArea,      [Validators.required]],
      moneySingle:    [previewData.moneySingle,   [Validators.required]],
      moneyMulti:     [previewData.moneyMulti,    [Validators.required]],
      dateSingle:     [previewData.dateSingle,    [Validators.required]],
      dateMulti:      [previewData.dateMulti,     [Validators.required]],
      timeSingle:     [previewData.timeSingle,    [Validators.required]],
      timeMulti:      [previewData.timeMulti,     [Validators.required]],
      comboSingle:    [previewData.comboSingle,   [Validators.required]],
      comboMulti:     [previewData.comboMulti,    [Validators.required]],
      check:          [previewData.check,         [Validators.required]],
      formArray:      this.fb.array([])
    });
    this.setFormArray(previewData.formArray);
  }

  buildFormArray(formArrayData: PreviewDataFormArrayElement) {
    return this.fb.group({
      textSingle:     [formArrayData.textSingle,    [Validators.required]],
      textMulti:      [formArrayData.textMulti,     [Validators.required]],
      textArea:       [formArrayData.textArea,      [Validators.required]],
      moneySingle:    [formArrayData.moneySingle,   [Validators.required]],
      moneyMulti:     [formArrayData.moneyMulti,    [Validators.required]],
      dateSingle:     [formArrayData.dateSingle,    [Validators.required]],
      dateMulti:      [formArrayData.dateMulti,     [Validators.required]],
      timeSingle:     [formArrayData.timeSingle,    [Validators.required]],
      timeMulti:      [formArrayData.timeMulti,     [Validators.required]],
      comboSingle:    [formArrayData.comboSingle,   [Validators.required]],
      comboMulti:     [formArrayData.comboMulti,    [Validators.required]],
      check:          [formArrayData.check,         [Validators.required]],
    });
  }

  setFormArray(formArrayData: PreviewDataFormArrayElement[]) {
    const fgs = formArrayData.map((r) => {
      return this.buildFormArray(r);
    });
    const formArray = this.fb.array(fgs);

    this.previewForm.setControl('formArray', formArray);
  }

  addArrayForm() {
    let r = new PreviewDataFormArrayElement({});
    this.formArray.push(this.buildFormArray(r));
    this.previewForm.markAsDirty();
  }

  deleteArrayForm(index: number) {
    let formArrayElemsCopy = this.formArray.value.map(val => Object.assign({}, val));
    formArrayElemsCopy.splice(index, 1);
    this.setFormArray(formArrayElemsCopy);
    this.previewForm.markAsDirty();
  }

  get formArray(): FormArray {
    if (this.previewForm)
      return this.previewForm.get('formArray') as FormArray;
    return null;
  }
}
