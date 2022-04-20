import { Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Proveedor } from 'src/app/interfaces/characters.interface';
import { Object, Permission, Product, Role } from 'src/app/interfaces/objects.interface';
import { ComprasService } from 'src/app/services/compras.service';
import { InventarioService } from 'src/app/services/inventario.service';
import { MantenimientoService } from 'src/app/services/mantenimiento.service';

@Component({
  selector: 'app-card-inventory',
  templateUrl: './card-inventory.component.html',
  styleUrls: ['./card-inventory.component.css']
})
export class CardInventoryComponent implements OnInit {
  actionVal:any = 0;
  activo:any = true;
  _obs:Permission[]=[];
  _productos:Product[]=[];
  _productos2:Product[]=[];
  _proveedores:Proveedor[]=[];
  page = 1;
  pageSize = 4;
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

  constructor(private MS:MantenimientoService,  private IN:InventarioService, private CP:ComprasService, private modalService: NgbModal) { }


  ngOnInit(): void {
    this.CP.obtenerProductos();
    this.CP.obtenerProveedores();
    this.IN.obtenerInventario();
    this._productos = this.CP._products;
    this._productos2 = this.CP._products;
    this._proveedores = this.CP._proveedores;
    this.collectionSize = this.CP._products.length;
    this._obs=this.MS._permissions;
    for (let i = 0; i < this._obs.length; i++) {
      if(this._obs[i].ID_OBJETO ==3){
        this.ob = this._obs[i];
        this.condition=true;
        //console.log(this.ob)
      }
    }
    console.log('products', this._productos2)
  }

  getInventario(){
    this.CP.obtenerProductos();
    this.CP.obtenerProveedores();
    this.IN.obtenerInventario();
    this._productos = this.CP._products;
    this._productos2 = this.CP._products;
    this._proveedores = this.CP._proveedores;
    this.collectionSize = this.CP._products.length;
  }

  refreshCompanies() {
    this._productos = this._productos2
      .map((prod, i) => ({id: i + 1, ...prod}))
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }

  openModl(id:any){
    for(let prod of this._productos2){
      if(prod.ID_PRODUCTO==id){
        this.datosProd=prod;
        this.modal=true;
      }
    }
  }

  actionAct(value:any){
    this.actionVal = value;
  }

  activOption(value:Boolean){
    this.activo = value;
  }

  openModal(content:any) {
    this.modalService.open(content, {backdropClass: 'light-red-backdrop', size: 'xl' });
  }


}
