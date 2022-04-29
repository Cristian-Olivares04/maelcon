import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Cliente } from 'src/app/interfaces/characters.interface';
import { CompleteProduct, PayMethod, SaleDetail, SaleInit } from 'src/app/interfaces/objects.interface';
import { usuario } from 'src/app/interfaces/user.interface';
import { InventarioService } from 'src/app/services/inventario.service';
import { MantenimientoService } from 'src/app/services/mantenimiento.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { VentasService } from 'src/app/services/ventas.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-details-sales',
  templateUrl: './details-sales.component.html',
  styleUrls: ['./details-sales.component.css', '../../../forms_styles.css']
})
export class DetailsSalesComponent implements OnInit {
  shopping = false;
  activo:any = true;
  @Output() listaVentas = new EventEmitter<any>();
  @Output() datsVentAct = new EventEmitter<any>();
  @Output() listDetails = new EventEmitter<any>();
  listadoProds:CompleteProduct[]=[];
  listDetalleVenta:SaleDetail[]=[];
  actionOption:Boolean = true;
  _metodosPagos:PayMethod[]=[];
  _clientes:Cliente[]=[];
  _usuarios:usuario[]=[];
  _productosExis=[];
  _productosExisTemp:CompleteProduct[] = [];
  _listadoVentas:any;
  fechaAct:any;

