import { Component, Input, OnInit } from '@angular/core';
import { Role } from 'src/app/interfaces/objects.interface';
import { usuario } from 'src/app/interfaces/user.interface';
import { MantenimientoService } from 'src/app/services/mantenimiento.service';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css', "../../../forms_styles.css"]
})
export class UpdateUserComponent implements OnInit {
  _usAct=this.US._usuarioActual2;
  _roles:Role[]=[];
  msjCheck='';

  @Input() datosUsuario:usuario={
    ID_USUARIO: '',
    ID_PUESTO: 0,
    ID_ROL: 0,
    USUARIO: '',
    CONTRASENA: '',
    NOMBRE: '',
    APELLIDO: '',
    CORREO_ELECTRONICO: '',
    TELEFONO: '',
    RTN: '',
    IMG_USUARIO: '',
    PREGUNTA: '',
    RESPUESTA: '',
    GENERO: '',
    FECHA_VENCIMIENTO: '',
    CREADO_POR: 0,
    ESTADO: 0,
    SUELDO: 0
  }

  constructor(private US:UsuariosService, private MS:MantenimientoService) { }

  ngOnInit(): void {
    this.obtenerRoles();
    this.datosUsuario = this.US.datosUsuario2;
    console.log('usuario a editar', this.datosUsuario)
  }

  actualizarUsuario(id:any){
    this.US.editarUsuario(this.datosUsuario, id).subscribe((resp) => {
      //console.log('resp',resp);
      if(resp[0]['CODIGO']==1){
        this.msjCheck=`${resp[0]['MENSAJE']}`
      }else{
        //console.log('no',resp);
        this.msjCheck=`No se pudo actualizar el objeto`
      }
    });
  }

  obtenerRoles(){
    this.MS.obtenerRoles().subscribe((resp) => {
      //console.log('resp',resp);
      if(resp['mensaje'][0]['CODIGO']==1){
        this._roles=resp['roles'];
      }else{
        //console.log('no',resp);
        this.msjCheck=`No se pudo obtener la lista de roles`
      }
    });
  }
}
