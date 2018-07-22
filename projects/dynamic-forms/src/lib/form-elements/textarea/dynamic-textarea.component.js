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
var DynamicTextareaComponent = (function (_super) {
    __extends(DynamicTextareaComponent, _super);
    function DynamicTextareaComponent() {
        var _this = _super.call(this) || this;
        _this.rows = 5;
        _this.onSubmit = new core_1.EventEmitter();
        return _this;
    }
    DynamicTextareaComponent.prototype.onEnter = function (insertBox) {
        if (this.multiple) {
            if (!this.formControl.errors || !this.formControl.errors['email']) {
                this.insertIntoFormControl(insertBox.value);
                insertBox.value = '';
            }
        }
    };
    DynamicTextareaComponent.prototype.onBlur = function (insertBox) {
        if (this.multiple) {
            insertBox.value = '';
        }
    };
    DynamicTextareaComponent.prototype.onKeystroke = function (value) {
        this.formControl.tempValue = value;
        this.formControl.updateValueAndValidity();
        //this.formControl.markAsDirty();
    };
    DynamicTextareaComponent.prototype.submit = function () {
        if (this.onSubmit)
            this.onSubmit.emit(this.formControl.value);
    };
    return DynamicTextareaComponent;
}(dynamic_base_1.DynamicInputBase));
__decorate([
    core_1.Input(),
    __metadata("design:type", forms_1.FormGroup)
], DynamicTextareaComponent.prototype, "group", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], DynamicTextareaComponent.prototype, "arrayName", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], DynamicTextareaComponent.prototype, "indexInArray", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], DynamicTextareaComponent.prototype, "controlName", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], DynamicTextareaComponent.prototype, "label", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], DynamicTextareaComponent.prototype, "icon", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], DynamicTextareaComponent.prototype, "placeholder", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], DynamicTextareaComponent.prototype, "multiple", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], DynamicTextareaComponent.prototype, "errorMessages", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Number)
], DynamicTextareaComponent.prototype, "rows", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], DynamicTextareaComponent.prototype, "onSubmit", void 0);
DynamicTextareaComponent = __decorate([
    core_1.Component({
        selector: 'dynamic-textarea-input',
        templateUrl: './dynamic-textarea.component.html',
        styleUrls: ['./dynamic-textarea.component.css']
    }),
    __metadata("design:paramtypes", [])
], DynamicTextareaComponent);
exports.DynamicTextareaComponent = DynamicTextareaComponent;
//# sourceMappingURL=dynamic-textarea.component.js.map