import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Object, Parameter, PayMethod, Permission, Role } from '../interfaces/objects.interface';
import { environment } from '../../environments/environment'
import { UsuariosService } from './usuarios.service';

@Injectable({
  providedIn: 'root'
})
export class MantenimientoService {
  private bUA = environment.baseUrl;
  public _usuarioActual = this.US._usuarioActual;
  public _userToken=this.US._userToken;

  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'auth-token': this._userToken
  });

  constructor(private US:UsuariosService, private http:HttpClient) { }

  //funcion para chequear si existe un usuario por el correo
  chequearUsuario( data:any ): Observable<any>{
    return this.http.get<any>(`${this.bUA}/module/admin/checkUser`);
  }

  //funcion para actualizar el estado de un usuario
  actualizarEstadoUsuario( data:any, id:any): Observable<any>{
    return this.http.put<any>(`${this.bUA}/module/admin/status/${id}`, data);
  }

  //funcion para crear Objeto
  crearObjeto( data:Object): Observable<any>{
    return this.http.post<Object>(`${this.bUA}/module/admin/object`, data);
  }

  //funcion para actualizar un Objeto
  actualizarObjeto( data:Object, id:any): Observable<any>{
    return this.http.put<Object>(`${this.bUA}/module/admin/object/${id}`, data);
  }

  //funcion para obtener Objetos
  obtenerObjetos(): Observable<any>{
    return this.http.get<Object>(`${this.bUA}/module/admin/objects`);
  }

  //funcion para obtener un Objeto
  obtenerObjeto( id:any ): Observable<any>{
    return this.http.get<Object>(`${this.bUA}/module/admin/object/${id}`);
  }

  //funcion para crear permiso
  crearPermiso( data:Permission ): Observable<any>{
    return this.http.post<Permission>(`${this.bUA}/module/admin/permission`, data);
  }

  //funcion para actualizar un permiso
  actualizarPermiso( data:Permission, id:any): Observable<any>{
    return this.http.put<Permission>(`${this.bUA}/module/admin/permission/${id}`, data);
  }

  //funcion para obtener permisos para un usuario
  obtenerPermisosUsuarios( id:any ): Observable<any>{
    return this.http.get<Permission>(`${this.bUA}/module/admin/userPermissions/${id}`);
  }

  //funcion para crear rol
  crearRol( data:Role ): Observable<any>{
    return this.http.post<Role>(`${this.bUA}/module/admin/role`, data);
  }

  //funcion para actualizar un permiso
  actualizarRol( data:Role, id:any): Observable<any>{
    return this.http.put<Role>(`${this.bUA}/module/admin/role/${id}`, data);
  }

  //funcion para obtener roles
  obtenerRoles(): Observable<any>{
    return this.http.get<Role>(`${this.bUA}/module/admin/getRoles`);
  }

  //funcion para obtener un Rol
  obtenerRol( id:any ): Observable<any>{
    return this.http.get<Role>(`${this.bUA}/module/admin/getRoles/${id}`);
  }

  //funcion para crear metodo de pago
  crearMetodoPago( data:PayMethod ): Observable<any>{
    return this.http.post<PayMethod>(`${this.bUA}/module/admin/paymentMethod`, data);
  }

  //funcion para actualizar un metodo de pago
  actualizarMetodoPago( data:PayMethod, id:any): Observable<any>{
    return this.http.put<PayMethod>(`${this.bUA}/module/admin/paymentMethod/${id}`, data);
  }

  //funcion para obtener Metodos de Pagos
  obtenerMetodosPagos(): Observable<any>{
    return this.http.get<PayMethod>(`${this.bUA}/module/admin/getPaymentMethods`);
  }

  //funcion para obtener un Metodo dePago
  obtenerMetodoPago( id:any ): Observable<any>{
    return this.http.get<PayMethod>(`${this.bUA}/module/admin/getPaymentMethods/${id}`);
  }

  //funcion para crear parametro
  crearParametro( data:Parameter ): Observable<any>{
    return this.http.post<Parameter>(`${this.bUA}/module/admin/parameter`, data);
  }

  //funcion para actualizar un Parametro
  actualizarParametro( data:Parameter, id:any): Observable<any>{
    return this.http.put<Parameter>(`${this.bUA}/module/admin/parameter/${id}`, data);
  }

  //funcion para obtener Parametros
  obtenerParametros(): Observable<any>{
    return this.http.get<Parameter>(`${this.bUA}/module/admin/getParameters`);
  }

  //funcion para obtener un Parametro
  obtenerParametro( id:any ): Observable<any>{
    return this.http.get<Parameter>(`${this.bUA}/module/admin/getParameters/${id}`);
  }

  //funcion para obtener los registro de la tabla bitacora
  obtenerRegistrosBitacora(): Observable<any>{
    return this.http.get<any>(`${this.bUA}/module/admin/getLogs`);
  }

  //funcion para obtener un registro de la tabla bitacora
  obtenerRegistroBitacora( id:any ): Observable<any>{
    return this.http.get<any>(`${this.bUA}/module/admin/getLogs/${id}`);
  }

  //funcion para obtener las comisiones
  obtenerComisiones(): Observable<any>{
    return this.http.get<any>(`${this.bUA}/module/admin/comission`);
  }

  //funcion para obtener comisiones de un usuario en especifico
  obtenerComision( id:any ): Observable<any>{
    return this.http.get<any>(`${this.bUA}/module/admin/comission/${id}`);
  }

  //funcion para crear backup
  crearBackUp(): Observable<any>{
    return this.http.post<any>(`${this.bUA}/module/admin/parameter`, {});
  }

}
