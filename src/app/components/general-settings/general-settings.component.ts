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
  msj='';
  enam=false

  @Input() datosParametros = {
    intentos_sesion:0,
    intentos_recuperacion:0,
    tiempo_duracion:0,
    ISV:0,
    comision:0,
  }

  constructor(private MS:MantenimientoService, private US:UsuariosService, private _Router:Router) {
    this.obtenerParametros();
  }

  ngOnInit(): void {
  }

  actionAct(value:any){
    this.actionVal = value;
    this.enam=false
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
        this._params[0]['VALOR'] = this.datosParametros.ISV.toString();
        this._params[0]['ID_USUARIO'] = this.usAct;
        this._params[1]['VALOR'] = this.datosParametros.comision.toString();
        this._params[1]['ID_USUARIO'] = this.usAct;
        this._params[2]['VALOR'] = this.datosParametros.intentos_sesion.toString();
        this._params[2]['ID_USUARIO'] = this.usAct;
        this._params[3]['VALOR'] = this.datosParametros.intentos_recuperacion.toString();
        this._params[3]['ID_USUARIO'] = this.usAct;
        this._params[4]['VALOR'] = this.datosParametros.tiempo_duracion.toString();
        this._params[4]['ID_USUARIO'] = this.usAct;
        Swal.fire({
          title: `Bien hecho...`,
          text:  `Los Parametros se actualizaron exitosamente`,
          confirmButtonText: 'OK',
        }).then((result) => {
          if (result.isConfirmed) {
            this.actionAct(0);
            console.log(`modal was dismissed by ${result.dismiss}`);
          } else {
            this.actionAct(0);
            console.log(`modal was dismissed by ${result.dismiss}`);
          }
        })
      }else{
        //console.log('no',resp);
      }
    });

  }

  evaluarDatos(){
    console.log('entro a evaluar')
    let iS=false
    let iR=false
    let tD=false
    let ISV=false
    let cM=false
    if(this.evaluarReg(this.datosParametros.intentos_sesion.toString())){
      iS=true
      this.msj='Intentos de sesión debe ser un entero positivo'
    }
    if(this.evaluarReg(this.datosParametros.intentos_recuperacion.toString())){
      iR=true
      this.msj='Intentos de recuperación debe ser un entero positivo'
    }
    if(this.evaluarReg(this.datosParametros.tiempo_duracion.toString())){
      tD=true
      this.msj='Tiempo de duración debe ser un entero positivo'
    }
    if(this.evaluarReg(this.datosParametros.ISV.toString())){
      ISV=true
      this.msj='ISV debe ser un entero positivo'
    }
    if(this.evaluarReg(this.datosParametros.comision.toString())){
      cM=true
      this.msj='Comisión debe ser un entero positivo'
    }
    if(!iS && !iR && !tD && !ISV && !cM){
      this.actualizarParametros();
    }else{
      this.enam=true;
    }
  }

  evaluarReg(dato:string){
    let validation=false;
    const regexi = /^([0-9]){1,}$/;
    if(regexi.test(dato)){
      validation=false;
    }else{
      validation=true;
    }
    return validation
  }
}
