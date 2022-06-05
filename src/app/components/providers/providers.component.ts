import { Component, Input, OnInit, PipeTransform } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Proveedor } from 'src/app/interfaces/characters.interface';
import { ComprasService } from 'src/app/services/compras.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { UsuariosService } from 'src/app/services/usuarios.service';

function search(PROVEEDOR:any, text: string, pipe: PipeTransform): Proveedor[] {
  return PROVEEDOR.filter(prov => {
    const term = text.toLowerCase();
    return prov.NOMBRE_PROVEEDOR.toLowerCase().includes(term)
        || pipe.transform(prov.ID_PROVEEDOR).includes(term)
        || prov.RTN.toLowerCase().includes(term)
        || prov.CORREO_PROVEEDOR.toLowerCase().includes(term)
        || prov.TELEFONO_PROVEEDOR.toLowerCase().includes(term);
  });
}

@Component({
  selector: 'app-providers',
  templateUrl: './providers.component.html',
  styleUrls: ['./providers.component.css', '../../../forms_styles.css'],
  providers: [DecimalPipe]
})
export class ProvidersComponent implements OnInit {
  actionVal:any = 0;
  provInter: Observable<Proveedor[]>;
  _proveedores:Proveedor[]=[];
  filter = new FormControl('');
  modal=false;
  enam=false;
  msj='';
  _permisos:any;

  @Input() datosProv:Proveedor={
    ID_PROVEEDOR: 0,
    RTN: '',
    NOMBRE_PROVEEDOR: '',
    TELEFONO_PROVEEDOR: '',
    CORREO_PROVEEDOR: ''
  }

  datosTemp:Proveedor={
    ID_PROVEEDOR: 0,
    RTN: '',
    NOMBRE_PROVEEDOR: '',
    TELEFONO_PROVEEDOR: '',
    CORREO_PROVEEDOR: ''
  }

  constructor(private CP:ComprasService, private US:UsuariosService, private pipe: DecimalPipe, private _Router:Router, private modalService:NgbModal) {
    this.CP.obtenerProveedores();
    for (let i = 0; i < this.US._permisos.length; i++) {
      if(this.US._permisos[i].ID_OBJETO==4){
        this._permisos=this.US._permisos[i];
      }else if(this.US._permisos[i].ID_OBJETO==6){
        this._permisos=this.US._permisos[i];
      }
    }
    this._proveedores = this.CP._proveedores;
    this.provInter = this.filter.valueChanges.pipe(
      startWith(''),
      map(text => search(this._proveedores,text, this.pipe))
    );
  }

  ngOnInit(): void {
    this._proveedores = this.CP._proveedores;
    this.provInter = this.filter.valueChanges.pipe(
      startWith(''),
      map(text => search(this._proveedores,text, this.pipe))
    );
  }

  actionAct(value:any){
    this.actionVal = value;
  }

  openModalEdit(content:Object,id:any) {
    console.log("escogio el proveedor: ", id);
    for(let prov of this._proveedores){
      if(prov.ID_PROVEEDOR==id){
        this.datosProv=prov;
      }
    }
    this.datosTemp={
      ID_PROVEEDOR: this.datosProv.ID_PROVEEDOR,
      RTN: this.datosProv.RTN,
      NOMBRE_PROVEEDOR: this.datosProv.NOMBRE_PROVEEDOR,
      TELEFONO_PROVEEDOR: this.datosProv.TELEFONO_PROVEEDOR,
      CORREO_PROVEEDOR: this.datosProv.CORREO_PROVEEDOR
    }
    this.modalService.open(content, {backdropClass: 'light-red-backdrop', size: 'lg', centered: true });
  }

  openModalAdd(content:Object) {
    this.datosProv={
      ID_PROVEEDOR: 0,
      RTN: '',
      NOMBRE_PROVEEDOR: '',
      TELEFONO_PROVEEDOR: '',
      CORREO_PROVEEDOR: ''
    }
    this.modalService.open(content, {backdropClass: 'light-red-backdrop', size: 'lg', centered: true });
  }

  agregarProv(){
    console.log('datosProveedor', this.datosProv)
    this.CP.crearProveedor(this.datosProv).subscribe((resp) => {
      //console.log('resp',resp);
      this.CP.obtenerProveedores();
      if(resp['mensaje'][0]['CODIGO']==1){
        Swal.fire({
          title: `Bien hecho...`,
          text:  `Proveedor creado exitosamente`,
          confirmButtonText: 'OK',
        }).then((result) => {
          if (result.isConfirmed) {
            this._proveedores=this.CP._proveedores;
            this.provInter = this.filter.valueChanges.pipe(
              startWith(''),
              map(text => search(this._proveedores,text, this.pipe))
            );
            let dc = document.getElementById("closeAddProv");
            dc?.click()
          } else {
            this._proveedores=this.CP._proveedores;
            this.provInter = this.filter.valueChanges.pipe(
              startWith(''),
              map(text => search(this._proveedores,text, this.pipe))
            );
            //console.log(`modal was dismissed by ${result.dismiss}`);
          }
        })
      }else{
        Swal.fire({
          icon: 'error',
          title: 'Oops... No se pudo crear el proveedor',
          text: `${resp}`
        })
        //console.log('no',resp);
      }
    });
  }

