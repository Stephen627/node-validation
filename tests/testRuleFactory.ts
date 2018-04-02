import 'mocha'

import Rule from '../rule'
import * as path from 'path'
import { expect } from 'chai'
import RuleFactory from '../ruleFactory'
import ValidationError from '../validationError'

declare let __dirname: string

describe('RuleFactory', () => {
  it('should return an instance of RuleFactory', () => {
    let instance = RuleFactory.getInstance()
    expect(instance).to.be.instanceof(RuleFactory)
  })

  it('should throw a validation error', () => {
    let instance = RuleFactory.getInstance();

    try {
      instance.createRule('will-fail', [])
      throw Error
    } catch (e) {
      expect(e).to.be.instanceof(ValidationError)
    }
  })

  it('should return a valid rule', () => {
    let instance = RuleFactory.getInstance()
    try {
      let rule = instance.createRule('required', [__dirname + `${path.sep}..${path.sep}dist${path.sep}rules`])
    } catch (e) {
      expect(false)
    }
  })
})