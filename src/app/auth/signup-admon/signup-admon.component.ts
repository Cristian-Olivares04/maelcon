import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UsuariosService } from '../../services/usuarios.service';
import { usuario } from 'src/app/interfaces/user.interface';
import Swal from 'sweetalert2';
import { MantenimientoService } from 'src/app/services/mantenimiento.service';
import { Puesto, Role } from 'src/app/interfaces/objects.interface';

@Component({
  selector: 'app-signup-admon',
  templateUrl: './signup-admon.component.html',
  styleUrls: ['./signup-admon.component.css', '../../../forms_styles.css']
})
export class SignupAdmonComponent {
  @Output() onUsuarioRegistrado = new EventEmitter();

  @Input() usuarioRegistro:usuario={
    ID_USUARIO: '',
    ID_PUESTO: 1,
    ID_ROL: 1,
    USUARIO: '',
    CONTRASENA: '',
    CORREO_ELECTRONICO: '',
    TELEFONO: '',
    RTN: '',
    IMG_USUARIO: '',
    PREGUNTA: '',
    RESPUESTA: '',
    GENERO: 'MASCULINO',
    FECHA_VENCIMIENTO: '',
    CREADO_POR: this.US._usuarioActual,
    ESTADO: 0,
    SUELDO: 12000.85,
    NOMBRE_PERSONA: '',
    APELLIDO_PERSONA: ''
  }

  public validacionCorreo: boolean = false;
  public validacionContrasena: boolean = false;
  public segundaContrasena: string = '';
  public status:boolean = false;
  public activate = false;
  open = false;
  _usAct=this.US._usuarioActual;
  _roles:Role[]=[];
  _puestos:Puesto[]=this.MS._puestos;
  _generos = [{'VALOR':'MASCULINO'}, {'VALOR':'FEMENINO'}, {'VALOR':'OTRO'}, {'VALOR':'PREFIERO NO ESPECIFICAR'}];

  constructor (private US:UsuariosService, private MS:MantenimientoService, private _Router:Router, private modal: NgbModal){
    this.MS.obtenerRoles();
    this.MS.obtenerPuestos();
    this._puestos=this.MS._puestos;
    this._roles=this.MS._roles;
  }

  guardarUsuario(){
    //console.log('usuario', this.usuarioRegistro);
    this.verificacionCorreo();
    this.validarContrasena();
    this.validadCampos();
    if(this.activate){
      //console.log("Usuario", this.usuarioRegistro)
      this.US.guardarNuevoUsuario(this.usuarioRegistro).subscribe((resp) => {
        if(resp[0]['CODIGO']==1){
          Swal.fire({
            title: `Bien hecho...`,
            text: resp[0]['MENSAJE'],
            confirmButtonText: 'OK',
          }).then((result) => {
            if (result.isConfirmed) {
              this._Router.navigate(['login']);
            } else {
              console.log(`modal was dismissed by ${result.dismiss}`);
            }
          })
        }else{
            console.log('no',resp);
        }
      });
    }
  }

  validarContrasena(){
    if(this.usuarioRegistro.CONTRASENA != this.segundaContrasena){
      this.validacionContrasena = true;
      this.activate=false;
    }
    else{
      this.validacionContrasena = false;
      if(this.validacionCorreo){
        this.activate=true;
      }
    }
  }

  validadCampos(){
    if(this.usuarioRegistro.NOMBRE_PERSONA =='' || this.usuarioRegistro.APELLIDO_PERSONA =='' || this.usuarioRegistro.CONTRASENA =='' || this.usuarioRegistro.RTN=='' || this.usuarioRegistro.USUARIO==''
        || this.usuarioRegistro.PREGUNTA == '' || this.usuarioRegistro.RESPUESTA =='' || this.usuarioRegistro.GENERO==''){
      this.status = true;
      this.activate=false;
    }
    else{
      this.status = false;
      if(this.validacionCorreo && !this.validacionContrasena){
        this.activate=true;
      }
    }
  }

  verificacionCorreo(){
    const regexi = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(regexi.test(this.usuarioRegistro.CORREO_ELECTRONICO)){
      this.validacionCorreo = false;
      if(!this.status && !this.validacionContrasena){
        this.activate=true;
      }
    }else{
      this.validacionCorreo = true;
      this.activate=false;
    }
  }

  obtenerRoles(){
    this.MS.obtenerRoles();
    this.MS.obtenerPuestos();
    this._puestos=this.MS._puestos;
    this._roles=this.MS._roles;
    //console.log('roles',this._roles)
  }
}
