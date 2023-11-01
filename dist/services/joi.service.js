"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class JoiService {
    static validate(data, schema) {
        const { error, value } = schema.validate(data);
        if (error) {
            throw new Error(error.details[0].message);
        }
        return value;
    }
}
exports.default = JoiService;
