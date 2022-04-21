import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Parameter } from 'src/app/interfaces/objects.interface';
import { MantenimientoService } from 'src/app/services/mantenimiento.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cloudinary',
  templateUrl: './cloudinary.component.html',
  styleUrls: ['./cloudinary.component.css', '../../../forms_styles.css'],
})
export class CloudinaryComponent implements OnInit {
  actionVal: any = 0;
  rend = false;
  _params: Parameter[] = [];
  msjCheck = '';
  usAct = this.US._usuarioActual;

  @Input() datosParametros = {
    nombreNube: '',
    apiKey: '',
    apiSecret: '',
  };

  constructor(
    private MS: MantenimientoService,
    private US: UsuariosService,
    private _Router: Router
  ) {}

  ngOnInit(): void {
    this.obtenerParametros();
  }

  actionAct(value: any) {
    this.actionVal = value;
  }

  obtenerParametros() {
    if (this.MS._params != []) {
      this._params = this.MS._params;
      this.datosParametros.nombreNube = this.MS._params[15]['VALOR'];
      this.datosParametros.apiKey = this.MS._params[16]['VALOR'];
      this.datosParametros.apiSecret = this.MS._params[17]['VALOR'];
      this.rend = true;
    } else {
      //console.log('no',resp);
      this.msjCheck = `No se pudo obtener la lista de parametros`;
    }
  }

  actualizarParametros() {
    var parameters = [
      {
        ID_PARAMETRO: this._params[15]['ID_PARAMETRO'],
        ID_USUARIO: this.usAct,
        VALOR: this.datosParametros.nombreNube.toString(),
      },
      {
        ID_PARAMETRO: this._params[16]['ID_PARAMETRO'],
        ID_USUARIO: this.usAct,
        VALOR: this.datosParametros.apiKey.toString(),
      },
      {
        ID_PARAMETRO: this._params[17]['ID_PARAMETRO'],
        ID_USUARIO: this.usAct,
        VALOR: this.datosParametros.apiSecret.toString(),
      },
    ];

    this.MS.actualizarParametros(parameters).subscribe((resp) => {
      if (resp['CODIGO'] == 1) {
        this._params[15]['VALOR'] = this.datosParametros.nombreNube;
        this._params[15]['ID_USUARIO'] = this.usAct;
        this._params[16]['VALOR'] = this.datosParametros.apiKey;
        this._params[16]['ID_USUARIO'] = this.usAct;
        this._params[17]['VALOR'] = this.datosParametros.apiSecret;
        this._params[17]['ID_USUARIO'] = this.usAct;
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
      } else {
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
