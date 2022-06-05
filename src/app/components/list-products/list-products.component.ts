import { Component, EventEmitter, Input, OnInit, Output, PipeTransform } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CompleteProduct, PurchaseDetail, purchaseProduct } from 'src/app/interfaces/objects.interface';
import { ComprasService } from 'src/app/services/compras.service';
import { MantenimientoService } from 'src/app/services/mantenimiento.service';
import Swal from 'sweetalert2';
import { UsuariosService } from 'src/app/services/usuarios.service';

function searchDetProd(DETALLE, text: string, pipe: PipeTransform): PurchaseDetail[] {
  return DETALLE.filter(det => {
    const term = text.toLowerCase();
    return det.NOMBRE_PRODUCTO.toLowerCase().includes(term)
        || det.MARCA_PRODUCTO.toLowerCase().includes(term)
        || pipe.transform(det.PRECIO_UNITARIO).includes(term)
        || pipe.transform(det.CANTIDAD_PRODUCTO).includes(term)
        || pipe.transform(det.SUB_TOTAL).includes(term);
  });
}

function searchProd(INVENTARIO, text: string, pipe: PipeTransform): CompleteProduct[] {
  return INVENTARIO.filter(prod => {
    const term = text.toLowerCase();
    return prod.NOMBRE_PRODUCTO.toLowerCase().includes(term)
        || prod.MARCA_PRODUCTO.toLowerCase().includes(term)
        || prod.DESCRIPCION_PRODUCTO.toLowerCase().includes(term)
        || pipe.transform(prod.EXISTENCIA).includes(term)
        || prod.CATEGORIA.toLowerCase().includes(term);
  });
}

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.css'],
  providers: [DecimalPipe]
})

export class ListProductsComponent implements OnInit {
  @Input() viewOption:any;
  @Input() typeTable:any;
  @Input() listaProds:any;
  @Input() listaDetalle:any;
  @Output() listaDetalleAct = new EventEmitter<PurchaseDetail>();
  @Output() detProdElim = new EventEmitter<any>();
  @Output() detProdAct = new EventEmitter<PurchaseDetail>();
  @Output() datsCompActual = new EventEmitter<any>();
  existInter: Observable<CompleteProduct[]>;
  filter = new FormControl('');
  _productosExis:CompleteProduct[] = [];
  detalleInter: Observable<PurchaseDetail[]>;
  listaAddBool:boolean[]=[]
  modalSwitch=true;
  enam=false;
  tempISVComp=0;
  tempCTotComp=0;
  _isvPorcentaje:any;
  msj='';
  _permisos:any;

  @Input() datosProdComp:purchaseProduct={
    ID_PRODUCTO: 0,
    ID_COMPRA: 0,
    PRECIO_UNITARIO: 1,
    DESCRIPCION: '',
    CANTIDAD: 1
  }

  datosDetalle:PurchaseDetail={
    ID_DETALLE_COMPRA: 0,
    ID_PRODUCTO: 0,
    NOMBRE_PRODUCTO: '',
    MARCA_PRODUCTO: '',
    IMG_PRODUCTO: '',
    ID_COMPRA: 0,
    PRECIO_UNITARIO: 0,
    CANTIDAD_PRODUCTO: 0,
    SUB_TOTAL: 0
  }

  datosTemp={
    ID_PRODUCTO: 0,
    ID_COMPRA: 0,
    PRECIO_UNITARIO: 1,
    DESCRIPCION: '',
    CANTIDAD: 1
  }

  _compAct = {
    ID_COMPRA: 0,
    ID_USUARIO: 0,
    ID_PAGO: 0,
    ID_PROVEEDOR: 0,
    USUARIO: '',
    PAGO: '',
    PROVEEDOR: '',
    OBSERVACION_COMPRA: '',
    FECHA_COMPRA: '',
    TOTAL_COMPRA: 0,
    ISV_COMPRA: 0,
    ESTADO: 0
  }

