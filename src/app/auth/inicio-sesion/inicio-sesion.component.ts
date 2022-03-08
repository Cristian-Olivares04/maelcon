import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuariosService } from '../../services/usuarios.service';

@Component({
  selector: 'app-inicio-sesion',
  templateUrl: './inicio-sesion.component.html',
  styleUrls: ['./inicio-sesion.component.css']
})
export class InicioSesionComponent {

  @Input() usuarioLogin= {
    correo: '',
    contrasena: '',
    preguntaSeguridad: '',
    respuestaSeguridad: ''
  };
  public status: boolean = false;
  public validacionCorreo: boolean = false;

  constructor(private UsuariosService:UsuariosService, private _Router: Router) { }

  iniciarSesion(){
    this.validacionCorreo = this.UsuariosService.verificacionCorreo(this.usuarioLogin.correo);
    this.UsuariosService.verifLogin(this.usuarioLogin).subscribe((resp) => {
      if(resp['codigo']==1){
          localStorage.setItem('id', resp['usuario']);
          this.UsuariosService._usuarioActual = localStorage.getItem('id');
          this.UsuariosService.retornarUsuario();
          console.log(resp);
          this.status = false;
          window.location.reload();
        }else{
          console.log(resp);
          this.status = true;
      }
    });
  }

}
