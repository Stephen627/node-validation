import mocha from 'mocha'
import { expect } from 'chai'
import Validator from '../validator'

describe('Required Rule',  () => {
  it('should fail when the required field is not included',  () => {
    let validator = new Validator()
    
    validator.setRules({
      'test': 'required'
    }).setData({
      
    })

    validator.passes()

    expect(validator.getErrors()).to.be.length(1)
  })

  it('should pass if the required field is present', () => {
    let validator = new Validator()

    validator.setRules({
      'test': 'required'
    }).setData({
      'test': 'testing'
    })
  
    validator.passes()

    expect(validator.getErrors()).to.be.length(0)
  })
})