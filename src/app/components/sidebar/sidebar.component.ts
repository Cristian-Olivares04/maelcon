import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { usuario } from 'src/app/interfaces/user.interface';
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
  condition = false;

  sales = 0;
  shopping = 0;
  inventory = 0;
  administration = 0;
  security = 0;

  t = [
    {
      id_objeto : 1,
      consultar: true,
      actualizar: false,
      eliminar: false,
      crear: true
    },
    {
      id_objeto : 2,
      consultar: true,
      actualizar: false,
      eliminar: false,
      crear: true
    },
    {
      id_objeto : 3,
      consultar: true,
      actualizar: false,
      eliminar: false,
      crear: true
    },
    {
      id_objeto : 4,
      consultar: true,
      actualizar: false,
      eliminar: false,
      crear: true
    },
    {
      id_objeto : 5,
      consultar: true,
      actualizar: false,
      eliminar: false,
      crear: true
    },
  ];
  

  constructor(private router: Router, private UsuariosService:UsuariosService) { }

  ngOnInit(): void {
    this.UsuariosService.obtenerUsuario()
      .subscribe((resp:any) => {
        //console.log(resp);
        if(resp['mensaje'][0]['CODIGO']==1){
          //console.log(resp);
          this.user= resp['usuario'][0];
          this.UsuariosService.datosUsuario = resp['usuario'][0];
          this.router.navigate([`/sales`]);
          //console.log(this.user);
          this.condition=true;
        }else{
          console.log("falso no retorno");
          this.cerrarSesion();
        }
      });
    this.pantallasDisponibles();
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

  pantallasDisponibles(){
    for(let i = 0; i < this.t.length; i++){
      if(this.t[i].id_objeto == 1){
        this.sales = 1;
      }else if(this.t[i].id_objeto == 2){
        this.shopping = 1;
      }else if(this.t[i].id_objeto == 3){
        this.inventory = 1;
      }else if(this.t[i].id_objeto == 4){
        this.administration = 1;
      }else if(this.t[i].id_objeto == 5){
        this.security = 1;
      }
    }
  }
}
