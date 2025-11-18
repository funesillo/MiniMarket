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

// POST /api/productos/  (body)
export type CreateProductoRequest = {
  nombre: string;
  codigo_barra: string;
  unidad_medida: string;
  precio_venta: number;
  stock: number;
  id_tipo_producto: number;
  id_distribuidora: number;
};
export type CreateProductoResponse = {
  id: number;
};

// PUT /api/productos/:id  (body igual a CreateProductoRequest)
export type UpdateProductoRequest = CreateProductoRequest;
export type UpdateProductoResponse = {
  actualizados: number;
};

// POST /api/productos/entrada-stock
export type EntradaStockRequest = {
  id_producto: number;
  cantidad: number;
};
export type EntradaStockResponse = {
  success: boolean;
  nuevo_stock?: number;
  mensaje?: string;
};

// GET /api/productos/movimientos/:id
export type Movimiento = {
  id: number;
  id_producto: number;
  tipo: "entrada" | "salida" | string;
  cantidad: number;
  fecha: string; // ISO datetime
  usuario?: string;
};
export type MovimientosResponse = Movimiento[];

// GET /api/productos/resumen-diario
export type ResumenProductoStockBajo = {
  id: number;
  nombre: string;
  stock: number;
};
export type ResumenCajas = {
  fecha: string;
  ventas_totales: number;
  ingresos: number;
  productos_stock_bajo: ResumenProductoStockBajo[];
};
