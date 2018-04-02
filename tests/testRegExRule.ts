import mocha from 'mocha'
import { expect } from 'chai'
import Validator from '../validator'

describe('RegEx Rule', () => {
  it('should pass if the rule is present and data is not', () => {
    let validator: Validator = new Validator()

    validator.setRules({
      'test': 'regex:[0-9]+'
    }).setData({
    })

    validator.passes()

    expect(validator.getErrors()).to.be.length(0)
  })

  it('should fail if the data does not match the rule provided', () => {
    let validator: Validator = new Validator()

    validator.setRules({
      'test': 'regex:[0-9]+'
    }).setData({
      'test': 'abc' 
    })

    validator.passes()

    expect(validator.getErrors()).to.be.length(1)
  })

  it('should pass if the data matches to the rule provided', () => {
    let validator: Validator = new Validator()

    validator.setRules({
      'test': 'regex:[0-9]+'
    }).setData({
      'test': 123
    })

    validator.passes()

    expect(validator.getErrors()).to.be.length(0)
  })
})