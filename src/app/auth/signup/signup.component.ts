import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { UsuariosService } from '../../services/usuarios.service';
import { usuario } from 'src/app/interfaces/user.interface';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css', '../../../forms_styles.css']
})
export class SignupComponent {
  @Output() onUsuarioRegistrado = new EventEmitter();

  @Input() usuarioRegistro: usuario = {
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
    ESTADO: 0
  }

  public validacionCorreo: boolean = false;
  public validacionContrasena: boolean = false;
  public segundaContrasena: string = '';
  public status:boolean = false;
  public activate = false;
  msj = '';
  open = false;

  constructor (private UsuariosService:UsuariosService, private _Router: Router, private modal: NgbModal){}

  guardarUsuario(){
    //console.log('usuario', this.usuarioRegistro);
    this.verificacionCorreo();
    this.validarContrasena();
    this.validadCampos();
    if(this.activate){
      //console.log("Usuario", this.usuarioRegistro)
      this.UsuariosService.guardarNuevoUsuario(this.usuarioRegistro).subscribe((resp) => {
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
              this._Router.navigate(['login']);
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
    if(this.usuarioRegistro.NOMBRE =='' || this.usuarioRegistro.APELLIDO =='' || this.usuarioRegistro.CONTRASENA =='' || this.usuarioRegistro.RTN=='' || this.usuarioRegistro.USUARIO==''
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
}
