import { Component, Input, OnInit, PipeTransform } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { usuario } from 'src/app/interfaces/user.interface';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { MantenimientoService } from 'src/app/services/mantenimiento.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  providers: [DecimalPipe]
})
export class UsersComponent implements OnInit {
  _usAct="";
  usuarios: usuario[] = [];
  usuarios2: usuario[] = [];
  msjCheck='';
  modal=false;

  usuariosInter: Observable<usuario[]>;
  filter = new FormControl('');

  constructor(pipe: DecimalPipe, private US:UsuariosService, private MS:MantenimientoService, private router:Router) {
    this.usuariosInter = this.filter.valueChanges.pipe(
      startWith(''),
      map(text => this.search(text, pipe))
    );

  }

  ngOnInit(): void {
    console.log('si')
    this.obtenerUsuarios();
  }

  obtenerUsuarios(){
    this.US.obtenerUsuarios().subscribe((resp) => {
      //console.log('resp',resp);
      if(resp['mensaje'][0]['CODIGO']==1){
        this.usuarios = resp['usuario'];
        this.usuarios2 = resp['usuario'];
      }else{
        //console.log('no',resp);
        this.msjCheck=`No se pudo obtener la lista de usuarios`
      }
    });
  }

  goUser(id:any){
    //console.log("escogio el usuario: ", id);
    this.US._usuarioActual2=id;
    for(let us of this.usuarios2){
      if(us.ID_USUARIO==id){
        this.US.datosUsuario2=us;
        this.modal=true;
      }
    }
  }

  openModl(id:any){
    this.US._usuarioActual2=id;
    for(let us of this.usuarios2){
      if(us.ID_USUARIO==id){
        this.US.datosUsuario2=us;
        this.modal=true;
      }
    }
  }

  cerrarModal(){
    this.modal=false;
  }

  search(text: string, pipe: PipeTransform): usuario[] {
    return this.usuarios2.filter(user => {
      const term = text.toLowerCase();
      return user.USUARIO.toLowerCase().includes(term)
          || pipe.transform(user.CORREO_ELECTRONICO).includes(term)
          || pipe.transform(user.SUELDO).includes(term)
          || pipe.transform(user.ID_ROL).includes(term)
          || pipe.transform(user.ID_PUESTO).includes(term)
          || pipe.transform(user.ESTADO).includes(term);
    });
  }
}
