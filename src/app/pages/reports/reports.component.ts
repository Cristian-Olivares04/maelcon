import { Component, OnInit } from '@angular/core';
import { Kardex, Product } from 'src/app/interfaces/objects.interface';
import { ComprasService } from 'src/app/services/compras.service';
import { MantenimientoService } from 'src/app/services/mantenimiento.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {
  productos:Product[]=[]
  _kardex:Kardex[]=[];

  datosProd:Product={
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

  constructor(private MS:MantenimientoService, private CP:ComprasService) {
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

  crearReporte(){
    console.log('escogio el producto con id: ',this.datosProd.ID_PRODUCTO)
    this.CP.obtenerKardex(this.datosProd.ID_PRODUCTO).subscribe((resp) => {
      //console.log('kardex',resp['inventario']);
      if(resp['mensaje'][0]['CODIGO']==1){
        this._kardex=resp['inventario'];
        this.downloadFile(this._kardex)
      }else{
        //console.log('no',resp);
      }
    });
  }

  downloadFile(data) {
    let arrHeader = ["ID_KARDEX","ID_INVENTARIO","EXISTENCIA","PRECIO_UNITARIO","NOMBRE_PRODUCTO","MARCA_PRODUCTO","FECHA_VENCI_PRODUCTO","CANTIDAD","TOTAL","TIPO_MOVIMIENTO","FECHA_MOVIMIENTO"];
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

    let newHeaders = ["ID_KARDEX","ID_INVENTARIO","EXISTENCIA","PRECIO_UNITARIO","NOMBRE_PRODUCTO","MARCA_PRODUCTO","FECHA_VENCI_PRODUCTO","CANTIDAD","TOTAL","TIPO_MOVIMIENTO","FECHA_MOVIMIENTO"];

    for (let index in newHeaders) {
      row += newHeaders[index] + ';';
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
}
