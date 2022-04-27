import { DatePipe, DecimalPipe } from '@angular/common';
import { Component, Input, OnInit, PipeTransform } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { map, Observable, startWith } from 'rxjs';
import { Proveedor } from 'src/app/interfaces/characters.interface';
import { PayMethod, Permission, Purchase } from 'src/app/interfaces/objects.interface';
import { usuario } from 'src/app/interfaces/user.interface';
import { ComprasService } from 'src/app/services/compras.service';
import { InventarioService } from 'src/app/services/inventario.service';
import { MantenimientoService } from 'src/app/services/mantenimiento.service';
import { UsuariosService } from 'src/app/services/usuarios.service';

function search(OBJECT: any, text: string, pipe: PipeTransform): Purchase[] {
  //console.log('ob',OBJECT);
  return OBJECT.filter(ob => {
    const term = text.toLowerCase();
    return pipe.transform(ob.ID_COMPRA).includes(term)
        || ob.OBSERVACION_COMPRA.toLowerCase().includes(term)
        || ob.FECHA_COMPRA.toLowerCase().includes(term)
        || pipe.transform(ob.TOTAL_COMPRA).includes(term)
        || pipe.transform(ob.ESTADO).includes(term)
        || pipe.transform(ob.CREADO_POR).includes(term)
        || ob.USUARIO.toLowerCase().includes(term)
        || ob.PAGO.toLowerCase().includes(term)
        || ob.PROVEEDOR.toLowerCase().includes(term)
  });
}

@Component({
  selector: 'app-card-shopping',
  templateUrl: './card-shopping.component.html',
  styleUrls: ['./card-shopping.component.css']
})
export class CardShoppingComponent implements OnInit {
  shopping=true;
  actionVal:any = 0;
  activo:any = true;
  _obs:Permission[]=this.US._permisos;
  _productosExis=[];
  _compras:any[]=[];
  _compras2:any[]=[];
  _COMPRAS:any[]=[];
  _metodosPagos:PayMethod[]=[];
  _proveedores:Proveedor[]=[];
  _usuarios:usuario[]=[];
  _listDetails:any;
  _usAct=this.US._usuarioActual;
  fechaAct:any;
  //listFiltered:Observable<Purchase[]>;
  filter = new FormControl('');

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

  @Input() datosCompra:Purchase={
    ID_COMPRA: 0,
    ID_USUARIO: 0,
    ID_PAGO: 0,
    ID_PROVEEDOR: 0,
    OBSERVACION_COMPRA: '',
    FECHA_COMPRA: '',
    TOTAL_COMPRA: 0,
    ISV_COMPRA: 0,
    ESTADO: 0,
    USUARIO: '',
    PAGO: '',
    PROVEEDOR: ''
  }