  actualizarProv(){
    console.log('datosProveedor', this.datosProv)
    this.CP.actualizarProveedor(this.datosProv, this.datosProv.ID_PROVEEDOR).subscribe((resp) => {
      //console.log('resp',resp);
      if(resp['mensaje'][0]['CODIGO']==1){
        for (let i = 0; i < this._proveedores.length; i++) {
          const element = this._proveedores[i];
          if(element.ID_PROVEEDOR==this.datosProv.ID_PROVEEDOR){
            this._proveedores[i].CORREO_PROVEEDOR=this.datosProv.CORREO_PROVEEDOR
            this._proveedores[i].NOMBRE_PROVEEDOR=this.datosProv.NOMBRE_PROVEEDOR
            this._proveedores[i].RTN=this.datosProv.RTN
            this._proveedores[i].TELEFONO_PROVEEDOR=this.datosProv.TELEFONO_PROVEEDOR
          }
        }
        this.CP._proveedores=this._proveedores;
        Swal.fire({
          title: `Bien hecho...`,
          text:  `Proveedor actualizado exitosamente`,
          confirmButtonText: 'OK',
        }).then((result) => {
          if (result.isConfirmed) {
            let dc = document.getElementById("closeActProv");
            dc?.click()
          } else {
            //console.log(`modal was dismissed by ${result.dismiss}`);
          }
        })
      }else{
        Swal.fire({
          icon: 'error',
          title: 'Oops... No se pudo actualizar el proveedor',
          text: 'Uno o mas campos del proveedor son utilizados por alguien más.'
        })
        //console.log('no',resp);
      }
    });
  }

  evaluarDatos(opcion:any) {
    let rtn=false;
    let nP=false;
    let tF=false;
    let cP=false;
    let PR = false
    if (this.verificacionDatos('rtn')) {
      rtn=true;
      this.msj='RTN necesita 14 DIGITOS sin guiones'
    }
    if (this.verificacionDatos('nombre')) {
      nP=true;
      this.msj='Nombre proveedor muy corto, necesita al menos la inical mayuscula y 2 letras '
    }
    if (this.verificacionDatos('telefono')) {
      tF=true
      this.msj='Telefono necesita 8 DIGITOS sin guiones'
    }
    if (this.verificacionCorreo()) {
      cP=true
      this.msj='Correo invalido'
    }
    if(!rtn && !nP && !tF && !cP){
      let cR=false
      let pR=false
      let nR=false
      let mR=false
      for (let i = 0; i < this._proveedores.length; i++) {
        const element = this._proveedores[i];
        if(element.ID_PROVEEDOR != this.datosProv.ID_PROVEEDOR){
          if(element.RTN == this.datosProv.RTN){
            cR=true;
          }
          if(element.TELEFONO_PROVEEDOR == this.datosProv.TELEFONO_PROVEEDOR){
            pR=true
          }
          if(element.NOMBRE_PROVEEDOR.toLocaleLowerCase() == this.datosProv.NOMBRE_PROVEEDOR.toLocaleLowerCase()){
            nR=true
          }
          if(element.CORREO_PROVEEDOR == this.datosProv.CORREO_PROVEEDOR){
            mR=true
          }
        }
      }
      if((cR && pR && nR && mR) || (cR && nR) || (cR && mR) || (cR && pR)){
        PR=true
      }
      if(!PR){
        if(opcion=='add'){
          this.agregarProv();
        }else{
          this.actualizarProv();
        }
        this.enam=false
      }else{
        this.enam=true
        this.msj='Ya existe un proveedor con datos similares, puede actualizar sus datos desde otra interfaz'
      }
    }else{
      this.enam=true;
    }
  }

  verificacionDatos(opcion:any){
    let validation=false;
    if(opcion=='telefono'){
      const regexi = /^([0-9]){8}$/;
      if(regexi.test(this.datosProv.TELEFONO_PROVEEDOR)){
        validation=false;
      }else{
        validation=true;
      }
    }else if(opcion=='rtn'){
      const regexi = /^([0-9]){14}$/;
      if(regexi.test(this.datosProv.RTN)){
        validation=false;
      }else{
        validation=true;
      }
    }else if(opcion=='nombre'){
      const regex = /^([A-ZÁÉÍÓÚ]{1}[a-zA-ZñÑáéíóúÁÉÍÓÚ]{2,}[\s]{0,1})+$/;
      if(regex.test(this.datosProv.NOMBRE_PROVEEDOR)){
        validation=false;
      }else{
        validation=true;
      }
    }
    return validation
  }

  verificacionCorreo(){
    const regexi = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(regexi.test(this.datosProv.CORREO_PROVEEDOR)){
      return false;
    }else{
      return true;
    }
  }

  cerrar(){
    this.enam=false
    this.msj=''
    this.datosProv={
      ID_PROVEEDOR: 0,
      RTN: '',
      NOMBRE_PROVEEDOR: '',
      TELEFONO_PROVEEDOR: '',
      CORREO_PROVEEDOR: ''
    }
  }

  cancel(){
    this.datosProv.RTN=this.datosTemp.RTN;
    this.datosProv.NOMBRE_PROVEEDOR=this.datosTemp.NOMBRE_PROVEEDOR;
    this.datosProv.TELEFONO_PROVEEDOR=this.datosTemp.TELEFONO_PROVEEDOR;
    this.datosProv.CORREO_PROVEEDOR=this.datosTemp.CORREO_PROVEEDOR;
    this.enam=false
    this.msj=''
  }
}
