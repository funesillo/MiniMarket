import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useMemo, useState, useCallback } from "react";
import { useResumenCaja } from "../hooks/useGetCajaResumen";
import { useTableSearchPagination } from "../hooks/useTableSearchPagination";
import { StyledTableCell, StyledTableRow } from "./StyledTable";
import { TablePagination, TextField } from "@mui/material";
import type { CajaHistorial } from "../types/completeList";

const ROWS_PER_PAGE = 10;

export const Index = () => {
  const { data, loading, error } = useResumenCaja();
  const [search, setSearch] = useState("");

  const rows = useMemo(
    () =>
      data.map((p: CajaHistorial, idx: number) => ({
        id: idx,
        fecha_apertura: p.fecha_apertura || "",
        fecha_cierre: p.fecha_cierre ?? "",
        saldo_inicial: p.saldo_inicial ?? 0,
        saldo_final: p.saldo_final ?? 0,
        estado: p.estado || "",
      })),
    [data]
  );

  const filterFn = useCallback(
    (row: typeof rows[number], query: string) => {
      const normalized = query.trim().toLowerCase();
      return (
        row.fecha_apertura.toLowerCase().includes(normalized) ||
        row.fecha_cierre.toLowerCase().includes(normalized) ||
        row.estado.toLowerCase().includes(normalized)
      );
    },
    []
  );

  const { page, setPage, filteredRows, paginatedRows } =
    useTableSearchPagination(rows, search, filterFn, ROWS_PER_PAGE);

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  if (loading) return <div style={{ padding: 16 }}>Cargando historial de cajas…</div>;
  if (error) return <div style={{ padding: 16, color: "red" }}>Error: {error}</div>;
  if (!data || data.length === 0)
    return <div style={{ padding: 16 }}>No hay historial de cajas</div>;

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
        rowsPerPage={ROWS_PER_PAGE}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPageOptions={[ROWS_PER_PAGE]}
      />
    </TableContainer>
  );
};

