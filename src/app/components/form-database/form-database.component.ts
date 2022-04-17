import { Component, Input, OnInit } from '@angular/core';
import { Parameter } from 'src/app/interfaces/objects.interface';
import { MantenimientoService } from 'src/app/services/mantenimiento.service';

@Component({
  selector: 'app-form-database',
  templateUrl: './form-database.component.html',
  styleUrls: ['./form-database.component.css', '../../../forms_styles.css']
})
export class FormDatabaseComponent implements OnInit {
  actionVal:any = 0;
  rend=false;
  _params:Parameter[]=[];
  msjCheck='';

  @Input() datosParametros = {
    host:'',
    usuario:'',
    nombre_base:'',
    contrasena:''
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
        this.datosParametros.nombre_base =resp['parametros'][2]['VALOR'];
        this.datosParametros.contrasena =resp['parametros'][6]['VALOR'];
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
        "ID_PARAMETRO": this._params[2]['ID_PARAMETRO'],
        "PARAMETRO": this._params[2]['PARAMETRO'],
        "ID_USUARIO": this._params[2]['ID_USUARIO'],
        "VALOR": this.datosParametros.nombre_base,
      },
      {
        "ID_PARAMETRO": this._params[6]['ID_PARAMETRO'],
        "PARAMETRO": this._params[6]['PARAMETRO'],
        "ID_USUARIO": this._params[6]['ID_USUARIO'],
        "VALOR": this.datosParametros.contrasena,
      }
    ]

  }
}
