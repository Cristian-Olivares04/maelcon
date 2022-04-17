import { Component, OnInit } from '@angular/core';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.css', '../../../forms_styles.css']
})
export class UpdatePasswordComponent implements OnInit {

  public segundaContrasena: string = '';
  public primeraContrasena: string = '';
  public password: string = '';
  public validacionContrasena:Boolean = false;
  public activate = false;
  _usActual=this.US._usuarioActual

  constructor(private US:UsuariosService) { }

  ngOnInit(): void {
  }

  validarContrasena(){
    if(this.primeraContrasena != this.segundaContrasena){
      this.validacionContrasena = true;
      this.activate=false;
    }
  }

  actualizarContrasena(){
    this.validarContrasena();
    if(!this.validacionContrasena){
      var js ={
        "contrasenaActual": this.password,
        "contrasenaNueva": this.primeraContrasena,
        "ID_USUARIO": this._usActual
      }
      console.log('datos',js)
    }else{
      var jso ={
        "contrasenaActual": this.password,
        "contrasenaNueva": this.primeraContrasena,
        "contrasenaRepetir": this.segundaContrasena
      }
      console.log('datos erroneos', jso)
    }

  }
}
