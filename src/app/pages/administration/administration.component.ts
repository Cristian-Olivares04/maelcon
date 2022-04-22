import { Component, Input, OnInit, ɵclearResolutionOfComponentResourcesQueue } from '@angular/core';
import {NgbAccordionConfig} from '@ng-bootstrap/ng-bootstrap';
import { Bitacora, Comission, Object, Parameter, PayMethod, Role } from 'src/app/interfaces/objects.interface';
import { usuario } from 'src/app/interfaces/user.interface';
import { MantenimientoService } from 'src/app/services/mantenimiento.service';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-administration',
  templateUrl: './administration.component.html',
  styleUrls: ['./administration.component.css']
})
export class AdministrationComponent implements OnInit {
  disabled = false;
  refrescarUsers = true;
  _paysMethods:PayMethod[]=[];
  _users:usuario[]=[];
  _comissions:Comission[]=[];
  _bitacora:Bitacora[]=this.MS._bitacora;
  msjCheck='';

  @Input() usuarioInput= {
    CORREO_ELECTRONICO: '',
    idUser: 0,
    ESTADO: 0
  };

  @Input() datosRol:Role = {
    ROL: '',
    DESCRIPCION: '',
    CREADO_POR: 0,
    ID_ROL: 0,
    FECHA_CREACION: '',
    FECHA_MODIFICACION: '',
    MODIFICADO_POR: 0
  };

  @Input() datosObjeto:Object = {
    OBJETOS: '',
    TIPO_OBJETO: '',
    DESCRIPCION: '',
    CREADO_POR: 0,
    ID_OBJETO: 0
  }

  @Input() datosMetodoPago:PayMethod = {
    FORMA_PAGO: '',
    DESCRIPCION: ''
  }

  @Input() datosParametro:Parameter = {
    PARAMETRO: '',
    ID_USUARIO: 0,
    VALOR: '',
    ID_PARAMETRO: 0
  }

  objeto:Object = {
    OBJETOS: '',
    TIPO_OBJETO: '',
    DESCRIPCION: '',
    CREADO_POR: 0,
    ID_OBJETO: 0
  }

  rol:Role = {
    ROL: '',
    DESCRIPCION: '',
    CREADO_POR: 0,
    ID_ROL: 0,
    FECHA_CREACION: '',
    FECHA_MODIFICACION: '',
    MODIFICADO_POR: 0
  }

  metodoPago:PayMethod = {
    FORMA_PAGO: '',
    DESCRIPCION: ''
  }

  parametro:Parameter = {
    PARAMETRO: '',
    ID_USUARIO: 0,
    VALOR: '',
    ID_PARAMETRO: 0
  }

  bitacora:Bitacora = {
    ID_BITACORA: 0,
    ID_USUARIO: 0,
    ID_OBJETO: 0,
    ACCION: '',
    DESCRIPCION: '',
    INFORMACION_ANTERIOR: '',
    INFORMACION_ACTUAL: '',
    FECHA_BITACORA: ''
  }

  comission:Comission[]=[];

  constructor(private US:UsuariosService, private MS:MantenimientoService) {
  }

  ngOnInit(): void {
    this.MS.obtenerRegistrosBitacora();
    this._bitacora=this.MS._bitacora;
    localStorage.setItem('ruta', 'administration');
  }

  checkUser(){
    this.MS.chequearUsuario(this.usuarioInput.CORREO_ELECTRONICO).subscribe((resp) => {
      //console.log('resp',resp);
      if(resp['mensaje'][0]['CODIGO']==1){
        this.msjCheck=`${resp['mensaje'][0]['MENSAJE']}
        Informacion del usuario:
        ${resp['usuario'][0]}`
      }else{
        //console.log('no',resp);
        this.msjCheck=`${resp['mensaje'][0]['MENSAJE']}`
      }
    });
  }

  updateUserStatus(){
    var js = {
      "ESTADO": this.usuarioInput.ESTADO,
      "MODIFICADO_POR": this.US._usuarioActual
    }

    this.MS.actualizarEstadoUsuario(js, this.usuarioInput.idUser).subscribe((resp) => {
      //console.log('resp',resp);
      if(resp[0]['CODIGO']==1){
        this.msjCheck=`${resp[0]['MENSAJE']}
        El usuario con id ${this.usuarioInput.idUser} ahora puede iniciar sesion.`
      }else{
        //console.log('no',resp);
        this.msjCheck=`No se pudo actualizar el estado del usuario`
      }
    });
  }

  createObject(){
    this.MS.crearObjeto(this.datosObjeto).subscribe((resp) => {
      //console.log('resp',resp);
      if(resp[0]['CODIGO']==1){
        this.msjCheck=`${resp[0]['MENSAJE']}`
      }else{
        //console.log('no',resp);
        this.msjCheck=`No se pudo crear el objeto`
      }
    });
  }

  actualizarObjeto(id:any){
    this.MS.actualizarObjeto(this.datosObjeto, id).subscribe((resp) => {
      //console.log('resp',resp);
      if(resp[0]['CODIGO']==1){
        this.msjCheck=`${resp[0]['MENSAJE']}`
      }else{
        //console.log('no',resp);
        this.msjCheck=`No se pudo actualizar el objeto`
      }
    });
  }

