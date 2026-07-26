import { useMemo, useState } from "react";

export const useTableSearchPagination = <T,>(
  rows: T[],
  search: string,
  filterFn: (row: T, query: string) => boolean,
  rowsPerPage = 10
) => {
  const [page, setPage] = useState(0);

  const filteredRows = useMemo(
    () => rows.filter((row) => filterFn(row, search)),
    [rows, search, filterFn]
  );

  const paginatedRows = useMemo(
    () =>
      filteredRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [filteredRows, page, rowsPerPage]
  );

  return {
    page,
    setPage,
    rowsPerPage,
    filteredRows,
    paginatedRows,
  };
};
