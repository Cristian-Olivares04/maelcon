import { Component, EventEmitter, Input, OnInit, Output, PipeTransform } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CompleteProduct, PurchaseDetail, purchaseProduct, SaleDetail, SaleInit } from 'src/app/interfaces/objects.interface';
import { ComprasService } from 'src/app/services/compras.service';
import { MantenimientoService } from 'src/app/services/mantenimiento.service';
import Swal from 'sweetalert2';
import { VentasService } from 'src/app/services/ventas.service';
import { UsuariosService } from 'src/app/services/usuarios.service';


interface Country {
  name: string;
  flag: string;
  area: number;
  population: number;
}

const COUNTRIES: Country[] = [
  {
    name: 'United States',
    flag: 'a/a4/Flag_of_the_United_States.svg',
    area: 9629091,
    population: 324459463
  },
  {
    name: 'China',
    flag: 'f/fa/Flag_of_the_People%27s_Republic_of_China.svg',
    area: 9596960,
    population: 1409517397
  },
  {
    name: 'United States',
    flag: 'a/a4/Flag_of_the_United_States.svg',
    area: 9629091,
    population: 324459463
  },
  {
    name: 'China',
    flag: 'f/fa/Flag_of_the_People%27s_Republic_of_China.svg',
    area: 9596960,
    population: 1409517397
  }
];

function searchDetProd(DETALLE, text: string, pipe: PipeTransform): SaleDetail[] {
  return DETALLE.filter(det => {
    const term = text.toLowerCase();
    return det.NOMBRE_PRODUCTO.toLowerCase().includes(term)
        || det.MARCA_PRODUCTO.toLowerCase().includes(term)
        || pipe.transform(det.MONTO_UNITARIO).includes(term)
        || pipe.transform(det.CANTIDAD_PRODUCTO).includes(term)
        || pipe.transform(det.SUB_TOTAL).includes(term);
  });
}

function searchProd(INVENTARIO, text: string, pipe: PipeTransform): CompleteProduct[] {
  return INVENTARIO.filter(prod => {
    const term = text.toLowerCase();
    return prod.NOMBRE_PRODUCTO.toLowerCase().includes(term)
        || prod.MARCA_PRODUCTO.toLowerCase().includes(term)
        || prod.NOMBRE_PROVEEDOR.toLowerCase().includes(term)
        || prod.CATEGORIA.toLowerCase().includes(term)
        || pipe.transform(prod.EXISTENCIA).includes(term)
        || pipe.transform(prod.PRECIO_VENTA).includes(term)
        || prod.DESCRIPCION_PRODUCTO.toLowerCase().includes(term);
  });
}

@Component({
  selector: 'app-list-products-sale',
  templateUrl: './list-products-sale.component.html',
  styleUrls: ['./list-products-sale.component.css'],
  providers: [DecimalPipe]
})
export class ListProductsSaleComponent implements OnInit {
  @Input() viewOption:any;
  @Input() typeTable:any;
  @Input() listaProds:any;
  @Input() listaDetalle:any;
  @Output() listaDetalleAct = new EventEmitter<SaleDetail>();
  @Output() detProdElim = new EventEmitter<any>();
  @Output() detProdAct = new EventEmitter<SaleDetail>();
  @Output() datVentaAct = new EventEmitter<any>();
  existInter: Observable<CompleteProduct[]>;
  filter = new FormControl('');
  _productosExis:CompleteProduct[] = [];
  detalleInter: Observable<SaleDetail[]>;
  countries: Observable<Country[]> | undefined;
  listaAddBool:boolean[]=[]
  modalSwitch=true;
  enam=false;
  tempISVComp=0;
  tempCTotComp=0;
  _isvPorcentaje:any;
  _comision:any;
  msj='';
  _permisos:any;

  @Input() datosDetalleProd:SaleDetail={
    ID_DETALLE_VENTA: 0,
    ID_PRODUCTO: 0,
    NOMBRE_PRODUCTO: '',
    MARCA_PRODUCTO: '',
    IMG_PRODUCTO: '',
    ID_VENTA: 0,
    MONTO_UNITARIO: 0,
    CANTIDAD_PRODUCTO: 1,
    SUB_TOTAL: 0,
    TOTAL: 0
  }

