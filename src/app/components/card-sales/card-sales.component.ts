import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Cliente } from 'src/app/interfaces/characters.interface';
import { CompleteProduct, PayMethod, Permission, Sale, SaleInit } from 'src/app/interfaces/objects.interface';
import { usuario } from 'src/app/interfaces/user.interface';
import { InventarioService } from 'src/app/services/inventario.service';
import { MantenimientoService } from 'src/app/services/mantenimiento.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { VentasService } from 'src/app/services/ventas.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-card-sales',
  templateUrl: './card-sales.component.html',
  styleUrls: ['./card-sales.component.css']
})
export class CardSalesComponent implements OnInit {
  shopping = false;
  actionVal:any = 0;
  activo:any = true;
  _obs:Permission[]=this.US._permisos;
  _productosCompletos:CompleteProduct[]=[];
  _productosExis:CompleteProduct[]=[];
  _ventas:any[]=[];
  _ventas2:any[]=[];
  _metodosPagos:PayMethod[]=[];
  _usuarios:usuario[]=[];
  _clientes:Cliente[]=[];
  _listDetails:any;
  _usAct=this.US._usuarioActual;
  fechaAct:any;
  filter = new FormControl('');
  page_number = 1;
  page_size = 4;
  collectionSize = 0;

  ob:Permission = {
    ID_OBJETO: 0,
    ID_ROL: 0,
    PERMISO_INSERCION: 0,
    PERMISO_ELIMINACION: 0,
    PERMISO_ACTUALIZACION: 0,
    PERMISO_CONSULTAR: 0,
    CREADO_POR: 0
  }

  @Input() datosEncabezado:Sale={
    ID_PAGO: 0,
    ID_USUARIO: 0,
    ID_CLIENTE: 0,
    DESCRIPCION: ''
  }

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

  constructor(private VS:VentasService, private MS:MantenimientoService, private IN:InventarioService, private modalService: NgbModal, private US:UsuariosService,  private datepipe:DatePipe) {
    let currentDateTime =this.datepipe.transform((new Date), 'yyyy-MM-dd');
    this.fechaAct=currentDateTime;
    this._obs=this.US._permisos;
    this.IN.obtenerProductosCompletos();
    this.MS.obtenerMetodosPagos();
    this.US.obtenerUsuarios();
    this.VS.obtenerVentas();
    this.VS.obtenerClientes();
    this._ventas=this.VS._ventas;
    this._productosCompletos = this.IN._products;
    this.collectionSize = this.VS._ventas.length;
    this._metodosPagos = this.MS._payMethods;
    this._usuarios = this.US._usuarios;
    this._clientes = this.VS._clientes;

    for (let i = 0; i < this._obs.length; i++) {
      if(this._obs[i].ID_OBJETO ==3){
        this.ob = this._obs[i];
        //console.log(this.ob)
      }
    }
    for (let i = 0; i < this._productosCompletos.length; i++) {
      const element = this._productosCompletos[i];
      for (let j = 0; j < this._usuarios.length; j++) {
        if(element.ESTADO==1){
          this._productosExis.push(element);
        }
      }
    }
    for (let i = 0; i < this._ventas.length; i++) {
      const element = this._ventas[i];
      element.FECHA_VENTA=this.fechaAct;
    }
    this._ventas2=this._ventas;
  }

  ngOnInit(): void {
  }

  actListadoVentas(){
    //console.log('entro a ac lista ventas', this._COMPRAS)
    this._ventas=this.VS._ventas;
    this.collectionSize = this.VS._ventas.length;
    for (let i = 0; i < this._ventas.length; i++) {
      const element = this._ventas[i];
      element.FECHA_VENTA=this.fechaAct;
    }
    this._ventas2=this._ventas;
    //console.log('compras antes de refresh', this._compras2)
    this.refreshVentas();
  }

  refreshVentas() {
    this._ventas = this._ventas2
      .map((venta, i) => ({id: i + 1, ...venta}))
      .slice((this.page_number - 1) * this.page_size, (this.page_number - 1) * this.page_size + this.page_size);
    this.modalService.dismissAll();
  }

  openModl(id:any){
    console.log('escogio la card con id: ',id);
    for(let vent of this._ventas2){
      if(vent.ID_VENTA==id){
        this.VS.obtenerDetalleVenta(id);
        this.VS.datosVentAct=vent;
        this._listDetails=this.VS._detallesVenta;
        //console.log('detalles venta: ', this._listDetails)
      }
    }
  }

  actionAct(value:any){
    this.actionVal = value;
  }

  activOption(value:Boolean){
    this.activo = value;
  }

  openModal(content:Object) {
    this.modalService.open(content, {backdropClass: 'light-red-backdrop', size: 'xl' });
  }

  actVenta(){
    console.log('datosProducto a actualizar',this.datosVenta)
    this.modalService.dismissAll();
  }

  crearVenta(){
    this.datosVenta.ID_USUARIO=this._usAct
    console.log('datosCrear',this.datosVenta);
    this.VS.crearVentaEncabezado(this.datosVenta).subscribe((resp) => {
      //console.log('resp',resp['mensaje']);
      this.VS.obtenerListaVentas().subscribe((respu) => {
        console.log('ventas lista',respu['usuario']);
        if(respu['mensaje'][0]['CODIGO']==1){
          this.VS._ventas=respu['usuario'];
          this.actListadoVentas()
        }else{
          //console.log('no',resp);
        }
      });
      if(resp['mensaje'][0]['CODIGO']==1){
        Swal.fire({
          icon: 'success',
          title: 'Crear venta',
          text: 'La venta se creo exitosamente',
        })
        this.modalService.dismissAll()
      }else{
        Swal.fire({
          icon: 'error',
          title: 'Oops... No se pudo crear la venta',
          text: 'Algo salio mal!'
        })
        this.modalService.dismissAll()
        //console.log('no',resp);
      }
    });
  }

  actDatosVenta(datos:any){
    console.log('desde padre', datos)
    this.datosVenta=datos;
    this.VS.datosVentAct=datos;
    for (let i = 0; i < this._ventas2.length; i++) {
      const element = this._ventas2[i];
      if(element.ID_VENTA==this.datosVenta.ID_VENTA){
        this._ventas2[i].ID_PAGO=parseInt(datos.ID_PAGO)
        this._ventas2[i].OBSERVACION_COMPRA=datos.OBSERVACION_COMPRA
        this._ventas2[i].FECHA_COMPRA=datos.FECHA_COMPRA
        this._ventas2[i].TOTAL_COMPRA=datos.TOTAL_COMPRA
        this._ventas2[i].ISV_COMPRA=datos.ISV_COMPRA
        this._ventas2[i].FORMA_PAGO=datos.FORMA_PAGO
        this._ventas2[i].COMISION_EMPLEADO=datos.COMISION_EMPLEADO
      }
    }

  }

  obtLista(datos:any){
    this._listDetails=datos;
  }

  ProcesarListComp(lista:any){
    this._ventas2=lista;
  }
}
