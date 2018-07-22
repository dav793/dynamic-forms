
import { StringManipulator } from './string-manipulator';

declare var sinon: any;

describe('string manipulator -> convert to number', () => {

  // manually create and restore the sandbox
  var sandbox: any;
  beforeEach(function () {
    sandbox = sinon.sandbox.create();
  });

  afterEach(function () {
    sandbox.restore();
  });


  it('should return 0 when given \'\'', sinon.test(() => {
    let value = StringManipulator.convertToNumber('');
    expect(value).toBe(0);
  }));

  it('should return 0 when given \' \'', sinon.test(() => {
    let value = StringManipulator.convertToNumber(' ');
    expect(value).toBe(0);
  }));

  it('should return 0 when given \'abc d\'', sinon.test(() => {
    let value = StringManipulator.convertToNumber('abc d');
    expect(value).toBe(0);
  }));

  it('should return 0 when given \'.\'', sinon.test(() => {
    let value = StringManipulator.convertToNumber('.');
    expect(value).toBe(0);
  }));

  it('should return 0.3 when given \'.3\'', sinon.test(() => {
    let value = StringManipulator.convertToNumber('.3');
    expect(value).toBe(0.3);
  }));

  it('should return 24 when given \'a2k4\'', sinon.test(() => {
    let value = StringManipulator.convertToNumber('a2k4');
    expect(value).toBe(24);
  }));

  it('should return 24.5 when given \'2k4.a b5\'', sinon.test(() => {
    let value = StringManipulator.convertToNumber('2k4.a b5');
    expect(value).toBe(24.5);
  }));

  it('should return 3421.7 when given \'3,421.7\'', sinon.test(() => {
    let value = StringManipulator.convertToNumber('3,421.7');
    expect(value).toBe(3421.7);
  }));

  it('should return 323421.7236 when given \'3,23,,42,,g,,1.72,3k6\'', sinon.test(() => {
    let value = StringManipulator.convertToNumber('3,23,,42,,g,,1.72,3k6');
    expect(value).toBe(323421.7236);
  }));

  it('should return 323421.2 when given \'3,2@3kk4,2,1.f2.1sa3.4@5\'', sinon.test(() => {
    let value = StringManipulator.convertToNumber('3,2@3kk4,2,1.f2.1sa3.4@5');
    expect(value).toBe(323421.2);
  }));

});

describe('string manipulator -> convert to money', () => {

  // manually create and restore the sandbox
  var sandbox: any;
  beforeEach(function () {
    sandbox = sinon.sandbox.create();
  });

  afterEach(function () {
    sandbox.restore();
  });


  it('should return 1,234.00 when given 1234', sinon.test(() => {
    let value = StringManipulator.convertToMoney(1234);
    expect(value).toBe('1,234.00');
  }));

  it('should return 123,456.78 when given 123456.78', sinon.test(() => {
    let value = StringManipulator.convertToMoney(123456.78);
    expect(value).toBe('123,456.78');
  }));

  it('should return 1,234,567.12 when given 1234567.1234567', sinon.test(() => {
    let value = StringManipulator.convertToMoney(1234567.1234567);
    expect(value).toBe('1,234,567.12');
  }));

  it('should return $ 4,567.12 when given 4567.12 and \'USD\'', sinon.test(() => {
    let value = StringManipulator.convertToMoney(4567.12, 'USD');
    expect(value).toBe('$ 4,567.12');
  }));

  it('should return ₡ 4,567.12 when given 4567.12 and \'CRC\'', sinon.test(() => {
    let value = StringManipulator.convertToMoney(4567.12, 'CRC');
    expect(value).toBe('₡ 4,567.12');
  }));

  it('should return € 4,567.12 when given 4567.12 and \'EUR\'', sinon.test(() => {
    let value = StringManipulator.convertToMoney(4567.12, 'EUR');
    expect(value).toBe('€ 4,567.12');
  }));

});
