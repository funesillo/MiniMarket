// src/components/SalesPOSIntegrated.tsx
import React, { useMemo, useState } from "react";
import {
  Box,
  Paper,
  TextField,
  Button,
  InputAdornment,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  Typography,
  Snackbar,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckIcon from "@mui/icons-material/Check";
import { useProductos } from "../hooks/useGetProductos";
import { usePostVenta } from "../hooks/usePostVenta";

// Tipos simplificados locales (solo para estructura interna)
type ListaProductos = {
  id: number;
  nombre: string;
  codigo_barra: string;
  precio_venta: number;
  stock?: number;
};

type ItemVentaLocal = {
  id_producto: number;
  nombre: string;
  codigo_barra?: string;
  precio_unitario: number;
  cantidad: number;
};

type VentaProductoPayload = {
  saldo_inicial: number;
  total_venta: number;
  id_medio_pago: number;
  items: { id_producto: number; cantidad: number; precio_unitario: number }[];
};

export const Index = () => {
  const { objList = [] } = useProductos() as { objList: ListaProductos[]; loading?: boolean };
  const { postVenta, loading: posting } = usePostVenta();

  const [codeValue, setCodeValue] = useState("");
  const [items, setItems] = useState<ItemVentaLocal[]>([]);
  const [snack, setSnack] = useState<{ open: boolean; message: string }>({ open: false, message: "" });

  const total = useMemo(() => items.reduce((s, it) => s + it.precio_unitario * it.cantidad, 0), [items]);
  const fmt = (n: number) => n.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  // --- Añadir producto por código o id ---
  const handleAddByCode = (raw: string) => {
    const code = raw?.trim();
    if (!code) {
      setSnack({ open: true, message: "Ingresá un código" });
      return;
    }

    let product = objList.find((p) => p.codigo_barra === code);
    if (!product && /^\d+$/.test(code)) {
      product = objList.find((p) => p.id === Number(code));
    }
    if (!product) {
      setSnack({ open: true, message: "Producto no encontrado" });
      return;
    }

    setItems((prev) => {
      const exists = prev.find((it) => it.id_producto === product!.id);
      if (exists) return prev.map((it) => (it.id_producto === product!.id ? { ...it, cantidad: it.cantidad + 1 } : it));
      const newItem: ItemVentaLocal = {
        id_producto: product.id,
        nombre: product.nombre,
        codigo_barra: product.codigo_barra,
        precio_unitario: product.precio_venta,
        cantidad: 1,
      };
      return [...prev, newItem];
    });

    setCodeValue("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleAddByCode(codeValue);
  };

  const handleChangeQty = (id_producto: number, cantidad: number) => {
    if (cantidad < 1) return;
    setItems((prev) => prev.map((it) => (it.id_producto === id_producto ? { ...it, cantidad } : it)));
  };

  const handleRemove = (id_producto: number) => setItems((prev) => prev.filter((it) => it.id_producto !== id_producto));

  // --- Checkout: arma payload mínimo y hace POST ---
  const handleCheckout = async () => {
    if (items.length === 0) {
      setSnack({ open: true, message: "No hay items para vender" });
      return;
    }

    const payload: VentaProductoPayload = {
      saldo_inicial: 0,
      total_venta: Number(Number(total).toFixed(2)),
      id_medio_pago: 1, // por defecto; ajustá si necesitás UI para elegir
      items: items.map((it) => ({
        id_producto: it.id_producto,
        cantidad: it.cantidad,
        precio_unitario: it.precio_unitario,
      })),
    };

    try {
      await postVenta(payload);
      setSnack({ open: true, message: "Venta registrada correctamente" });
      setItems([]);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setSnack({ open: true, message: err?.message ?? "Error al registrar venta" });
    }
  };

  return (
    <Box>
      <Paper sx={{ p: 2, mb: 2 }}>
        <Typography variant="h6">Punto de venta</Typography>

        <Box sx={{ display: "flex", gap: 1, mt: 1 }}>
          <TextField
            label="Código / barcode / id"
            placeholder="Escaneá o ingresá código"
            value={codeValue}
            onChange={(e) => setCodeValue(e.target.value)}
            onKeyDown={handleKeyDown}
            fullWidth
            size="small"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Button onClick={() => handleAddByCode(codeValue)} disabled={!codeValue}>
                    Agregar
                  </Button>
                </InputAdornment>
              ),
            }}
          />

          <Button
            variant="contained"
            color="primary"
            onClick={handleCheckout}
            startIcon={<CheckIcon />}
            disabled={items.length === 0 || posting}
          >
            {posting ? "Guardando..." : `Cobrar • $${fmt(total)}`}
          </Button>
        </Box>
      </Paper>

      <Paper>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Producto</TableCell>
              <TableCell>Código</TableCell>
              <TableCell align="right">Precio</TableCell>
              <TableCell align="center" sx={{ width: 120 }}>
                Cantidad
              </TableCell>
              <TableCell align="right">Subtotal</TableCell>
              <TableCell align="center" sx={{ width: 64 }}>
                Acción
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {items.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} align="center" sx={{ py: 6 }}>
                  No hay productos agregados
                </TableCell>
              </TableRow>
            ) : (
              items.map((it) => (
                <TableRow key={it.id_producto}>
                  <TableCell>{it.nombre}</TableCell>
                  <TableCell>{it.codigo_barra ?? "—"}</TableCell>
                  <TableCell align="right">${fmt(it.precio_unitario)}</TableCell>

                  <TableCell align="center">
                    <TextField
                      type="number"
                      inputProps={{ min: 1, style: { textAlign: "center" } }}
                      value={it.cantidad}
                      onChange={(e) => {
                        const q = Math.max(1, Number(e.target.value || 0));
                        handleChangeQty(it.id_producto, q);
                      }}
                      size="small"
                      sx={{ width: 90 }}
                    />
                  </TableCell>

                  <TableCell align="right">${fmt(it.precio_unitario * it.cantidad)}</TableCell>

                  <TableCell align="center">
                    <IconButton size="small" onClick={() => handleRemove(it.id_producto)} aria-label="Eliminar">
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </Paper>

      <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
        <Typography variant="h6">Total: ${fmt(total)}</Typography>
      </Box>

      <Snackbar open={snack.open} autoHideDuration={3000} onClose={() => setSnack({ open: false, message: "" })} message={snack.message} />
    </Box>
  );
}
