
import { Currency, CurrencyCode } from './models/currency.model';

import * as accounting from 'accounting';

export class StringManipulator {

  static convertToNumber(str: string): number {
    return accounting.unformat(str);
  }

  static convertToMoney(num: number, currencyCode: string = null): string {
    let format = {
      symbol : StringManipulator.getCurrencySymbolFromCode(currencyCode),
      format: "%v",
      decimal : ".",
      thousand: ",",
      precision : 2
    };
    if (currencyCode)
      format.format = "%s %v";

    return accounting.formatMoney(accounting.toFixed(num, 2), format);
  }

  static getCurrencySymbolFromCode(currencyCode: string) {
    if (currencyCode)
      return CurrencyCode[currencyCode].symbol;
    return '';
  }

}
