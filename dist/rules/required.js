"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Required {
    /**
     * @inheritDoc
     */
    validate(data) {
        return !!data;
    }
    /**
     * @inheritDoc
     */
    getErrorString(key) {
        return `${key} is required`;
    }
}
exports.default = Required;
//# sourceMappingURL=required.js.map