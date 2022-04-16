import { Component, Input, OnInit } from '@angular/core';
import { Parameter } from 'src/app/interfaces/objects.interface';
import { MantenimientoService } from 'src/app/services/mantenimiento.service';

@Component({
  selector: 'app-general-settings',
  templateUrl: './general-settings.component.html',
  styleUrls: ['./general-settings.component.css', '../../../forms_styles.css']
})
export class GeneralSettingsComponent implements OnInit {
  actionVal:any = 0;
  rend=false;
  _params:Parameter[]=[];
  msjCheck='';

  @Input() datosParametros = {
    intentos_sesion:0,
    intentos_recuperacion:0,
    tiempo_duracion:0,
    ISV:0,
    comision:0,
  }

  parametro:Parameter = {
    PARAMETRO: '',
    ID_USUARIO: 0,
    VALOR: '',
    FECHA_CREACION: '',
    FECHA_MODIFICACION: '',
    ID_PARAMETRO: 0
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
      //console.log('resp',resp['parametros']);
      if(resp['mensaje'][0]['CODIGO']==1){
        this._params=resp['parametros'];
        this.datosParametros.ISV = resp['parametros'][0]['VALOR'];
        this.datosParametros.comision =resp['parametros'][1]['VALOR'];
        this.datosParametros.intentos_sesion =resp['parametros'][2]['VALOR'];
        this.datosParametros.intentos_recuperacion =resp['parametros'][3]['VALOR'];
        this.datosParametros.tiempo_duracion =resp['parametros'][4]['VALOR'];
        this.rend=true;
      }else{
        //console.log('no',resp);
        this.msjCheck=`No se pudo obtener la lista de parametros`
      }
    });
  }

  actualizarParametros(){
    //console.log('datosParametros',this.datosParametros);

    var Js = [
      {
        "ID_PARAMETRO": this._params[0]['ID_PARAMETRO'],
        "PARAMETRO": this._params[0]['PARAMETRO'],
        "ID_USUARIO": this._params[0]['ID_USUARIO'],
        "VALOR": this.datosParametros.ISV,
      },
      {
        "ID_PARAMETRO": this._params[1]['ID_PARAMETRO'],
        "PARAMETRO": this._params[1]['PARAMETRO'],
        "ID_USUARIO": this._params[1]['ID_USUARIO'],
        "VALOR": this.datosParametros.comision,
      },
      {
        "ID_PARAMETRO": this._params[2]['ID_PARAMETRO'],
        "PARAMETRO": this._params[2]['PARAMETRO'],
        "ID_USUARIO": this._params[2]['ID_USUARIO'],
        "VALOR": this.datosParametros.intentos_sesion,
      },
      {
        "ID_PARAMETRO": this._params[3]['ID_PARAMETRO'],
        "PARAMETRO": this._params[3]['PARAMETRO'],
        "ID_USUARIO": this._params[3]['ID_USUARIO'],
        "VALOR": this.datosParametros.intentos_recuperacion,
      },
      {
        "ID_PARAMETRO": this._params[4]['ID_PARAMETRO'],
        "PARAMETRO": this._params[4]['PARAMETRO'],
        "ID_USUARIO": this._params[4]['ID_USUARIO'],
        "VALOR": this.datosParametros.tiempo_duracion,
      },
    ]

  }

}
