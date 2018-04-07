import * as fs from 'fs';
import Rule from './rule';
import * as path from 'path';
import ValidationError from './validationError';

/**
 * A class to create rules for the validator
 *
 * @class RuleFactory
 *
 * @throws ValidationError
 */
class RuleFactory {

  /**
   * Creates an instance of this and saves it to the object so
   * there can only be one instance of this class ever
   *
   * @return RuleFactory
   */
  public static getInstance (): RuleFactory {
    if (!RuleFactory.instance) {
      RuleFactory.instance = new RuleFactory();
    }

    return RuleFactory.instance;
  }

  /**
   * An instance of this to return when calling getInstance
   *
   * @var RuleFactory
   */
  private static instance: RuleFactory = null;

  /**
   * The extensions that the rules could be defined as
   *
   * @var string[]
   */
  private extensions: string[] = [
    'ts', 'js',
  ];

  /**
   * Making the constructor private to stop other functions
   * from creating this object
   */
  private constructor () {}

  /**
   * Attempts to load in the rules required and constructs the rules objects
   *
   * @param string        rule  the rule to attempt to create
   * @param Array<string> paths the paths to check the rules exists in
   *
   * @return Rule
   *
   * @throws ValidationError thrown if the rule cannot be found or if the rule
   *                         doeosn't have a default export
   */
  public createRule (rule: string, paths: string[]): Rule {
    const rulePath: string|boolean = this.checkPathsForRule(rule, paths);
    if (!rulePath) {
      throw new ValidationError(`Rule ${rule} does not exist`);
    }

    const ruleFunction: {[key: string]: (() => Rule)} = require(`${rulePath.toString()}${path.sep}${rule}`);

    if (!ruleFunction.default) {
      throw new ValidationError(`Rule ${rule} does not have a default export`);
    }

    return Reflect.construct(ruleFunction.default, []) as Rule;
  }

  /**
   * Checks the paths given for a given rule file
   *
   * @param string        rule  the rule to attempt to find
   * @param Array<string> paths the paths to check if the rule is in
   *
   * @return string|boolean the rule path or false
   */
  private checkPathsForRule (rule: string, paths: string[]): string|boolean {
    let returnPath: string|boolean = false;

    paths.forEach((rulePath: string) => {
      this.extensions.forEach((extension: string) => {
        if (fs.existsSync(rulePath + `${path.sep}${rule}.${extension}`)) {
          returnPath = rulePath;
          return;
        }
      });
    });

    return returnPath;
  }

}

export default RuleFactory;
