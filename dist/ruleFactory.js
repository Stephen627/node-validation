"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const path = require("path");
const validationError_1 = require("./validationError");
/**
 * A class to create rules for the validator
 *
 * @class RuleFactory
 *
 * @throws ValidationError
 */
class RuleFactory {
    /**
     * Making the constructor private to stop other functions
     * from creating this object
     */
    constructor() {
        this.extensions = [
            'ts', 'js'
        ];
    }
    /**
     * Creates an instance of this and saves it to the object so
     * there can only be one instance of this class ever
     *
     * @return RuleFactory
     */
    static getInstance() {
        if (!RuleFactory.instance) {
            RuleFactory.instance = new RuleFactory();
        }
        return RuleFactory.instance;
    }
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
    createRule(rule, paths) {
        let rulePath = this.checkPathsForRule(rule, paths);
        if (!rulePath) {
            throw new validationError_1.default(`Rule ${rule} does not exist`);
        }
        let ruleFunction = require(`${rulePath.toString()}${path.sep}${rule}`);
        if (!ruleFunction['default']) {
            throw new validationError_1.default(`Rule ${rule} does not have a default export`);
        }
        return Reflect.construct(ruleFunction['default'], []);
    }
    /**
     * Checks the paths given for a given rule file
     *
     * @param string        rule  the rule to attempt to find
     * @param Array<string> paths the paths to check if the rule is in
     *
     * @return string|boolean the rule path or false
     */
    checkPathsForRule(rule, paths) {
        let returnPath = false;
        paths.forEach((rulePath) => {
            this.extensions.forEach((extension) => {
                if (fs.existsSync(rulePath + `${path.sep}${rule}.${extension}`)) {
                    returnPath = rulePath;
                    return;
                }
            });
        });
        return returnPath;
    }
}
/**
 * An instance of this to return when calling getInstance
 *
 * @var RuleFactory
 */
RuleFactory.instance = null;
exports.default = RuleFactory;
//# sourceMappingURL=ruleFactory.js.map