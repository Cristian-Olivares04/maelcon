import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category, Product, purchaseProduct} from '../interfaces/objects.interface';
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
  public _categorias:Category[]=[]
  public _products=[]
  public _datosProd:any;
  public _datosProdExist:any;
  public _compAct:any;

  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'auth-token': this._userToken
  });

  constructor(private US:UsuariosService, private http:HttpClient) {
    this.obtenerProductosCompletos();
    this.obtenerCategorias();
    this.obtenerInventario();
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
  actualizarProducto( data:any, id:any): Observable<any>{
    return this.http.put<Product>(`${this.bUA}/module/inventory/product/${id}`, data);
  }

  //funcion para obtener productos
  obtenerProductosCompletos(){
    try {
      this.http.get<any>(`${this.bUA}/module/supplies/productData`).subscribe((resp) => {
        //console.log('productos completos',resp['proveedores']);
        if(resp['mensaje'][0]['CODIGO']==1){
          this._products=resp['proveedores'];
        }else{
          //console.log('no',resp);
        }
      });
    } catch (error) {
      console.log('error sucitado', error)
    }
  }

  //funcion para obtener productos
  obtenerProdListaCompletos(): Observable<any>{
    return this.http.get<any>(`${this.bUA}/module/supplies/productData`)
  }

  //funcion para obtener un producto en especifico
  obtenerProducto(id:any): Observable<any>{
    return this.http.get<purchaseProduct>(`${this.bUA}/module/supplies/productData/${id}`);
  }

  //funcion para obtener un producto en especifico
  obtenerProductoCompleto(id:any): Observable<any>{
    return this.http.get<purchaseProduct>(`${this.bUA}/module/supplies/supplies/${id}`);
  }

  //funcion para actualizar en inventario un Producto
  actualizarInventarioProducto( data:any, id:any): Observable<any>{
    return this.http.put<any>(`${this.bUA}/module/inventory/productAvailable/${id}`, data);
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
