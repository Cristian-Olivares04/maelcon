import { Component } from '@angular/core';
import { UsuariosService } from './services/usuarios.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Maelcon';
  public user = false;

  constructor(private UsuariosService: UsuariosService){}

  ngOnInit(): void {
    if(this.UsuariosService._usuarioActual!=null){
      this.user = true;
    }else{
      this.user = false;
    }
  }
}
