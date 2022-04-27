import { DecimalPipe } from '@angular/common';
import { Component, Input, OnInit, PipeTransform } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, startWith, map } from 'rxjs';
import { Category } from 'src/app/interfaces/objects.interface';
import { InventarioService } from 'src/app/services/inventario.service';
import Swal from 'sweetalert2';

function search(CATEGORIA:any, text: string, pipe: PipeTransform): Category[] {
  return CATEGORIA.filter(cat => {
    const term = text.toLowerCase();
    return cat.NOMBRE.toLowerCase().includes(term)
        || cat.DESCRIPCION.toLowerCase().includes(term);
  });
}

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  actionVal:any = 0;
  catInter: Observable<Category[]>;
  _categorias:Category[]=[];
  filter = new FormControl('');
  modal=false;
  enam=false;
  msj='';

  @Input() datosCategory:Category={
    ID_CATEGORIA: 0,
    CATEGORIA: '',
    DESCRIPCION: ''
  }

  constructor(private IN:InventarioService, private pipe: DecimalPipe, private _Router:Router, private modalService:NgbModal) {
    this.IN.obtenerCategorias()
    this._categorias=this.IN._categorias;
    this.catInter = this.filter.valueChanges.pipe(
      startWith(''),
      map(text => search(this._categorias,text, this.pipe))
    );
  }

  ngOnInit(): void {
    this._categorias=this.IN._categorias;
    this.catInter = this.filter.valueChanges.pipe(
      startWith(''),
      map(text => search(this._categorias,text, this.pipe))
    );
  }

  actionAct(value:any){
    this.actionVal = value;
  }

  openModalEdit(content:Object,id:any) {
    console.log("escogio el proveedor: ", id);
    for(let cat of this._categorias){
      if(cat.ID_CATEGORIA==id){
        this.datosCategory=cat;
      }
    }
    this.modalService.open(content, {backdropClass: 'light-red-backdrop', size: 'lg', centered: true });
  }

  openModalAdd(content:Object) {
    this.datosCategory={
      ID_CATEGORIA: 0,
      CATEGORIA: '',
      DESCRIPCION: ''
    }
    this.modalService.open(content, {backdropClass: 'light-red-backdrop', size: 'lg', centered: true });
  }

  agregarCat(){
    console.log('datosCategory', this.datosCategory)
    /* this.CP.crearProveedor(this.datosCategory).subscribe((resp) => {
      //console.log('resp',resp);
      if(resp['mensaje'][0]['CODIGO']==1){
        for (let i = 0; i < this._categorias.length; i++) {
          const element = this._categorias[i];
          if(element.ID_PROVEEDOR==this.datosCategory.ID_PROVEEDOR){
            this._categorias[i].CORREO_PROVEEDOR=this.datosCategory.CORREO_PROVEEDOR
            this._categorias[i].NOMBRE_PROVEEDOR=this.datosCategory.NOMBRE_PROVEEDOR
            this._categorias[i].RTN=this.datosCategory.RTN
            this._categorias[i].TELEFONO_PROVEEDOR=this.datosCategory.TELEFONO_PROVEEDOR
          }
        }
        this.CP._categorias=this._categorias;
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
    }); */
  }

  actualizarCat(){
    console.log('datosCategory', this.datosCategory)
    this.IN.actualizarCategoria(this.datosCategory, this.datosCategory.ID_CATEGORIA).subscribe((resp) => {
      //console.log('resp',resp);
      if(resp['mensaje'][0]['CODIGO']==1){
        for (let i = 0; i < this._categorias.length; i++) {
          const element = this._categorias[i];
          if(element.ID_CATEGORIA==this.datosCategory.ID_CATEGORIA){
            this._categorias[i].CATEGORIA=this.datosCategory.CATEGORIA
            this._categorias[i].DESCRIPCION=this.datosCategory.DESCRIPCION
          }
        }
        this.IN._categorias=this._categorias;
        Swal.fire({
          title: `Bien hecho...`,
          text:  `Categoria actualizada exitosamente`,
          confirmButtonText: 'OK',
        }).then((result) => {
          if (result.isConfirmed) {
            let dc = document.getElementById("closeActCat");
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
    let cat=false;
    let nP=false;
    if (this.datosCategory.CATEGORIA.length!=14) {
      cat=true;
      this.msj='Nombre categoria muy corto'
    }
    if (this.datosCategory.DESCRIPCION.length<3) {
      nP=true;
      this.msj='Nombre prveedor muy corto'
    }
    if(!cat && !nP){
      if(opcion=='add'){
        this.agregarCat();
      }else{
        this.actualizarCat();
      }
      this.enam=false
    }else{
      this.enam=true;
    }
  }
}
