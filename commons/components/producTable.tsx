import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useProductos } from "../hooks/useGetProductos";

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

  if (loading) return <div style={{ padding: 16 }}>Cargando productos…</div>;
  if (error) return <div style={{ padding: 16, color: "red" }}>Error: {error}</div>;
  if (!data || data.length === 0) return <div style={{ padding: 16 }}>No hay productos</div>;

  const rows = data.map((p) => ({
    id: p?.id,
    nombre: p?.nombre ,
    producto: p?.tipo_producto,
    precio: p?.precio_venta,
    codigo_barra: p?.codigo_barra,
    stock: p?.stock,
  }));

  return (
    <TableContainer
      component={Paper}
      sx={{
        width: "90% !important", 
        mx: "auto",                           // centrado horizontal
        mt: 2,                                // separación superior
        boxSizing: "border-box",
      }}
    >
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
          {rows.map((row) => (
            <StyledTableRow key={row.id}>
              <StyledTableCell component="th" scope="row">
                {row.stock}
              </StyledTableCell>
              <StyledTableCell align="right">{row.nombre}</StyledTableCell>
              <StyledTableCell align="right">{row.producto}</StyledTableCell>
              <StyledTableCell align="right">{row.precio}</StyledTableCell>
              <StyledTableCell align="right">{row.codigo_barra}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};