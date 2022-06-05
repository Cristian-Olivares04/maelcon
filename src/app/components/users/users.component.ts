import { Component, Input, OnInit, PipeTransform } from '@angular/core';
import { DatePipe, DecimalPipe } from '@angular/common';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { usuario } from 'src/app/interfaces/user.interface';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { MantenimientoService } from 'src/app/services/mantenimiento.service';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Permission, Puesto, Role } from 'src/app/interfaces/objects.interface';
import Swal from 'sweetalert2';

function search(USUARIOS: any, text: string, pipe: PipeTransform): usuario[] {
  //console.log('Usuarios',USUARIOS);
  return USUARIOS.filter(user => {
    const term = text.toLowerCase();
    return user.USUARIO.toLowerCase().includes(term)
        || user.CORREO_ELECTRONICO.toLowerCase().includes(term)
        || pipe.transform(user.SUELDO).includes(term)
        || pipe.transform(user.ID_ROL).includes(term)
        || pipe.transform(user.ID_PUESTO).includes(term)
        || pipe.transform(user.ESTADO).includes(term);
  });
}

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  providers: [DecimalPipe]
})
export class UsersComponent implements OnInit {
  _usAct="";
  usuarios: usuario[] = this.US._usuarios;
  msjCheck='';
  modal=false;
  activo:boolean = true;
  usuariosInter: Observable<usuario[]>;
  filter = new FormControl('');
  usAdmon=0
  act='act'
  enam=false;
  msj='';
  _tiempoUsuario=this.MS._params[4].VALOR;
  _roles:Role[]=[];
  _puestos:Puesto[]=this.MS._puestos;
  _generos = [{'VALOR':'Masculino'}, {'VALOR':'Femenino'}];
  _permisos:any;

  datosUsuario:usuario={
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
  }

  json = {
    "PREGUNTA": '',
    "RESPUESTA": ''
  }

  datosTemp:any;

  /* {
    "MENSAJE": "Permisos retornados.",
    "CODIGO": 1,
    "ID_OBJETO": 1,
    "ID_ROL": 1,
    "PERMISO_INSERCION": 1,
    "PERMISO_ELIMINACION": 1,
    "PERMISO_ACTUALIZACION": 1,
    "PERMISO_CONSULTAR": 1
  } */

  constructor(private US:UsuariosService, private MS:MantenimientoService, private modalService:NgbModal, private pipe: DecimalPipe) {
    //this.US.obtenerUsuarios();
    this.usuariosInter = this.filter.valueChanges.pipe(
      startWith(''),
      map(text => search(this.usuarios,text, this.pipe))
    );
    for (let i = 0; i < this.US._permisos.length; i++) {
      if(this.US._permisos[i].ID_OBJETO==6){
        this._permisos=this.US._permisos[i];
      }
    }
    this.MS.obtenerRoles();
    this.MS.obtenerPuestos();
    this._puestos=this.MS._puestos;
    this._roles=this.MS._roles;
  }

  ngOnInit(): void {
    this.usuarios = this.US._usuarios;
    this.usuariosInter = this.filter.valueChanges.pipe(
      startWith(''),
      map(text => search(this.usuarios,text, this.pipe))
    );
  }

  activarUser(estado:any , id:any){
    var num = 0;
    if(estado){
      num=1;
    }
    for (let i = 0; i < this.usuarios.length; i++) {
      if( this.usuarios[i].ID_USUARIO == id){
        this.usuarios[i].ESTADO = num
      }
    }
    var js = {
      "ESTADO":num,
      "MODIFICADO_POR":this.US._usuarioActual
    }
    this.MS.actualizarEstadoUsuario(js,id).subscribe((res) => {
      console.log('res estado',res);
      /*if(res["mensaje"][0]['CODIGO']==1){
        console.log('Estado Actualizado')
      }else{
        //console.log('no',res);
      }*/
    });
  }

  openModl(content:Object, id:any){
    console.log("escogio el usuario: ", id);
    this.US._usuarioActual2=id;
    for(let us of this.usuarios){
      if(us.ID_USUARIO==id){
        this.datosUsuario=us;
        this.datosTemp=us;
      }
    }
    this.modalService.open(content, {backdropClass: 'light-red-backdrop', size: 'lg', centered: true });
  }

  cerrarModal(){
    this.modal=false;
  }

  openModalAdd(content:Object) {
    var fech=this.setFecha(parseInt(this._tiempoUsuario))
    this.datosUsuario={
      ID_USUARIO: '',
      ID_PUESTO: 1,
      ID_ROL: 1,
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
      GENERO: 'Masculino',
      FECHA_VENCIMIENTO: fech,
      CREADO_POR: this.US._usuarioActual,
      ESTADO: 0,
      MODIFICADO_POR: 0
    }
    this.modalService.open(content, {backdropClass: 'light-red-backdrop', size: 'lg', centered: true });
  }

  crearUsuario(){
    console.log("En crear", this.datosUsuario);

    this.US.crearNuevoUsuario(this.datosUsuario).subscribe((resp) => {
      console.log('resp crear',resp);
      if(resp[0]["CODIGO"] == 1){
        this.US.obtenerUsers().subscribe((res) => {
          //console.log('res objetos',res['Objetos']);
          if(res['mensaje'][0]['CODIGO']==1){
            this.usuarios = res['usuario'];
            this.usuariosInter = this.filter.valueChanges.pipe(
              startWith(''),
              map(text => search(this.usuarios,text, this.pipe))
            );
            Swal.fire({
              title: `Bien hecho...`,
              text:  `Usuario creado exitosamente.`,
              confirmButtonText: 'OK',
            })
            this.modalService.dismissAll()
          }else{
            console.log('no',res);
          }
        });
      }else{
        //console.log('no',res);
        Swal.fire({
          title: `Oops algo salio mal...`,
          text:  `${resp[0]['MENSAJE']}`,
          confirmButtonText: 'OK',
        })
      }
    });
  }

