import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product, Purchase, purchaseProduct } from '../interfaces/objects.interface';
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
  public _proveedores:Proveedor[]=[]
  public _kardex=[]
  public _compras=[]

  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'auth-token': this._userToken
  });

  constructor(private US:UsuariosService, private http:HttpClient) {
    this.obtenerCompras();
    this.obtenerKardex();
    this.obtenerProductos();
    this.obtenerProveedores();
  }


  //funcion para crear proveedor
  crearProveedor( data:Proveedor): Observable<any>{
    return this.http.post<Proveedor>(`${this.bUA}/module/supplies/supplier`, data);
  }

  //funcion para actualizar proveedor
  actualizarProveedor( data:Proveedor, id:any): Observable<any>{
    return this.http.put<Proveedor>(`${this.bUA}/module/users/uptPWD/${id}`, data);
  }

  //funcion para crear encabezado de compra
  crearCompraEncabezado( data:Purchase): Observable<any>{
    return this.http.post<Purchase>(`${this.bUA}/module/supplies/supplyHeader`, data);
  }

  //funcion para actualizar encabezado compra
  actualizarCompraEncabezado( data:Purchase, id:any): Observable<any>{
    return this.http.put<Purchase>(`${this.bUA}/module/supplies/supplyHeader/${id}`, data);
  }

  //funcion para crear producto
  crearProducto( data:purchaseProduct): Observable<any>{
    return this.http.post<purchaseProduct>(`${this.bUA}/module/supplies/addSupply`, data);
  }

  //funcion para actualizar producto
  actualizarProducto( data:purchaseProduct, id:any): Observable<any>{
    return this.http.put<purchaseProduct>(`${this.bUA}/module/supplies/updateSupply/${id}`, data);
  }

  //funcion para eliminar producto de una compra
  eliminarProducto( idComp:any, idProd:any): Observable<any>{
    return this.http.delete<purchaseProduct>(`${this.bUA}/module/supplies/deleteSupply/${idComp}/${idProd}`);
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
      //console.log('resp',resp['Objetos']);
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
  obtenerKardex(){
    this.http.get<any>(`${this.bUA}/module/inventory/kardex`).subscribe((resp) => {
      //console.log('resp',resp['Objetos']);
      if(resp['mensaje'][0]['CODIGO']==1){
        this._kardex=resp['inventario'];
      }else{
        //console.log('no',resp);
      }
    });
  }

  //funcion para obtener proveedores
  obtenerProveedores(){
    this.http.get<any>(`${this.bUA}/module/supplies/providers`).subscribe((resp) => {
      //console.log('resp',resp['Objetos']);
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
      //console.log('resp',resp['Objetos']);
      if(resp['mensaje'][0]['CODIGO']==1){
        this._compras=resp['proveedores'];
      }else{
        //console.log('no',resp);
      }
    });
  }

  //funcion para obtener una compra en especifica
  obtenerCompra(id:any): Observable<any>{
    return this.http.get<Purchase>(`${this.bUA}/module/supplies/purchases/${id}`);
  }
}