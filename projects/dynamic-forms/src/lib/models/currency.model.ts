
import * as money from 'money';

// @dynamic
export class Currency {

  static Base = "USD";        // default base currency
  static ExchangeRates = {    // default exchange rates
    "EUR" : 0.745101,
    "CRC" : 555,
    "USD" : 1         // always include the base rate (1:1)
  };
  static CurrencyTypes = {
    "EUR": {labelSingular: "EUR - Euro", labelPlural: "Eur - Euros"},
    "CRC": {labelSingular: "CRC - CR Colon", labelPlural: "CRC - CR Colones"},
    "USD": {labelSingular: "USD - US Dollar", labelPlural: "USD - US Dollars"}
  };

  static SetExchangeRates(base: string, rates: any) {
    Currency.Base = base;
    Currency.ExchangeRates = rates;
  }

  static Convert(value: number, from: CurrencyCode, to: CurrencyCode) {
    let moneyCopy = Object.assign({}, money);
    moneyCopy.base = Currency.Base;
    moneyCopy.rates = Currency.ExchangeRates;
    return moneyCopy.convert(value, {from: from.code, to: to.code});
  }

  static GetOptionsSingular() {
    return Object.keys(Currency.CurrencyTypes).map(key => {
      return {key: key, label: Currency.CurrencyTypes[key].labelSingular};
    });
  }

  static GetOptionsPlural() {
    return Object.keys(Currency.CurrencyTypes).map(key => {
      return {key: key, label: Currency.CurrencyTypes[key].labelPlural};
    });
  }

}

export class CurrencyCode {
  name: string;
  code: string;
  symbol: string;

  constructor(name: string, code: string, symbol: string) {
    this.name = name;
    this.code = code;
    this.symbol = symbol;
  }

  static USD: CurrencyCode = new CurrencyCode('Dollars', 'USD', '$');
  static CRC: CurrencyCode = new CurrencyCode('Colones', 'CRC', '₡');
  static EUR: CurrencyCode = new CurrencyCode('Euros', 'EUR', '€');
}
