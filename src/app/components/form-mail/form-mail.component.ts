import { Component, Input, OnInit } from '@angular/core';
import { Parameter } from 'src/app/interfaces/objects.interface';
import { MantenimientoService } from 'src/app/services/mantenimiento.service';

@Component({
  selector: 'app-form-mail',
  templateUrl: './form-mail.component.html',
  styleUrls: ['./form-mail.component.css', '../../../forms_styles.css']
})
export class FormMailComponent implements OnInit {
  actionVal:any = 0;
  rend=false;
  _params:Parameter[]=[];
  msjCheck='';

  @Input() datosParametros = {
    host:'',
    usuario:'',
    contrasena:'',
    proveedor:'',
    puerto:''
  }

  constructor(private MS:MantenimientoService) { }

  ngOnInit(): void {
    this.obtenerParametros();
  }

  actionAct(value:any){
    this.actionVal = value;
  }

  obtenerParametros(){
    this.MS.obtenerParametros().subscribe((resp) => {
      console.log('resp',resp['parametros']);
      if(resp['mensaje'][0]['CODIGO']==1){
        this._params=resp['parametros'];
        this.datosParametros.host = resp['parametros'][0]['VALOR'];
        this.datosParametros.usuario =resp['parametros'][5]['VALOR'];
        this.datosParametros.contrasena =resp['parametros'][9]['VALOR'];
        this.datosParametros.proveedor =resp['parametros'][8]['VALOR'];
        this.datosParametros.puerto =resp['parametros'][7]['VALOR'];
        this.rend=true;
      }else{
        //console.log('no',resp);
        this.msjCheck=`No se pudo obtener la lista de parametros`
      }
    });
  }

  actualizarParametros(){
    console.log('datosParametros',this.datosParametros);

    var Js = [
      {
        "ID_PARAMETRO": this._params[0]['ID_PARAMETRO'],
        "PARAMETRO": this._params[0]['PARAMETRO'],
        "ID_USUARIO": this._params[0]['ID_USUARIO'],
        "VALOR": this.datosParametros.host,
      },
      {
        "ID_PARAMETRO": this._params[5]['ID_PARAMETRO'],
        "PARAMETRO": this._params[5]['PARAMETRO'],
        "ID_USUARIO": this._params[5]['ID_USUARIO'],
        "VALOR": this.datosParametros.usuario,
      },
      {
        "ID_PARAMETRO": this._params[9]['ID_PARAMETRO'],
        "PARAMETRO": this._params[9]['PARAMETRO'],
        "ID_USUARIO": this._params[9]['ID_USUARIO'],
        "VALOR": this.datosParametros.contrasena,
      },
      {
        "ID_PARAMETRO": this._params[8]['ID_PARAMETRO'],
        "PARAMETRO": this._params[8]['PARAMETRO'],
        "ID_USUARIO": this._params[8]['ID_USUARIO'],
        "VALOR": this.datosParametros.proveedor,
      },
      {
        "ID_PARAMETRO": this._params[7]['ID_PARAMETRO'],
        "PARAMETRO": this._params[7]['PARAMETRO'],
        "ID_USUARIO": this._params[7]['ID_USUARIO'],
        "VALOR": this.datosParametros.puerto,
      }
    ]

  }
}
