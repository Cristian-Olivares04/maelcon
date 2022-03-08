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

  public validacionCorreo: boolean = false;
  public validacionContrasena: boolean = false;
  public segundaContrasena: string = '';
  public status:boolean = false;

  constructor (private UsuariosService:UsuariosService, private _Router: Router){}

  guardarUsuario(){
    this.validacionCorreo = this.UsuariosService.verificacionCorreo(this.usuarioRegistro.correo);
    this.validarContrasena();
    this.validadCampos();
    if(!this.validacionCorreo && !this.validacionContrasena && !this.status){
      this.UsuariosService.guardarNuevoUsuario(this.usuarioRegistro).subscribe((resp) => {
        if(resp['codigo']==1){
          this.UsuariosService.usuarioActual = resp['usuario']['_id'];
          this.UsuariosService.retornarUsuario();
          this._Router.navigate(['']);
        }else{
            console.log(resp);
        }
      });
    }
  }

  validarContrasena(){
    if(this.usuarioRegistro.contrasena != this.segundaContrasena){
      this.validacionContrasena = true;
    }
    else{
      this.validacionContrasena = false;
    }
  }

  validadCampos(){
    if(this.usuarioRegistro.nombre =='' || this.usuarioRegistro.apellido=='' || this.usuarioRegistro.contrasena=='' || this.usuarioRegistro.fechaNacimiento=='' || this.usuarioRegistro.nombreUsuario==''
        || this.usuarioRegistro.preguntaSeguridad == '' || this.usuarioRegistro.respuestaSeguridad==''){
      this.status = true;
    }
    else{
      this.status = false;
    }
  }

}
