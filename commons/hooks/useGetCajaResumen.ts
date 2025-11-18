import { useState, useEffect } from "react";
import { api } from "../../lib/api";
import { ResumenCajas } from "../types/completeList";

export const useResumenCaja = () => {
  const [data, setData] = useState<ResumenCajas[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchAll = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await api.get("/api/productos/resumen-diario");
      setData(Array.isArray(res) ? res : res.data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error desconocido");
      console.error("Error al obtener productos:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAll();
  }, []);

  return { data, loading, error, refetch: fetchAll };
};