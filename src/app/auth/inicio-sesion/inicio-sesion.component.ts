import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuariosService } from '../../services/usuarios.service';

@Component({
  selector: 'app-inicio-sesion',
  templateUrl: './inicio-sesion.component.html',
  styleUrls: ['./inicio-sesion.component.css']
})
export class InicioSesionComponent implements OnInit {

  constructor(private UsuariosService:UsuariosService, private _Router: Router) { }

  ngOnInit(): void {

  }

  iniciarSesion(){
    this.UsuariosService.usuarioActual = "user";
    window.location.reload();
  }
}