  obtenerObjeto(id:any){
    this.MS.obtenerObjeto(id).subscribe((resp) => {
      //console.log('resp',resp);
      if(resp['mensaje'][0]['CODIGO']==1){
        this.objeto = resp['OBJETO'][0]
      }else{
        //console.log('no',resp);
        this.msjCheck=`No se encontro el objeto con id ${id}`
      }
    });
  }

  crearRol(){
    this.MS.crearRol(this.datosRol).subscribe((resp) => {
      //console.log('resp',resp);
      if(resp[0]['CODIGO']==1){
        this.msjCheck=`${resp[0]['MENSAJE']}`
      }else{
        //console.log('no',resp);
        this.msjCheck=`No se pudo crear el objeto`
      }
    });
  }

  actualizarRol(id:any){
    this.MS.actualizarRol(this.datosRol, id).subscribe((resp) => {
      //console.log('resp',resp);
      if(resp[0]['CODIGO']==1){
        this.msjCheck=`${resp[0]['MENSAJE']}`
      }else{
        //console.log('no',resp);
        this.msjCheck=`No se pudo actualizar el rol`
      }
    });
  }

  obtenerRol(id:any){
    this.MS.obtenerRol(id).subscribe((resp) => {
      //console.log('resp',resp);
      if(resp['mensaje'][0]['CODIGO']==1){
        this.rol = resp['rol'][0]
      }else{
        //console.log('no',resp);
        this.msjCheck=`No se encontro el rol con id ${id}`
      }
    });
  }

  crearMetodoPago(){
    this.MS.crearMetodoPago(this.datosMetodoPago).subscribe((resp) => {
      //console.log('resp',resp);
      if(resp[0]['CODIGO']==1){
        this.msjCheck=`${resp[0]['MENSAJE']}`
      }else{
        //console.log('no',resp);
        this.msjCheck=`No se pudo crear el metodo de pago`
      }
    });
  }

  actualizarMetodoPago(id:any){
    this.MS.actualizarMetodoPago(this.datosMetodoPago, id).subscribe((resp) => {
      //console.log('resp',resp);
      if(resp[0]['CODIGO']==1){
        this.msjCheck=`${resp[0]['MENSAJE']}`
      }else{
        //console.log('no',resp);
        this.msjCheck=`No se pudo actualizar el rol`
      }
    });
  }

  obtenerMetodosPago(){
    this.MS.obtenerMetodosPagos().subscribe((resp) => {
      //console.log('resp',resp);
      if(resp['mensaje'][0]['CODIGO']==1){
        this._paysMethods=resp['Objetos'];
      }else{
        //console.log('no',resp);
        this.msjCheck=`No se pudo obtener la lista de metodos de pagos`
      }
    });
  }

  obtenerMetodoPago(id:any){
    this.MS.obtenerMetodoPago(id).subscribe((resp) => {
      //console.log('resp',resp);
      if(resp['mensaje'][0]['CODIGO']==1){
        this.metodoPago = resp['OBJETO'][0]
      }else{
        //console.log('no',resp);
        this.msjCheck=`No se encontro el metodo de pago con id ${id}`
      }
    });
  }

  crearParametro(){
    this.MS.crearParametro(this.datosParametro).subscribe((resp) => {
      //console.log('resp',resp);
      if(resp[0]['CODIGO']==1){
        this.msjCheck=`${resp[0]['MENSAJE']}`
      }else{
        //console.log('no',resp);
        this.msjCheck=`No se pudo crear el metodo de pago`
      }
    });
  }

  obtenerParametro(id:any){
    this.MS.obtenerParametro(id).subscribe((resp) => {
      //console.log('resp',resp);
      if(resp['mensaje'][0]['CODIGO']==1){
        this.parametro = resp['parametro'][0]
      }else{
        //console.log('no',resp);
        this.msjCheck=`No se encontro el parametro con id ${id}`
      }
    });
  }

  obtenerBitacora(id:any){
    this.MS.obtenerRegistroBitacora(id).subscribe((resp) => {
      //console.log('resp',resp);
      if(resp['mensaje'][0]['CODIGO']==1){
        this.bitacora = resp['bitacora'][0]
      }else{
        //console.log('no',resp);
        this.msjCheck=`No se encontro el registro bitacora con id ${id}`
      }
    });
  }

  obtenerComisiones(){
    this.MS.obtenerComisiones().subscribe((resp) => {
      //console.log('resp',resp);
      if(resp['mensaje'][0]['CODIGO']==1){
        this._comissions=resp['COMISION'];
      }else{
        //console.log('no',resp);
        this.msjCheck=`No se pudo obtener la lista de comisiones`
      }
    });
  }

  obtenerComision(id:any){
    this.MS.obtenerComision(id).subscribe((resp) => {
      //console.log('resp',resp);
      if(resp['mensaje'][0]['CODIGO']==1){
        this.comission = resp['COMISION']
      }else{
        //console.log('no',resp);
        this.msjCheck=`No se encontro la lista de comisiones para el usuario con id ${id}`
      }
    });
  }

  refrescarBitacora(){

  }

  refrescarUsuarios(){
    this.refrescarUsers = false;
    this.refrescarUsers = true;
  }

  cambiarActVal(num:any){
    this.MS.actionVal=num;
  }

}
