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
var moment = require("moment");
var DynamicDateComponent = (function (_super) {
    __extends(DynamicDateComponent, _super);
    function DynamicDateComponent() {
        return _super.call(this) || this;
    }
    DynamicDateComponent.prototype.ngAfterViewInit = function () {
        this.initializeDatepicker();
    };
    DynamicDateComponent.prototype.ngOnChanges = function (changes) {
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
    };
    DynamicDateComponent.prototype.initializeDatepicker = function () {
        var _this = this;
        $('.date input').datepicker({
            format: 'dd/mm/yyyy',
            forceParse: false
        });
        $('.date input').datepicker()
            .on('changeDate', function (e) {
            _this.onChangeDate(e.date);
        });
    };
    DynamicDateComponent.prototype.onChangeDate = function (date) {
        var dateText = moment(date).format('DD/MM/YYYY');
        this.setFormControlValue(dateText);
    };
    DynamicDateComponent.prototype.setFormControlValue = function (value) {
        this.formControl.setValue(value);
        this.formControl.markAsDirty();
        this.formControl.markAsTouched();
    };
    return DynamicDateComponent;
}(dynamic_base_1.DynamicInputBase));
__decorate([
    core_1.Input(),
    __metadata("design:type", forms_1.FormGroup)
], DynamicDateComponent.prototype, "group", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], DynamicDateComponent.prototype, "arrayName", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], DynamicDateComponent.prototype, "indexInArray", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], DynamicDateComponent.prototype, "controlName", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], DynamicDateComponent.prototype, "label", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], DynamicDateComponent.prototype, "icon", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], DynamicDateComponent.prototype, "disabled", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], DynamicDateComponent.prototype, "errorMessages", void 0);
DynamicDateComponent = __decorate([
    core_1.Component({
        selector: 'dynamic-date-input',
        templateUrl: './dynamic-date.component.html',
        styleUrls: ['./dynamic-date.component.css']
    }),
    __metadata("design:paramtypes", [])
], DynamicDateComponent);
exports.DynamicDateComponent = DynamicDateComponent;
//# sourceMappingURL=dynamic-date.component.js.map