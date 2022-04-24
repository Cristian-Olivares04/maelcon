import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category, Product} from '../interfaces/objects.interface';
import { environment } from '../../environments/environment'
import { UsuariosService } from './usuarios.service';

@Injectable({
  providedIn: 'root'
})
export class InventarioService {
  private bUA = environment.baseUrl;
  public _usuarioActual = this.US._usuarioActual;
  public _userToken=this.US._userToken;
  public _inventarioGeneral=[]
  public _inventarioExixtencia=[]
  public _categorias=[]

  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'auth-token': this._userToken
  });

  constructor(private US:UsuariosService, private http:HttpClient) {
    this.obtenerInventario();
    this.obtenerCategorias();
    this.obtenerExistenciaInventario();
  }

  //funcion para crear Categoria
  crearCategoria( data:Category): Observable<any>{
    return this.http.post<Category>(`${this.bUA}/module/inventory/category`, data);
  }

  //funcion para actualizar Categoria
  actualizarCategoria( data:Category, id:any): Observable<any>{
    return this.http.put<Category>(`${this.bUA}/module/inventory/category/${id}`, data);
  }

  //funcion para obtener Categorias
  obtenerCategorias(){
    this.http.get<any>(`${this.bUA}/module/inventory/category`).subscribe((resp) => {
      //console.log('resp',resp['Objetos']);
      if(resp['mensaje'][0]['CODIGO']==1){
        this._categorias=resp['inventario'];
      }else{
        //console.log('no',resp);
      }
    });
  }

  //funcion para obtener un Categoria en especifico
  obtenerCategoria(id:any): Observable<any>{
    return this.http.get<Category>(`${this.bUA}/module/inventory/category/${id}`);
  }

  //funcion para crear Producto
  crearProducto( data:Product): Observable<any>{
    return this.http.post<Product>(`${this.bUA}/module/inventory/product`, data);
  }

  //funcion para actualizar Producto
  actualizarProducto( data:Product, id:any): Observable<any>{
    return this.http.put<Product>(`${this.bUA}/module/inventory/product/${id}`, data);
  }

  //funcion para actualizar en inventario un Producto
  actualizarInventarioProducto( data:Product, id:any): Observable<any>{
    return this.http.put<Product>(`${this.bUA}/module/inventory/productAvailable/${id}`, data);
  }

  //funcion para actualizar fecha vencimiento en inventario de un Producto
  actualizarVencimientoProducto( data:Product, id:any): Observable<any>{
    return this.http.put<Product>(`${this.bUA}/module/inventory/productExpireDate/${id}`, data);
  }

  //funcion para obtener inventario completo
  obtenerInventario(){
    this.http.get<any>(`${this.bUA}/module/inventory`).subscribe((resp) => {
      //console.log('resp',resp['Objetos']);
      if(resp['mensaje'][0]['CODIGO']==1){
        this._inventarioGeneral=resp['inventario'];
      }else{
        //console.log('no',resp);
      }
    });
  }

  //funcion para obtener productos con existencia en inventario
  obtenerExistenciaInventario(){
    this.http.get<any>(`${this.bUA}/module/inventory/existence`).subscribe((resp) => {
      //console.log('resp',resp['Objetos']);
      if(resp['mensaje'][0]['CODIGO']==1){
        this._inventarioExixtencia=resp['inventario'];
      }else{
        //console.log('no',resp);
      }
    });
  }

}
