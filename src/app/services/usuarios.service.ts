import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  public _usuarioActual = '';

  constructor() { }

  public get usuarioActual() {
    return this._usuarioActual;
  }

  public set usuarioActual(value) {
    this._usuarioActual = value;
  }

  cerrarSesion(){
    this.usuarioActual='';
  }
}
