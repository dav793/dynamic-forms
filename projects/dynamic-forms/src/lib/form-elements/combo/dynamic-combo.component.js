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
var Observable_1 = require("rxjs/Observable");
var dynamic_base_1 = require("../dynamic-base");
var filter_search_pipe_1 = require("../../filter-search.pipe");
var DynamicComboComponent = (function (_super) {
    __extends(DynamicComboComponent, _super);
    function DynamicComboComponent(elem) {
        var _this = _super.call(this) || this;
        _this.elem = elem;
        _this.options = [];
        _this.onCustomUserInput = new core_1.EventEmitter();
        return _this;
    }
    DynamicComboComponent.prototype.ngOnChanges = function (changes) {
        var _this = this;
        if (changes['options'])
            this.updateOptions();
        if (changes['asyncOptions']) {
            if (this.asyncOptionsSub)
                this.asyncOptionsSub.unsubscribe();
            this.asyncOptionsSub = this.asyncOptions.subscribe(function (opts) {
                console.log('test', opts);
                _this.options = opts;
            });
        }
    };
    DynamicComboComponent.prototype.expand = function () {
        this.expanded = true;
        if (this.searchEnabled) {
            this.searchBox.first.nativeElement.value = '';
            this.focusSearchBox();
        }
    };
    DynamicComboComponent.prototype.collapse = function () {
        this.expanded = false;
        if (this.searchEnabled) {
            this.searchBox.first.nativeElement.value = '';
        }
        this.search = '';
    };
    DynamicComboComponent.prototype.selectOption = function (option) {
        var _this = this;
        var selectedOption;
        if (this.formControl.value)
            selectedOption = this.options.find(function (o) { return o.key === _this.formControl.value; });
        if (selectedOption)
            selectedOption.hidden = false;
        option.hidden = true;
        this.formControl.setValue(option.key);
        this.formControl.markAsDirty();
        this.formControl.markAsTouched();
        this.collapse();
    };
    DynamicComboComponent.prototype.selectMultiOption = function (option) {
        option.hidden = true;
        this.insertIntoFormControl(option.key);
        this.collapse();
    };
    DynamicComboComponent.prototype.updateOptions = function () {
        var _this = this;
        if (this.removeSelectedFromOptions && this.formControlValue) {
            if (!this.multiple) {
                var selected = this.options.find(function (o) { return o.key === _this.formControlValue; });
                if (selected)
                    selected.hidden = true;
            }
            else {
                this.formControlValue.forEach(function (so) {
                    var selected = _this.options.find(function (o) { return o.key === so; });
                    if (selected)
                        selected.hidden = true;
                });
            }
        }
    };
    DynamicComboComponent.prototype.removeFromFormControl = function (index) {
        if (this.formControlValue) {
            var optKey_1 = this.formControlValue[index];
            var option = this.options.find(function (o) { return o.key === optKey_1; });
            if (option)
                option.hidden = false;
        }
        _super.prototype.removeFromFormControl.call(this, index);
    };
    Object.defineProperty(DynamicComboComponent.prototype, "emptyOptions", {
        get: function () {
            var filtered = new filter_search_pipe_1.FilterSearchPipe().transform(this.options, [this.search]);
            if (!filtered || filtered.length === 0)
                return true;
            return false;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DynamicComboComponent.prototype, "searchBoxFocused", {
        get: function () {
            if (this.searchEnabled && this.searchBox && this.searchBox.first)
                return this.searchBox.first.nativeElement === document.activeElement;
            return false;
        },
        enumerable: true,
        configurable: true
    });
    DynamicComboComponent.prototype.focusSearchBox = function () {
        if (this.searchEnabled)
            this.searchBox.first.nativeElement.focus();
    };
    DynamicComboComponent.prototype.updateSearch = function (search) {
        this.search = search;
    };
    DynamicComboComponent.prototype.insertCustomUserOption = function (value) {
        if (!this.acceptAnyInput)
            return;
        //let optionKey = value.replace(/\s+/g, '_').toLowerCase();
        var optionKey = value;
        this.options.push({ key: optionKey, label: value });
        if (!this.multiple)
            this.selectOption(this.options[this.options.length - 1]);
        else
            this.selectMultiOption(this.options[this.options.length - 1]);
        this.onCustomUserInput.emit(this.options[this.options.length - 1]);
    };
    DynamicComboComponent.prototype.getOptionLabel = function (key) {
        if (!this.options)
            return null;
        if (!Array.isArray(this.options))
            console.error('options must be an array! given: ', this.options);
        var option = this.options.find(function (opt) {
            return opt.key === key;
        });
        if (option)
            return option.label;
        return null;
    };
    DynamicComboComponent.prototype.handleClick = function (event) {
        var clickedComponent = event.target;
        var inside = false;
        do {
            if (clickedComponent === this.elem.nativeElement)
                inside = true;
            clickedComponent = clickedComponent.parentNode;
        } while (clickedComponent);
        if (inside) {
            this.focusSearchBox();
            if (!this.expanded)
                this.expand();
        }
        else {
            this.collapse();
        }
    };
    return DynamicComboComponent;
}(dynamic_base_1.DynamicInputBase));
__decorate([
    core_1.Input(),
    __metadata("design:type", forms_1.FormGroup)
], DynamicComboComponent.prototype, "group", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], DynamicComboComponent.prototype, "arrayName", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], DynamicComboComponent.prototype, "indexInArray", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], DynamicComboComponent.prototype, "controlName", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], DynamicComboComponent.prototype, "label", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], DynamicComboComponent.prototype, "icon", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], DynamicComboComponent.prototype, "placeholder", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], DynamicComboComponent.prototype, "multiple", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], DynamicComboComponent.prototype, "searchEnabled", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], DynamicComboComponent.prototype, "acceptAnyInput", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], DynamicComboComponent.prototype, "removeSelectedFromOptions", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], DynamicComboComponent.prototype, "errorMessages", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Array)
], DynamicComboComponent.prototype, "options", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Observable_1.Observable)
], DynamicComboComponent.prototype, "asyncOptions", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], DynamicComboComponent.prototype, "onCustomUserInput", void 0);
__decorate([
    core_1.ViewChildren("compBox"),
    __metadata("design:type", core_1.QueryList)
], DynamicComboComponent.prototype, "compBox", void 0);
__decorate([
    core_1.ViewChildren("searchBox"),
    __metadata("design:type", core_1.QueryList)
], DynamicComboComponent.prototype, "searchBox", void 0);
DynamicComboComponent = __decorate([
    core_1.Component({
        selector: 'dynamic-combo-input',
        host: {
            '(document:click)': 'handleClick($event)',
        },
        templateUrl: './dynamic-combo.component.html',
        styleUrls: ['./dynamic-combo.component.css']
    }),
    __metadata("design:paramtypes", [core_1.ElementRef])
], DynamicComboComponent);
exports.DynamicComboComponent = DynamicComboComponent;
//# sourceMappingURL=dynamic-combo.component.js.map