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

  @Input() datosProv:Proveedor={
    ID_PROVEEDOR: 0,
    RTN: '',
    NOMBRE_PROVEEDOR: '',
    TELEFONO_PROVEEDOR: '',
    CORREO_PROVEEDOR: ''
  }

  constructor(private CP:ComprasService, private pipe: DecimalPipe, private _Router:Router, private modalService:NgbModal) {
    this.CP.obtenerProveedores();
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
    if (this.datosProv.RTN.length!=14) {
      rtn=true;
      this.msj='RTN necesita 14 digitos sin guiones'
    }
    if (this.datosProv.NOMBRE_PROVEEDOR.length<3) {
      nP=true;
      this.msj='Nombre prveedor muy corto'
    }
    if (this.verificacionTelefono()) {
      tF=true
      this.msj='Telefono necesita 8 digitos sin guiones'
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
      if(cR && pR && nR && mR){
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
        this.msj='Ya existe un proveedor con los mismos datos'
      }
    }else{
      this.enam=true;
    }
  }

  verificacionTelefono(){
    const regexi = /^([0-9]){8}$/;
    if(regexi.test(this.datosProv.TELEFONO_PROVEEDOR)){
      return false;
    }else{
      return true;
    }
  }

  verificacionCorreo(){
    const regexi = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(regexi.test(this.datosProv.CORREO_PROVEEDOR)){
      return false;
    }else{
      return true;
    }
  }

}
