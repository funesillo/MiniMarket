import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { CajasHist } from "../mocks";
import { CajaHistorial } from "../types/completeList";
import { TablePagination, TextField } from "@mui/material";
import { useState } from "react";
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
  const caja = CajasHist;
  const [page, setPage] = useState(0);
  const rowsPerPage = 10;
  const [search, setSearch] = useState("");

  React.useEffect(() => {
    setPage(0);
  }, [search]);

  const rows = caja.map((p: CajaHistorial, idx: number) => ({
    id: idx,
    fecha_apertura: p.fecha_apertura || "",
    fecha_cierre: p.fecha_cierre || "",
    saldo_inicial: p.saldo_inicial || 0,
    saldo_final: p.saldo_final || 0,
    estado: p.estado || 0,
  }));

  const filteredRows = rows.filter(
    (row) =>
      row.fecha_apertura?.toLowerCase().includes(search.toLowerCase())  ||
      row.fecha_cierre?.toLowerCase().includes(search.toLowerCase()) ||
      row.estado?.toLowerCase().includes(search.toLowerCase())
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
        mt: 2,
        boxSizing: "border-box",
      }}
    >
      <TextField
        label="Buscar Caja"
        variant="outlined"
        size="small"
        sx={{ mb: 2, mt: 0.7 }}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Fecha o Estado"
      />
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Estado</StyledTableCell>
            <StyledTableCell align="right">Fecha Apertura</StyledTableCell>
            <StyledTableCell align="right">Fecha Cierre</StyledTableCell>
            <StyledTableCell align="right">Saldo Inicial</StyledTableCell>
            <StyledTableCell align="right">Saldo Final</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {paginatedRows.map((row) => (
            <StyledTableRow key={row.id}>
              <StyledTableCell component="th" scope="row">
                {row.estado}
              </StyledTableCell>

              <StyledTableCell align="right">
                {row.fecha_apertura}
              </StyledTableCell>
              <StyledTableCell align="right">
                {row.fecha_cierre}
              </StyledTableCell>
              <StyledTableCell align="right">
                ${row.saldo_inicial}
              </StyledTableCell>
              <StyledTableCell align="right">
                ${row.saldo_final}
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
