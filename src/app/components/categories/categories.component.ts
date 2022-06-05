import { DecimalPipe } from '@angular/common';
import { Component, Input, OnInit, PipeTransform } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, startWith, map } from 'rxjs';
import { Category } from 'src/app/interfaces/objects.interface';
import { InventarioService } from 'src/app/services/inventario.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import Swal from 'sweetalert2';

function search(CATEGORIA:any, text: string): Category[] {
  return CATEGORIA.filter(cat => {
    const term = text.toLowerCase();
    return cat.CATEGORIA.toLowerCase().includes(term)
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
  descAnt=''
  catAnt=''
  msj='';
  _permisos:any;

  @Input() datosCategory:Category={
    ID_CATEGORIA: 0,
    CATEGORIA: '',
    DESCRIPCION: ''
  }

  constructor(private IN:InventarioService, private US:UsuariosService, private _Router:Router, private modalService:NgbModal) {
    this.IN.obtenerCategorias()
    for (let i = 0; i < this.US._permisos.length; i++) {
      if(this.US._permisos[i].ID_OBJETO==4){
        this._permisos=this.US._permisos[i];
      }
    }
    this._categorias=this.IN._categorias;
    this.catInter = this.filter.valueChanges.pipe(
      startWith(''),
      map(text => search(this._categorias,text))
    );
  }

  ngOnInit(): void {
    this._categorias=this.IN._categorias;
    this.catInter = this.filter.valueChanges.pipe(
      startWith(''),
      map(text => search(this._categorias,text))
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
    this.descAnt=this.datosCategory.DESCRIPCION
    this.catAnt=this.datosCategory.CATEGORIA
    this.modalService.open(content, {backdropClass: 'light-red-backdrop', size: 'lg', centered: true });
  }

  openModalAdd(content:Object) {
    this.datosCategory={
      ID_CATEGORIA: 0,
      CATEGORIA: '',
      DESCRIPCION: ''
    }
    this.enam=false
    this.modalService.open(content, {backdropClass: 'light-red-backdrop', size: 'lg', centered: true });
  }

  agregarCat(){
    //console.log('datosCategory', this.datosCategory)
    this.IN.crearCategoria(this.datosCategory).subscribe((resp) => {
      //console.log('resp',resp);
      this.IN.obtenerCategorias();
      if(resp['mensaje'][0]['CODIGO']==1){
        Swal.fire({
          title: `Bien hecho...`,
          text:  `Categoría creada exitosamente`,
          confirmButtonText: 'OK',
        }).then((result) => {
          if (result.isConfirmed) {
            this._categorias=this.IN._categorias;
            this.catInter = this.filter.valueChanges.pipe(
              startWith(''),
              map(text => search(this._categorias,text))
            );
            let dc = document.getElementById("closeAddCat");
            dc?.click()
          } else {
            this._categorias=this.IN._categorias;
            this.catInter = this.filter.valueChanges.pipe(
              startWith(''),
              map(text => search(this._categorias,text))
            );
            //console.log(`modal was dismissed by ${result.dismiss}`);
          }
        })
      }else{
        Swal.fire({
          icon: 'error',
          title: 'Oops... No se pudo crear la categoría',
          text: `${resp}`
        })
        //console.log('no',resp);
      }
    });
  }

  actualizarCat(){
    //console.log('datosCategory', this.datosCategory)
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
    let catR=false
    if (this.verificacionDatos('nombre')) {
      cat=true;
      this.msj='Nombre categoría invalido, debe tener al menos la inicial mayuscula y mas de tres letras'
    }
    if (this.datosCategory.DESCRIPCION.length==0) {
      this.datosCategory.DESCRIPCION='SIN DESCRIPCION'
    }
    for (let i = 0; i < this._categorias.length; i++) {
      const element = this._categorias[i];
      if(element.ID_CATEGORIA!=this.datosCategory.ID_CATEGORIA){
        if (element.CATEGORIA==this.datosCategory.CATEGORIA) {
          catR=true;
          this.msj='Ya existe una categoría con este nombre'
        }
      }
    }
    if(!cat && !catR){
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

  verificacionDatos(opcion:any){
    let validation=false;
    if(opcion=='nombre'){
      const regex = /^([A-ZÁÉÍÓÚ]{1}[a-zA-ZñÑáéíóúÁÉÍÓÚ]{2,}[\s]{0,1})+$/;
      if(regex.test(this.datosCategory.CATEGORIA)){
        validation=false;
      }else{
        validation=true;
      }
    }
    return validation
  }

  cancel(){
    this.datosCategory.DESCRIPCION=this.descAnt
    this.datosCategory.CATEGORIA=this.catAnt
    this.msj=''
    this.enam=false
  }
}
