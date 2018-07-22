"use strict";
var DynamicInputBase = (function () {
    function DynamicInputBase() {
    }
    DynamicInputBase.prototype.init = function () { };
    Object.defineProperty(DynamicInputBase.prototype, "isFormArrayMember", {
        get: function () {
            return this.arrayName;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DynamicInputBase.prototype, "formControl", {
        get: function () {
            // is not in form array
            if (!this.isFormArrayMember)
                return this.group.get(this.controlName);
            // is in form array
            var idx = this.indexInArray;
            if (typeof idx !== 'string')
                idx = idx.toString();
            return this.group.get(this.arrayName).get(idx).get(this.controlName);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DynamicInputBase.prototype, "formControlValue", {
        get: function () {
            return this.formControl.value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DynamicInputBase.prototype, "emptySelection", {
        get: function () {
            if (!this.formControlValue)
                return true;
            if (Array.isArray(this.formControlValue) && this.formControlValue.length === 0)
                return true;
            return false;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DynamicInputBase.prototype, "errorKeys", {
        get: function () {
            if (this.errorMessages)
                return Object.keys(this.errorMessages);
            return [];
        },
        enumerable: true,
        configurable: true
    });
    DynamicInputBase.prototype.hasError = function (key) {
        if (this.formControl && this.formControl.errors && key in this.formControl.errors)
            return true;
        return false;
    };
    DynamicInputBase.prototype.getError = function (key) {
        if (this.hasError(key))
            return this.errorMessages[key];
        return '';
    };
    DynamicInputBase.prototype.insertIntoFormControl = function (value) {
        var oldValue = this.formControlValue || [];
        oldValue.push(value);
        this.formControl.setValue(oldValue);
        this.formControl.markAsDirty();
        this.formControl.markAsTouched();
    };
    DynamicInputBase.prototype.removeFromFormControl = function (index) {
        var oldValue = this.formControlValue || [];
        oldValue.splice(index, 1);
        this.formControl.setValue(oldValue);
        this.formControl.markAsDirty();
        this.formControl.markAsTouched();
    };
    return DynamicInputBase;
}());
exports.DynamicInputBase = DynamicInputBase;
;
//# sourceMappingURL=dynamic-base.js.map