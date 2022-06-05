import { Location } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { MantenimientoService } from 'src/app/services/mantenimiento.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-recovery-password',
  templateUrl: './recovery-password.component.html',
  styleUrls: ['./recovery-password.component.css', '../../../forms_styles.css']
})
export class RecoveryPasswordComponent implements OnInit {
  @Output() login = new EventEmitter<any>();
  public segundaContrasena: string = '';
  public primeraContrasena: string = '';
  public validacionContrasena:Boolean = false;
  msj=''
  reg=false

  constructor( private MD:MantenimientoService, private location:Location, private router:Router) { }

  ngOnInit(): void {
  }

  actualizarContUser(){
    this.validarContrasena();
    if(!this.validacionContrasena && this.reg){
      var js ={
        "CONTRASENA": this.primeraContrasena
      }
      const ruta = this.location.path();
      const ArrRuta = ruta.split('/');
      this.MD.recoveryPassword(ArrRuta[2], js).subscribe((resp) => {
        console.log(resp);
        if(resp[0]['CODIGO']==1){
          Swal.fire({
            title: `Bien hecho...`,
            text:  `Contraseña actualizada exitosamente`,
            confirmButtonText: 'OK',
          });
          this.login.emit('help')
          this.router.navigate([`/information-v2`]);
        }else{
          Swal.fire({
            title: `Algo salio mal...`,
            text:  `La contraseña no pudo actualizarse`,
            confirmButtonText: 'OK',
          });
          this.login.emit('help')
          this.router.navigate([`/information-v2`]);
        }
      });
    }else{
      var jso ={
        "contrasenaNueva": this.primeraContrasena,
        "contrasenaRepetir": this.segundaContrasena
      }
    }
  }

  validarContrasena(){
    this.reg = false
    const regexi = /^(?=.*\d)(?=.*[\u0021-\u002b\u003c-\u0040])(?=.*[A-Z])(?=.*[a-z])\S{8,16}$/;
    if(regexi.test(this.primeraContrasena)){
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

}
