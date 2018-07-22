"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var dynamic_base_1 = require("../dynamic-base");
var string_manipulator_1 = require("../../string-manipulator");
var DynamicMoneyComponent = (function (_super) {
    __extends(DynamicMoneyComponent, _super);
    function DynamicMoneyComponent() {
        var _this = _super.call(this) || this;
        _this.onSubmit = new core_1.EventEmitter();
        return _this;
    }
    DynamicMoneyComponent.prototype.ngAfterViewInit = function () {
        this.init();
    };
    DynamicMoneyComponent.prototype.ngOnDestroy = function () { };
    DynamicMoneyComponent.prototype.ngOnChanges = function (changes) {
        if (this.textBox)
            this.init();
    };
    DynamicMoneyComponent.prototype.init = function () {
        if (!this.multiple)
            this.updatePreview(string_manipulator_1.StringManipulator.convertToMoney(this.formControlValue));
        this.watchChanges();
    };
    DynamicMoneyComponent.prototype.watchChanges = function () {
        var _this = this;
        this.formControl.valueChanges
            .subscribe(function (chg) {
            _this.updatePreview(string_manipulator_1.StringManipulator.convertToMoney(chg));
        });
    };
    DynamicMoneyComponent.prototype.caretBeforeFirstComma = function (formattedValue, caretPosition) {
        var beforeCaret = formattedValue.substring(0, caretPosition);
        if (beforeCaret.indexOf(',') > -1)
            return false;
        else
            return true;
    };
    DynamicMoneyComponent.prototype.updatePreview = function (value) {
        var caretPosition = this.getCaretPosition(this.textBox.first.nativeElement);
        // if difference is X > 0, increase caret position by X spaces
        // if difference is X < 0, decrease caret position by X spaces
        // BUT if caret is before first comma, ignore (do no change caret position)
        var diff = value.length - this.textBox.first.nativeElement.value.length;
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
    };
    DynamicMoneyComponent.prototype.updateFormControl = function (value, emitEvent) {
        if (emitEvent === void 0) { emitEvent = true; }
        if (emitEvent) {
            this.formControl.setValue(value);
            this.formControl.markAsDirty();
            this.formControl.markAsTouched();
        }
        else
            this.formControl.setValue(value, { emitEvent: false });
    };
    DynamicMoneyComponent.prototype.onTextValueChange = function (event) {
        var newValue = string_manipulator_1.StringManipulator.convertToNumber(event.target.value);
        this.updatePreview(string_manipulator_1.StringManipulator.convertToMoney(newValue));
        if (!this.multiple)
            this.updateFormControl(newValue);
    };
    DynamicMoneyComponent.prototype.onEnter = function (insertBox) {
        if (this.multiple) {
            if (!this.formControl.errors) {
                var newValue = string_manipulator_1.StringManipulator.convertToNumber(insertBox.value);
                this.insertIntoFormControl(newValue);
                insertBox.value = '';
            }
        }
    };
    DynamicMoneyComponent.prototype.onBlur = function (insertBox) {
        if (this.multiple) {
            insertBox.value = '';
        }
    };
    DynamicMoneyComponent.prototype.formatMoney = function (value) {
        return string_manipulator_1.StringManipulator.convertToMoney(value);
    };
    DynamicMoneyComponent.prototype.submit = function () {
        if (this.onSubmit)
            this.onSubmit.emit(this.formControl.value);
    };
    /*
     ** Returns the caret (cursor) position of the specified text field.
     ** Return value range is 0-oField.value.length.
     */
    DynamicMoneyComponent.prototype.getCaretPosition = function (oField) {
        // Initialize
        var iCaretPos = 0;
        // IE Support
        if (document.selection) {
            // Set focus on the element
            oField.focus();
            // To get cursor position, get empty selection range
            var oSel = document.selection.createRange();
            // Move selection start to 0 position
            oSel.moveStart('character', -oField.value.length);
            // The caret position is selection length
            iCaretPos = oSel.text.length;
        }
        else if (oField.selectionStart || oField.selectionStart == '0')
            iCaretPos = oField.selectionStart;
        // Return results
        return iCaretPos;
    };
    DynamicMoneyComponent.prototype.setCaretPosition = function (oField, pos) {
        if (oField.setSelectionRange) {
            oField.focus();
            oField.setSelectionRange(pos, pos);
        }
        else if (oField.createTextRange) {
            var range = oField.createTextRange();
            range.collapse(true);
            range.moveEnd('character', pos);
            range.moveStart('character', pos);
            range.select();
        }
    };
    return DynamicMoneyComponent;
}(dynamic_base_1.DynamicInputBase));
__decorate([
    core_1.Input(),
    __metadata("design:type", forms_1.FormGroup)
], DynamicMoneyComponent.prototype, "group", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], DynamicMoneyComponent.prototype, "arrayName", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], DynamicMoneyComponent.prototype, "indexInArray", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], DynamicMoneyComponent.prototype, "controlName", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], DynamicMoneyComponent.prototype, "label", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], DynamicMoneyComponent.prototype, "icon", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], DynamicMoneyComponent.prototype, "placeholder", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], DynamicMoneyComponent.prototype, "multiple", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], DynamicMoneyComponent.prototype, "errorMessages", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], DynamicMoneyComponent.prototype, "onSubmit", void 0);
__decorate([
    core_1.ViewChildren("textBox"),
    __metadata("design:type", core_1.QueryList)
], DynamicMoneyComponent.prototype, "textBox", void 0);
__decorate([
    core_1.ViewChildren("insertBox"),
    __metadata("design:type", core_1.QueryList)
], DynamicMoneyComponent.prototype, "insertBox", void 0);
DynamicMoneyComponent = __decorate([
    core_1.Component({
        selector: 'dynamic-money-input',
        templateUrl: './dynamic-money.component.html',
        styleUrls: ['./dynamic-money.component.css']
    }),
    __metadata("design:paramtypes", [])
], DynamicMoneyComponent);
exports.DynamicMoneyComponent = DynamicMoneyComponent;
//# sourceMappingURL=dynamic-money.component.js.map