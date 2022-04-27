import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Bitacora, Object, Parameter, PayMethod, PermisosRol, Permission, Puesto, Role } from '../interfaces/objects.interface';
import { environment } from '../../environments/environment'
import { UsuariosService } from './usuarios.service';
import { saveAs } from 'file-saver';

@Injectable({
  providedIn: 'root'
})
export class MantenimientoService {
  private bUA = environment.baseUrl;
  public _usuarioActual = this.US._usuarioActual;
  public _userToken=this.US._userToken;
  public _params:Parameter[]=[];
  public _roles:Role[]=[];
  public _puestos:Puesto[]=[];
  public _objects:Object[]=[];
  public _permissions:Permission[]=[];
  public _permisosRol:PermisosRol[]=[];
  public _bitacora:Bitacora[]=[];
  public _payMethods:PayMethod[]=[]
  public condition=false;
  public actionVal = 0;

  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'auth-token': this._userToken
  });

  constructor(private US:UsuariosService, private http:HttpClient) {
    this.obtenerPermisos();
    this.obtenerObjetos();
    this.obtenerRoles();
    this.obtenerParametros();
    this.obtenerPuestos();
    this.obtenerRegistrosBitacora();
    this.obtenerMetodosPagos();
  }

  obtenerInfo(){
    this.obtenerPermisos();
    this.obtenerObjetos();
    this.obtenerRoles();
    this.obtenerParametros();
    this.obtenerPuestos();
    this.obtenerRegistrosBitacora();
    this.obtenerMetodosPagos();
  }

  //funcion para chequear si existe un usuario por el correo
  chequearUsuario( data:any ): Observable<any>{
    return this.http.get<any>(`${this.bUA}/module/admin/checkUser`, {observe:data, headers:this.headers});
  }

  //funcion para actualizar el estado de un usuario
  actualizarEstadoUsuario( data:any, id:any): Observable<any>{
    return this.http.put<any>(`${this.bUA}/module/admin/status/${id}`, data, {headers:this.headers});
  }

  //funcion para crear Objeto
  crearObjeto( data:Object): Observable<any>{
    return this.http.post<Object>(`${this.bUA}/module/admin/object`, data, {headers:this.headers});
  }

  //funcion para actualizar un Objeto
  actualizarObjeto( data:Object, id:any): Observable<any>{
    return this.http.put<Object>(`${this.bUA}/module/admin/object/${id}`, data, {headers:this.headers});
  }

  //funcion para obtener Objetos
  obtenerObjetos(){
    this.http.get<any>(`${this.bUA}/module/admin/getObjects`, {headers:this.headers}).subscribe((resp) => {
      //console.log('resp objetos',resp['Objetos']);
      if(resp['mensaje'][0]['CODIGO']==1){
        this._objects=resp['Objetos'];
      }else{
        //console.log('no',resp);
      }
    });
  }

  //funcion para obtener un Objeto
  obtenerObjeto( id:any ): Observable<any>{
    return this.http.get<Object>(`${this.bUA}/module/admin/object/${id}`, {headers:this.headers});
  }

  //funcion para crear permiso
  crearPermiso( data:Permission ): Observable<any>{
    return this.http.post<Permission>(`${this.bUA}/module/admin/permission`, data, {headers:this.headers});
  }

  //funcion para actualizar un permiso
  actualizarPermiso( data:Permission, id:any): Observable<any>{
    return this.http.put<Permission>(`${this.bUA}/module/admin/permission/${id}`, data, {headers:this.headers});
  }

  //funcion para obtener puestos de trabajo
  obtenerPermisos(){
    this.http.get<any>(`${this.bUA}/module/admin/rolePermissions`, {headers:this.headers}).subscribe((resp) => {
      //console.log('resp objetos',resp['Objetos']);
      if(resp['mensaje'][0]['CODIGO']==1){
        this._permisosRol=resp['permisosRol'];
      }else{
        //console.log('no',resp);
      }
    });
  }

  //funcion para obtener permisos para un usuario
  obtenerPermisosUsuarios( id:any ){
    //console.log('usAct', id)
    this.http.get<any>(`${this.bUA}/module/admin/userPermissions/${id}`, {headers:this.headers}).subscribe((resp) => {
      //console.log('resp permisos',resp['permisos']);
      if(resp['mensaje'][0]['CODIGO']==1){
        this._permissions=resp['permisos'];
        this.condition=true;
      }else{
        //console.log('no',resp);
      }
    });
  }

  //funcion para crear rol
  crearRol( data:Role ): Observable<any>{
    return this.http.post<Role>(`${this.bUA}/module/admin/role`, data, {headers:this.headers});
  }

  //funcion para actualizar un permiso
  actualizarRol( data:any, id:any): Observable<any>{
    return this.http.put<any>(`${this.bUA}/module/admin/role/${id}`, data, {headers:this.headers});
  }

  //funcion para obtener roles
  obtenerRoles(){
    //console.log('token para obtener roles', this._userToken)
    this.http.get<any>(`${this.bUA}/module/admin/getRoles`, {headers: this.headers}).subscribe((resp) => {
      //console.log('resp roles',resp['roles']);
      if(resp['mensaje'][0]['CODIGO']==1){
        this._roles=resp['roles'];
      }else{
        //console.log('no',resp);
      }
    });
  }

  //funcion para obtener un Rol
  obtenerRol( id:any ): Observable<any>{
    return this.http.get<Role>(`${this.bUA}/module/admin/getRoles/${id}`, {headers:this.headers});
  }

  //funcion para crear metodo de pago
  crearMetodoPago( data:PayMethod ): Observable<any>{
    return this.http.post<PayMethod>(`${this.bUA}/module/admin/paymentMethod`, data, {headers:this.headers});
  }

  //funcion para actualizar un metodo de pago
  actualizarMetodoPago( data:PayMethod, id:any): Observable<any>{
    return this.http.put<PayMethod>(`${this.bUA}/module/admin/paymentMethod/${id}`, data, {headers:this.headers});
  }

  //funcion para obtener Metodos de Pagos
  obtenerMetodosPagos(){
    this.http.get<any>(`${this.bUA}/module/admin/getPaymentMethods`, {headers:this.headers}).subscribe((resp) => {
      //console.log('resp metodos de pago',resp['Objetos']);
      if(resp['mensaje'][0]['CODIGO']==1){
        this._payMethods=resp['Objetos'];
      }else{
        //console.log('no',resp);
      }
    });
  }

  //funcion para obtener un Metodo dePago
  obtenerMetodoPago( id:any ): Observable<any>{
    return this.http.get<PayMethod>(`${this.bUA}/module/admin/getPaymentMethods/${id}`, {headers:this.headers});
  }

  //funcion para crear parametro
  crearParametro( data:Parameter ): Observable<any>{
    return this.http.post<Parameter>(`${this.bUA}/module/admin/parameter`, data, {headers:this.headers});
  }

  //funcion para actualizar un Parametro
  actualizarParametros( data:any): Observable<any>{
    return this.http.put<Parameter>(`${this.bUA}/module/admin/parameter`, data, {headers:this.headers});
  }

  //funcion para obtener Parametros
  obtenerParametros(){
    this.http.get<any>(`${this.bUA}/module/admin/getParameters`, {headers:this.headers}).subscribe((resp) => {
      //console.log('resp',resp['parametros']);
      if(resp['mensaje'][0]['CODIGO']==1){
        this._params=resp['parametros'];
      }else{
        //console.log('no',resp);
      }
    });
  }

  //funcion para obtener un Parametro
  obtenerParametro( id:any ): Observable<any>{
    return this.http.get<Parameter>(`${this.bUA}/module/admin/getParameters/${id}`, {headers:this.headers});
  }

  //funcion para crear puesto de trabajo
  crearPuesto( data:Puesto ): Observable<any>{
    return this.http.post<Puesto>(`${this.bUA}/module/admin/jobs/`, data, {headers:this.headers});
  }

  //funcion para actualizar un puesto de trabajo
  actualizarPuesto( data:Puesto, id:any): Observable<any>{
    return this.http.put<Puesto>(`${this.bUA}/module/admin/jobs//${id}`, data, {headers:this.headers});
  }

  //funcion para obtener puestos de trabajo
  obtenerPuestos(){
    this.http.get<any>(`${this.bUA}/module/admin/jobs`, {headers:this.headers}).subscribe((resp) => {
      //console.log('resp objetos',resp['Objetos']);
      if(resp['mensaje'][0]['CODIGO']==1){
        this._puestos=resp['puestos'];
      }else{
        //console.log('no',resp);
      }
    });
  }

  //funcion para obtener los registro de la tabla bitacora
  obtenerRegistrosBitacora(){
    return this.http.get<any>(`${this.bUA}/module/admin/getLogs`, {headers:this.headers}).subscribe((resp) => {
      //console.log('resp objetos',resp['Objetos']);
      if(resp['mensaje'][0]['CODIGO']==1){
        this._bitacora=resp['BITACORA'];
      }else{
        //console.log('no',resp);
      }
    });
  }

  //funcion para obtener un registro de la tabla bitacora
  obtenerRegistroBitacora( id:any ): Observable<any>{
    return this.http.get<any>(`${this.bUA}/module/admin/getLogs/${id}`, {headers:this.headers})
  }

  //funcion para descargar la bitacora
  downloadFile(): Observable<any> {
		return this.http.get(`${this.bUA}/module/admin/getLogs`, {responseType: 'blob', headers:this.headers});
  }

  //funcion para obtener las comisiones
  obtenerComisiones(): Observable<any>{
    return this.http.get<any>(`${this.bUA}/module/admin/comission`, {headers:this.headers});
  }

  //funcion para obtener comisiones de un usuario en especifico
  obtenerComision( id:any ): Observable<any>{
    return this.http.get<any>(`${this.bUA}/module/admin/comission/${id}`, {headers:this.headers});
  }

  //funcion para crear backup
  crearBackUp(){
    var js = {
      "name": "MAELCON_DB_BACKUP"
    }
    this.http.post<any>(`${this.bUA}/module/admin/backupDB2/`, js, {headers:this.headers, responseType:'blob' as 'json' }).subscribe((resp) => {
      //console.log('resp objetos',resp['Objetos']);
      saveAs(resp, 'MAELCON_DB_BACKUP.sql')
    });
  }

}
