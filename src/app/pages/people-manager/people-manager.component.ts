import { Component, OnInit } from '@angular/core';
import { MantenimientoService } from 'src/app/services/mantenimiento.service';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-people-manager',
  templateUrl: './people-manager.component.html',
  styleUrls: ['./people-manager.component.css']
})
export class PeopleManagerComponent implements OnInit {
  refrescarUsers = true;
  constructor(private US:UsuariosService, private MS:MantenimientoService) { }

  ngOnInit(): void {
    localStorage.setItem('ruta', 'people-manager');
  }

  cambiarActVal(num:any){
    this.MS.actionVal=num;
  }
}
