import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ComprasService } from './services/compras.service';
import { InventarioService } from './services/inventario.service';
import { MantenimientoService } from './services/mantenimiento.service';
import { UsuariosService } from './services/usuarios.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Maelcon';
  public user = false;

  constructor(private US: UsuariosService){}

  ngOnInit(): void {
    if(this.US._userToken!=null){
      //console.log('usuario si',this.US._userToken);
      this.user = true;
    }else{
      //console.log('usuario no',this.US._userToken);
      this.user = false;
    }
  }
}
