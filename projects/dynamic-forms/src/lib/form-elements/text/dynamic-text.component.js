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
var DynamicTextComponent = (function (_super) {
    __extends(DynamicTextComponent, _super);
    function DynamicTextComponent() {
        var _this = _super.call(this) || this;
        _this.onSubmit = new core_1.EventEmitter();
        return _this;
    }
    DynamicTextComponent.prototype.onEnter = function (insertBox) {
        if (this.multiple) {
            if (!this.formControl.errors || !this.formControl.errors['email']) {
                this.insertIntoFormControl(insertBox.value);
                insertBox.value = '';
            }
        }
    };
    DynamicTextComponent.prototype.onBlur = function (insertBox) {
        if (this.multiple) {
            insertBox.value = '';
        }
    };
    DynamicTextComponent.prototype.onKeystroke = function (value) {
        this.formControl.tempValue = value;
        this.formControl.updateValueAndValidity();
        //this.formControl.markAsDirty();
    };
    DynamicTextComponent.prototype.submit = function () {
        if (this.onSubmit)
            this.onSubmit.emit(this.formControl.value);
    };
    Object.defineProperty(DynamicTextComponent.prototype, "inputType", {
        get: function () {
            if (this.password)
                return 'password';
            return 'text';
        },
        enumerable: true,
        configurable: true
    });
    return DynamicTextComponent;
}(dynamic_base_1.DynamicInputBase));
__decorate([
    core_1.Input(),
    __metadata("design:type", forms_1.FormGroup)
], DynamicTextComponent.prototype, "group", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], DynamicTextComponent.prototype, "arrayName", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], DynamicTextComponent.prototype, "indexInArray", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], DynamicTextComponent.prototype, "controlName", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], DynamicTextComponent.prototype, "label", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], DynamicTextComponent.prototype, "icon", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], DynamicTextComponent.prototype, "placeholder", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], DynamicTextComponent.prototype, "multiple", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], DynamicTextComponent.prototype, "errorMessages", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], DynamicTextComponent.prototype, "password", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], DynamicTextComponent.prototype, "onSubmit", void 0);
DynamicTextComponent = __decorate([
    core_1.Component({
        selector: 'dynamic-text-input',
        templateUrl: './dynamic-text.component.html',
        styleUrls: ['./dynamic-text.component.css']
    }),
    __metadata("design:paramtypes", [])
], DynamicTextComponent);
exports.DynamicTextComponent = DynamicTextComponent;
//# sourceMappingURL=dynamic-text.component.js.map