import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Puesto, Role } from 'src/app/interfaces/objects.interface';
import { usuario } from 'src/app/interfaces/user.interface';
import { MantenimientoService } from 'src/app/services/mantenimiento.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css', "../../../forms_styles.css"]
})
export class UpdateUserComponent implements OnInit {
  _usAct=this.US._usuarioActual2;
  _roles:Role[]=[];
  _puestos:Puesto[]=this.MS._puestos;
  msjCheck='';
  public actionVal = this.MS.actionVal;
  _generos = [{'VALOR':'MASCULINO'}, {'VALOR':'FEMENINO'}];

  @Input() datosUsuario:usuario={
    ID_USUARIO: '',
    ID_PUESTO: 0,
    ID_ROL: 0,
    USUARIO: '',
    CONTRASENA: '',
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
    SUELDO: 0,
    NOMBRE_PERSONA: '',
    APELLIDO_PERSONA: ''
  }

  constructor(private US:UsuariosService, private MS:MantenimientoService, private _Router:Router) {
    this.MS.obtenerRoles();
    this.MS.obtenerPuestos();
    this._puestos=this.MS._puestos;
    this._roles=this.MS._roles;
    //console.log('puestos', this._puestos)
  }

  ngOnInit(): void {
    this.obtenerRoles();
    console.log('usuario a editar', this.datosUsuario)
  }

  actualizarUsuario(id:any){
    var js = {
      "PREGUNTA": this.datosUsuario.PREGUNTA,
      "RESPUESTA": this.datosUsuario.RESPUESTA,
      "MODIFICADO_POR": this.US._usuarioActual
    }
    this.US.editarUsuario(this.datosUsuario, id).subscribe((resp) => {
      //console.log('resp',resp);
      if(resp[0]['CODIGO']==1){
        this.US.actualizarPreguntaUsuario(js, id).subscribe((res) => {
          //console.log('res',res);
          if(res[0]['CODIGO']==1){
            Swal.fire({
              title: `Bien hecho...`,
              text:  `Usuario actualizado exitosamente`,
              confirmButtonText: 'OK',
            }).then((result) => {
              if (result.isConfirmed) {
                localStorage.setItem('ruta', 'administration');
                this._Router.navigate(['/administration/path?refresh=1']);
              } else {
                console.log(`modal was dismissed by ${result.dismiss}`);
                localStorage.setItem('ruta', 'administration');
                this._Router.navigate(['/administration/path?refresh=1']);
              }
            })
          }else{
            //console.log('no',res);
            this.msjCheck=`No se pudo actualizar el la pregunta usuario y respuesta`
          }
        });
      }else{
        //console.log('no',resp);
        this.msjCheck=`No se pudo actualizar el usuario`
      }
    });
  }

  obtenerRoles(){
    this.MS.obtenerRoles();
    this.MS.obtenerPuestos();
    this._puestos=this.MS._puestos;
    this._roles=this.MS._roles;
    this.datosUsuario = this.US.datosUsuario2;
    //console.log('roles',this._roles)
  }
}
