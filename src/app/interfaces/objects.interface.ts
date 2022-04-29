export interface purchaseProduct {
  ID_PRODUCTO:number,
  ID_COMPRA:number,
  PRECIO_UNITARIO:number,
  DESCRIPCION:string,
  CANTIDAD:number
}

export interface PurchaseDetail{
  ID_DETALLE_COMPRA: number,
  ID_PRODUCTO: number,
  NOMBRE_PRODUCTO: string,
  MARCA_PRODUCTO: string,
  IMG_PRODUCTO: string,
  ID_COMPRA: number,
  PRECIO_UNITARIO: number,
  CANTIDAD_PRODUCTO: number,
  SUB_TOTAL: number,
}

export interface Purchase {
  ID_COMPRA: number,
  ID_USUARIO: number,
  ID_PAGO: number,
  ID_PROVEEDOR: number,
  OBSERVACION_COMPRA: string,
  FECHA_COMPRA: string,
  TOTAL_COMPRA: number,
  ISV_COMPRA: number,
  ESTADO: number,
  USUARIO: string,
  PAGO: string,
  PROVEEDOR: string,
}

export interface Sale {
  ID_PAGO:number,
  ID_USUARIO:number,
  ID_CLIENTE:number,
  DESCRIPCION: string
}

export interface SaleDetail{
  ID_DETALLE_VENTA: number,
  ID_PRODUCTO: number,
  NOMBRE_PRODUCTO: string,
  MARCA_PRODUCTO: string,
  IMG_PRODUCTO: string,
  ID_VENTA: number,
  MONTO_UNITARIO: number,
  CANTIDAD_PRODUCTO: number,
  SUB_TOTAL: number,
  TOTAL: number
}

export interface SaleInit{
  ID_VENTA: number,
  ID_PAGO: number,
  FORMA_PAGO: string,
  ID_USUARIO: number,
  USUARIO: string,
  CANTIDAD_VENTA: number,
  FECHA_VENTA: string,
  ID_CLIENTE: 1,
  NOMBRE_CLIENTE: string,
  ISV: number,
  TOTAL_VENTA: number,
  DESCRIPCION_VENTA: string,
  ESTADO: number,
  COMISION_EMPLEADO: number
}

export interface Category {
  ID_CATEGORIA:number,
  CATEGORIA : string,
  DESCRIPCION: string
}

export interface Product {
  ID_PRODUCTO: number,
  ID_PROVEEDOR: number,
  NOMBRE_PROVEEDOR: string,
  NOMBRE_PRODUCTO: string,
  MARCA_PRODUCTO: string,
  DESCRIPCION_PRODUCTO: string,
  ID_CATEGORIA: number,
  CATEGORIA: string,
  ESTADO: number,
  IMG_PRODUCTO: string
}

export interface Object {
  ID_OBJETO:number,
  OBJETOS:string,
  TIPO_OBJETO:string,
  DESCRIPCION:string,
  CREADO_POR:number
}

export interface Permission {
  ID_OBJETO:number,
  ID_ROL:number,
  PERMISO_INSERCION:number,
  PERMISO_ELIMINACION:number,
  PERMISO_ACTUALIZACION:number,
  PERMISO_CONSULTAR:number,
  CREADO_POR:number
}

export interface Role {
  ID_ROL: number,
  ROL:string,
  DESCRIPCION:string,
  FECHA_CREACION: string,
  CREADO_POR:number,
  FECHA_MODIFICACION: string,
  MODIFICADO_POR: number
}

export interface PayMethod {
  ID_PAGO:number,
  FORMA_PAGO:string,
  DESCRIPCION: string
}

export interface Parameter {
  ID_PARAMETRO:number,
  PARAMETRO:string,
  ID_USUARIO: number,
  VALOR:string,
}

export interface Bitacora {
  ID_BITACORA: number,
  ID_USUARIO: number,
  ID_OBJETO: number,
  ACCION: string,
  DESCRIPCION: string,
  INFORMACION_ANTERIOR: string,
  INFORMACION_ACTUAL: string,
  FECHA_BITACORA: string,
  USUARIO: string,
  OBJETOS: string,
}

export interface Comission {
  ID_USUARIO: number,
  ID_VENTA: number,
  TOTAL_VENTA: number,
  COMISION_EMPLEADO: number,
  USUARIO: string,
  CORREO_ELECTRONICO: string
}

export interface Puesto {
  ID_PUESTO: number,
  PUESTO: string,
  DESCRIPCION: string
}

export interface PermisosRol {
  OBJETOS: string,
  PERMISO_INSERCION: number,
  PERMISO_ELIMINACION: number,
  PERMISO_ACTUALIZACION: number,
  PERMISO_CONSULTAR: number,
  ROL: string,
  ID_ROL: number,
  ID_OBJETO: number
}

export interface Help {
  ID_INFO:number,
  TIPO:string,
  TITULO:string,
  ENLACE:string,
  FECHA_CREACION:string,
  ESTADO:Boolean
}

export interface ExistenceProduct {
  ID_INVENTARIO: number,
  ID_PRODUCTO: number,
  EXISTENCIA: number,
  PRECIO_VENTA: number,
  PRECIO_UNITARIO: number,
  METODO: number,
  ESTADO: number
}

export interface CompleteProduct {
  ID_PRODUCTO: number,
  NOMBRE_PRODUCTO: string,
  MARCA_PRODUCTO: string,
  DESCRIPCION_PRODUCTO: string,
  EXISTENCIA: number,
  PRECIO_VENTA: number,
  PRECIO_UNITARIO: number,
  CATEGORIA: string,
  NOMBRE_PROVEEDOR: string,
  ID_PROVEEDOR: number,
  ESTADO: number
}

export interface Kardex{
  ID_KARDEX: number,
  ID_INVENTARIO: number,
  EXISTENCIA: number,
  PRECIO_UNITARIO: number,
  NOMBRE_PRODUCTO: string,
  MARCA_PRODUCTO: string,
  FECHA_VENCI_PRODUCTO: string,
  CANTIDAD: number,
  TOTAL: number,
  TIPO_MOVIMIENTO: number,
  FECHA_MOVIMIENTO: string
}
