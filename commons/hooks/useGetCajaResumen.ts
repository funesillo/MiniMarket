import { useState, useEffect, useCallback } from "react";
import { api } from "../../lib/api";
import type { CajaHistorial } from "../types/completeList";

export const useResumenCaja = () => {
  const [data, setData] = useState<CajaHistorial[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchAll = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await api.get("/api/productos/historial-cajas");
      setData(Array.isArray(res) ? res : res.data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error desconocido");
      console.error("Error al obtener historial de cajas:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  return { data, loading, error, refetch: fetchAll };
};