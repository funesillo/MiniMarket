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
      const res = await api.post("/api/ventas", payload);
      return res;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error desconocido");
      console.error("Error al obtener productos:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  return { postVenta, loading, error };
};