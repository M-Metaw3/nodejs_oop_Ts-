"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paginate = void 0;
function paginate(data, options) {
    var page = options.page, pageSize = options.pageSize;
    var startIndex = (page - 1) * pageSize;
    var endIndex = page * pageSize;
    var paginatedData = data.slice(startIndex, endIndex);
    var total = data.length;
    var totalPages = Math.ceil(total / pageSize);
    return { data: paginatedData, total: total, totalPages: totalPages };
}
exports.paginate = paginate;
