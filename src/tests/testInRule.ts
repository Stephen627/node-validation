import mocha from 'mocha';
import { expect } from 'chai';
import Validator from '../validator';

describe('In Rule', () => {
  it('should pass if the rule is present and data is not', () => {
    const validator: Validator = new Validator();

    validator.setRules({
      test: 'in:foo,bar',
    }).setData({
    });

    validator.passes();
    expect(validator.getErrors()).to.be.length(0);
  });

  it('should fail if the data does not match the rule provided', () => {
    const validator: Validator = new Validator();

    validator.setRules({
      test: 'in:foo,bar',
    }).setData({
      test: 'abc',
    });

    validator.passes();
    expect(validator.getErrors()).to.be.length(1);
  });

  it('should pass if the data matches to the rule provided', () => {
    const validator: Validator = new Validator();

    validator.setRules({
      test: 'in:foo,bar',
    }).setData({
      test: 'foo',
    });

    validator.passes();
    expect(validator.getErrors()).to.be.length(0);
  });
});
