import React, { useCallback, useMemo, useState } from "react";
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

const fmt = (value: number) =>
  value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });

type ItemVentaLocal = {
  id_producto: number;
  nombre: string;
  codigo_barra?: string;
  precio_unitario: number;
  cantidad: number;
};

export const Index = () => {
  const { objList = [], loading: productsLoading } = useProductos();
  const { postVenta, loading: posting } = usePostVenta();

  const [codeValue, setCodeValue] = useState("");
  const [items, setItems] = useState<ItemVentaLocal[]>([]);
  const [snack, setSnack] = useState<{ open: boolean; message: string }>({ open: false, message: "" });

  const disablePost = process.env.NEXT_PUBLIC_DISABLE_POST === "true";

  const productByBarcode = useMemo(
    () => new Map(objList.map((product) => [product.codigo_barra, product] as const)),
    [objList]
  );

  const productById = useMemo(
    () => new Map(objList.map((product) => [product.id, product] as const)),
    [objList]
  );

  const total = useMemo(
    () => items.reduce((sum, item) => sum + item.precio_unitario * item.cantidad, 0),
    [items]
  );

  const showSnack = useCallback((message: string) => {
    setSnack({ open: true, message });
  }, []);

  const handleAddByCode = useCallback(
    (raw: string) => {
      const code = raw?.trim();
      if (!code) {
        showSnack("Ingresá un código");
        return;
      }

      let product = productByBarcode.get(code);
      if (!product && /^\d+$/.test(code)) {
        product = productById.get(Number(code));
      }

      if (!product) {
        showSnack("Producto no encontrado");
        return;
      }

      setItems((prev) => {
        const exists = prev.find((item) => item.id_producto === product!.id);
        if (exists) {
          return prev.map((item) =>
            item.id_producto === product!.id
              ? { ...item, cantidad: item.cantidad + 1 }
              : item
          );
        }

        return [
          ...prev,
          {
            id_producto: product.id,
            nombre: product.nombre,
            codigo_barra: product.codigo_barra,
            precio_unitario: product.precio_venta,
            cantidad: 1,
          },
        ];
      });

      setCodeValue("");
    },
    [productByBarcode, productById, showSnack]
  );

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === "Enter") {
        handleAddByCode(codeValue);
      }
    },
    [codeValue, handleAddByCode]
  );

  const handleChangeQty = useCallback((id_producto: number, cantidad: number) => {
    if (cantidad < 1) return;
    setItems((prev) => prev.map((item) => (item.id_producto === id_producto ? { ...item, cantidad } : item)));
  }, []);

  const handleRemove = useCallback((id_producto: number) => {
    setItems((prev) => prev.filter((item) => item.id_producto !== id_producto));
  }, []);

  const handleCheckout = useCallback(async () => {
    if (items.length === 0) {
      showSnack("No hay items para vender");
      return;
    }

    const payload = {
      saldo_inicial: 0,
      total_venta: Number(total.toFixed(2)),
      id_medio_pago: 1,
      items: items.map((item) => ({
        id_producto: item.id_producto,
        cantidad: item.cantidad,
        precio_unitario: item.precio_unitario,
      })),
    };

    try {
      if (disablePost) {
        showSnack("Envío deshabilitado temporalmente");
        setItems([]);
        return;
      }

      await postVenta(payload);
      showSnack("Venta registrada correctamente");
      setItems([]);
    } catch (error) {
      showSnack((error as Error)?.message ?? "Error al registrar venta");
    }
  }, [disablePost, items, postVenta, showSnack, total]);

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
            disabled={items.length === 0 || posting || productsLoading}
          >
            {productsLoading ? "Cargando productos..." : posting ? "Guardando..." : `Cobrar • $${fmt(total)}`}
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
};
