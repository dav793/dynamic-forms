import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DynamicTextComponent } from './form-elements/text/dynamic-text.component';
import { DynamicTextareaComponent } from './form-elements/textarea/dynamic-textarea.component';
import { DynamicComboComponent } from './form-elements/combo/dynamic-combo.component';
import { DynamicCheckComponent } from './form-elements/check/dynamic-check.component';
import { DynamicDateComponent } from './form-elements/date/dynamic-date.component';
import { DynamicTimeComponent } from './form-elements/time/dynamic-time.component';
import { DynamicMoneyComponent } from './form-elements/money/dynamic-money.component';

import { FilterSearchPipe } from './filter-search.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    DynamicTextComponent,
    DynamicTextareaComponent,
    DynamicComboComponent,
    DynamicCheckComponent,
    DynamicDateComponent,
    DynamicTimeComponent,
    DynamicMoneyComponent,
    FilterSearchPipe
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DynamicTextComponent,
    DynamicTextareaComponent,
    DynamicComboComponent,
    DynamicCheckComponent,
    DynamicDateComponent,
    DynamicTimeComponent,
    DynamicMoneyComponent
  ]
})
export class DynamicFormsModule { }
