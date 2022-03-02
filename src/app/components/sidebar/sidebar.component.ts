import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

  constructor(private router: Router, private UsuariosService:UsuariosService) { }

  ngOnInit(): void {
    this.router.navigate([`/shopping`])
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
