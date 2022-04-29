import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AuthResponse, usuario } from '../interfaces/user.interface';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../environments/environment'
import Swal from 'sweetalert2';
import { Permission } from '../interfaces/objects.interface';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  private bUA = environment.baseUrl;
  public _usuarioActual:any = '';
  public _usuarioActual2:any = '';
  public _userToken:any = '';
  public nombreUsuario = '';
  public _usuarios:usuario[]=[];
  public _permisos:Permission[]=[];
  public ruta:any = '';

  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'auth-token': this._userToken
  });

  public datosUsuario: usuario ={
    ID_USUARIO: '',
    ID_PUESTO: 0,
    ID_ROL: 0,
    USUARIO: '',
    CONTRASENA: '',
    CORREO_ELECTRONICO: '',
    TELEFONO: '',
    RTN: '',
    IMG_USUARIO: '',
    PREGUNTA: '',
    RESPUESTA: '',
    GENERO: '',
    FECHA_VENCIMIENTO: '',
    CREADO_POR: 0,
    ESTADO: 0,
    SUELDO: 0,
    NOMBRE_PERSONA: '',
    APELLIDO_PERSONA: ''
  };

  public datosUsuario2: usuario ={
    ID_USUARIO: '',
    ID_PUESTO: 0,
    ID_ROL: 0,
    USUARIO: '',
    CONTRASENA: '',
    CORREO_ELECTRONICO: '',
    TELEFONO: '',
    RTN: '',
    IMG_USUARIO: '',
    PREGUNTA: '',
    RESPUESTA: '',
    GENERO: '',
    FECHA_VENCIMIENTO: '',
    CREADO_POR: 0,
    ESTADO: 0,
    SUELDO: 0,
    NOMBRE_PERSONA: '',
    APELLIDO_PERSONA: ''
  };

  constructor( private http:HttpClient ){
    this._userToken = localStorage.getItem("auth-token");
    this.ruta = localStorage.getItem("ruta");
    this.obtenerUsuarios();
  }

  get usuario(): usuario {
    return this.datosUsuario;
  }

  public get usuarioActual() {
    return this._usuarioActual;
  }

  public set usuarioActual(value) {
    this._usuarioActual = value;
  }

  //funcion para retornar un usuario en especifico desde el servicio usuario
  retornarUsuario(id:any): Observable<any>{
    return this.http.get<usuario>(`${this.bUA}/module/users/${id}`);
  }

  //funcion para retornar un usuario en especifico desde el servicio usuario
  obtenerInfoUsuario(): Observable<any>{
    //console.log('token',this._userToken);
    this.headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'auth-token': this._userToken
    });
    //console.log('token',this.headers);
    return this.http.get<any>(`${this.bUA}/module/users/myinfo/userInfo`, {headers:this.headers});
  }

  //funcion para obtener un usuario en especifico como observable
  obtenerUsuario(): Observable<any>{
    this._userToken = localStorage.getItem("auth-token");
    this._usuarioActual = localStorage.getItem("id");
    return this.http.get<usuario>(`${this.bUA}/module/users/${this._usuarioActual}`, );
  }

  //funcion para obtener un usuario en especifico como observable
  obtenerUsuarios(){
    this.http.get<any>(`${this.bUA}/module/users`).subscribe((resp) => {
      //console.log('resp objetos',resp['Objetos']);
      if(resp['mensaje'][0]['CODIGO']==1){
        this._usuarios=resp['usuario'];
      }else{
        console.log('no',resp);
      }
    });
  }

  //funcion para actualizar un usuario
  editarUsuario( usuario:usuario, id:any): Observable<any>{
    //console.log(this.datosUsuario);
    return this.http.put<usuario>(`${this.bUA}/module/users/${id}`, usuario, {headers:this.headers})
  }

  editarUsuarioLogin( usuario:any, id:any): Observable<any>{
    //console.log(this.datosUsuario);
    return this.http.put<usuario>(`${this.bUA}/module/users/${id}`, usuario, {headers:this.headers})
  }

  //funcion para crear la pregunta de usuario
  crearPreguntaUsuario( data:any, id:any): Observable<any>{
    return this.http.post<any>(`${this.bUA}/module/users/SQA/${id}`, data)
  }

  //funcion para actualizar la pregunta de usuario
  actualizarPreguntaUsuario( data:any, id:any): Observable<any>{
    return this.http.put<usuario>(`${this.bUA}/module/users/SQA/${id}`, data)
  }

  //funcion para actualizar la contraseña de usuario
  actualizarContrasenaUsuario( data:any, id:any): Observable<any>{
    return this.http.put<any>(`${this.bUA}/module/users/uptPWD/${id}`, data)
  }

  //funcion para obtener la pregunta de usuario
  obtenerPreguntaUsuario(id:any): Observable<any>{
    return this.http.get<any>(`${this.bUA}/module/users/getSQ/${id}`)
  }

  //funcion para obtener la respuesta de usuario
  obtenerRespuestaUsuario(id:any): Observable<any>{
    return this.http.get<any>(`${this.bUA}/module/users/getSA/${id}`)
  }

  //opcion para registro desde el modulo de registro
  guardarNuevoUsuario(usuario:usuario): Observable<any> {
    return this.http.post<usuario>(`${this.bUA}/api/auth/signup`, usuario);
  }

  //opcion para registrar un usuario desde el admon
  crearNuevoUsuario(usuario:usuario): Observable<any> {
    return this.http.post<usuario>(`${this.bUA}/module/users`, usuario);
  }

  //consulta para inicio de sesion
  verifLogin(data:any): Observable<any> {
    return this.http.post<any>(`${this.bUA}/api/auth/signin`, data);
  }

  //consulta para cerrar sesion
  cerrarSesion(){
    this._usuarioActual='';
    this._usuarioActual2='';
    this._userToken='';
    localStorage.removeItem('auth-token');
    localStorage.removeItem('ruta');
  }

  //funcion para verificacion del correo mediante regex
  verificacionCorreo(correo: string): boolean{
    const regexi = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(regexi.test(correo)){
      return false;
    }
    return true;
  }

  //funcion para poder validar el token session
  validarToken(){
    const url = `http://localhost:8888/auth`;
    const headers = new HttpHeaders()
    .set('x-access-token', localStorage.getItem('auth-token') || '');

    return this.http.get<AuthResponse>( url, {headers} )
      .pipe(
        map(resp => {
          if(resp.session_code){
            localStorage.setItem('auth-token', resp.session_code!);
          }
          return true
        }),
        catchError(err => of(false))
      )
  }
}
