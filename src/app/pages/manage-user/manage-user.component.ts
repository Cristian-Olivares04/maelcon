import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { usuario } from 'src/app/interfaces/user.interface';
import { MantenimientoService } from 'src/app/services/mantenimiento.service';
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
  _usAct = this.US._usuarioActual;
  msjCheck:any;
  msj='';
  enam=false;

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
    ESTADO: 0,
    MODIFICADO_POR: 0
  };

  json = {
    "PREGUNTA": '',
    "RESPUESTA": ''
  }

  datosTemp:any;

  constructor(private US:UsuariosService,private MS:MantenimientoService, private datepipe:DatePipe, private _Router:Router) {
  }

  ngOnInit(): void {
    this.US.retornarUsuario(this._usAct).subscribe((resp) => {
      //console.log('resp',resp);
      if(resp["mensaje"][0]["CODIGO"] == 1){
        this.datosUsuario = resp["usuario"][0];
        this.datosTemp=resp["usuario"][0];
      }else{
        console.log("usuario no encontrado");
      }
    });
  }

  optionAct(value:boolean){
    this.action = value;
    console.log(this.datosUsuario);
  }

  actUsuario(){
    console.log("En actualizar", this.datosUsuario);
    this.datosUsuario.MODIFICADO_POR=this._usAct;

    if(this.json.RESPUESTA == "" || this.json.PREGUNTA==""){
      this.MS.editarUsuario(this.datosUsuario, this.datosUsuario.ID_USUARIO).subscribe((resp) => {
        console.log('resp EDITAR',resp);
        if(resp[0][0]['CODIGO'] == 1){
          Swal.fire({
            title: `Bien hecho...`,
            text:  `Usuario actualizado exitosamente.`,
            confirmButtonText: 'OK',
          })
          this.US.obtenerUsuarios();
        }else{
          //console.log('no',resp);
          Swal.fire({
            title: `Ooops algo salio mal...`,
            text:  `${resp[0][0]['MENSAJE']}`,
            confirmButtonText: 'OK',
          })
        }
      });
    }else{
      this.datosUsuario.RESPUESTA=this.json.RESPUESTA
      this.datosUsuario.PREGUNTA=this.json.PREGUNTA
      this.MS.editarUsuario(this.datosUsuario, this.datosUsuario.ID_USUARIO).subscribe((resp) => {
        console.log('resp EDITAR',resp);
        if(resp[0][0]['CODIGO'] == 1){
          Swal.fire({
            title: `Bien hecho...`,
            text:  `Usuario actualizado exitosamente.`,
            confirmButtonText: 'OK',
          })
        }else{
          //console.log('no',resp);
          Swal.fire({
            title: `Ooops algo salio mal...`,
            text:  `${resp[0][0]['MENSAJE']}`,
            confirmButtonText: 'OK',
          })
        }
      });
    }
  }

  evaluarDatos() {
    let nP=false;
    let aP=false;
    let tF=false;
    let pP=false;
    let rP=false;
    if (this.verificacionDatos('nombre')) {
      nP=true;
      this.msj='Nombre incorrecto, necesita al menos la inical mayuscula y 2 letras mas por cada nombre'
    }
    if (this.verificacionDatos('apellido')) {
      aP=true;
      this.msj='Apellido incorrecto, necesita al menos la inical mayuscula y 2 letras mas por cada apellido'
    }
    if (this.verificacionDatos('telefono')) {
      tF=true
      this.msj='Telefono necesita 8 DIGITOS sin guiones'
    }
    if (this.verificacionDatos('pregunta')) {
      pP=true
      this.msj='Pregunta debe contener al menos 2 letras y/o digitos por cada espacio ingresado puede o no llevar los signos de interrogacion'
    }
    if (this.verificacionDatos('respuesta')) {
      rP=true
      this.msj='Respuesta debe contener al menos 2 letras y/o digitos por cada espacio ingresado'
    }
    if(!nP && !aP && !tF && !rP && !pP){
      this.actUsuario();
      this.enam=false
    }else{
      this.enam=true;
    }
  }

  verificacionDatos(opcion:any){
    let validation=false;
    if(opcion=='telefono'){
      const regexi = /^([0-9]){8}$/;
      if(regexi.test(this.datosUsuario.TELEFONO)){
        validation=false;
      }else{
        validation=true;
      }
    }else if(opcion=='nombre'){
      const regex = /^([A-ZÁÉÍÓÚ]{1}[a-zA-ZñÑáéíóúÁÉÍÓÚ]{2,}[\s]{0,1})+$/;
      if(regex.test(this.datosUsuario.NOMBRE_PERSONA)){
        validation=false;
      }else{
        validation=true;
      }
    }else if(opcion=='apellido'){
      const regex = /^([A-ZÁÉÍÓÚ]{1}[a-zA-ZñÑáéíóúÁÉÍÓÚ]{2,}[\s]{0,1})+$/;
      if(regex.test(this.datosUsuario.APELLIDO_PERSONA)){
        validation=false;
      }else{
        validation=true;
      }
    }else if(opcion=='pregunta'){
      const regex = /^([¿]{0,1}[a-zA-ZñÑáéíóúÁÉÍÓÚ]{2,}[\s]{0,1}[?]{0,1})+$/;
      if(this.json.PREGUNTA==""){
          validation=false;
      }else{
        if(regex.test(this.json.PREGUNTA)){
          validation=false;
        }else{
          validation=true;
        }
      }
    }else if(opcion=='respuesta'){
      const regex = /^([a-zA-ZñÑáéíóúÁÉÍÓÚ0-9]{2,}[\s]{0,1})+$/;
      if(this.json.RESPUESTA==""){
        validation=false;
      }else{
        if(regex.test(this.json.RESPUESTA)){
          validation=false;
        }else{
          validation=true;
        }
      }
    }
    return validation
  }

  cancel(){
    this.datosUsuario=this.datosTemp
    this.enam=false
    this.msj=''
  }
}
