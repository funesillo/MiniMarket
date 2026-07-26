import { useState, useCallback } from "react";
import { api } from "../../lib/api";
import type { ventaProducto } from "../types/completeList";

export const usePostVenta = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const postVenta = useCallback(async (payload: ventaProducto) => {
    setLoading(true);
    setError(null);

    try {
      return await api.post("/api/ventas", payload);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Error desconocido";
      setError(message);
      console.error("Error al enviar venta:", err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { postVenta, loading, error };
};  