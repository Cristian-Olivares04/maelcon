import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Permission } from 'src/app/interfaces/objects.interface';
import { usuario } from 'src/app/interfaces/user.interface';
import { AyudaService } from 'src/app/services/ayuda.service';
import { ComprasService } from 'src/app/services/compras.service';
import { InventarioService } from 'src/app/services/inventario.service';
import { MantenimientoService } from 'src/app/services/mantenimiento.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { VentasService } from 'src/app/services/ventas.service';
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
  condition2 = false;
  _obs:Permission[]=[];

  user:usuario={
    ID_USUARIO: '',
    ID_PUESTO: 0,
    ID_ROL: 0,
    USUARIO: '',
    CONTRASENA: '',
    NOMBRE_PERSONA: '',
    APELLIDO_PERSONA: '',
    CORREO_ELECTRONICO: '',
    TELEFONO: '',
    RTN: '',
    SUELDO: 0,
    IMG_USUARIO: '',
    PREGUNTA: '',
    RESPUESTA: '',
    GENERO: '',
    FECHA_VENCIMIENTO: '',
    CREADO_POR: 0,
    ESTADO: 0
  };

  sales = 0;
  shopping = 0;
  inventory = 0;
  administration = 0;
  security = 0;
  reports = 0;

  constructor(private US:UsuariosService, private router:Router, private MS:MantenimientoService, private IN:InventarioService, private CP:ComprasService, private HP:AyudaService, private VS:VentasService) {
    this.US._userToken = localStorage.getItem("auth-token");
    this.US.obtenerInfoUsuario().subscribe((resp) => {
      //console.log('resp my info: ',resp)
      if(resp['mensaje'][0]['CODIGO']==1){
        //console.log("[webpack]");
        this.user = resp['usuario'][0];
        this._obs=resp['permisos'];
        this.US._usuarioActual=resp['usuario'][0]['ID_USUARIO'];
        this.US._usuarioActual2=resp['usuario'][0]['ID_USUARIO'];
        this.US.datosUsuario = resp['usuario'][0];
        this.US._permisos = resp['permisos'];
        this.pantallasDisponibles();
      }else{
        console.log("falso no retorno");
      }
    }, error => {
      console.error('Ocurrió un error',error);
      Swal.fire({
        title: `Token expirado...`,
        confirmButtonText: 'OK',
      }).then((result) => {
        if (result.isConfirmed) {
          this.cerrarSesion();
        } else {
          console.log(`modal was dismissed by ${result.dismiss}`);
          this.cerrarSesion();
        }
      })
    });
  }

  ngOnInit(): void {

  }

  toggleSidebar() {
    this.opened = !this.opened;
    this.dockSize = this.dockSize;
    this.dock = this.dock;
    this.width = this.width;

  }

  cerrarSesion(){
    //console.log('Funciona!!')
    this.US.cerrarSesion();
    window.location.reload();
  }

  pantallasDisponibles(){
    var rutaTemp:any='';
    //console.log('obs for',this._obs);
    for(let i = 0; i < this._obs.length; i++){
      if(this._obs[i].ID_OBJETO == 1){
        this.sales = 1;
        rutaTemp='sales';
      }else if(this._obs[i].ID_OBJETO == 2){
        this.shopping = 1;
        rutaTemp='shopping';
      }else if(this._obs[i].ID_OBJETO == 3){
        this.inventory = 1;
        rutaTemp='inventory';
      }else if(this._obs[i].ID_OBJETO == 4){
        this.administration = 1;
        rutaTemp='administration';
      }else if(this._obs[i].ID_OBJETO == 5){
        this.security = 1;
        rutaTemp='security';
      }else if(this._obs[i].ID_OBJETO == 6){
        this.reports = 1;
        rutaTemp='reports';
      }
    }
    if(localStorage.getItem("ruta")!=null){
      this.router.navigate([`/${localStorage.getItem("ruta")}`]);
    }else{
      this.router.navigate([`/information-v2`]);
    }
    this.condition2=true;
  }
}
