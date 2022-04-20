import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { usuario } from 'src/app/interfaces/user.interface';
import { MantenimientoService } from 'src/app/services/mantenimiento.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.css', '../../../forms_styles.css']
})
export class UpdatePasswordComponent implements OnInit {
  usuarios:usuario[]=this.US._usuarios;
  public segundaContrasena: string = '';
  public primeraContrasena: string = '';
  public idUsuario=1;
  public password: string = '';
  public validacionContrasena:Boolean = false;
  public validacionId:Boolean = false;
  public actionVal = this.MS.actionVal;
  _usActual=this.US._usuarioActual

  constructor(private US:UsuariosService, private MS:MantenimientoService, private _Router:Router) { }

  ngOnInit(): void {
  }

  validarContrasena(){
    if(this.primeraContrasena != this.segundaContrasena){
      this.validacionContrasena = true;
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

  actualizarContUser(){
    this.validarContrasena();
    if(!this.validacionContrasena && this.idUsuario!=0){
      var js ={
        "MODIFICADO_POR": this._usActual,
        "CONTRASENA": this.primeraContrasena
      }
      console.log('datos',js);
      this.US.actualizarContrasenaUsuario(js, this.idUsuario).subscribe((resp) => {
        //console.log('resp objetos',resp['Objetos']);
        if(resp[0]['CODIGO']==1){
          Swal.fire({
            title: `Bien hecho...`,
            text:  `Contraseña actualizada exitosamente`,
            confirmButtonText: 'OK',
          }).then((result) => {
            if (result.isConfirmed) {
              this._Router.navigate(['/administration']);
            } else {
              this._Router.navigate(['/administration']);
              console.log(`modal was dismissed by ${result.dismiss}`);
            }
          })
        }else{
          Swal.fire({
            title: `Algo salio mal...`,
            text:  `La contraseña no pudo actualizarse`,
            confirmButtonText: 'OK',
          }).then((result) => {
            if (result.isConfirmed) {
              this._Router.navigate(['/administration']);
            } else {
              this._Router.navigate(['/administration']);
              console.log(`modal was dismissed by ${result.dismiss}`);
            }
          })
          console.log('no',resp);
        }
      });
    }else{
      var jso ={
        "ID": this.idUsuario,
        "contrasenaNueva": this.primeraContrasena,
        "contrasenaRepetir": this.segundaContrasena
      }
      this.validacionId=true;
      console.log('datos erroneos', jso)
    }
  }
}
