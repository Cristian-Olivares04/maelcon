import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Sale } from '../interfaces/objects.interface';
import { environment } from '../../environments/environment'
import { UsuariosService } from './usuarios.service';
import { Cliente } from '../interfaces/characters.interface';

@Injectable({
  providedIn: 'root'
})
export class VentasService {
  private bUA = environment.baseUrl;
  public _usuarioActual = this.US._usuarioActual;
  public _userToken=this.US._userToken;
  public _ventaActual = '';

  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'auth-token': this._userToken
  });

  constructor(private US:UsuariosService, private http:HttpClient) { }

  clientData:Cliente = {
    NOMBRE: '',
    RTN: '',
    DIRECCION: '',
    TELEFONO: ''
  }

  saleData:Sale = {
    ID_PAGO: 0,
    ID_USUARIO: 0,
    ID_CLIENTE: 0,
    DESCRIPCION: ''
  }

  //funcion para crear Cliente
  crearCliente( data:Cliente): Observable<any>{
    return this.http.post<Cliente>(`${this.bUA}/module/sales/client`, data);
  }

  //funcion para actualizar Cliente
  actualizarCliente( data:Cliente, id:any): Observable<any>{
    return this.http.put<Cliente>(`${this.bUA}/module/sales/client/${id}`, data);
  }

  //funcion para obtener Clientes
  obtenerClientes(): Observable<any>{
    return this.http.get<Cliente>(`${this.bUA}/module/sales/client`);
  }

  //funcion para obtener un Cliente en especifico
  obtenerCliente(id:any): Observable<any>{
    return this.http.get<Cliente>(`${this.bUA}/module/sales/client/${id}`);
  }

  //funcion para crear encabezado de Venta
  crearVentaEncabezado( data:Sale): Observable<any>{
    return this.http.post<Sale>(`${this.bUA}/module/sales/saleHeader`, data);
  }

  //funcion para actualizar encabezado Venta
  actualizarVentaEncabezado( data:Sale, id:any): Observable<any>{
    return this.http.put<Sale>(`${this.bUA}/module/sales/saleHeader/${id}`, data);
  }

  //funcion para obtener detalles de ventas
  obtenerDetalleVentas(): Observable<any>{
    return this.http.get<Sale>(`${this.bUA}/module/sales/saleDetail`);
  }

  //funcion para obtener un detalle de Venta en especifico
  obtenerDetalleVenta(id:any): Observable<any>{
    return this.http.get<Sale>(`${this.bUA}/module/sales/saleDetail/${id}`);
  }

  //funcion para añadir un producto a un detalle de venta
  anadirProducto( data:any, id:any ): Observable<any>{
    return this.http.post<any>(`${this.bUA}/module/sales/addProduct2Sale/${id}`, data);
  }

  //funcion para actualizar un producto de un detalle de venta
  actualizarProducto( data:any, id:any): Observable<any>{
    return this.http.put<any>(`${this.bUA}/module/sales/addProduct2Sale/${id}`, data);
  }

  //funcion para eliminar producto de una venta
  eliminarProducto( data:any, id:any): Observable<any>{
    return this.http.delete<any>(`${this.bUA}/module/sales/addProduct2Sale/${id}`, {body:data})
  }

  //funcion para procesar una venta
  procesarVenta( data:any, id:any ): Observable<any>{
    return this.http.post<any>(`${this.bUA}/module/sales/sale/${id}`, data);
  }

  //funcion para obtener ventas
  obtenerVentas(): Observable<any>{
    return this.http.get<Sale>(`${this.bUA}/module/sales/sale`);
  }

  //funcion para obtener una Venta completa
  obtenerVentaCompleta(id:any): Observable<any>{
    return this.http.get<any>(`${this.bUA}/module/sales/saleFull/${id}`);
  }

  //funcion para obtener una Venta
  obtenerVenta(id:any): Observable<any>{
    return this.http.get<any>(`${this.bUA}/module/sales/sale/${id}`);
  }

  //funcion para eliminar una venta
  eliminarVenta( data:any, id:any): Observable<any>{
    return this.http.delete<any>(`${this.bUA}/module/sales/sale/${id}`, {body:data})
  }

}
