import { Component, Input, OnInit, PipeTransform } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { usuario } from 'src/app/interfaces/user.interface';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { MantenimientoService } from 'src/app/services/mantenimiento.service';
import { Router } from '@angular/router';

function search(USUARIOS: any, text: string, pipe: PipeTransform): usuario[] {
  //console.log('Usuarios',USUARIOS);
  return USUARIOS.filter(user => {
    const term = text.toLowerCase();
    return user.USUARIO.toLowerCase().includes(term)
        || user.CORREO_ELECTRONICO.toLowerCase().includes(term)
        || pipe.transform(user.SUELDO).includes(term)
        || pipe.transform(user.ID_ROL).includes(term)
        || pipe.transform(user.ID_PUESTO).includes(term)
        || pipe.transform(user.ESTADO).includes(term);
  });
}

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  providers: [DecimalPipe]
})
export class UsersComponent implements OnInit {
  _usAct="";
  usuarios: usuario[] = this.US._usuarios;
  msjCheck='';
  modal=false;

  usuariosInter: Observable<usuario[]>;
  filter = new FormControl('');

  constructor(private pipe: DecimalPipe, private US:UsuariosService, private MS:MantenimientoService, private router:Router) {
    //this.US.obtenerUsuarios();
    this.usuariosInter = this.filter.valueChanges.pipe(
      startWith(''),
      map(text => search(this.usuarios,text, this.pipe))
    );

  }

  ngOnInit(): void {
    this.usuarios = this.US._usuarios;
    this.usuariosInter = this.filter.valueChanges.pipe(
      startWith(''),
      map(text => search(this.usuarios,text, this.pipe))
    );
  }

  goUser(id:any){
    //console.log("escogio el usuario: ", id);
    this.US._usuarioActual2=id;
    for(let us of this.usuarios){
      if(us.ID_USUARIO==id){
        this.US.datosUsuario2=us;
        this.modal=true;
      }
    }
  }

  openModl(id:any){
    this.US._usuarioActual2=id;
    for(let us of this.usuarios){
      if(us.ID_USUARIO==id){
        this.US.datosUsuario2=us;
        this.modal=true;
      }
    }
  }

  cerrarModal(){
    this.modal=false;
  }
}
