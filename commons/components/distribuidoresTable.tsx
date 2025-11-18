import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Distribuidores } from "../mocks";
import { TablePagination, TextField } from "@mui/material";
import { useState } from "react";
import React from "react";
import { Distribuidor } from "../types/completeList";

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
  const Dist = Distribuidores;
  const [page, setPage] = useState(0);
  const rowsPerPage = 10;
  const [search, setSearch] = useState("");

  React.useEffect(() => {
    setPage(0);
  }, [search]);

  const rows = Dist.map((p: Distribuidor, idx: number) => ({
    id: idx,
    nombre: p.nombre || "",
    cuit: p.cuit || "",
    direccion: p.direccion || "",
    email: p.email || "",
    telefono: p.telefono || 0,
  }));

  const filteredRows = rows.filter(
    (row) =>
      row.nombre?.toLowerCase().includes(search.toLowerCase())  ||
      row.cuit?.toLowerCase().includes(search.toLowerCase()) 
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
            <StyledTableCell>Nombre</StyledTableCell>
            <StyledTableCell align="right">Cuit</StyledTableCell>
            <StyledTableCell align="right">Direccion</StyledTableCell>
            <StyledTableCell align="right">Email</StyledTableCell>
            <StyledTableCell align="right">Telefono</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {paginatedRows.map((row) => (
            <StyledTableRow key={row.id}>
              <StyledTableCell component="th" scope="row">
                {row.nombre}
              </StyledTableCell>

              <StyledTableCell align="right">
                {row.cuit}
              </StyledTableCell>
              <StyledTableCell align="right">
                {row.direccion}
              </StyledTableCell>
              <StyledTableCell align="right">
                {row.email}
              </StyledTableCell>
              <StyledTableCell align="right">
                {row.telefono}
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