  @Input() datosVenta:SaleInit={
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

  constructor(private VS:VentasService, private MS:MantenimientoService, private IN:InventarioService, private modalService: NgbModal, private US:UsuariosService, private datepipe:DatePipe, private _Router:Router) {
    let currentDateTime =this.datepipe.transform((new Date), 'yyyy-MM-dd');
    this.fechaAct=currentDateTime;
    //console.log(currentDateTime);
    this.datosVenta=this.VS.datosVentAct;
    this.datosVenta.FECHA_VENTA=this.fechaAct;
    this.MS.obtenerMetodosPagos();
    this.US.obtenerUsuarios();
    this.IN.obtenerProductosCompletos();
    this.VS.obtenerClientes();
    this._listadoVentas=this.VS._ventas;
    this.listDetalleVenta=this.VS._detallesVenta;
    this._productosExisTemp = this.IN._products;
    this._metodosPagos = this.MS._payMethods;
    this._usuarios = this.US._usuarios;
    this._clientes = this.VS._clientes;
    for (let i = 0; i < this._productosExisTemp.length; i++) {
      const element = this._productosExisTemp[i];
      if(element.ESTADO==1 && element.EXISTENCIA>0){
        this.listadoProds.push(element);
      }
    }

    //console.log('listaprductos: ', this.listadoProds)
  }

  ngOnInit(): void {
  }

  openModal(content:Object) {
    this.modalService.open(content, {backdropClass: 'light-red-backdrop', backdrop: 'static', size: 'xl', centered: true });
  }

  changeOption(value:Boolean){
    //this.IN._compAct = this.datosCom;
    this.actionOption = value;
  }

  activarCompra(estado:any){
    var num = 0;
    if(estado){
      num=1;
    }
    this.datosVenta.ESTADO=num;
  }

  cambioDatosVenta(){
    let js = {
      "ID_PAGO":parseInt(this.datosVenta.ID_PAGO.toString()),
      "DESCRIPCION_VENTA":this.datosVenta.DESCRIPCION_VENTA,
      "ID_USUARIO":this.US._usuarioActual,
      "ID_CLIENTE":this.datosVenta.ID_CLIENTE,
    }
    console.log('cambios: ',js)
    for (let i = 0; i < this._metodosPagos.length; i++) {
      if(this._metodosPagos[i].ID_PAGO==this.datosVenta.ID_PAGO){
        this.datosVenta.FORMA_PAGO=this._metodosPagos[i].FORMA_PAGO;
      }
    }
    this.VS.actualizarVentaEncabezado(js, this.datosVenta.ID_VENTA).subscribe(resp =>{
      if(resp['mensaje'][0]['CODIGO']==1){
        this.datosVenta.ID_PAGO=parseInt(this.datosVenta.ID_PAGO.toString())
        this.datsVentAct.emit(this.datosVenta)
      }
    })
  }

  actVentaAct(datos:any){
    console.log('nuevos datos compras ', datos)
    this.datosVenta=datos;
    this.datsVentAct.emit(this.datosVenta)
  }

  procesDatos(datos:SaleDetail) {
    let tempDatosDetalle=datos
    tempDatosDetalle.ID_VENTA=this.datosVenta.ID_VENTA
    console.log('hijo-padre',tempDatosDetalle)
    this.listDetalleVenta.push(tempDatosDetalle);
    this.listDetails.emit(this.listDetalleVenta);
    this.actionOption = !this.actionOption;
  }

  elimProdDetalle(datos:any){
    //console.log('eliminar prod: ',datos)
    for (let i = 0; i < this.listDetalleVenta.length; i++) {
      const element = this.listDetalleVenta[i];
      if(element.ID_PRODUCTO==datos.ID_PRODUCTO){
        this.listDetalleVenta.splice(i,1);
        this.actionOption = !this.actionOption;
      }
    }
  }

  actProdDetalle(datos:SaleDetail){
    datos.ID_VENTA=this.datosVenta.ID_VENTA
    console.log('actualizar prod: ',datos)
    for (let i = 0; i < this.listDetalleVenta.length; i++) {
      const element = this.listDetalleVenta[i];
      if(element.ID_PRODUCTO==datos.ID_PRODUCTO){
        this.listDetalleVenta[i]=datos;
        this.actionOption = !this.actionOption;
      }

    }
  }

  eliminarVenta(){
    /* Swal.fire({
      title: `¿Deseas eliminar la compra?`,
      showDenyButton: true,
      showCancelButton: true,
      icon: 'question',
      showConfirmButton: false,
      denyButtonText: `Eliminar`,
    }).then((result) => {
      if (result.isDenied) {
        this.CP.eliminarCompra({"ID_USUARIO":this.US._usuarioActual}, this.datosVenta.ID_COMPRA).subscribe((resp) => {
          console.log('resp',resp['mensaje']);
          if(resp['mensaje'][0]['CODIGO']==1){
            for (let i = 0; i < this._listadoCompras.length; i++) {
              const element = this._listadoCompras[i];
              if(element.ID_COMPRA==this.datosVenta.ID_COMPRA){
                this._listadoCompras.splice(i,1)
                this.listaVentas.emit(this._listadoCompras)
              }
            }
            Swal.fire({
              icon: 'success',
              title: 'Eliminar compra',
              text: 'La compra se elimino exitosamente',
            })
            this.modalService.dismissAll();
            localStorage.setItem('ruta', 'shopping');
            this._Router.navigate(['/shopping/path?refresh=1']);
          }else{
            Swal.fire({
              icon: 'error',
              title: 'Oops... No se pudo eliminar la compra',
              text: 'Algo salio mal!'
            })
            //console.log('no',resp);
          }
        });
      }
    }) */
  }

  finalizarVenta(){
    /* Swal.fire({
      title: `¿Deseas efectuar la compra?`,
      showDenyButton: false,
      showCancelButton: true,
      icon: 'question',
      showConfirmButton: true,
      confirmButtonText: 'Pagar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.CP.ejecutarCompra({"ID_USUARIO":this.US._usuarioActual}, this.datosVenta.ID_COMPRA).subscribe((resp) => {
          console.log('resp',resp['mensaje']);
          if(resp['mensaje'][0]['CODIGO']==1){
            for (let i = 0; i < this._listadoCompras.length; i++) {
              const element = this._listadoCompras[i];
              if(element.ID_COMPRA==this.datosVenta.ID_COMPRA){
                this._listadoCompras[i].ESTADO=1
                this.listaVentas.emit(this._listadoCompras)
              }
            }
            Swal.fire({
              icon: 'success',
              title: 'Finalizar compra',
              text: 'La compra se realizo exitosamente',
            })
            this.modalService.dismissAll();
            localStorage.setItem('ruta', 'shopping');
            this._Router.navigate(['/shopping/path?refresh=1']);
          }else{
            Swal.fire({
              icon: 'error',
              title: 'Oops... No se pudo realizar la compra',
              text: 'Algo salio mal!'
            })
            //console.log('no',resp);
          }
        });
      }
    }) */
  }
}
