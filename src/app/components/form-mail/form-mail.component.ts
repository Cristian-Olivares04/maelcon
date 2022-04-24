import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Parameter } from 'src/app/interfaces/objects.interface';
import { MantenimientoService } from 'src/app/services/mantenimiento.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import Swal from 'sweetalert2';

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
      //console.log('params',this.MS._params)
      this.datosParametros.host = this.MS._params[9]['VALOR'];
      this.datosParametros.usuario =this.MS._params[10]['VALOR'];
      this.datosParametros.contrasena =this.MS._params[11]['VALOR'];
      this.datosParametros.proveedor =this.MS._params[12]['VALOR'];
      this.datosParametros.puerto =this.MS._params[13]['VALOR'];
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
        "ID_PARAMETRO": this._params[9]['ID_PARAMETRO'],
        "ID_USUARIO": this.usAct,
        "VALOR": this.datosParametros.host.toString(),
      },
      {
        "ID_PARAMETRO": this._params[10]['ID_PARAMETRO'],
        "ID_USUARIO": this.usAct,
        "VALOR": this.datosParametros.usuario.toString(),
      },
      {
        "ID_PARAMETRO": this._params[11]['ID_PARAMETRO'],
        "ID_USUARIO": this.usAct,
        "VALOR": this.datosParametros.contrasena.toString(),
      },
      {
        "ID_PARAMETRO": this._params[12]['ID_PARAMETRO'],
        "ID_USUARIO": this.usAct,
        "VALOR": this.datosParametros.proveedor.toString(),
      },
      {
        "ID_PARAMETRO": this._params[13]['ID_PARAMETRO'],
        "ID_USUARIO": this.usAct,
        "VALOR": this.datosParametros.puerto.toString(),
      }
    ];

    this.MS.actualizarParametros(parameters).subscribe((resp) => {
      //console.log('resp',resp);
      if(resp['CODIGO']==1){
        this._params[9]['VALOR'] = this.datosParametros.host;
        this._params[9]['ID_USUARIO'] = this.usAct;
        this._params[10]['VALOR'] = this.datosParametros.usuario;
        this._params[10]['ID_USUARIO'] = this.usAct;
        this._params[11]['VALOR'] = this.datosParametros.contrasena;
        this._params[11]['ID_USUARIO'] = this.usAct;
        this._params[12]['VALOR'] = this.datosParametros.proveedor;
        this._params[12]['ID_USUARIO'] = this.usAct;
        this._params[13]['VALOR'] = this.datosParametros.puerto.toString();
        this._params[13]['ID_USUARIO'] = this.usAct;
        Swal.fire({
          title: `Bien hecho...`,
          text:  `Los Parametros se actualizaron exitosamente`,
          confirmButtonText: 'OK',
        }).then((result) => {
          if (result.isConfirmed) {
            localStorage.setItem('ruta', 'security');
            this._Router.navigate(['/security/path?refresh=1']);
          } else {
            console.log(`modal was dismissed by ${result.dismiss}`);
            localStorage.setItem('ruta', 'security');
            this._Router.navigate(['/security/path?refresh=1']);
          }
        });
      }else{
        //console.log('no',resp);
        Swal.fire({
          title: `Algo salio mal...`,
          text: `No se pudo actualizar los parametros`,
          confirmButtonText: 'OK',
        }).then((result) => {
          if (result.isConfirmed) {
            this._Router.navigate(['/security']);
          } else {
            this._Router.navigate(['/security']);
            console.log(`modal was dismissed by ${result.dismiss}`);
          }
        });
      }
    });

  }
}
