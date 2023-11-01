"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaginationUtil = void 0;
function PaginationUtil(data, options) {
    const { page, pageSize } = options;
    const startIndex = (page - 1) * pageSize;
    const endIndex = page * pageSize;
    const paginatedData = data.slice(startIndex, endIndex);
    const total = data.length;
    const totalPages = Math.ceil(total / pageSize);
    return { data: paginatedData, total, totalPages };
}
exports.PaginationUtil = PaginationUtil;
