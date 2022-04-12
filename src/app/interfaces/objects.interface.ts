export interface purchaseProduct {
  ID_PRODUCTO:number,
  ID_COMPRA:number,
  PRECIO_UNITARIO:number,
  DESCRIPCION:string,
  CANTIDAD:number
}

export interface Purchase {
  ID_USUARIO:number,
  ID_PROVEEDOR:number,
  ID_PAGO:number,
  OBSERVACION:string
}

export interface Sale {
  ID_PAGO:number,
  ID_USUARIO:number,
  ID_CLIENTE:number,
  DESCRIPCION: string
}

export interface Category {
  CATEGORIA : string,
  DESCRIPCION: string
}

export interface Product {
  ID_PROVEEDOR: number,
  NOMBRE: string,
  MARCA: string,
  DESCRIPCION: string,
  IMG: string,
  ESTADO: number,
  ID_CATEGORIA: number
}

export interface Object {
  OBJETO:string,
  TIPO_OBJETO:string,
  DESCRIPCION:string,
  CREADO_POR:number
}

export interface Permission {
  ID_OBJETO:number,
  ID_ROL:number,
  INSERTAR:number,
  ELIMINAR:number,
  ACTUALIZAR:number,
  CONSULTAR:number,
  CREADO_POR:number
}

export interface Role {
  ROL:string,
  DESCRIPCION:string,
  CREADO_POR:number
}

export interface PayMethod {
  FORMA_PAGO:string,
  DESCRIPCION: string
}

export interface Parameter {
  PARAMETRO:string,
  ID_USUARIO: number,
  VALOR:string,
  FECHA_CREACION:string,
  FECHA_MODIFICACION:string
}

