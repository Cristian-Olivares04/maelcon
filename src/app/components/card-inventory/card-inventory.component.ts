import { Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Proveedor } from 'src/app/interfaces/characters.interface';
import { Category, Object, Permission, Product, Role } from 'src/app/interfaces/objects.interface';
import { ComprasService } from 'src/app/services/compras.service';
import { InventarioService } from 'src/app/services/inventario.service';
import { MantenimientoService } from 'src/app/services/mantenimiento.service';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-card-inventory',
  templateUrl: './card-inventory.component.html',
  styleUrls: ['./card-inventory.component.css']
})
export class CardInventoryComponent implements OnInit {
  actionVal:any = 0;
  activo:any = true;
  _obs:Permission[]=this.US._permisos;
  _productosCP:Product[]=[];
  _productos:any[]=[];
  _productos2:any[]=[];
  _proveedores:Proveedor[]=[];
  _categorias:Category[]=[];
  _jsExist={
    "PRECIO_VENTA":0.00,
    "PRECIO_UNITARIO":0.00,
    "EXISTENCIA":0
  }

  page_number = 1;
  page_size = 4;
  collectionSize = 0;
  modal=false;
  condition=false;

  ob:Permission = {
    ID_OBJETO: 0,
    ID_ROL: 0,
    INSERTAR: 0,
    ELIMINAR: 0,
    ACTUALIZAR: 0,
    CONSULTAR: 0,
    CREADO_POR: 0
  }

  @Input() datosProd:Product={
    ID_PRODUCTO: 0,
    ID_PROVEEDOR: 0,
    NOMBRE_PRODUCTO: '',
    MARCA_PRODUCTO: '',
    DESCRIPCION_PRODUCTO: '',
    IMG_PRODUCTO: '',
    ESTADO: 0,
    ID_CATEGORIA: 0
  }

  @Input() datosProdExist={
    ID_PRODUCTO: 0,
    NOMBRE_PRODUCTO: 0,
    MARCA_PRODUCTO: '',
    DESCRIPCION_PRODUCTO: '',
    EXISTENCIA: 0,
    PRECIO_VENTA: 0,
    PRECIO_UNITARIO: 0,
    IMG_PRODUCTO: '',
    CATEGORIA: '',
    NOMBRE_PROVEEDOR: '',
    ESTADO:0
  }

  constructor(private MS:MantenimientoService, private IN:InventarioService, private CP:ComprasService, private modalService: NgbModal, private US:UsuariosService) {
    this._obs=this.US._permisos;
    this.CP.obtenerProductos();
    this.IN.obtenerProductosCompletos();
    this.CP.obtenerProveedores();
    this.IN.obtenerInventario();
    this.IN.obtenerCategorias();
    this._productos = this.IN._products;
    this._productos2 = this.IN._products;
    this._proveedores = this.CP._proveedores;
    this._productosCP = this.CP._products;
    this._categorias = this.IN._categorias;
    this.collectionSize = this.IN._products.length;
    this._obs=this.US._permisos;
    for (let i = 0; i < this._obs.length; i++) {
      if(this._obs[i].ID_OBJETO ==3){
        this.ob = this._obs[i];
        this.condition=true;
        //console.log(this.ob)
      }
    }
    //console.log('products', this._productos2)
  }

  ngOnInit(): void {
  }

  getInventario(){
    this.CP.obtenerProductos();
    this.IN.obtenerProductosCompletos();
    this.CP.obtenerProveedores();
    this.IN.obtenerInventario();
    this.IN.obtenerCategorias();
    this._productos = this.IN._products;
    this._productos2 = this.IN._products;
    this._proveedores = this.CP._proveedores;
    this._productosCP = this.CP._products;
    this._categorias = this.IN._categorias;
    this.collectionSize = this.IN._products.length;
  }

  refreshProducts() {
    this._productos = this._productos2
      .map((prod, i) => ({id: i + 1, ...prod}))
      .slice((this.page_number - 1) * this.page_size, (this.page_number - 1) * this.page_size + this.page_size);
  }

  openModl(id:any){
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

  actionAct(value:any){
    this.actionVal = value;
  }

  activOption(value:Boolean){
    if(value){
      this.datosProd.ESTADO=1
    }else{
      this.datosProd.ESTADO=0
    }
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
      ESTADO: this.datosProd.ESTADO,
      ID_CATEGORIA: this.datosProd.ID_CATEGORIA,
      EXISTENCIA: this.datosProdExist.EXISTENCIA,
      PRECIO_VENTA: this.datosProdExist.PRECIO_VENTA,
      PRECIO_UNITARIO: this.datosProdExist.PRECIO_UNITARIO
    }
    console.log('datosProducto a actualizar',js)
    this.modalService.dismissAll();
  }

  crearProd(){
    this.datosProd={
      ID_PRODUCTO: 0,
      ID_PROVEEDOR: 0,
      NOMBRE_PRODUCTO: '',
      MARCA_PRODUCTO: '',
      DESCRIPCION_PRODUCTO: '',
      IMG_PRODUCTO: '',
      ESTADO: 0,
      ID_CATEGORIA: 0
    }

  }
}
