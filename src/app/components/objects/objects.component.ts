import { Component, Input, OnInit, PipeTransform } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MantenimientoService } from 'src/app/services/mantenimiento.service';
import { Object } from 'src/app/interfaces/objects.interface';
import { UsuariosService } from 'src/app/services/usuarios.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

function search(OBJECT: any, text: string, pipe: PipeTransform): Object[] {
  //console.log('ob',OBJECT);
  return OBJECT.filter(ob => {
    const term = text.toLowerCase();
    return ob.OBJETOS.toLowerCase().includes(term)
        || ob.TIPO_OBJETO.toLowerCase().includes(term)
        || ob.DESCRIPCION.toLowerCase().includes(term)
        || pipe.transform(ob.CREADO_POR).includes(term);
  });
}

@Component({
  selector: 'app-objects',
  templateUrl: './objects.component.html',
  styleUrls: ['./objects.component.css'],
  providers: [DecimalPipe]
})
export class ObjectsComponent implements OnInit {
  objectsInter:Observable<Object[]>
  filter = new FormControl('');
  objects:Object[]=this.MS._objects;
  condition=false;
  enam=false;
  msj=''

  constructor( private MS:MantenimientoService, private pipe: DecimalPipe, private modalService: NgbModal, private US:UsuariosService, private _Router:Router) {
    this.MS.obtenerObjetos();
    this.objects=this.MS._objects;
    this.objectsInter = this.filter.valueChanges.pipe(
      startWith(''),
      map(text => search(this.objects, text, this.pipe))
    );
    this.condition=true
  }

  ngOnInit(): void {
    this.objects=this.MS._objects;
    this.objectsInter = this.filter.valueChanges.pipe(
      startWith(''),
      map(text => search(this.objects, text, this.pipe))
    );
  }

  @Input() datoObjeto:Object={
    ID_OBJETO: 0,
    OBJETOS: '',
    TIPO_OBJETO: '',
    DESCRIPCION: '',
    CREADO_POR: 0
  }

  openModal(content:any) {
    this.datoObjeto={
      ID_OBJETO: 0,
      OBJETOS: '',
      TIPO_OBJETO: '',
      DESCRIPCION: '',
      CREADO_POR: this.US._usuarioActual
    }
    this.modalService.open(content, {backdropClass: 'light-red-backdrop', size: 'lg' });
  }

  editObj(content:any,id:any) {
    for (let i = 0; i < this.objects.length; i++) {
      if(this.objects[i].ID_OBJETO==id){
        this.datoObjeto=this.objects[i];
      }
    }
    this.modalService.open(content, {backdropClass: 'light-red-backdrop', size: 'lg' });
  }

  actObjeto(){
    //console.log(this.datoObjeto)
    this.MS.actualizarObjeto(this.datoObjeto, this.datoObjeto.ID_OBJETO).subscribe((resp) => {
      if(resp[0]['CODIGO']==1){
        Swal.fire({
          title: `Bien hecho...`,
          text:  `Objeto actualizado exitosamente`,
          confirmButtonText: 'OK',
        }).then((result) => {
          if (result.isConfirmed) {
            this.modalService.dismissAll();
            localStorage.setItem('ruta', 'administration');
            this._Router.navigate(['/administration/path?refresh=1']);
          } else {
            this.modalService.dismissAll();
            console.log(`modal was dismissed by ${result.dismiss}`);
            localStorage.setItem('ruta', 'administration');
            this._Router.navigate(['/administration/path?refresh=1']);
          }
        })
      }else{
        //console.log('no',resp);
      }
    });
  }

  crearObj(){
    //console.log(this.datoObjeto)
    this.MS.crearObjeto(this.datoObjeto).subscribe((resp) => {
      if(resp[0]['CODIGO']==1){
        this.MS.obtenerObjetos();
        Swal.fire({
          title: `Bien hecho...`,
          text:  `Objeto creado exitosamente`,
          confirmButtonText: 'OK',
        }).then((result) => {
          if (result.isConfirmed) {
            this.objects=this.MS._objects;
            this.objectsInter = this.filter.valueChanges.pipe(
              startWith(''),
              map(text => search(this.objects, text, this.pipe))
            );
            this.modalService.dismissAll();
            localStorage.setItem('ruta', 'administration');
            this._Router.navigate(['/administration/path?refresh=1']);
          } else {
            this.modalService.dismissAll();
            console.log(`modal was dismissed by ${result.dismiss}`);
            localStorage.setItem('ruta', 'administration');
            this._Router.navigate(['/administration/path?refresh=1']);
          }
        })
      }else{
        //console.log('no',resp);
      }
    });
  }

  obtenerObjetos(){
    this.MS.obtenerObjetos();
    this.objects=this.MS._objects;
    //console.log('objs', this.objects)
  }

  evaluarDatos(opcion:any) {
    let rtn=false;
    let nP=false;
    let PR = false
    if (this.datoObjeto.OBJETOS.length<3) {
      rtn=true;
      this.msj='RTN necesita 14 digitos sin guiones'
    }
    if (this.datoObjeto.TIPO_OBJETO.length<3) {
      nP=true;
      this.msj='Nombre prveedor muy corto'
    }
    if (this.datoObjeto.DESCRIPCION.length<=0) {
      this.datoObjeto.DESCRIPCION='SIN DESCRIPCIÓN'
    }
    if(!rtn && !nP){
      let cR=false
      let pR=false
      for (let i = 0; i < this.objects.length; i++) {
        const element = this.objects[i];
        if(element.ID_OBJETO != this.datoObjeto.ID_OBJETO){
          if(element.OBJETOS.toLocaleLowerCase() == this.datoObjeto.OBJETOS.toLocaleLowerCase()){
            cR=true;
          }
          if(element.TIPO_OBJETO.toLocaleLowerCase() == this.datoObjeto.TIPO_OBJETO.toLocaleLowerCase()){
            pR=true
          }
        }
      }
      if(cR && pR){
        PR=true
      }
      if(!PR){
        if(opcion=='add'){
          this.crearObj();
        }else{
          this.actObjeto();
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
}
