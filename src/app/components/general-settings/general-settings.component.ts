import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Parameter } from 'src/app/interfaces/objects.interface';
import { MantenimientoService } from 'src/app/services/mantenimiento.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-general-settings',
  templateUrl: './general-settings.component.html',
  styleUrls: ['./general-settings.component.css', '../../../forms_styles.css']
})
export class GeneralSettingsComponent implements OnInit {
  actionVal:any = 0;
  rend=false;
  usAct=this.US._usuarioActual;
  _params:Parameter[]=[];
  msjCheck='';

  @Input() datosParametros = {
    intentos_sesion:0,
    intentos_recuperacion:0,
    tiempo_duracion:0,
    ISV:0,
    comision:0,
  }

  constructor(private MS:MantenimientoService, private US:UsuariosService, private _Router:Router) { }

  ngOnInit(): void {
    this.obtenerParametros();
  }

  actionAct(value:any){
    this.actionVal = value;
  }

  obtenerParametros(){
    if(this.MS._params!=[]){
      this._params=this.MS._params;
      this.datosParametros.ISV = Number(this.MS._params[0]['VALOR']);
      this.datosParametros.comision =Number(this.MS._params[1]['VALOR']);
      this.datosParametros.intentos_sesion =Number(this.MS._params[2]['VALOR']);
      this.datosParametros.intentos_recuperacion =Number(this.MS._params[3]['VALOR']);
      this.datosParametros.tiempo_duracion =Number(this.MS._params[4]['VALOR']);
      this.rend=true;
    }else{
      //console.log('no',resp);
      this.msjCheck=`No se pudo obtener la lista de parametros`
    }
  }

  actualizarParametros(){
    //console.log('datosParametros',this.datosParametros);
    var parameters = [
      {
        "ID_PARAMETRO": this._params[0]['ID_PARAMETRO'],
        "ID_USUARIO": this.usAct,
        "VALOR": this.datosParametros.ISV.toString(),
      },
      {
        "ID_PARAMETRO": this._params[1]['ID_PARAMETRO'],
        "ID_USUARIO": this.usAct,
        "VALOR": this.datosParametros.comision.toString(),
      },
      {
        "ID_PARAMETRO": this._params[2]['ID_PARAMETRO'],
        "ID_USUARIO": this.usAct,
        "VALOR": this.datosParametros.intentos_sesion.toString(),
      },
      {
        "ID_PARAMETRO": this._params[3]['ID_PARAMETRO'],
        "ID_USUARIO": this.usAct,
        "VALOR": this.datosParametros.intentos_recuperacion.toString(),
      },
      {
        "ID_PARAMETRO": this._params[4]['ID_PARAMETRO'],
        "ID_USUARIO": this.usAct,
        "VALOR": this.datosParametros.tiempo_duracion.toString(),
      },
    ];

    this.MS.actualizarParametros(parameters).subscribe((resp) => {
      console.log('resp',resp);
      if(resp['CODIGO']==1){
        Swal.fire({
          title: `Bien hecho...`,
          text:  `Los Parametros se actualizaron exitosamente`,
          confirmButtonText: 'OK',
        }).then((result) => {
          if (result.isConfirmed) {
            this.actionAct(0);
            localStorage.setItem('ruta', 'security');
            this._Router.navigate(['/security/path?refresh=1']);
          } else {
            console.log(`modal was dismissed by ${result.dismiss}`);
            localStorage.setItem('ruta', 'security');
            this._Router.navigate(['/security/path?refresh=1']);
          }
        })
      }else{
        //console.log('no',resp);
        this.msjCheck=`No se pudo actualizar los parametros`
      }
    });

  }

}
