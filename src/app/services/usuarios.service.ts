import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AuthResponse, usuario } from '../interfaces/usuario.interface';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  private bUA = environment.baseUrl;
  public _usuarioActual:any = '';
  public _userToken:any = '';
  public nombreUsuario = '';

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
    NOMBRE: '',
    APELLIDO: '',
    CORREO_ELECTRONICO: '',
    TELEFONO: '',
    RTN: '',
    IMG_USUARIO: '',
    PREGUNTA: '',
    RESPUESTA: '',
    GENERO: '',
    FECHA_VENCIMIENTO: '',
    CREADO_POR: 0,
    ESTADO: 0
  };

  constructor( private http:HttpClient){
    this.retornarUsuario();
  }

  get usuario(): usuario {
    this.retornarUsuario();
    return this.datosUsuario;
  }

  public get usuarioActual() {
    return this._usuarioActual;
  }

  public set usuarioActual(value) {
    this._usuarioActual = value;
  }

  retornarUsuario(){
    this._userToken = localStorage.getItem("auth-token");
    this._usuarioActual = localStorage.getItem("id");
    if(this._usuarioActual!=null){
      this.http.get<usuario>(`${this.bUA}/module/users/${this._usuarioActual}`)
        .subscribe((resp:any) => {
          if(resp['mensaje'][0]['CODIGO']==1){
            localStorage.setItem('id', JSON.stringify(resp['usuario'][0]['ID_USUARIO']));
            this.datosUsuario = resp['usuario'][0];
          }else{
            console.log("falso no retorno");
          }
        });
    }
  }

  obtenerUsuario(): Observable<any>{
    this._userToken = localStorage.getItem("auth-token");
    this._usuarioActual = localStorage.getItem("id");
    //console.log('id', this._usuarioActual);
    return this.http.get<usuario>(`${this.bUA}/module/users/${this._usuarioActual}`);
  }

  /* editarUsuario( usuario:usuario){
    console.log(this.datosUsuario);

    this.http.put<usuario>(`${this.bUA}/usuarios/${this.usuarioActual}`, usuario)
          .subscribe((resp:usuario) => {
            console.log(resp);
    });
  } */

  guardarNuevoUsuario(usuario:usuario): Observable<any> {
    return this.http.post<usuario>(`${this.bUA}/api/auth/signup`, usuario);
  }

  verifLogin(data:any): Observable<any> {
    return this.http.post<any>(`${this.bUA}/api/auth/signin`, data);
  }

  cerrarSesion(){
    this._usuarioActual='';
    localStorage.removeItem('auth-token');
    localStorage.removeItem('id');
  }

  verificacionCorreo(correo: string): boolean{
    const regexi = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(regexi.test(correo)){
      return false;
    }
    return true;
  }

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
