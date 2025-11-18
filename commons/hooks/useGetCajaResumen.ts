import { useState, useEffect } from "react";
import { api } from "../../lib/api";

export const useResumenCaja = () => {
  const [data, setData] = useState<[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchAll = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await api.get("/api/productos/historial-cajas");
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