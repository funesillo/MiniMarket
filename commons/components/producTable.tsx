import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useProductos } from "../hooks/useGetProductos";
import TablePagination from "@mui/material/TablePagination";
import { useState } from "react";
import TextField from "@mui/material/TextField";
import React from "react";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export const Index = () => {
  const { data, loading, error } = useProductos();

  const [page, setPage] = useState(0);
  const rowsPerPage = 10;
  const [search, setSearch] = useState("");

  React.useEffect(() => {
    setPage(0);
  }, [search]);

  if (loading) return <div style={{ padding: 16 }}>Cargando productos…</div>;
  if (error)
    return <div style={{ padding: 16, color: "red" }}>Error: {error}</div>;
  if (!data || data.length === 0)
    return <div style={{ padding: 16 }}>No hay productos</div>;

  const rows = data.map((p) => ({
    id: p?.id,
    nombre: p?.nombre,
    producto: p?.tipo_producto,
    precio: p?.precio_venta,
    codigo_barra: p?.codigo_barra,
    stock: p?.stock,
  }));

  const filteredRows = rows.filter(
    (row) =>
      row.nombre?.toLowerCase().includes(search.toLowerCase()) ||
      row.producto?.toLowerCase().includes(search.toLowerCase()) ||
      row.codigo_barra?.toLowerCase().includes(search.toLowerCase())
  );

  const paginatedRows = filteredRows.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  return (
    <TableContainer
      component={Paper}
      sx={{
        width: "95% !important",
        mt: 2, // separación superior
        boxSizing: "border-box",
      }}
    >
      <TextField
        label="Buscar producto"
        variant="outlined"
        size="small"
        sx={{ mb: 2, mt: 0.7 }}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
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
