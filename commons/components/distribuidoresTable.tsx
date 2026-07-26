import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useMemo, useState, useCallback } from "react";
import { Distribuidores } from "../mocks";
import { TablePagination, TextField } from "@mui/material";
import { useTableSearchPagination } from "../hooks/useTableSearchPagination";
import { StyledTableCell, StyledTableRow } from "./StyledTable";
import type { Distribuidor } from "../types/completeList";

const ROWS_PER_PAGE = 10;

export const Index = () => {
  const [search, setSearch] = useState("");

  const rows = useMemo(
    () =>
      Distribuidores.map((p: Distribuidor, idx: number) => ({
        id: idx,
        nombre: p.nombre || "",
        cuit: p.cuit || "",
        direccion: p.direccion || "",
        email: p.email || "",
        telefono: p.telefono || 0,
      })),
    []
  );

  const filterFn = useCallback(
    (row: typeof rows[number], query: string) => {
      const normalized = query.trim().toLowerCase();
      return (
        row.nombre.toLowerCase().includes(normalized) ||
        row.cuit.toLowerCase().includes(normalized)
      );
    },
    []
  );

  const { page, setPage, filteredRows, paginatedRows } =
    useTableSearchPagination(rows, search, filterFn, ROWS_PER_PAGE);

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
        label="Buscar distribuidor"
        variant="outlined"
        size="small"
        sx={{ mb: 2, mt: 0.7 }}
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setPage(0);
        }}
        placeholder="Nombre o CUIT"
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