  datosCom = {
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

  constructor(private MS:MantenimientoService, private IN:InventarioService, private CP:ComprasService, private modalService: NgbModal, private US:UsuariosService,  private datepipe:DatePipe) {
    /* this.listFiltered = this.filter.valueChanges.pipe(
      startWith(''),
      map(text => search(this._compras2, text, this.pipe))
    ); */
    let currentDateTime =this.datepipe.transform((new Date), 'yyyy-MM-dd');
    this.fechaAct=currentDateTime;
    this._obs=this.US._permisos;
    this.CP.obtenerCompras();
    this.CP.obtenerProveedores();
    this.IN.obtenerExistenciaInventario();
    this.MS.obtenerMetodosPagos();
    this.US.obtenerUsuarios();
    this._COMPRAS = this.CP._compras;
    this.collectionSize = this.CP._compras.length;
    this._proveedores = this.CP._proveedores;
    this._productosExis = this.IN._inventarioExixtencia;
    this._metodosPagos = this.MS._payMethods;
    this._usuarios = this.US._usuarios;
    for (let i = 0; i < this._obs.length; i++) {
      if(this._obs[i].ID_OBJETO ==3){
        this.ob = this._obs[i];
        this.condition=true;
        //console.log(this.ob)
      }
    }
    //console.log('provs', this._proveedores)
    //console.log('pagos', this._metodosPagos)
    for (let i = 0; i < this._COMPRAS.length; i++) {
      this.datosCom = this._COMPRAS[i];
      for (let j = 0; j < this._usuarios.length; j++) {
        if(this._COMPRAS[i].ID_USUARIO==this._usuarios[j].ID_USUARIO){
          this.datosCom.USUARIO=this._usuarios[j].USUARIO;
        }
      }

      for (let j = 0; j < this._metodosPagos.length; j++) {
        if(this._COMPRAS[i].ID_PAGO==this._metodosPagos[j].ID_PAGO){
          this.datosCom.PAGO=this._metodosPagos[j].FORMA_PAGO;
        }
      }

      for (let j = 0; j < this._proveedores.length; j++) {
        if(this._COMPRAS[i].ID_PROVEEDOR==this._proveedores[j].ID_PROVEEDOR){
          this.datosCom.PROVEEDOR=this._proveedores[j].NOMBRE_PROVEEDOR;
        }
      }
      this.datosCom.FECHA_COMPRA=this.fechaAct
      this._compras.push(this.datosCom);
    }
    this._compras2=this._compras;
    //console.log('compras', this._compras2)

  }

  ngOnInit(): void {
    /* this.listFiltered = this.filter.valueChanges.pipe(
      startWith(''),
      map(text => search(this._compras2, text, this.pipe))
    ); */
  }

  getInventario(){
    this.CP.obtenerCompras();
    this.CP.obtenerProveedores();
    this.IN.obtenerExistenciaInventario();
    this.MS.obtenerMetodosPagos();
    this.US.obtenerUsuarios();
    this._COMPRAS = this.CP._compras;
    this.collectionSize = this.CP._compras.length;
    this._proveedores = this.CP._proveedores;
    this._productosExis = this.IN._inventarioExixtencia;
    this._metodosPagos = this.MS._payMethods;
    this._usuarios = this.US._usuarios;
  }

  refreshCompras() {
    this._compras = this._compras2
      .map((prod, i) => ({id: i + 1, ...prod}))
      .slice((this.page_number - 1) * this.page_size, (this.page_number - 1) * this.page_size + this.page_size);
  }

  openModl(id:any){
    for(let comp of this._compras2){
      if(comp.ID_COMPRA==id){
        this.CP.obtenerDetallesCompra(id);
        this.CP.datosCompAct=comp;
        this._listDetails=this.CP._detallesCompras;
      }
    }
    console.log('escogio la card con id: ',id);
  }

  actionAct(value:any){
    this.actionVal = value;
  }

  activOption(value:Boolean){
    if(value){
      this.datosCompra.ESTADO=1
    }else{
      this.datosCompra.ESTADO=0
    }
  }

  openModal(content:any) {
    this.modalService.open(content, {backdropClass: 'light-red-backdrop', size: 'xl', centered: true });
  }

  actCompra(){
    console.log('datosProducto a actualizar',this.datosCompra)
    this.modalService.dismissAll();
  }

  crearCompra(){
    this.datosCompra.ID_USUARIO=this._usAct
    console.log('datosCrear',this.datosCompra)

  }

  actDatosComp(datos:any){
    console.log('desde padre', datos)
    this.datosCompra=datos;
    this.CP.datosCompAct=datos;
    for (let i = 0; i < this._compras2.length; i++) {
      const element = this._compras2[i];
      if(element.ID_COMPRA==this.datosCompra.ID_COMPRA){
        this._compras2[i].ID_PAGO=parseInt(datos.ID_PAGO)
        this._compras2[i].OBSERVACION_COMPRA=datos.OBSERVACION_COMPRA
        this._compras2[i].FECHA_COMPRA=datos.FECHA_COMPRA
        this._compras2[i].TOTAL_COMPRA=datos.TOTAL_COMPRA
        this._compras2[i].ISV_COMPRA=datos.ISV_COMPRA
      }
    }

  }

  obtLista(datos:any){
    this._listDetails=datos;
  }

  ProcesarListComp(lista:any){
    this._compras2=lista;
  }
}
