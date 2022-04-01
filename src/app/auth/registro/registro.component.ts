import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { UsuariosService } from '../../services/usuarios.service';
import { usuario } from 'src/app/interfaces/usuario.interface';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {
  @Output() onUsuarioRegistrado = new EventEmitter();

  @Input() usuarioRegistro: usuario = {
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
    CREADO_POR: 1,
    ESTADO: 0
  };

  public validacionCorreo: boolean = false;
  public validacionContrasena: boolean = false;
  public segundaContrasena: string = '';
  public status:boolean = false;

  constructor (private UsuariosService:UsuariosService, private _Router: Router){}

  guardarUsuario(){
    this.validacionCorreo = this.UsuariosService.verificacionCorreo(this.usuarioRegistro.CORREO_ELECTRONICO);
    this.validarContrasena();
    this.validadCampos();
    if(!this.validacionCorreo && !this.validacionContrasena && !this.status){
      console.log("Usuario", this.usuarioRegistro)
      this.UsuariosService.guardarNuevoUsuario(this.usuarioRegistro).subscribe((resp) => {
        if(resp['codigo']==1){
          console.log(resp);
          this._Router.navigate(['login']);
        }else{
            console.log(resp);
        }
      });
    }
  }

  validarContrasena(){
    if(this.usuarioRegistro.CONTRASENA != this.segundaContrasena){
      this.validacionContrasena = true;
    }
    else{
      this.validacionContrasena = false;
    }
  }

  validadCampos(){
    if(this.usuarioRegistro.NOMBRE =='' || this.usuarioRegistro.APELLIDO =='' || this.usuarioRegistro.CONTRASENA =='' || this.usuarioRegistro.RTN=='' || this.usuarioRegistro.USUARIO==''
        || this.usuarioRegistro.PREGUNTA == '' || this.usuarioRegistro.RESPUESTA =='' || this.usuarioRegistro.GENERO==''){
      this.status = true;
    }
    else{
      this.status = false;
    }
  }

}
