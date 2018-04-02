import Rule from './rule'
import * as path from 'path'
import RuleFactory from './ruleFactory'

/**
 * Validates data given the rules provided
 * 
 * @class Validator
 */
class Validator {

  /**
   * Holds the data to validate
   * 
   * @var Object {[key: string]: string}
   */
  private data: {[key: string]: any} = {}

  /**
   * Holds the rules to use in the validation
   * 
   * @var Object {[key: string]: string}
   */
  private rules: {[key: string]: string} = {}

  /**
   * Holds all the errors
   * 
   * @var Array<string>
   */
  private errors: string[] = []

  /**
   * Holds all of the rule paths to look for rules in
   * 
   * @var Array<string>
   */
  private rulePaths: string[] = []

  /**
   * The constructor
   * 
   * @param Object rules the associated array of validation rules
   * @param Object data  the associated array of data to validate
   */
  public constructor (rules?: {[key: string]: string}, data?: {[key: string]: any}) {
    this.rules = rules
    this.data = data
    this.rulePaths.push(__dirname + path.sep + 'rules')
  }

  /**
   * Registers a new rule path to check for the rules in
   * 
   * @param string rulePath the path to add to the rule paths
   * 
   * @return void
   */
  public registerRulePath (rulePath: string): void {
    this.rulePaths.push(rulePath)
  }
  
  /**
   * Sets the rules to the rules provided
   * 
   * @param Object rules the associated array of validation rules
   * 
   * @return Validator
   */
  public setRules (rules: {[key: string]: string}): Validator {
    this.rules = rules
    return this
  }

  /**
   * Sets the data to the data provided
   * 
   * @param Object data  the associated array of data to validate
   * 
   * @return Validator
   */
  public setData (data: {[key: string]: any}): Validator {
    this.data = data
    return this
  }

  /**
   * Check whether the data provided passes the validation rules
   * 
   * @return boolean
   */
  public passes (): boolean {
    this.errors = []
    let valid: boolean = true

    for (let key in this.rules) {
      // Special case for data that is not required and doesn't exisit in the data array
      if (!this.data[key] && this.rules[key].indexOf('required') < 0) {
        continue
      }

      this.rules[key].split('|').forEach((rule: string) => {
        let [ruleKey, extraInformation] = rule.split(':')

        let ruleObject: Rule = RuleFactory.getInstance().createRule(ruleKey, this.rulePaths)
        let tempValid = ruleObject.validate(this.data[key], extraInformation)

        if (!tempValid) {
          valid = false
          this.errors.push(ruleObject.getErrorString(key, extraInformation))
        }
      })
    }

    return valid 
  }

  /**
   * Checks whether the data provided passes the validation rules
   * 
   * @return boolean
   */
  public fails (): boolean {
    return !this.passes()
  }

  /**
   * Returns the errors
   * 
   * @return string[]
   */
  public getErrors (): string[] {
    return this.errors
  }

}

export default Validator  
