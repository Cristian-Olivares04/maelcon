import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Permission } from 'src/app/interfaces/objects.interface';
import { usuario } from 'src/app/interfaces/user.interface';
import { MantenimientoService } from 'src/app/services/mantenimiento.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import Swal from 'sweetalert2';

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
  condition2 = false;
  condition=this.MS.condition;
  _obs:Permission[]=this.MS._permissions;

  sales = 1;
  shopping = 1;
  inventory = 1;
  administration = 1;
  security = 1;

  constructor(private MS:MantenimientoService,private UsuariosService:UsuariosService,  private router: Router ) { }

  ngOnInit(): void {
      this.UsuariosService.obtenerUsuario()
      .subscribe((resp:any) => {
        if(resp['mensaje'][0]['CODIGO']==1){
          this._obs=this.MS._permissions;
          this.user= resp['usuario'][0];
          this.UsuariosService.datosUsuario = resp['usuario'][0];
          console.log('obs',this._obs);
          //this.pantallasDisponibles();
          this.router.navigate([`/sales`]);
          this.condition2=true;
          this.condition=this.MS.condition;
        }else{
          console.log("falso no retorno");
          this.cerrarSesion();
        }
      }, error => {
        console.error('Ocurrió un error',error);
        Swal.fire({
          title: `Token expirado...`,
          confirmButtonText: 'OK',
        }).then((result) => {
          if (result.isConfirmed) {
            this.cerrarSesion();
            this.router.navigate(['login']);
          } else {
            console.log(`modal was dismissed by ${result.dismiss}`);
            this.cerrarSesion();
            this.router.navigate(['login']);
          }
        })
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

  pantallasDisponibles(){
    //console.log('obs for',this._obs);
    for(let i = 0; i < this._obs.length; i++){
      if(this._obs[i].ID_OBJETO == 1){
        this.sales = 1;
      }else if(this._obs[i].ID_OBJETO == 2){
        this.shopping = 1;
      }else if(this._obs[i].ID_OBJETO == 3){
        this.inventory = 1;
      }else if(this._obs[i].ID_OBJETO == 4){
        this.administration = 1;
      }else if(this._obs[i].ID_OBJETO == 5){
        this.security = 1;
      }
    }
  }
}