  constructor( private CP:ComprasService, private MS:MantenimientoService, private US:UsuariosService, private pipe: DecimalPipe, private modalService: NgbModal) {
    this._compAct=this.CP.datosCompAct;
    this.tempCTotComp=this._compAct.TOTAL_COMPRA;
    this.tempISVComp=this._compAct.ISV_COMPRA;
    this._isvPorcentaje=this.MS._params[0]['VALOR'];

    for (let i = 0; i < this.US._permisos.length; i++) {
      if(this.US._permisos[i].ID_OBJETO==2){
        this._permisos=this.US._permisos[i];
      }
    }
    this.detalleInter = this.filter.valueChanges.pipe(
      startWith(''),
      map(text => searchDetProd(this.listaDetalle ,text, this.pipe))
    );

    this.existInter = this.filter.valueChanges.pipe(
      startWith(''),
      map(text => searchProd(this.listaProds, text, this.pipe))
    );
  }

  ngOnInit(): void {
    //console.log('lista-prods',this.listaProds)
    //console.log('lista-detalle',this.listaDetalle)
    //console.log('isvPorcentaje',this._isvPorcentaje)
    this.evaluarProds();
  }

  evaluarProds(){
    for (let j = 0; j < this.listaProds.length; j++) {
      this.listaAddBool.push(false)
    }
    for (let i = 0; i < this.listaDetalle.length; i++) {
      const element = this.listaDetalle[i];
      for (let j = 0; j < this.listaProds.length; j++) {
        const elem = this.listaProds[j];
        if(element.ID_PRODUCTO==elem.ID_PRODUCTO){
          this.listaAddBool[j]=true;
        }
      }
    }
    //console.log('bools', this.listaAddBool)
  }

  openModal(content:Object) {
    this.modalService.open(content, {backdropClass: 'light-red-backdrop', size: 'lg', centered: true });
  }

  openModalAddProd(content:Object, id:any){
    //console.log('escogio prod con id: ',id);
    this.datosProdComp.ID_PRODUCTO=id;
    this.modalService.open(content, {backdropClass: 'light-red-backdrop', size: 'lg', centered: true });
  }

  openModalAct(content:Object, id:any){
    //console.log('escogio prod con id: ',id);
    for (let i = 0; i < this.listaDetalle.length; i++) {
      const element = this.listaDetalle[i];
      if(element.ID_PRODUCTO==id){
        for (let j = 0; j < this.listaProds.length; j++) {
          const elem = this.listaProds[j];
          if(element.ID_PRODUCTO==elem.ID_PRODUCTO){
            this.datosProdComp.DESCRIPCION=elem.DESCRIPCION_PRODUCTO;
            this.datosProdComp.ID_PRODUCTO=id;
            this.datosProdComp.PRECIO_UNITARIO=element.PRECIO_UNITARIO;
            this.datosProdComp.CANTIDAD=element.CANTIDAD_PRODUCTO;
          }
        }
      }
    }

    this.datosTemp={
      ID_PRODUCTO: 0,
      ID_COMPRA: 0,
      PRECIO_UNITARIO: this.datosProdComp.PRECIO_UNITARIO,
      DESCRIPCION: this.datosProdComp.DESCRIPCION,
      CANTIDAD: this.datosProdComp.CANTIDAD
    }
    this.modalService.open(content, {backdropClass: 'light-red-backdrop', size: 'lg', centered: true });
  }

