interface PaginationOptions {
  page: number;
  pageSize: number;
}

function PaginationUtil<T>(data: T[], options: PaginationOptions): { data: T[]; total: number; totalPages: number } {
  const { page, pageSize } = options;
  const startIndex = (page - 1) * pageSize;
  const endIndex = page * pageSize;

  const paginatedData = data.slice(startIndex, endIndex);
  const total = data.length;
  const totalPages = Math.ceil(total / pageSize);

  return { data: paginatedData, total, totalPages };
}

export { PaginationUtil };
