import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { usuario } from 'src/app/interfaces/user.interface';
import { UsuariosService } from 'src/app/services/usuarios.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage-user',
  templateUrl: './manage-user.component.html',
  styleUrls: ['./manage-user.component.css','../../../forms_styles.css']
})
export class ManageUserComponent implements OnInit {
  action=true;
  fechaAct = this.datepipe.transform((new Date), 'yyyy-MM-dd');
  _usAct = this.US._usuarioActual2;
  msjCheck:any;

  @Input() datosUsuario:usuario = {
    ID_USUARIO: '',
    ID_PUESTO: 0,
    ID_ROL: 0,
    USUARIO: '',
    CONTRASENA: '',
    NOMBRE_PERSONA: '',
    APELLIDO_PERSONA: '',
    CORREO_ELECTRONICO: '',
    TELEFONO: '',
    RTN: '',
    SUELDO: 0,
    IMG_USUARIO: '',
    PREGUNTA: '',
    RESPUESTA: '',
    GENERO: '',
    FECHA_VENCIMIENTO: '',
    CREADO_POR: 0,
    ESTADO: 0
  };

  constructor(private US:UsuariosService, private datepipe:DatePipe, private _Router:Router) { 
    this.US._usuarioActual2;
  }

  ngOnInit(): void {
    this.US.retornarUsuario(this._usAct).subscribe((resp) => {
      console.log('resp',resp);
      if(resp["mensaje"][0]["CODIGO"] == 1){
        this.datosUsuario = resp["usuario"][0];
      }else{
        console.log("usuario no encontrado");
      }
    });
  }

  optionAct(value:boolean){
    this.action = value;
    console.log(this.datosUsuario);
  }

  actualizarUsuario(){
    var actUser = {
      NOMBRE_PERSONA: this.datosUsuario.NOMBRE_PERSONA,
      APELLIDO_PERSONA: this.datosUsuario.APELLIDO_PERSONA,
      ID_PUESTO: this.datosUsuario.ID_PUESTO,
      TELEFONO: this.datosUsuario.TELEFONO.toString(),
      SUELDO: this.datosUsuario.SUELDO,
      ID_ROL: this.datosUsuario.ID_ROL,
      IMG_USUARIO: this.datosUsuario.IMG_USUARIO,
      MODIFICADO_POR: this._usAct
    };

    var js = {
      "PREGUNTA": this.datosUsuario.PREGUNTA,
      "RESPUESTA": this.datosUsuario.RESPUESTA,
      "MODIFICADO_POR": this.US._usuarioActual
    }
    this.US.editarUsuarioLogin(actUser, this.US._usuarioActual).subscribe((resp) => {
      console.log('resp',resp);
      if(resp["mensaje"][0]["CODIGO"] == 1){
        if(this.datosUsuario.RESPUESTA == "" || this.datosUsuario.PREGUNTA==""){
          Swal.fire({
            title: `Bien hecho...`,
            text:  `Usuario actualizado exitosamente.`,
            confirmButtonText: 'OK',
          }).then((result) => {
            if (result.isConfirmed) {
              localStorage.setItem('ruta', 'manage-user');
              this._Router.navigate(['/manage-usuer']);
            } else {
              console.log(`modal was dismissed by ${result.dismiss}`);
              //localStorage.setItem('ruta', 'manage-user');
              //this._Router.navigate(['/manage-usuer']);
            }
          })
        }else{
          this.US.actualizarPreguntaUsuario(js, this.US._usuarioActual).subscribe((res) => {
            //console.log('res',res);
            if(resp["mensaje"][0]["CODIGO"] == 1){
              Swal.fire({
                title: `Bien hecho...`,
                text:  `Usuario actualizado exitosamente.`,
                confirmButtonText: 'OK',
              }).then((result) => {
                if (result.isConfirmed) {
                  localStorage.setItem('ruta', 'manage-user');
                  this._Router.navigate(['/manage-usuer']);
                } else {
                  console.log(`modal was dismissed by ${result.dismiss}`);
                  //localStorage.setItem('ruta', 'manage-user');
                  //this._Router.navigate(['/manage-usuer']);
                }
              })
            }else{
              //console.log('no',res);
              this.msjCheck=`No se pudo actualizar el la pregunta usuario y respuesta`
            }
          });
        }
      }else{
        //console.log('no',resp);
        this.msjCheck=`No se pudo actualizar el usuario`
      }
    });
  }

}
