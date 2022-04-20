import { Component } from '@angular/core';
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

  constructor(private UsuariosService: UsuariosService, private MS:MantenimientoService, private CP:ComprasService, private IN:InventarioService){
    this.MS.obtenerInfo();
  }

  ngOnInit(): void {
    if(this.UsuariosService._usuarioActual!=null){
      this.user = true;
    }else{
      this.user = false;
    }
  }
}
