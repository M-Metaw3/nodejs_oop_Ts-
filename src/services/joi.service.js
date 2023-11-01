"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var JoiService = /** @class */ (function () {
    function JoiService() {
    }
    JoiService.validate = function (data, schema) {
        var _a = schema.validate(data), error = _a.error, value = _a.value;
        if (error) {
            throw new Error(error.details[0].message);
        }
        return value;
    };
    return JoiService;
}());
exports.default = JoiService;
