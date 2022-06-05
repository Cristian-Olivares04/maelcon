import { Component, Input, OnInit, PipeTransform } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MantenimientoService } from 'src/app/services/mantenimiento.service';
import { Category, CompleteProduct, Permission, Product } from 'src/app/interfaces/objects.interface';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { ComprasService } from 'src/app/services/compras.service';
import { InventarioService } from 'src/app/services/inventario.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { Proveedor } from 'src/app/interfaces/characters.interface';

function search(PRODUCT: any, text: string, pipe: PipeTransform): CompleteProduct[] {
  //console.log('ob',PRODUCT);
  return PRODUCT.filter(pro => {
    const term = text.toLowerCase();
    return pro.NOMBRE_PRODUCTO.toLowerCase().includes(term)
        || pro.MARCA_PRODUCTO.toLowerCase().includes(term)
        || pro.DESCRIPCION_PRODUCTO.toLowerCase().includes(term)
        || pipe.transform(pro.PRECIO_VENTA).includes(term)
        || pipe.transform(pro.PRECIO_UNITARIO).includes(term)
        || pipe.transform(pro.EXISTENCIA).includes(term)
        || pro.CATEGORIA.toLowerCase().includes(term)
        || pro.NOMBRE_PROVEEDOR.toLowerCase().includes(term);
  });
}

@Component({
  selector: 'app-inventory-table',
  templateUrl: './inventory-table.component.html',
  styleUrls: ['./inventory-table.component.css'],
  providers: [DecimalPipe]
})

export class InventoryTableComponent implements OnInit {
  ProductsInter:Observable<CompleteProduct[]>
  filter = new FormControl('');
  _productosCP:Product[]=[];
  _productos2:any[]=[];
  _productos:any[]=[];
  _proveedores:Proveedor[]=[];
  _categorias:Category[]=[];
  enam=false;
  msj='';
  invValue = 0;
  id_inventario_act=0;
  _permisos:any;

  _jsExist={
    "PRECIO_VENTA":0.00,
    "ESTADO": 0
  }

  page_number = 1;
  page_size = 4;
  collectionSize = 0;
  modal=false;
  condition=false;

  constructor( private IN:InventarioService, private US:UsuariosService, private CP:ComprasService, private pipe: DecimalPipe, private modalService: NgbModal, private _Router:Router) {
    for (let i = 0; i < this.US._permisos.length; i++) {
      if(this.US._permisos[i].ID_OBJETO==4){
        this._permisos=this.US._permisos[i];
      }
    }
    this.CP.obtenerProductos();
    this.IN.obtenerProductosCompletos();
    this.CP.obtenerProveedores();
    this.IN.obtenerInventario();
    this.IN.obtenerCategorias();
    this._productosCP = this.CP._products;
    this._productos2 = this.IN._products;
    this._productos = this.IN._products;
    this._proveedores = this.CP._proveedores;
    this._categorias = this.IN._categorias;

    this.ProductsInter = this.filter.valueChanges.pipe(
      startWith(''),
      map(text => search(this._productos2, text, this.pipe))
    );
  }

  ngOnInit(): void {
  }

  @Input() datosProdExist:CompleteProduct={
    ID_PRODUCTO: 0,
    ID_INVENTARIO:0,
    NOMBRE_PRODUCTO: '',
    MARCA_PRODUCTO: '',
    DESCRIPCION_PRODUCTO: '',
    EXISTENCIA: 0,
    PRECIO_VENTA: 0,
    PRECIO_UNITARIO: 0,
    CATEGORIA: '',
    NOMBRE_PROVEEDOR: '',
    ID_PROVEEDOR: 0,
    ESTADO: 0
  }

  @Input() datosProd:Product={
    ID_PRODUCTO: 0,
    ID_PROVEEDOR: 0,
    NOMBRE_PROVEEDOR: '',
    NOMBRE_PRODUCTO: '',
    MARCA_PRODUCTO: '',
    DESCRIPCION_PRODUCTO: '',
    ID_CATEGORIA: 0,
    CATEGORIA: '',
    ESTADO: 0,
    IMG_PRODUCTO: ''
  }

  crearProd(datos:any){
    this._productos2 = datos;
    for (let i = 0; i < this._productos2.length; i++) {
      const element = this._productos2[i];
      if(element.PRECIO_VENTA==0){
        element.PRECIO_VENTA=0.01;
      }
    }
    this.ProductsInter = this.filter.valueChanges.pipe(
      startWith(''),
      map(text => search(this._productos2, text, this.pipe))
    );
  }

  openModal(content:any) {
    this.modalService.open(content, {backdropClass: 'light-red-backdrop', size: 'xl', centered: true });
  }

