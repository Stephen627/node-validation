"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Regex {
    /**
     * @inheritDoc
     */
    validate(data, extraInformation) {
        let regex = new RegExp(extraInformation);
        return regex.test(data);
    }
    /**
     * @inheritDoc
     */
    getErrorString(key, extraInformation) {
        return `${key} does not meet the required format of ${extraInformation}`;
    }
}
exports.default = Regex;
//# sourceMappingURL=regex.js.map