  agregarProd(){
    //console.log('lista-hijo',this.listaProds)
    for (let i = 0; i < this.listaProds.length; i++) {
      const element = this.listaProds[i];
      if(element.ID_PRODUCTO==this.datosProdComp.ID_PRODUCTO){
        this.datosDetalle.ID_PRODUCTO=this.datosProdComp.ID_PRODUCTO
        this.datosDetalle.NOMBRE_PRODUCTO=element.NOMBRE_PRODUCTO
        this.datosDetalle.MARCA_PRODUCTO=element.MARCA_PRODUCTO
        this.datosDetalle.PRECIO_UNITARIO=this.datosProdComp.PRECIO_UNITARIO
        this.datosDetalle.CANTIDAD_PRODUCTO=this.datosProdComp.CANTIDAD
        this.datosDetalle.SUB_TOTAL=this.datosProdComp.PRECIO_UNITARIO*this.datosProdComp.CANTIDAD
      }
    }
    this.datosProdComp.ID_COMPRA =  this.CP.datosCompAct.ID_COMPRA
    this.CP.agregarProdCompra(this.datosProdComp).subscribe((resp) => {
      console.log('resp',resp['mensaje']);
      if(resp['mensaje'][0]['CODIGO']==1){
        this.CP.obtenerCompra( this.CP.datosCompAct.ID_COMPRA).subscribe((res)=>{
          if(resp['mensaje'][0]['CODIGO']==1){
            this._compAct=res['inventario'][0];
            this.datsCompActual.emit(this._compAct);
            this.listaDetalleAct.emit(this.datosDetalle);
            this.listaAddBool=[];
            this.evaluarProds();
            let dc = document.getElementById("closeAddProd");
            dc?.click()

            this.datosProdComp={
              ID_PRODUCTO: 0,
              ID_COMPRA: 0,
              PRECIO_UNITARIO: 1,
              DESCRIPCION: '',
              CANTIDAD: 1
            }
            this.enam=false
          }
        })
      }else{
        Swal.fire({
          icon: 'error',
          title: 'Oops... No se pudo agregar el producto',
          text: 'El manager de inventario debe activar el producto para su compra y venta'
        })
        let dc = document.getElementById("closeAddProd");
        dc?.click()
        //console.log('no',resp);
      }
    });
  }

  eliminarProd(id:any){
    let isv=0;
    let subTot=0;
    let js={
      "ID_PRODUCTO":id,
      "ID_COMPRA":this.CP.datosCompAct.ID_COMPRA,
    }
    for (let i = 0; i < this.listaDetalle.length; i++) {
      const element = this.listaDetalle[i];
      if(element.ID_PRODUCTO==id){
        isv=element.SUB_TOTAL*(this._isvPorcentaje/100);
        subTot=element.SUB_TOTAL
      }
    }
    this.CP.eliminarProducto(js).subscribe((resp) => {
      //console.log('resp',resp['mensaje']);
      if(resp['mensaje'][0]['CODIGO']==1){
        this.CP.obtenerCompra( this.CP.datosCompAct.ID_COMPRA).subscribe((res)=>{
          if(resp['mensaje'][0]['CODIGO']==1){
            this._compAct=res['inventario'][0];
            this.datsCompActual.emit(this._compAct);
            this.detProdElim.emit(js);
            this.listaAddBool=[];
            this.evaluarProds();
          }
        })
      }else{
        //console.log('no',resp);
      }
    });
  }

