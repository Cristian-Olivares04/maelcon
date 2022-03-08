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
  public nombreUsuario = '';

  public datosUsuario: usuario ={
    _id: '',
    nombreUsuario: '',
    contrasena: '',
    nombre: '',
    apellido: '',
    correo: '',
    telefono: '',
    fechaNacimiento: '',
    fotoPerfil: '',
    preguntaSeguridad: '',
    respuestaSeguridad: '',
    imagen: '',
    estado: 0
  };

  constructor( private http:HttpClient){
    this._usuarioActual = localStorage.getItem("id");
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

    this.http.get<usuario>(`${this.bUA}/usuarios/${this._usuarioActual}`)
          .subscribe((resp:any) => {
            if(resp['codigo']==1){
              console.log(resp);
              localStorage.setItem('datosUsuario', JSON.stringify(resp['usuario']));
              this.datosUsuario = resp['usuario'];
            }else{
              console.log("falso");

            }
          });
  }

  editarPersonaje( usuario:usuario){
    console.log(this.datosUsuario);

    this.http.put<usuario>(`${this.bUA}/usuarios/${this.usuarioActual}`, usuario)
          .subscribe((resp:usuario) => {
            console.log(resp);
    });
  }

  guardarNuevoUsuario(usuario:usuario): Observable<any> {
    return this.http.post<usuario>(`${this.bUA}/usuarios/`, usuario);
  }

  verifLogin(data:any): Observable<any> {
    return this.http.post<any>(`${this.bUA}/login/`, data);
  }

  cerrarSesion(){
    this.usuarioActual='';
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
    .set('x-access-token', localStorage.getItem('token') || '');

    return this.http.get<AuthResponse>( url, {headers} )
      .pipe(
        map(resp => {
          if(resp.session_code){
            localStorage.setItem('token', resp.session_code!);
          }
          return true
        }),
        catchError(err => of(false))
      )
  }
}
