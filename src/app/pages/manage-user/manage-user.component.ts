import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuariosService } from 'src/app/services/usuarios.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage-user',
  templateUrl: './manage-user.component.html',
  styleUrls: ['./manage-user.component.css','../../../forms_styles.css']
})
export class ManageUserComponent implements OnInit {
  action=true;
  fechaAct = this.datepipe.transform((new Date), 'yyyy-MM-dd');
  _usAct = this.US._usuarioActual2;
  datosUsuario:any;
  msjCheck:any;

  constructor(private US:UsuariosService, private datepipe:DatePipe, private _Router:Router) { 
    this.US._usuarioActual2;
  }

  ngOnInit(): void {
    this.US.retornarUsuario(this._usAct).subscribe((resp) => {
      console.log('resp',resp);
      if(resp["mensaje"][0]["CODIGO"] == 1){
        this.datosUsuario = resp["usuario"][0];
      }else{
        console.log("usuario no encontrado");
      }
    });
  }

  optionAct(value:boolean){
    this.action = value;
    console.log(this.datosUsuario);
  }

  actualizarUsuario(){
    var js = {
      "PREGUNTA": this.datosUsuario.PREGUNTA,
      "RESPUESTA": this.datosUsuario.RESPUESTA,
      "MODIFICADO_POR": this.US._usuarioActual
    }
    this.US.editarUsuario(this.datosUsuario, this.US._usuarioActual).subscribe((resp) => {
      //console.log('resp',resp);
      if(resp["mensaje"][0]["CODIGO"] == 1){
        this.US.actualizarPreguntaUsuario(js, this.US._usuarioActual).subscribe((res) => {
          //console.log('res',res);
          if(resp["mensaje"][0]["CODIGO"] == 1){
            Swal.fire({
              title: `Bien hecho...`,
              text:  `Usuario actualizado exitosamente.`,
              confirmButtonText: 'OK',
            }).then((result) => {
              if (result.isConfirmed) {
                localStorage.setItem('ruta', 'manage-user');
                this._Router.navigate(['/manage-usuer']);
              } else {
                console.log(`modal was dismissed by ${result.dismiss}`);
                localStorage.setItem('ruta', 'manage-user');
                this._Router.navigate(['/manage-usuer']);
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

}
