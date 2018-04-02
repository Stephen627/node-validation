"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class In {
    /**
     * @inheritDoc
     */
    validate(data, extraInformation) {
        return extraInformation.split(',').indexOf(data) > -1;
    }
    /**
     * @inheritDoc
     */
    getErrorString(key, extraInformation) {
        return `${key} must exist in ${extraInformation}`;
    }
}
exports.default = In;
//# sourceMappingURL=in.js.map