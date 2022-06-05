import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { UsuariosService } from '../../services/usuarios.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  @Output() setUser = new EventEmitter<any>();
  correoRecuperacion:any;
  preguntaSeg:any;
  respuestaSeguridad:any;
  opcion = false;
  user=false;

  @Input() usuarioLogin= {
    CORREO_ELECTRONICO: '',
    CONTRASENA: ''
  };

  @Input() usuarioLoginAns= {
    correo: '',
    preguntaSeguridad: '',
    respuestaSeguridad: ''
  };
  public status: boolean = false;
  public validacionCorreo: boolean = false;

  constructor(private US:UsuariosService, private router:Router) {
    this.router.navigateByUrl('/login')
  }

  ngOnInit(): void {
  }

  iniciarSesion(){
    //console.log(this.usuarioLogin)
    this.validacionCorreo = this.US.verificacionCorreo(this.usuarioLogin.CORREO_ELECTRONICO);
    if(!this.validacionCorreo){
        this.US.verifLogin(this.usuarioLogin).subscribe((resp) => {
          console.log('resp',resp);
          if(resp['token']!=null){
            localStorage.setItem('auth-token', resp['token']);
            //this.US.obtenerInfoUsuario();
            //console.log('yes',resp);
            this.status = false;
            this.user=true;
            console.log('yes',this.user)
            this.setUser.emit(this.user)
          }else{
            //console.log('no',resp);
            this.status = true;
            this.setUser.emit(this.user)
            console.log('no',this.user)
          }
        }, error => {
          console.error('Ocurrió un error',error);
          this.status = true;
          this.setUser.emit(this.user)
          console.log('no',this.user);
        });
    }
  }

  obtenerPregunta(){
    this.US.obtenerPreguntaCorreo(this.correoRecuperacion).subscribe((resp) => {
      console.log(resp);
      if(!resp["pregunta"][0]){
        Swal.fire({
          icon: 'error',
          title: 'Algo ha salido mal...',
          text: 'No es posible recuperar su contraseña, contacte a un administrador.'
        });
      }else{
        this.preguntaSeg = resp["pregunta"][0];
        this.opcion = true;
      }
    });
  }

  validarRespuesta(){
    const respuesta = {
      "RESPUESTA": this.respuestaSeguridad
    };
    console.log(respuesta);
    this.US.validarRespuestaSeguridad(this.correoRecuperacion, respuesta).subscribe((resp) => {
      console.log(resp);
      Swal.fire({
        title: `Recuperación en proceso...`,
        text:  `Revisa tu correo eléctronico para continuar con el proceso.`,
        confirmButtonText: 'OK',
      });
      this.cancelar();
    });
  }

  cancelar(){
    this.preguntaSeg = "";
    this.opcion = false;
    this.correoRecuperacion = "";
    this.respuestaSeguridad = "";
  }

}
