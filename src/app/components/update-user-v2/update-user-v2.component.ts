import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Role, Puesto } from 'src/app/interfaces/objects.interface';
import { usuario } from 'src/app/interfaces/user.interface';
import { MantenimientoService } from 'src/app/services/mantenimiento.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-user-v2',
  templateUrl: './update-user-v2.component.html',
  styleUrls: ['./update-user-v2.component.css', "../../../forms_styles.css"]
})
export class UpdateUserV2Component implements OnInit {
  @Input() accion:any;
  _usAct = this.US._usuarioActual2;
  _roles:Role[]=[];
  _puestos:Puesto[]=this.MS._puestos;
  msjCheck='';
  _generos = [{'VALOR':'Masculino'}, {'VALOR':'Femenino'}];

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

  constructor(private US:UsuariosService, private MS:MantenimientoService) {
    this.MS.obtenerRoles();
    this.MS.obtenerPuestos();
    this._puestos=this.MS._puestos;
    this._roles=this.MS._roles;
    this.datosUsuario = this.US.datosUsuario2;
  }

  ngOnInit(): void {
    //console.log('usuario a editar', this.datosUsuario)
    this.datosUsuario.RESPUESTA = "";
  }

  actualizarUsuario(){
    console.log("En actualizar", this.datosUsuario);
    var js = {
      "PREGUNTA": this.datosUsuario.PREGUNTA,
      "RESPUESTA": this.datosUsuario.RESPUESTA,
      "MODIFICADO_POR": this.US._usuarioActual
    };

    /* this.MS.editarUsuario(this.datosUsuario, this.datosUsuario.ID_USUARIO).subscribe((resp) => {
      console.log('resp EDITAR',resp);
      if(resp[0][0]['CODIGO'] == 1){
        if(this.datosUsuario.RESPUESTA == "" || this.datosUsuario.PREGUNTA==""){
          Swal.fire({
            title: `Bien hecho...`,
            text:  `Usuario actualizado exitosamente.`,
            confirmButtonText: 'OK',
          })
        }else{
          this.US.actualizarPreguntaUsuario(js, this.datosUsuario.ID_USUARIO).subscribe((res) => {
            console.log('res PREGUNTA',res);
            if(res["mensaje"][0]["CODIGO"] == 1){
              Swal.fire({
                title: `Bien hecho...`,
                text:  `Usuario actualizado exitosamente.`,
                confirmButtonText: 'OK',
              })
            }else{
              //console.log('no',res);
              this.msjCheck=`No se pudo actualizar el la pregunta usuario y respuesta`
            }
          });
        }
      }else{
        //console.log('no',resp);
        this.msjCheck=`No se pudo actualizar el usuario`
      }
    }); */
  }

  crearUsuario(){
    console.log('entro a crear')
  }


}