  actualizarProd(){
    for (let i = 0; i < this.listaProds.length; i++) {
      const element = this.listaProds[i];
      if(element.ID_PRODUCTO==this.datosProdComp.ID_PRODUCTO){
        this.datosDetalle.ID_PRODUCTO=this.datosProdComp.ID_PRODUCTO
        this.datosDetalle.NOMBRE_PRODUCTO=element.NOMBRE_PRODUCTO
        this.datosDetalle.MARCA_PRODUCTO=element.MARCA_PRODUCTO
        this.datosDetalle.PRECIO_UNITARIO=this.datosProdComp.PRECIO_UNITARIO
        this.datosDetalle.CANTIDAD_PRODUCTO=this.datosProdComp.CANTIDAD
        this.datosDetalle.SUB_TOTAL=this.datosProdComp.PRECIO_UNITARIO*this.datosProdComp.CANTIDAD
      }
    }
    this.datosProdComp.ID_COMPRA=this.CP.datosCompAct.ID_COMPRA;
    this.CP.actualizarProducto(this.datosProdComp).subscribe((resp) => {
      //console.log('resp',resp['mensaje']);
      if(resp['mensaje'][0]['CODIGO']==1){
        this.CP.obtenerCompra( this.CP.datosCompAct.ID_COMPRA).subscribe((res)=>{
          if(resp['mensaje'][0]['CODIGO']==1){
            this._compAct=res['inventario'][0];
            this.datsCompActual.emit(this._compAct);
            this.detProdAct.emit(this.datosDetalle);
            this.listaAddBool=[];
            this.evaluarProds();
            let dc = document.getElementById("closeActProd");
            dc?.click()

            this.datosProdComp={
              ID_PRODUCTO: 0,
              ID_COMPRA: 0,
              PRECIO_UNITARIO: 1,
              DESCRIPCION: '',
              CANTIDAD: 1
            }
            this.enam=false
          }
        })
      }else{
        //console.log('no',resp);
      }
    });
  }

  evaluarDatos(opcion:any) {
    let pU=false;
    let cD=false;
    console.log('entro evaluar', this.datosProdComp)
    if(this.datosProdComp.CANTIDAD==null || this.datosProdComp.PRECIO_UNITARIO==null){
      this.msj='Cantidad y precio unitario no pueden estar vacíos'
      this.enam=true
    }else{
      if (this.verificacionDatos('precio')) {
        pU=true;
        this.msj='Precio unitario debe ser un entero positivo mayor que 0.01 con solo dos decimales'
      }
      if (this.verificacionDatos('cantidad')) {
        cD=true;
        this.msj='La cantidad debe ser un entero positivo mayor que 0'
      }
      if (this.datosProdComp.DESCRIPCION='') {
        this.datosProdComp.DESCRIPCION='SIN DESCRIPCION'
      }
      if(!pU && !cD){
        if(opcion=='add'){
          this.agregarProd();
        }else{
          console.log('entro a act else')
          this.actualizarProd();
        }
        this.enam=false
      }else{
        this.enam=true;
      }
    }
  }

  verificacionDatos(opcion:any){
    let validation=false;
    if(opcion=='cantidad'){
      const regexi = /^([1-9]){1,}$/;
      if(regexi.test(this.datosProdComp.CANTIDAD.toString())){
        validation=false;
      }else{
        validation=true;
      }
    }else if(opcion=='precio'){
      if(this.datosProdComp.PRECIO_UNITARIO<1){
        if(this.datosProdComp.PRECIO_UNITARIO>=0.01){
          const regexi = /^([0]{1}\.[0-9]{1,2})$/;
          if(regexi.test(this.datosProdComp.PRECIO_UNITARIO.toString())){
            validation=false;
          }else{
            validation=true;
          }
        }else{
          validation=true;
        }
      }else{
        const regexi = /^([0-9]{1,}\.?[0-9]{0,2})$/;
        if(regexi.test(this.datosProdComp.PRECIO_UNITARIO.toString())){
          validation=false;
        }else{
          validation=true;
        }

      }
    }
    return validation
  }

  cerrar(){
    this.datosProdComp={
      ID_PRODUCTO: 0,
      ID_COMPRA: 0,
      PRECIO_UNITARIO: 1,
      DESCRIPCION: '',
      CANTIDAD: 1
    }
    this.msj=''
    this.enam=false
  }

  cancel(){
    this.datosProdComp.DESCRIPCION=this.datosTemp.DESCRIPCION;
    this.datosProdComp.PRECIO_UNITARIO=this.datosTemp.PRECIO_UNITARIO;
    this.datosProdComp.CANTIDAD=this.datosTemp.CANTIDAD;
    this.msj=''
    this.enam=false
  }
}
