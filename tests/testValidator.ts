import 'mocha';

import { expect } from 'chai';
import Validator from '../validator';

describe('Validator', () => {
  it('should pass validation', () => {
    const validator: Validator = new Validator();

    validator.setRules({
      test: 'required|regex:[0-9]+',
    }).setData({
      test: 123456789,
    });

    expect(validator.passes()).to.equal(true);
  });

  it('should fail validation', () => {
    const validator: Validator = new Validator();

    validator.setRules({
      test: 'required|regex:[0-9]+',
    }).setData({
      test: 'testing',
    });

    expect(validator.fails()).to.equal(true);
  });
});
