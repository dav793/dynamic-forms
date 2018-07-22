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
var DynamicTimeComponent = (function (_super) {
    __extends(DynamicTimeComponent, _super);
    function DynamicTimeComponent() {
        return _super.call(this) || this;
    }
    DynamicTimeComponent.prototype.ngAfterViewInit = function () {
        this.initializeTimepicker();
    };
    DynamicTimeComponent.prototype.ngOnChanges = function (changes) {
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
    DynamicTimeComponent.prototype.initializeTimepicker = function () {
        var _this = this;
        $('.time input').timepicker({
            showMeridian: true,
            explicitMode: true
        });
        $('.time input').timepicker()
            .on('changeTime.timepicker', function (e) {
            _this.onChangeTime(e.time);
        });
    };
    DynamicTimeComponent.prototype.onChangeTime = function (time) {
        var hours = parseInt(time.hours);
        var minutes = parseInt(time.minutes);
        var hoursStr = '';
        var minutesStr = '';
        if (time.meridian && time.meridian === 'PM')
            hours += 12;
        if (parseInt(time.hours) === 12) {
            if (time.meridian === 'AM') {
                hours = 0;
            }
            else if (time.meridian === 'PM') {
                hours = 12;
            }
        }
        if (minutes < 10)
            minutesStr = '0' + minutes.toString();
        else
            minutesStr = minutes.toString();
        hoursStr = hours.toString();
        this.setFormControlValue(hoursStr + ':' + minutesStr);
    };
    DynamicTimeComponent.prototype.setFormControlValue = function (value) {
        this.formControl.setValue(value);
        this.formControl.markAsDirty();
        this.formControl.markAsTouched();
    };
    return DynamicTimeComponent;
}(dynamic_base_1.DynamicInputBase));
__decorate([
    core_1.Input(),
    __metadata("design:type", forms_1.FormGroup)
], DynamicTimeComponent.prototype, "group", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], DynamicTimeComponent.prototype, "arrayName", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], DynamicTimeComponent.prototype, "indexInArray", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], DynamicTimeComponent.prototype, "controlName", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], DynamicTimeComponent.prototype, "label", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], DynamicTimeComponent.prototype, "icon", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], DynamicTimeComponent.prototype, "disabled", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], DynamicTimeComponent.prototype, "errorMessages", void 0);
DynamicTimeComponent = __decorate([
    core_1.Component({
        selector: 'dynamic-time-input',
        templateUrl: './dynamic-time.component.html',
        styleUrls: ['./dynamic-time.component.css']
    }),
    __metadata("design:paramtypes", [])
], DynamicTimeComponent);
exports.DynamicTimeComponent = DynamicTimeComponent;
//# sourceMappingURL=dynamic-time.component.js.map