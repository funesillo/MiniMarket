import { useState, useEffect, useCallback } from "react";
import { api } from "../../lib/api";
import { ListaProductos } from "../types/completeList";

export const useProductos = () => {
  const [data, setData] = useState<ListaProductos[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchAll = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await api.get("/api/productos");
      setData(Array.isArray(res) ? res : res.data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error desconocido");
      console.error("Error al obtener productos:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  return { objList :data, loading, error, refetch: fetchAll };
};