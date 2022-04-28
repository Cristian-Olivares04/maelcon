import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Proveedor } from 'src/app/interfaces/characters.interface';
import { Category, CompleteProduct, Product } from 'src/app/interfaces/objects.interface';
import { ComprasService } from 'src/app/services/compras.service';
import { InventarioService } from 'src/app/services/inventario.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css', '../../../forms_styles.css']
})
export class ProductComponent implements OnInit {
  @Output() listaProductos = new EventEmitter<any>();
  _productos2:any[];
  _proveedores:Proveedor[]=[];
  _categorias:Category[]=[];
  enam=false;
  msj='';

  @Input() datosProd:Product={
    ID_PRODUCTO: 0,
    ID_PROVEEDOR: 1,
    NOMBRE_PRODUCTO: '',
    MARCA_PRODUCTO: '',
    DESCRIPCION_PRODUCTO: '',
    IMG_PRODUCTO: '',
    ESTADO: 0,
    ID_CATEGORIA: 1
  }

  constructor(private IN:InventarioService, private CP:ComprasService, private modal:NgbModal) {
    this.CP.obtenerProveedores();
    this.IN.obtenerCategorias();
    this.IN.obtenerProductosCompletos();
    this._productos2 = this.IN._products;
    this._proveedores = this.CP._proveedores;
    this._categorias = this.IN._categorias;
  }

  ngOnInit(): void {
  }

  crearProd(){
    console.log('datosProd',this.datosProd)
    this.IN.crearProducto(this.datosProd).subscribe((resp) => {
      console.log('resp',resp);
      this.IN.obtenerProdListaCompletos().subscribe((resp) => {
        //console.log('productos completos',resp['proveedores']);
        if(resp['mensaje'][0]['CODIGO']==1){
          this._productos2=resp['proveedores'];
          this.listaProductos.emit(this._productos2)
        }else{
          //console.log('no',resp);
        }
      });
      if(resp[0]['CODIGO']==1){
        Swal.fire({
          icon: 'success',
          title: 'Crear producto',
          text: 'El producto se creo exitosamente',
        })
        this.modal.dismissAll()
      }else{
        Swal.fire({
          icon: 'error',
          title: 'Oops... No se pudo crear el producto',
          text: 'Algo salio mal!'
        })
        //console.log('no',resp);
      }
    });
  }

  evaluarDatos() {
    let nP=false;
    let mP=false;
    let PR=false
    if (this.datosProd.NOMBRE_PRODUCTO.length<3) {
      nP=true;
      this.msj='Nombre categoria muy corto'
    }
    if (this.datosProd.MARCA_PRODUCTO.length<3) {
      mP=true;
      this.msj='Marca categoria muy corta'
    }
    if (this.datosProd.DESCRIPCION_PRODUCTO.length==0) {
      this.datosProd.DESCRIPCION_PRODUCTO='SIN DESCRIPCION'
    }
    if(!nP && !mP){
      let cR=false
      let pR=false
      let nR=false
      let mR=false
      for (let i = 0; i < this._productos2.length; i++) {
        const element = this._productos2[i];
        if(element.ID_CATEGORIA == this.datosProd.ID_CATEGORIA){
          cR=true;
        }
        if(element.ID_PROVEEDOR == this.datosProd.ID_PROVEEDOR){
          pR=true
        }
        if(element.NOMBRE_PRODUCTO == this.datosProd.NOMBRE_PRODUCTO){
          nR=true
        }
        if(element.MARCA_PRODUCTO == this.datosProd.MARCA_PRODUCTO){
          mR=true
        }
      }
      if(cR && pR && nR && mR){
        PR=true
      }
      if(!PR){
        this.crearProd();
        this.enam=false
      }else{
        this.enam=true
        this.msj='Ya existe un producto con los mismos datos'
      }
    }else{
      this.enam=true;
    }
  }
}
