import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Proveedor } from 'src/app/interfaces/characters.interface';
import { CompleteProduct, PayMethod, Purchase, PurchaseDetail, purchaseProduct } from 'src/app/interfaces/objects.interface';
import { usuario } from 'src/app/interfaces/user.interface';
import { ComprasService } from 'src/app/services/compras.service';
import { InventarioService } from 'src/app/services/inventario.service';
import { MantenimientoService } from 'src/app/services/mantenimiento.service';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-details-shopping',
  templateUrl: './details-shopping.component.html',
  styleUrls: ['./details-shopping.component.css', '../../../forms_styles.css']
})
export class DetailsShoppingComponent implements OnInit {
  shopping = true;
  activo:any = true;
  @Output() datsCompAct = new EventEmitter<any>();
  @Output() listDetails = new EventEmitter<any>();
  listadoProds:CompleteProduct[]=[];
  listDetalleCompr:PurchaseDetail[]=[];
  actionOption:Boolean = true;
  _metodosPagos:PayMethod[]=[];
  _proveedores:Proveedor[]=[];
  _usuarios:usuario[]=[];
  _productosExis=[];
  _productosExisTemp:CompleteProduct[] = [];
  fechaAct:any;

  @Input() datosCom = {
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

  @Input() datosCompra:Purchase={
    ID_COMPRA: 0,
    ID_USUARIO: 0,
    ID_PAGO: 0,
    ID_PROVEEDOR: 0,
    OBSERVACION_COMPRA: '',
    FECHA_COMPRA: '',
    TOTAL_COMPRA: 0,
    ISV_COMPRA: 0,
    ESTADO: 0
  }

  constructor(private CP:ComprasService, private MS:MantenimientoService, private IN:InventarioService, private modalService: NgbModal, private US:UsuariosService, private datepipe:DatePipe) {
    let currentDateTime =this.datepipe.transform((new Date), 'yyyy-MM-dd');
    this.fechaAct=currentDateTime;
    console.log(currentDateTime);
    this.datosCom=this.CP.datosCompAct;
    this.datosCompra.ID_COMPRA=this.datosCom.ID_COMPRA;
    this.datosCompra.ID_USUARIO=this.datosCom.ID_USUARIO;
    this.datosCompra.ID_PAGO=this.datosCom.ID_PAGO;
    this.datosCompra.ID_PROVEEDOR=this.datosCom.ID_PROVEEDOR;
    this.datosCompra.OBSERVACION_COMPRA=this.datosCom.OBSERVACION_COMPRA;
    this.datosCompra.FECHA_COMPRA=this.fechaAct;
    this.datosCompra.TOTAL_COMPRA=this.datosCom.TOTAL_COMPRA;
    this.datosCompra.ISV_COMPRA=this.datosCom.ISV_COMPRA;
    this.datosCompra.ESTADO=this.datosCom.ESTADO;
    this.CP.obtenerProveedores();
    this.IN.obtenerExistenciaInventario();
    this.MS.obtenerMetodosPagos();
    this.US.obtenerUsuarios();
    this.IN.obtenerProductosCompletos();
    this.listDetalleCompr=this.CP._detallesCompras;
    this._productosExisTemp = this.IN._products;
    this._proveedores = this.CP._proveedores;
    this._productosExis = this.IN._inventarioExixtencia;
    this._metodosPagos = this.MS._payMethods;
    this._usuarios = this.US._usuarios;
    this.IN._compAct = this.datosCom;
    for (let i = 0; i < this._productosExisTemp.length; i++) {
      const element = this._productosExisTemp[i];
      if(element.ID_PROVEEDOR == this.datosCompra.ID_PROVEEDOR){
        this.listadoProds.push(element);
      }
    }
    //console.log('listaDetalle-details:', this.listDetalleCompr)
  }

  ngOnInit(): void {
  }

  openModal(content:Object) {
    this.modalService.open(content, {backdropClass: 'light-red-backdrop', size: 'xl', centered: true });
  }

  changeOption(value:Boolean){
    this.IN._compAct = this.datosCom;
    this.actionOption = value;
  }

  activarCompra(estado:any){
    var num = 0;
    if(estado){
      num=1;
    }
    this.datosCompra.ESTADO=num;
  }

  cambioProv(){
    console.log('cambio al proveedor con id:',this.datosCompra.ID_PROVEEDOR)
    for (let i = 0; i < this._productosExisTemp.length; i++) {
      const element = this._productosExisTemp[i];
      if(element.ID_PROVEEDOR == this.datosCompra.ID_PROVEEDOR){
        this.listadoProds.push(element);
      }
    }
    this.actionOption = !this.actionOption;
  }

  procesDatos(datos:PurchaseDetail) {
    let tempDatosDetalle=datos
    tempDatosDetalle.ID_COMPRA=this.datosCompra.ID_COMPRA
    //console.log('hijo-padre',tempDatosDetalle)
    this.listDetalleCompr.push(tempDatosDetalle);
    this.listDetails.emit(this.listDetalleCompr);
    this.actionOption = !this.actionOption;
  }

  elimProdDetalle(datos:any){
    //console.log('eliminar prod: ',datos)
    for (let i = 0; i < this.listDetalleCompr.length; i++) {
      const element = this.listDetalleCompr[i];
      if(element.ID_PRODUCTO==datos.ID_PRODUCTO){
        this.listDetalleCompr.splice(i,1);
        this.actionOption = !this.actionOption;
      }

    }
  }

  actProdDetalle(datos:PurchaseDetail){
    datos.ID_COMPRA=this.datosCompra.ID_COMPRA
    console.log('actualizar prod: ',datos)
    for (let i = 0; i < this.listDetalleCompr.length; i++) {
      const element = this.listDetalleCompr[i];
      if(element.ID_PRODUCTO==datos.ID_PRODUCTO){
        this.listDetalleCompr[i]=datos;
        this.actionOption = !this.actionOption;
      }

    }
  }

  actCompAct(datos:any){
    console.log('nuevos datos compras ', datos)
    this.datosCompra=datos;
    this.datsCompAct.emit(this.datosCompra)
  }
}
