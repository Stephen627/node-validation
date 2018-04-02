"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const ruleFactory_1 = require("./ruleFactory");
/**
 * Validates data given the rules provided
 *
 * @class Validator
 */
class Validator {
    /**
     * The constructor
     *
     * @param Object rules the associated array of validation rules
     * @param Object data  the associated array of data to validate
     */
    constructor(rules, data) {
        /**
         * Holds the data to validate
         *
         * @var Object {[key: string]: string}
         */
        this.data = {};
        /**
         * Holds the rules to use in the validation
         *
         * @var Object {[key: string]: string}
         */
        this.rules = {};
        /**
         * Holds all the errors
         *
         * @var Array<string>
         */
        this.errors = [];
        /**
         * Holds all of the rule paths to look for rules in
         *
         * @var Array<string>
         */
        this.rulePaths = [];
        this.rules = rules;
        this.data = data;
        this.rulePaths.push(__dirname + path.sep + 'rules');
    }
    /**
     * Registers a new rule path to check for the rules in
     *
     * @param string rulePath the path to add to the rule paths
     *
     * @return void
     */
    registerRulePath(rulePath) {
        this.rulePaths.push(rulePath);
    }
    /**
     * Sets the rules to the rules provided
     *
     * @param Object rules the associated array of validation rules
     *
     * @return Validator
     */
    setRules(rules) {
        this.rules = rules;
        return this;
    }
    /**
     * Sets the data to the data provided
     *
     * @param Object data  the associated array of data to validate
     *
     * @return Validator
     */
    setData(data) {
        this.data = data;
        return this;
    }
    /**
     * Check whether the data provided passes the validation rules
     *
     * @return boolean
     */
    passes() {
        this.errors = [];
        let valid = true;
        for (let key in this.rules) {
            // Special case for data that is not required and doesn't exisit in the data array
            if (!this.data[key] && this.rules[key].indexOf('required') < 0) {
                continue;
            }
            this.rules[key].split('|').forEach((rule) => {
                let [ruleKey, extraInformation] = rule.split(':');
                let ruleObject = ruleFactory_1.default.getInstance().createRule(ruleKey, this.rulePaths);
                let tempValid = ruleObject.validate(this.data[key], extraInformation);
                if (!tempValid) {
                    valid = false;
                    this.errors.push(ruleObject.getErrorString(key, extraInformation));
                }
            });
        }
        return valid;
    }
    /**
     * Checks whether the data provided passes the validation rules
     *
     * @return boolean
     */
    fails() {
        return !this.passes();
    }
    /**
     * Returns the errors
     *
     * @return string[]
     */
    getErrors() {
        return this.errors;
    }
}
exports.default = Validator;
//# sourceMappingURL=validator.js.map