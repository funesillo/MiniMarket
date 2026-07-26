import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useMemo, useState, useCallback } from "react";
import { useProductos } from "../hooks/useGetProductos";
import TablePagination from "@mui/material/TablePagination";
import TextField from "@mui/material/TextField";
import { useTableSearchPagination } from "../hooks/useTableSearchPagination";
import { StyledTableCell, StyledTableRow } from "./StyledTable";

const ROWS_PER_PAGE = 10;

export const Index = () => {
  const { objList, loading, error } = useProductos();
  const [search, setSearch] = useState("");

  const rows = useMemo(
    () =>
      objList?.map((p) => ({
        id: p?.id,
        nombre: p?.nombre,
        producto: p?.tipo_producto,
        precio: p?.precio_venta,
        codigo_barra: p?.codigo_barra,
        stock: p?.stock,
      })) || [],
    [objList]
  );

  const filterFn = useCallback(
    (row: typeof rows[number], query: string) => {
      const normalized = query.trim().toLowerCase();
      return (
        row.nombre?.toLowerCase().includes(normalized) ||
        row.producto?.toLowerCase().includes(normalized) ||
        row.codigo_barra?.toLowerCase().includes(normalized)
      );
    },
    []
  );

  const { page, setPage, filteredRows, paginatedRows } =
    useTableSearchPagination(rows, search, filterFn, ROWS_PER_PAGE);

  if (loading) return <div style={{ padding: 16 }}>Cargando productos…</div>;
  if (error)
    return <div style={{ padding: 16, color: "red" }}>Error: {error}</div>;
  if (!objList || objList.length === 0)
    return <div style={{ padding: 16 }}>No hay productos</div>;

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  return (
    <TableContainer
      component={Paper}
      sx={{
        width: "95% !important",
        mt: 2, 
        boxSizing: "border-box",
      }}
    >
      <TextField
        label="Buscar producto"
        variant="outlined"
        size="small"
        sx={{ mb: 2, mt: 0.7 }}
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setPage(0);
        }}
        placeholder="producto o código"
      />
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Stock</StyledTableCell>
            <StyledTableCell align="right">Nombre</StyledTableCell>
            <StyledTableCell align="right">Producto</StyledTableCell>
            <StyledTableCell align="right">Precio</StyledTableCell>
            <StyledTableCell align="right">Cod. Barra</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {paginatedRows.map((row) => (
            <StyledTableRow key={row.id}>
              <StyledTableCell component="th" scope="row">
                {row.stock}
              </StyledTableCell>
              <StyledTableCell align="right">{row.nombre}</StyledTableCell>
              <StyledTableCell align="right">{row.producto}</StyledTableCell>
              <StyledTableCell align="right">{row.precio}</StyledTableCell>
              <StyledTableCell align="right">
                {row.codigo_barra}
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
      <TablePagination
        component="div"
        count={filteredRows.length}
        rowsPerPage={10}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPageOptions={[10]}
      />
    </TableContainer>
  );
};