  actualizarUsuario(){
    console.log("En actualizar", this.datosUsuario);
    this.datosUsuario.MODIFICADO_POR=this.US._usuarioActual
    if(this.json.RESPUESTA=="" || this.json.PREGUNTA==""){
      this.MS.editarUsuario(this.datosUsuario, this.datosUsuario.ID_USUARIO).subscribe((resp) => {
        console.log('resp EDITAR',resp);
        if(resp[0][0]['CODIGO'] == 1){
          Swal.fire({
            title: `Bien hecho...`,
            text:  `Usuario actualizado exitosamente.`,
            confirmButtonText: 'OK',
          })
          this.modalService.dismissAll()
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
          this.modalService.dismissAll()
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

  setFecha(days:number){
    var fecha=new Date();
    var day=fecha.getDate();
    var month=fecha.getMonth()+1;
    var year=fecha.getFullYear();
    var tiempo=fecha.getTime();
    var milisegundos=(days*24*3600000);
    console.log(milisegundos)
    fecha.setTime(tiempo+milisegundos);
    day=fecha.getDate();
    month=fecha.getMonth()+1;
    year=fecha.getFullYear();
    return year+"/"+month+"/"+day;
  }

  evaluarDatos(opcion:any) {
    let rtn=false;
    let nP=false;
    let aP=false;
    let uP=false;
    let tF=false;
    let nF=false;
    let cP=false;
    let pP=false;
    let rP=false;
    let PR = false
    if (this.verificacionDatos('rtn')) {
      rtn=true;
      this.msj='RTN necesita 14 DIGITOS sin guiones'
    }
    if (this.verificacionDatos('nombre')) {
      nP=true;
      this.msj='Nombre incorrecto, necesita al menos la inical mayuscula y 2 letras mas por cada nombre'
    }
    if (this.verificacionDatos('apellido')) {
      aP=true;
      this.msj='Apellido incorrecto, necesita al menos la inical mayuscula y 2 letras mas por cada apellido'
    }
    if (this.verificacionDatos('usuario')) {
      uP=true;
      this.msj='Nombre de usuario incorrecto, necesita al menos 3 caracteres MAYUSCULAS y puede contener al final DIGITOS'
    }
    if (this.verificacionDatos('telefono')) {
      tF=true
      this.msj='Telefono necesita 8 DIGITOS sin guiones'
    }
    if (this.verificacionDatos('numero')) {
      nF=true
      this.msj='Sueldo solo pueden ser DIGITOS o contener un punto flotante'
    }
    if (this.verificacionDatos('pregunta')) {
      pP=true
      this.msj='Pregunta debe contener al menos 2 letras y/o digitos por cada espacio ingresado puede o no llevar los signos de interrogacion'
    }
    if (this.verificacionDatos('respuesta')) {
      rP=true
      this.msj='Respuesta debe contener al menos 2 letras y/o digitos por cada espacio ingresado'
    }
    if (this.verificacionCorreo()) {
      cP=true
      this.msj='Correo invalido'
    }
    if(!rtn && !nP && !aP && !uP && !nF && !tF && !cP && !rP && !pP){
      let cR=false
      let nR=false
      let mR=false
      for (let i = 0; i < this.usuarios.length; i++) {
        const element = this.usuarios[i];
        if(element.ID_USUARIO != this.datosUsuario.ID_USUARIO){
          if(element.RTN == this.datosUsuario.RTN){
            cR=true;
          }
          if(element.USUARIO.toLocaleLowerCase() == this.datosUsuario.USUARIO.toLocaleLowerCase()){
            nR=true
          }
          if(element.CORREO_ELECTRONICO == this.datosUsuario.CORREO_ELECTRONICO){
            mR=true
          }
        }
      }
      if(cR || nR || mR){
        PR=true
      }
      if(!PR){
        if(opcion=='add'){
          this.crearUsuario();
        }else{
          this.actualizarUsuario();
        }
        this.enam=false
      }else{
        this.enam=true
        this.msj='Ya existe un usuario con datos similares, puede actualizar sus datos desde otra interfaz'
      }
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
    }else if(opcion=='rtn'){
      const regexi = /^([0-9]){14}$/;
      if(regexi.test(this.datosUsuario.RTN.toString())){
        validation=false;
      }else{
        validation=true;
      }
    }else if(opcion=='numero'){
      const regexi = /^\d+(\.\d{1,2})?$/;
      if(regexi.test(this.datosUsuario.SUELDO.toString())){
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
    }else if(opcion=='usuario'){
      const regex = /^([A-Z]{3,}[0-9]{0,})+$/;
      if(regex.test(this.datosUsuario.USUARIO)){
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

  verificacionCorreo(){
    const regexi = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(regexi.test(this.datosUsuario.CORREO_ELECTRONICO)){
      return false;
    }else{
      return true;
    }
  }

  cerrar(){
    this.enam=false
    this.msj=''
    this.datosUsuario={
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
    }
  }

  cancel(){
    this.datosUsuario=this.datosTemp
    this.enam=false
    this.msj=''
  }
}
