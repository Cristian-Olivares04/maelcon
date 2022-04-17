import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { catchError } from 'rxjs';
import { UsuariosService } from '../../services/usuarios.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  @Input() usuarioLogin= {
    CORREO_ELECTRONICO: '',
    CONTRASENA: ''
  };

  @Input() usuarioLoginAns= {
    correo: '',
    preguntaSeguridad: '',
    respuestaSeguridad: ''
  };
  public status: boolean = false;
  public validacionCorreo: boolean = false;

  constructor(private UsuariosService:UsuariosService, private _Router: Router) { }

  iniciarSesion(){
    //console.log(this.usuarioLogin)
    this.validacionCorreo = this.UsuariosService.verificacionCorreo(this.usuarioLogin.CORREO_ELECTRONICO);
    if(!this.validacionCorreo){
        this.UsuariosService.verifLogin(this.usuarioLogin).subscribe((resp) => {
          console.log('resp',resp);
          if(resp['token']!=null){
            localStorage.setItem('auth-token', resp['token']);
            localStorage.setItem('id', resp['user'][0]['ID_USUARIO']);
            this.UsuariosService.retornarUsuario();
            //console.log('yes',resp);
            this.status = false;
            window.location.reload();
          }else{
            //console.log('no',resp);
            this.status = true;
          }
        }, error => {
          console.error('Ocurrió un error',error);
          this.status = true;
        });
    }
  }

}
