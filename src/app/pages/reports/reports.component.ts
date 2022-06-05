import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Bitacora, Kardex, Product, Purchase, Sale } from 'src/app/interfaces/objects.interface';
import { ComprasService } from 'src/app/services/compras.service';
import { MantenimientoService } from 'src/app/services/mantenimiento.service';
import { ReporteService } from 'src/app/services/reporte.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {
  productos:Product[]=[]
  _kardex:Kardex[]=[];
  fechaAct:any;
  enam=false;
  msj='';
  newHeaders:any;

  _compras:any=[];
  _ventas:any=[];
  _bitacora:any=[];

  @Input() datosProd:Product={
    ID_PRODUCTO: 1,
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

  @Input() datosFechas={
    fechaIni: '',
    fechaFin: ''
  }

  constructor(private MS:MantenimientoService, private CP:ComprasService, private datepipe:DatePipe, private modal:NgbModal, private RP:ReporteService) {
    let currentDateTime =this.datepipe.transform((new Date), 'yyyy-MM-dd');
    this.fechaAct=currentDateTime;
    this.datosFechas.fechaFin=this.fechaAct
    this.CP.obtenerProductos()
    this.productos=this.CP._products;
  }

  ngOnInit(): void {
    localStorage.setItem('ruta', 'reports');
  }

  descargarDB(){
    console.log('Descargando archivo DB');
    this.MS.crearBackUp();
  }

  crearKardex(){
    console.log('escogio el producto con id: ',this.datosProd.ID_PRODUCTO)
    this.CP.obtenerKardex(this.datosProd.ID_PRODUCTO).subscribe((resp) => {
      //console.log('kardex',resp['inventario']);
      if(resp['mensaje'][0]['CODIGO']==1){
        this._kardex=resp['inventario'];
        this.downloadFileKardex(this._kardex)
        Swal.fire({
          icon: 'success',
          title: `Descarga en proceso...`,
          text:  `El documento se descargara de forma automatica.`,
          confirmButtonText: 'OK',
        });
      }else{
        //console.log('no',resp);
      }
    });
    this.modal.dismissAll();
  }

  crearRepVentas(){
    let datTemp:any;
    const data = {
      "FECHA_INICIO": this.datosFechas.fechaIni.toString(),
      "FECHA_FIN": this.datosFechas.fechaFin.toString()
    }
    this.RP.obtenerVentas(data).subscribe((resp) =>{
      if(resp["mensaje"][0]["CODIGO"] == 0){
        Swal.fire({
          icon: 'error',
          title: 'Algo ha salido mal...',
          text: 'Al parecer no hay registro que coincidan con el intervalo de tiempo indicado.'
        });
        this.modal.dismissAll();
      }else{
        datTemp = resp["data"][0];
        for (let i = 0; i < datTemp.length; i++) {
          const element = datTemp[i];
          this._ventas.push({
            "CANTIDAD_VENTA":element.CANTIDAD_VENTA,"COMISION_EMPLEADO":element.COMISION_EMPLEADO,"DESCRIPCION_VENTA":element.DESCRIPCION_VENTA,"ESTADO":element.ESTADO,"FECHA_VENTA":element.FECHA_VENTA,"FORMA_PAGO":element.FORMA_PAGO,"ID_CLIENTE":element.ID_CLIENTE,"ID_PAGO":element.ID_PAGO,"ID_USUARIO":element.ID_USUARIO,"ID_VENTA":element.ID_VENTA,"ISV":element.ISV,"NOMBRE_CLIENTE":element.NOMBRE_CLIENTE,"TOTAL_VENTA":element.TOTAL_VENTA,"USUARIO":element.USUARIO
          })
        }
        console.log(this._ventas);
        this.downloadFileVentas(this._ventas)
        Swal.fire({
          icon: 'success',
          title: `Descarga en proceso...`,
          text:  `El documento se descargara de forma automatica.`,
          confirmButtonText: 'OK',
        });
        this.modal.dismissAll();
      }
    });

    this.datosFechas={
      fechaIni: '',
      fechaFin: this.fechaAct
    }
  }

  crearRepCompras(){
    let compTemps:any;
    const data = {
      "FECHA_INICIO": this.datosFechas.fechaIni.toString(),
      "FECHA_FIN": this.datosFechas.fechaFin.toString()
    }
    this.RP.obtenerCompras(data).subscribe((resp) =>{
      if(resp["mensaje"][0]["CODIGO"] == 0){
        Swal.fire({
          icon: 'error',
          title: 'Algo ha salido mal...',
          text: 'Al parecer no hay registro que coincidan con el intervalo de tiempo indicado.'
        });
        this.modal.dismissAll();
      }else{
        compTemps = resp["data"][0];
        for (let i = 0; i < compTemps.length; i++) {
          const element = compTemps[i];
          this._compras.push({
            "ESTADO":element.ESTADO, "FECHA_COMPRA":element.FECHA_COMPRA, "FORMA_PAGO":element.FORMA_PAGO, "ID_COMPRA":element.ID_COMPRA, "ID_PAGO":element.ID_PAGO, "ID_PROVEEDOR":element.ID_PROVEEDOR, "ID_USUARIO":element.ID_USUARIO, "ISV_COMPRA":element.ISV_COMPRA, "NOMBRE_PROVEEDOR":element.NOMBRE_PROVEEDOR, "OBSERVACION_COMPRA":element.OBSERVACION_COMPRA, "TOTAL_COMPRA":element.TOTAL_COMPRA, "USUARIO":element.USUARIO
          })
        }
        console.log(this._compras);
        this.downloadFileCompras(this._compras)
        Swal.fire({
          icon: 'success',
          title: `Descarga en proceso...`,
          text:  `El documento se descargara de forma automatica.`,
          confirmButtonText: 'OK',
        });
      }
    });
    this.modal.dismissAll();
    this.datosFechas={
      fechaIni: '',
      fechaFin: this.fechaAct
    }
  }

  crearRepBitacora(){
    let temp:any;
    const data = {
      "FECHA_INICIO": this.datosFechas.fechaIni.toString(),
      "FECHA_FIN": this.datosFechas.fechaFin.toString()
    }
    this.RP.obtenerBitacora(data).subscribe((resp) =>{
      if(resp["mensaje"][0]["CODIGO"] == 0){
        Swal.fire({
          icon: 'error',
          title: 'Algo ha salido mal...',
          text: 'Al parecer no hay registro que coincidan con el intervalo de tiempo indicado.'
        });
        this.modal.dismissAll();
      }else{
        temp = resp["data"][0];
        for (let i = 0; i < temp.length; i++) {
          const element = temp[i];
          this._bitacora.push({
            "ID_BITACORA":element.ID_BITACORA, "ID_USUARIO":element.ID_USUARIO, "USUARIO":element.USUARIO, "ID_OBJETO":element.ID_OBJETO, "OBJETOS":element.OBJETOS, "ACCION":element.ACCION, "DESCRIPCION":element.DESCRIPCION, "INFORMACION_ANTERIOR":element.INFORMACION_ANTERIOR, "INFORMACION_ACTUAL":element.INFORMACION_ACTUAL, "FECHA_BITACORA":element.FECHA_BITACORA
          })
        }
        console.log(this._bitacora);
        this.downloadFileBitacora(this._bitacora)
        Swal.fire({
          icon: 'success',
          title: `Descarga en proceso...`,
          text:  `El documento se descargara de forma automatica.`,
          confirmButtonText: 'OK',
        });
        this.modal.dismissAll();
      }
    });
    this.datosFechas={
      fechaIni: '',
      fechaFin: this.fechaAct
    }
  }

  downloadFileKardex(data) {
    let arrHeader = ["ID_KARDEX","ID_INVENTARIO","EXISTENCIA","PRECIO_UNITARIO","NOMBRE_PRODUCTO","MARCA_PRODUCTO","FECHA_VENCI_PRODUCTO","CANTIDAD","TOTAL","TIPO_MOVIMIENTO","FECHA_MOVIMIENTO"];
    this.newHeaders=arrHeader;
    let csvData = this.ConvertToCSV(data, arrHeader);
    //console.log(csvData)
    let blob = new Blob(['\ufeff' + csvData], { type: 'text/csv;charset=utf-8;' });
    let dwldLink = document.createElement("a");
    let url = URL.createObjectURL(blob);
    let isSafariBrowser = navigator.userAgent.indexOf('Safari') != -1 && navigator.userAgent.indexOf('Chrome') == -1;
    if (isSafariBrowser) {  //if Safari open in new window to save file with random filename.
      dwldLink.setAttribute("target", "_blank");
    }
    dwldLink.setAttribute("href", url);
    dwldLink.setAttribute("download", `kardex.csv`);
    dwldLink.style.visibility = "hidden";
    document.body.appendChild(dwldLink);
    dwldLink.click();
    document.body.removeChild(dwldLink);
  }

  downloadFileCompras(data){
    let arrHeader = ["ESTADO", "FECHA_COMPRA", "FORMA_PAGO", "ID_COMPRA", "ID_PAGO", "ID_PROVEEDOR", "ID_USUARIO", "ISV_COMPRA", "MENSAJE", "NOMBRE_PROVEEDOR", "OBSERVACION_COMPRA", "TOTAL_COMPRA", "USUARIO"];
    this.newHeaders=arrHeader;
    let csvData = this.ConvertToCSV(data, arrHeader);
    //console.log(csvData)
    let blob = new Blob(['\ufeff' + csvData], { type: 'text/csv;charset=utf-8;' });
    let dwldLink = document.createElement("a");
    let url = URL.createObjectURL(blob);
    let isSafariBrowser = navigator.userAgent.indexOf('Safari') != -1 && navigator.userAgent.indexOf('Chrome') == -1;
    if (isSafariBrowser) {  //if Safari open in new window to save file with random filename.
      dwldLink.setAttribute("target", "_blank");
    }
    dwldLink.setAttribute("href", url);
    dwldLink.setAttribute("download", `compras.csv`);
    dwldLink.style.visibility = "hidden";
    document.body.appendChild(dwldLink);
    dwldLink.click();
    document.body.removeChild(dwldLink);
  }

  downloadFileVentas(data) {
    let arrHeader = ["CANTIDAD_VENTA","COMISION_EMPLEADO","DESCRIPCION_VENTA","ESTADO","FECHA_VENTA","FORMA_PAGO","ID_CLIENTE","ID_PAGO","ID_USUARIO","ID_VENTA","ISV","NOMBRE_CLIENTE","TOTAL_VENTA","USUARIO"];
    this.newHeaders=arrHeader;
    let csvData = this.ConvertToCSV(data, arrHeader);
    //console.log(csvData)
    let blob = new Blob(['\ufeff' + csvData], { type: 'text/csv;charset=utf-8;' });
    let dwldLink = document.createElement("a");
    let url = URL.createObjectURL(blob);
    let isSafariBrowser = navigator.userAgent.indexOf('Safari') != -1 && navigator.userAgent.indexOf('Chrome') == -1;
    if (isSafariBrowser) {  //if Safari open in new window to save file with random filename.
      dwldLink.setAttribute("target", "_blank");
    }
    dwldLink.setAttribute("href", url);
    dwldLink.setAttribute("download", `kardex_${this.datosProd.NOMBRE_PRODUCTO}.csv`);
    dwldLink.style.visibility = "hidden";
    document.body.appendChild(dwldLink);
    dwldLink.click();
    document.body.removeChild(dwldLink);
  }

  downloadFileBitacora(data) {
    let arrHeader = ["ID_BITACORA", "ID_USUARIO", "USUARIO", "ID_OBJETO", "OBJETOS", "ACCION", "DESCRIPCION", "INFORMACION_ANTERIOR", "INFORMACION_ACTUAL", "FECHA_BITACORA"];
    this.newHeaders=arrHeader;
    let csvData = this.ConvertToCSV(data, arrHeader);
    //console.log(csvData)
    let blob = new Blob(['\ufeff' + csvData], { type: 'text/csv;charset=utf-8;' });
    let dwldLink = document.createElement("a");
    let url = URL.createObjectURL(blob);
    let isSafariBrowser = navigator.userAgent.indexOf('Safari') != -1 && navigator.userAgent.indexOf('Chrome') == -1;
    if (isSafariBrowser) {  //if Safari open in new window to save file with random filename.
      dwldLink.setAttribute("target", "_blank");
    }
    dwldLink.setAttribute("href", url);
    dwldLink.setAttribute("download", `kardex_${this.datosProd.NOMBRE_PRODUCTO}.csv`);
    dwldLink.style.visibility = "hidden";
    document.body.appendChild(dwldLink);
    dwldLink.click();
    document.body.removeChild(dwldLink);
  }

  ConvertToCSV(objArray, headerList) {
    //console.log(objArray);
    //console.log(headerList);
    let array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
    let str = '';
    let row = 'N°;';

    for (let index in this.newHeaders) {
      row += this.newHeaders[index] + ';';
    }
    row = row.slice(0, -1);
    str += row + '\r\n';
    for (let i = 0; i < array.length; i++) {
      let line = (i + 1) + '';
      for (let index in headerList) {
        let head = headerList[index];
        line += '; ' + this.strRep(array[i][head]);
      }
      str += line + '\r\n';
    }
    return str;
  }

  strRep(data) {
    if(typeof data == "string") {
      let newData = data.replace(/;/g, ":");
       return newData;
    }
    else if(typeof data == "undefined") {
      return " --- ";
    }
    else if(typeof data == "number") {
      return  data.toString();
    }
    else {
      return data;
    }
  }

  evaluarDatos(opcion:any){
    let i = this.datosFechas.fechaIni
    let f = this.datosFechas.fechaFin
    let aL = new Date(this.fechaAct).valueOf()
    let iL = new Date(i).valueOf()
    let fL = new Date(f).valueOf()
    /* console.log('aL ', aL)
    console.log('dL ', iL)
    console.log('fL ', fL)
    console.log('fechas: ',this.datosFechas) */
    let fIni=false;
    let fFin=false;
    let fI=false;
    let fLA=false;
    let fIA=false;
    if(this.datosFechas.fechaIni==''){
      fIni=true;
      this.msj='Fecha inicial vacia ingrese una fecha valida'
    }
    if(this.datosFechas.fechaFin==''){
      fIni=true;
      this.msj='Fecha final vacia ingrese una fecha valida'
    }
    if(iL>aL){
      fI=true;
      this.msj='Fecha inicial no puede ser mayor que la fecha actual'
    }
    if(iL>fL){
      fIA=true;
      this.msj='Fecha inicial no puede ser mayor que la fecha final'
    }
    if(fL>aL){
      fLA=true;
      this.msj='Fecha final no puede ser mayor que la fecha actual'
    }
    if (!fIni && !fFin && !fI && !fIA && !fLA) {
      if(opcion=='ventas'){
        this.crearRepVentas();
      }else if(opcion=='compras'){
        this.crearRepCompras();
      }else if(opcion=='bitacora'){
        this.crearRepBitacora();
      }
      this.enam=false;
    } else {
      this.enam=true;
    }
  }

  cerrar(){
    this.datosFechas={
      fechaIni: '',
      fechaFin: this.fechaAct
    }
    this.modal.dismissAll()
    this.enam=false;
  }
}