  @Input() datosVentProd:CompleteProduct={
    ID_PRODUCTO: 0,
    ID_INVENTARIO: 0,
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

  datosTemp={
    ID_DETALLE_VENTA: 0,
    ID_PRODUCTO: 0,
    NOMBRE_PRODUCTO: '',
    MARCA_PRODUCTO: '',
    IMG_PRODUCTO: '',
    ID_VENTA: 0,
    MONTO_UNITARIO: 0,
    CANTIDAD_PRODUCTO: 1,
    SUB_TOTAL: 0,
    TOTAL: 0
  }

  ventaAct:SaleInit = {
    ID_VENTA: 0,
    ID_PAGO: 0,
    FORMA_PAGO: '',
    ID_USUARIO: 0,
    USUARIO: '',
    CANTIDAD_VENTA: 0,
    FECHA_VENTA: '',
    ID_CLIENTE: 1,
    NOMBRE_CLIENTE: '',
    ISV: 0,
    TOTAL_VENTA: 0,
    DESCRIPCION_VENTA: '',
    ESTADO: 0,
    COMISION_EMPLEADO: 0
  }

  constructor( private VS:VentasService,private US:UsuariosService, private MS:MantenimientoService, private pipe: DecimalPipe, private modalService: NgbModal) {
    this.ventaAct=this.VS.datosVentAct;
    this._isvPorcentaje=this.MS._params[0]['VALOR'];
    this._comision=this.MS._params[1]['VALOR'];

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
    console.log('escogio prod con id: ',id);
    for (let i = 0; i < this.listaProds.length; i++) {
      const element = this.listaProds[i];
      if(element.ID_PRODUCTO==id){
        this.datosVentProd=element;
      }
    }
    this.datosDetalleProd.ID_PRODUCTO=id
    this.datosDetalleProd.NOMBRE_PRODUCTO=this.datosVentProd.NOMBRE_PRODUCTO
    this.datosDetalleProd.MARCA_PRODUCTO=this.datosVentProd.MARCA_PRODUCTO
    this.datosDetalleProd.MONTO_UNITARIO=this.datosVentProd.PRECIO_UNITARIO
    console.log('datosVentaProd: ', this.datosVentProd)
    this.modalService.open(content, {backdropClass: 'light-red-backdrop', size: 'lg', centered: true });
  }

  openModalAct(content:Object, id:any){
    //console.log('escogio prod con id: ',id);
    for (let i = 0; i < this.listaDetalle.length; i++) {
      const element = this.listaDetalle[i];
      if(element.ID_PRODUCTO==id){
        this.datosDetalleProd=element;
      }
    }
    for (let i = 0; i < this.listaProds.length; i++) {
      const element = this.listaProds[i];
      if(element.ID_PRODUCTO==id){
        this.datosVentProd=element;
      }
    }
    this.datosTemp={
      ID_DETALLE_VENTA: 0,
      ID_PRODUCTO: 0,
      NOMBRE_PRODUCTO: this.datosVentProd.NOMBRE_PRODUCTO,
      MARCA_PRODUCTO: this.datosVentProd.MARCA_PRODUCTO,
      IMG_PRODUCTO: '',
      ID_VENTA: 0,
      MONTO_UNITARIO: this.datosVentProd.PRECIO_UNITARIO,
      CANTIDAD_PRODUCTO: this.datosDetalleProd.CANTIDAD_PRODUCTO,
      SUB_TOTAL: 0,
      TOTAL: 0
    }
    this.modalService.open(content, {backdropClass: 'light-red-backdrop', size: 'lg', centered: true });
  }

  agregarProd(){
    //console.log('lista-hijo',this.listaProds)
    this.datosDetalleProd.SUB_TOTAL=this.datosDetalleProd.CANTIDAD_PRODUCTO*this.datosDetalleProd.MONTO_UNITARIO;
    //console.log('prodEnviado ', this.datosDetalleProd)
    this.VS.anadirProducto(this.datosDetalleProd, this.ventaAct.ID_VENTA).subscribe((resp) => {
      console.log('resp addProd',resp);
      if(resp['mensaje'][0]['CODIGO']==1){
        this.VS.obtenerVenta(this.ventaAct.ID_VENTA).subscribe((respu) => {
          console.log('resp obt venta por id: ',respu['usuario']);
          if(respu['mensaje'][0]['CODIGO']==1){
            this.ventaAct=respu['usuario'][0]
            this.datVentaAct.emit(this.ventaAct);
            this.listaDetalleAct.emit(this.datosDetalleProd);
            this.listaAddBool=[];
            this.evaluarProds();
            Swal.fire({
              icon: 'success',
              title: 'Producto agregado con exito'
            })
            let dc = document.getElementById("closeAddProd");
            dc?.click()
            this.datosDetalleProd={
              ID_DETALLE_VENTA: 0,
              ID_PRODUCTO: 0,
              NOMBRE_PRODUCTO: '',
              MARCA_PRODUCTO: '',
              IMG_PRODUCTO: '',
              ID_VENTA: 0,
              MONTO_UNITARIO: 0,
              CANTIDAD_PRODUCTO: 1,
              SUB_TOTAL: 0,
              TOTAL: 0
            }
            this.enam=false
          }else{
            //console.log('no',resp);
          }
        });
      }else{
        Swal.fire({
          icon: 'error',
          title: 'Oops... No se pudo agregar el producto',
          text: 'El manager de inventario debe activar el producto para su compra y venta'
        })
        let dc = document.getElementById("closeAddProd");
        dc?.click()
        this.enam=false
        //console.log('no',resp);
      }
    });
  }

  eliminarProd(id:any){
    let js={
      "ID_PRODUCTO":id,
      "ID_VENTA":this.ventaAct.ID_VENTA
    }
    this.VS.eliminarProducto(js, this.ventaAct.ID_VENTA).subscribe((resp) => {
      //console.log('resp',resp['mensaje']);
      if(resp['mensaje'][0]['CODIGO']==1){
        this.VS.obtenerVenta(this.ventaAct.ID_VENTA).subscribe((respu) => {
          console.log('resp obt venta por id: ',respu['usuario']);
          if(respu['mensaje'][0]['CODIGO']==1){
            this.ventaAct=respu['usuario'][0]
            this.datVentaAct.emit(this.ventaAct);
            this.detProdElim.emit(js);
            this.listaAddBool=[];
            this.evaluarProds();
          }else{
            //console.log('no',resp);
          }
        });
      }else{
        //console.log('no',resp);
      }
    });
  }

  actualizarProd(){
    this.datosDetalleProd.SUB_TOTAL=this.datosDetalleProd.CANTIDAD_PRODUCTO*this.datosDetalleProd.MONTO_UNITARIO
    this.datosDetalleProd.ID_VENTA=this.VS.datosVentAct.ID_VENTA;
    this.VS.actualizarProducto(this.datosDetalleProd, this.ventaAct.ID_VENTA).subscribe((resp) => {
      //console.log('resp',resp['mensaje']);
      if(resp['mensaje'][0]['CODIGO']==1){
        this.VS.obtenerVenta(this.ventaAct.ID_VENTA).subscribe((respu) => {
          console.log('resp obt venta por id: ',respu['usuario']);
          if(respu['mensaje'][0]['CODIGO']==1){
            this.ventaAct=respu['usuario'][0]
            this.datVentaAct.emit(this.ventaAct);
            this.detProdAct.emit(this.datosDetalleProd);
            this.listaAddBool=[];
            this.evaluarProds();
            Swal.fire({
              icon: 'success',
              title: 'Producto actualizado con exito'
            })
            let dc = document.getElementById("closeActProd");
            dc?.click()

            this.datosDetalleProd={
              ID_DETALLE_VENTA: 0,
              ID_PRODUCTO: 0,
              NOMBRE_PRODUCTO: '',
              MARCA_PRODUCTO: '',
              IMG_PRODUCTO: '',
              ID_VENTA: 0,
              MONTO_UNITARIO: 0,
              CANTIDAD_PRODUCTO: 1,
              SUB_TOTAL: 0,
              TOTAL: 0
            }
            this.enam=false
          }else{
            //console.log('no',resp);
          }
        });
      }else{
        Swal.fire({
          icon: 'error',
          title: 'Oops... No se pudo actualizar el producto',
          text: 'El manager de inventario debe activar el producto para su compra y venta'
        })
        this.enam=false
        //console.log('no',resp);
      }
    });
  }

  evaluarDatos(opcion:any) {
    let cD=false;
    let dC=false;
    if(this.datosDetalleProd.CANTIDAD_PRODUCTO==null){
      this.msj='La cantidad no puede ir vacía'
      this.enam=true;
    }else{
      if (this.verificacionDatos('cantidad')) {
        cD=true;
        this.msj='La cantidad debe ser un entero positivo mayor que cero'
      }
      if (this.datosDetalleProd.CANTIDAD_PRODUCTO>this.datosVentProd.EXISTENCIA) {
        cD=true;
        this.msj=`La cantidad no puede ser mayor que la existencia del producto`
      }
      if(!cD && !dC){
        if(opcion=='add'){
          this.agregarProd();
        }else{
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
      if(regexi.test(this.datosDetalleProd.CANTIDAD_PRODUCTO.toString())){
        validation=false;
      }else{
        validation=true;
      }
    }
    return validation
  }

  cerrar(){
    this.datosDetalleProd={
      ID_DETALLE_VENTA: 0,
      ID_PRODUCTO: 0,
      NOMBRE_PRODUCTO: '',
      MARCA_PRODUCTO: '',
      IMG_PRODUCTO: '',
      ID_VENTA: 0,
      MONTO_UNITARIO: 0,
      CANTIDAD_PRODUCTO: 1,
      SUB_TOTAL: 0,
      TOTAL: 0
    }
    this.msj=''
    this.enam=false
  }

  cancel(){
    this.datosDetalleProd.CANTIDAD_PRODUCTO=this.datosTemp.CANTIDAD_PRODUCTO
    this.msj=''
    this.enam=false
  }
}
