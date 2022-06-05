import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product, Purchase, PurchaseDetail, purchaseProduct } from '../interfaces/objects.interface';
import { environment } from '../../environments/environment'
import { UsuariosService } from './usuarios.service';
import { Proveedor } from '../interfaces/characters.interface';

@Injectable({
  providedIn: 'root'
})
export class ComprasService {
  private bUA = environment.baseUrl;
  public _usuarioActual = this.US._usuarioActual;
  public _userToken=this.US._userToken;
  public _compraActual = '';
  public _products:Product[]=[]
  public _detallesCompras:PurchaseDetail[]=[]
  public _proveedores:Proveedor[]=[]
  public _kardex=[]
  public _compras:any;
  public datosCompAct:any;

  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'auth-token': this._userToken
  });

  constructor(private US:UsuariosService, private http:HttpClient) {
    this.obtenerCompras();
    this.obtenerProductos();
    this.obtenerProveedores();
  }


  //funcion para crear proveedor
  crearProveedor( data:Proveedor): Observable<any>{
    return this.http.post<Proveedor>(`${this.bUA}/module/supplies/supplier`, data);
  }

  //funcion para actualizar proveedor
  actualizarProveedor( data:Proveedor, id:any): Observable<any>{
    return this.http.put<Proveedor>(`${this.bUA}/module/supplies/supplier/${id}`, data);
  }

  //funcion para crear encabezado de compra
  crearCompraEncabezado( data:Purchase): Observable<any>{
    return this.http.post<Purchase>(`${this.bUA}/module/supplies/supplyHeader`, data);
  }

  //funcion para actualizar encabezado compra
  actualizarCompraEncabezado( data:any, id:any): Observable<any>{
    return this.http.put<Purchase>(`${this.bUA}/module/supplies/supplyHeader/${id}`, data);
  }

  //funcion para crear producto
  agregarProdCompra( data:purchaseProduct): Observable<any>{
    return this.http.post<purchaseProduct>(`${this.bUA}/module/supplies/addSupply`, data);
  }

  //funcion para actualizar producto
  actualizarProducto( data:purchaseProduct): Observable<any>{
    return this.http.put<purchaseProduct>(`${this.bUA}/module/supplies/updateSupply`, data);
  }

  //funcion para eliminar producto de una compra
  eliminarProducto( data:any ): Observable<any>{
    return this.http.delete<purchaseProduct>(`${this.bUA}/module/supplies/deleteSupply`, {body:data});
  }

  //funcion para ejecutar la compra
  ejecutarCompra( data:any, id:any): Observable<any>{
    return this.http.post<any>(`${this.bUA}/module/supplies/processSupply/${id}`, data);
  }

  //funcion para eliminar una compra
  eliminarCompra( data:any, id:any): Observable<any>{
    return this.http.delete<any>(`${this.bUA}/module/supplies/eliminateSupply/${id}`, {body:data})
  }

  //funcion para obtener productos
  obtenerProductos(){
    this.http.get<any>(`${this.bUA}/module/supplies/supplies`).subscribe((resp) => {
      //console.log('productos',resp['inventario']);
      if(resp['mensaje'][0]['CODIGO']==1){
        this._products=resp['inventario'];
      }else{
        //console.log('no',resp);
      }
    });
  }

  //funcion para obtener un producto en especifico
  obtenerProducto(id:any): Observable<any>{
    return this.http.get<purchaseProduct>(`${this.bUA}/module/supplies/supplies/${id}`);
  }

  //funcion para obtener la tabla kardex
  obtenerKardex(id:number): Observable<any>{
    return this.http.get<any>(`${this.bUA}/module/inventory/kardex/${id}`);
  }

  //funcion para obtener proveedores
  obtenerProveedores(){
    this.http.get<any>(`${this.bUA}/module/supplies/providers`).subscribe((resp) => {
      //console.log('proveedores',resp['proveedores']);
      if(resp['mensaje'][0]['CODIGO']==1){
        this._proveedores=resp['proveedores'];
      }else{
        //console.log('no',resp);
      }
    });
  }

  //funcion para obtener un proveedor en especifico
  obtenerProveedor(id:any): Observable<any>{
    return this.http.get<Proveedor>(`${this.bUA}/module/supplies/providers/${id}`);
  }

  //funcion para obtener compras
  obtenerCompras(){
    this.http.get<any>(`${this.bUA}/module/supplies/purchases`).subscribe((resp) => {
      //console.log('compras',resp['proveedores']);
      if(resp['mensaje'][0]['CODIGO']==1){
        this._compras=resp['proveedores'];
      }else{
        //console.log('no',resp);
      }
    });
  }

  //funcion para obtener compras
  obtenerListaCompras(): Observable<any>{
    return this.http.get<any>(`${this.bUA}/module/supplies/purchases`);
  }

  //funcion para obtener una compra en especifica
  obtenerCompra(id:any): Observable<any>{
    return this.http.get<Purchase>(`${this.bUA}/module/supplies/purchases/${id}`);
  }

  //funcion para obtener productos de una compra en especifica
  obtenerDetallesCompra(id:any){
    this.http.get<Purchase>(`${this.bUA}/module/supplies/detailsSupply/${id}`).subscribe((resp) => {
      //console.log('detallesCompras',resp['detalles']);
      if(resp['detalles'][0][0]['CODIGO']==1){
        this._detallesCompras=resp['detalles'][1];
      }else{
        this._detallesCompras=[]
        //console.log('no',resp);
      }
    });
  }

  obtenerDetallesListaCompra(id:any): Observable<any>{
    return this.http.get<Purchase>(`${this.bUA}/module/supplies/detailsSupply/${id}`);
  }
}