  actProd(){
    var js = {
      ID_PRODUCTO: this.datosProd.ID_PRODUCTO,
      ID_PROVEEDOR: this.datosProd.ID_PROVEEDOR,
      NOMBRE_PRODUCTO: this.datosProd.NOMBRE_PRODUCTO,
      MARCA_PRODUCTO: this.datosProd.MARCA_PRODUCTO,
      DESCRIPCION_PRODUCTO: this.datosProd.DESCRIPCION_PRODUCTO,
      IMG_PRODUCTO: this.datosProd.IMG_PRODUCTO,
      ESTADO: 1,
      ID_CATEGORIA: this.datosProd.ID_CATEGORIA,
      EXISTENCIA: this.datosProdExist.EXISTENCIA,
      PRECIO_VENTA: this.datosProdExist.PRECIO_VENTA,
      PRECIO_UNITARIO: this.datosProdExist.PRECIO_UNITARIO
    }

    this._jsExist.PRECIO_VENTA = this.datosProdExist.PRECIO_VENTA;
    this._jsExist.ESTADO = this.invValue;

    console.log('datosProducto a actualizar',js)
    this.IN.actualizarProducto(js, js.ID_PRODUCTO).subscribe((resp) => {
      //console.log('resp',resp);
      this.IN.actualizarInventarioProducto(this._jsExist, this.id_inventario_act).subscribe((resp) => {});
      if(resp[0]['CODIGO']==1){
        Swal.fire({
          icon: 'success',
          title: 'Actualizar producto',
          text: 'El producto se actualizo exitosamente',
        })
        for (let i = 0; i < this._productos2.length; i++) {
          const element = this._productos2[i];
          if(element.ID_PRODUCTO==js.ID_PRODUCTO){
            element.NOMBRE_PRODUCTO = js.NOMBRE_PRODUCTO
            element.MARCA_PRODUCTO = js.MARCA_PRODUCTO
            element.DESCRIPCION_PRODUCTO = js.DESCRIPCION_PRODUCTO
            element.EXISTENCIA = js.EXISTENCIA
            element.PRECIO_VENTA = js.PRECIO_VENTA
            element.PRECIO_UNITARIO = js.PRECIO_UNITARIO
            element.ID_PROVEEDOR = js.ID_PROVEEDOR
            element.ESTADO = js.ESTADO
            for (let j = 0; j < this._categorias.length; j++) {
              const elem = this._categorias[j];
              if(elem.ID_CATEGORIA==js.ID_CATEGORIA){
                element.CATEGORIA = elem.CATEGORIA
              }
            }
            for (let j = 0; j < this._proveedores.length; j++) {
              const elem = this._proveedores[j];
              if(elem.ID_PROVEEDOR==js.ID_PROVEEDOR){
                element.NOMBRE_PROVEEDOR = elem.NOMBRE_PROVEEDOR
              }
            }
          }
        }

        for (let i = 0; i < this._productos2.length; i++) {
          const element = this._productos2[i];
          if(element.ID_PRODUCTO == js.ID_PRODUCTO){
            element.ESTADO = this.invValue;
          }
        }

        this.modalService.dismissAll();
        this.ProductsInter = this.filter.valueChanges.pipe(
          startWith(''),
          map(text => search(this._productos2, text, this.pipe))
        );
      }else{
        Swal.fire({
          icon: 'error',
          title: 'Oops... No se pudo actualizar el producto',
          text: 'Algo salio mal!'
        });
        //console.log('no',resp);
      }
    });
  }

  evaluarDatos() {
    let nP=false;
    let mP=false;
    let pV=false
    let pRV=false
    let PR=false
    if (this.verificacionPrecioVenta()) {
      pRV=true;
      this.msj='Numero invalido solo dos decimales son admitidos'
    }
    if (this.datosProdExist.PRECIO_VENTA<0.01) {
      pV=true;
      this.msj='Precio de producto invalido el valor minimo es 0.01'
    }
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
    if(!nP && !mP && !pRV && !pV){
      let cR=false
      let pR=false
      let nR=false
      let mR=false
      for (let i = 0; i < this._productos2.length; i++) {
        const element = this._productos2[i];
        if(element.ID_PRODUCTO!=this.datosProd.ID_PRODUCTO){
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
      }
      if(cR && pR && nR && mR){
        PR=true
      }
      if(!PR){
        this.actProd();
        this.enam=false
      }else{
        this.enam=true
        this.msj='Ya existe un producto con los mismos datos'
      }
    }else{
      this.enam=true;
    }
  }

  verificacionPrecioVenta(){
    const regexi = /^\d+(\.\d{1,2})?$/;
    if(regexi.test(this.datosProdExist.PRECIO_VENTA.toString())){
      return false;
    }else{
      return true;
    }
  }

  activOption(value:any){
    this.invValue = value;
  }

  openModl(id:any, value:any, id_inv:any){
    console.log('idProd:', id)
    this.invValue = value;
    this.id_inventario_act = id_inv;
    for(let prod of this._productos2){
      if(prod.ID_PRODUCTO==id){
        this.datosProdExist=prod;
      }
    }
    for(let prod of this._productosCP){
      if(prod.ID_PRODUCTO==id){
        this.datosProd=prod;
        this.modal=true;
      }
    }
    //console.log('escogio la card con id: ',id);
  }

}
