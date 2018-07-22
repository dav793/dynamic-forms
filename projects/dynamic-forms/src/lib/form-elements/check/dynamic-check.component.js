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
var DynamicCheckComponent = (function (_super) {
    __extends(DynamicCheckComponent, _super);
    function DynamicCheckComponent() {
        return _super.call(this) || this;
    }
    return DynamicCheckComponent;
}(dynamic_base_1.DynamicInputBase));
__decorate([
    core_1.Input(),
    __metadata("design:type", forms_1.FormGroup)
], DynamicCheckComponent.prototype, "group", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], DynamicCheckComponent.prototype, "arrayName", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], DynamicCheckComponent.prototype, "indexInArray", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], DynamicCheckComponent.prototype, "controlName", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], DynamicCheckComponent.prototype, "label", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], DynamicCheckComponent.prototype, "errorMessages", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], DynamicCheckComponent.prototype, "noMargins", void 0);
DynamicCheckComponent = __decorate([
    core_1.Component({
        selector: 'dynamic-check-input',
        templateUrl: './dynamic-check.component.html',
        styleUrls: ['./dynamic-check.component.css']
    }),
    __metadata("design:paramtypes", [])
], DynamicCheckComponent);
exports.DynamicCheckComponent = DynamicCheckComponent;
//# sourceMappingURL=dynamic-check.component.js.map