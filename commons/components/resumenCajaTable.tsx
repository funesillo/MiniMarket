import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useResumenCaja } from "../hooks/useGetCajaResumen";
import { ResumenCajas } from "../types/completeList";

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
  const {data, loading, error} = useResumenCaja();
  
  if (loading) return <div style={{ padding: 16 }}>Cargando productos…</div>;
  if (error) return <div style={{ padding: 16, color: "red" }}>Error: {error}</div>;
  if (!data || data.length === 0) return <div style={{ padding: 16 }}>No hay productos</div>;

  const rows = data.map((p: ResumenCajas, idx: number) => ({
    id: idx,
    fecha: p.fecha || "",
    ingresos: p.ingresos || 0,
    productos_stock_bajo: p.productos_stock_bajo?.length || 0,
    ventas_totales: p.ventas_totales || 0,
  }));

  return (
    <TableContainer
      component={Paper}
      sx={{
        width: "90%",
        mx: "auto",
        mt: 2,
        boxSizing: "border-box",
      }}
    >
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Fecha</StyledTableCell>
            <StyledTableCell align="right">Ingresos</StyledTableCell>
            <StyledTableCell align="right">Stock Bajo (cant.)</StyledTableCell>
            <StyledTableCell align="right">Ventas Totales</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.id}>
              <StyledTableCell component="th" scope="row">
                {row.fecha}
              </StyledTableCell>
              <StyledTableCell align="right">${row.ingresos}</StyledTableCell>
              <StyledTableCell align="right">{row.productos_stock_bajo}</StyledTableCell>
              <StyledTableCell align="right">${row.ventas_totales}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};