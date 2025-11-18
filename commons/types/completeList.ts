export type ListaProductos = {
  id: number;
  nombre: string;
  codigo_barra: string;
  unidad_medida: string;
  precio_venta: number;
  stock: number;
  tipo_producto: string;
  distribuidora: string;
  tipo_nombre?: string;
  distribuidora_nombre?: string;
};

export type ventaProducto = {
  saldo_inicial: number;
  total_venta: number;
  id_medio_pago: number;
  items: Items[];
};

export type Items = {
  id_producto: number;
  cantidad: number;
  precio_unitario: number;
};

export type CajaHistorial = {
  fecha_apertura: string;
  fecha_cierre: string | null;
  saldo_inicial: number;
  saldo_final: number | null;
  estado: 'abierta' | 'cerrada';
}

export interface Distribuidor {
  nombre: string;
  cuit: string;
  telefono: string;
  direccion: string;
  email: string;
}