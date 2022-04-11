import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { usuario } from 'src/app/interfaces/usuario.interface';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})

export class SidebarComponent implements OnInit{
  opened = true;
  dock= true;
  width = '170px';
  dockSize = '72px';
  regionVisible: string = 'Registro';
  user:usuario=this.UsuariosService.datosUsuario;
  condition = false

  constructor(private router: Router, private UsuariosService:UsuariosService) { }

  ngOnInit(): void {
    this.UsuariosService.obtenerUsuario()
      .subscribe((resp:any) => {
        //console.log(resp);
        if(resp['mensaje'][0]['CODIGO']==1){
          //console.log(resp);
          this.user= resp['usuario'][0];
          this.UsuariosService.datosUsuario = resp['usuario'][0];
          this.router.navigate([`/shopping`]);
          console.log(this.user);
          this.condition=true;
        }else{
          console.log("falso no retorno");
        }
      });
  }

  toggleSidebar() {
    this.opened = !this.opened;
    this.dockSize = this.dockSize;
    this.dock = this.dock;
    this.width = this.width;
  }


  cerrarSesion(){
    //console.log('Funciona!!')
    this.UsuariosService.cerrarSesion();
    window.location.reload();
  }

}
