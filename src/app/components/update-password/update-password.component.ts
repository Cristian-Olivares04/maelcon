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
  msj=''
  reg=false
  _permisos:any;

  constructor(private US:UsuariosService, private MS:MantenimientoService, private _Router:Router) {
     this._permisos=this.US._permisos[4];
  }

  ngOnInit(): void {
  }

  validarContrasena(){
    this.validacionContrasena = false;
    this.reg=false
    const regexi = /^(?=.*\d)(?=.*[\u0021-\u002b\u003c-\u0040])(?=.*[A-Z])(?=.*[a-z])\S{8,16}$/;
    if(regexi.test(this.primeraContrasena)){
      console.log(regexi.test(this.primeraContrasena))
      this.reg = true;
      if(this.primeraContrasena != this.segundaContrasena){
        this.msj='Las contraseñas no coinciden'
        this.validacionContrasena = true;
        this.primeraContrasena=''
        this.segundaContrasena=''
      }
    }else{
      console.log('regEvalu: ',regexi.test(this.primeraContrasena))
      this.msj=`Contraseña Invalida la contraseña mínimo debe tener ocho caracteres,
      al menos una letra mayúscula, una letra minúscula, un número y un carácter especial
      por ejemplo c0ntr@seNa`
      this.validacionContrasena = true;
      this.primeraContrasena=''
      this.segundaContrasena=''
    }
  }

  actualizarContUser(){
    this.validarContrasena();
    if(!this.validacionContrasena && this.idUsuario!=0 && this.reg){
      var js ={
        "MODIFICADO_POR": this._usActual,
        "CONTRASENA": this.primeraContrasena
      }
      console.log('datos',js);
      this.US.actualizarContrasenaUsuario(js, this.idUsuario).subscribe((resp) => {
        console.log('resp act',resp);
        if(resp['mensaje'][0]['CODIGO']==1){
          Swal.fire({
            title: `Bien hecho...`,
            text:  `Contraseña actualizada exitosamente`,
            confirmButtonText: 'OK',
          })
          this.idUsuario=1;
          this.primeraContrasena=''
          this.segundaContrasena=''
        }else{
          Swal.fire({
            title: `Algo salio mal...`,
            text:  `La contraseña no pudo actualizarse`,
            confirmButtonText: 'OK',
          })
          this.idUsuario=1;
          this.primeraContrasena=''
          this.segundaContrasena=''
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
      this.idUsuario=1
      this.primeraContrasena=''
      this.segundaContrasena=''
      console.log('datos erroneos', jso)
    }
  }
}
