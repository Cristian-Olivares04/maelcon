import { Component, Input, OnInit } from '@angular/core';
import { Parameter } from 'src/app/interfaces/objects.interface';
import { MantenimientoService } from 'src/app/services/mantenimiento.service';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-form-mail',
  templateUrl: './form-mail.component.html',
  styleUrls: ['./form-mail.component.css', '../../../forms_styles.css']
})
export class FormMailComponent implements OnInit {
  actionVal:any = 0;
  rend=false;
  _params:Parameter[]=[];
  usAct=this.US._usuarioActual;
  msjCheck='';

  @Input() datosParametros = {
    host:'',
    usuario:'',
    contrasena:'',
    proveedor:'',
    puerto:''
  }

  constructor(private MS:MantenimientoService, private US:UsuariosService) { }

  ngOnInit(): void {
    this.obtenerParametros();
  }

  actionAct(value:any){
    this.actionVal = value;
  }

  obtenerParametros(){
    this.MS.obtenerParametros();
    if(this.MS._params!=[]){
      this._params=this.MS._params;
      this.datosParametros.host = this.MS._params[0]['VALOR'];
      this.datosParametros.usuario =this.MS._params[5]['VALOR'];
      this.datosParametros.contrasena =this.MS._params[9]['VALOR'];
      this.datosParametros.proveedor =this.MS._params[8]['VALOR'];
      this.datosParametros.puerto =this.MS._params[7]['VALOR'];
      this.rend=true;
    }else{
      //console.log('no',resp);
      this.msjCheck=`No se pudo obtener la lista de parametros`
    }
  }

  actualizarParametros(){
    console.log('datosParametros',this.datosParametros);

    var parameters = [
      {
        "ID_PARAMETRO": this._params[0]['ID_PARAMETRO'],
        "ID_USUARIO": this.usAct,
        "VALOR": this.datosParametros.host.toString(),
      },
      {
        "ID_PARAMETRO": this._params[5]['ID_PARAMETRO'],
        "ID_USUARIO": this.usAct,
        "VALOR": this.datosParametros.usuario.toString(),
      },
      {
        "ID_PARAMETRO": this._params[9]['ID_PARAMETRO'],
        "ID_USUARIO": this.usAct,
        "VALOR": this.datosParametros.contrasena.toString(),
      },
      {
        "ID_PARAMETRO": this._params[8]['ID_PARAMETRO'],
        "ID_USUARIO": this.usAct,
        "VALOR": this.datosParametros.proveedor.toString(),
      },
      {
        "ID_PARAMETRO": this._params[7]['ID_PARAMETRO'],
        "ID_USUARIO": this.usAct,
        "VALOR": this.datosParametros.puerto.toString(),
      }
    ];

    this.MS.actualizarParametros(parameters).subscribe((resp) => {
      //console.log('resp',resp);
      if(resp[0]['CODIGO']==1){
        this.msjCheck=`${resp[0]['MENSAJE']}`

        this._params[0]['VALOR'] = this.datosParametros.host;
        this._params[0]['ID_USUARIO'] = this.usAct;
        this._params[5]['VALOR'] = this.datosParametros.usuario;
        this._params[5]['ID_USUARIO'] = this.usAct;
        this._params[9]['VALOR'] = this.datosParametros.contrasena;
        this._params[9]['ID_USUARIO'] = this.usAct;
        this._params[8]['VALOR'] = this.datosParametros.proveedor;
        this._params[8]['ID_USUARIO'] = this.usAct;
        this._params[7]['VALOR'] = this.datosParametros.puerto.toString();
        this._params[7]['ID_USUARIO'] = this.usAct;
      }else{
        //console.log('no',resp);
        this.msjCheck=`No se pudo actualizar los parametros`
      }
    });

  }
}
