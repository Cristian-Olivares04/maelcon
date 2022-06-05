import { Component, OnInit } from '@angular/core';
import { MantenimientoService } from 'src/app/services/mantenimiento.service';

@Component({
  selector: 'app-security',
  templateUrl: './security.component.html',
  styleUrls: ['./security.component.css']
})
export class SecurityComponent implements OnInit {
  disabled = false;

  constructor(private MS:MantenimientoService) { }

  ngOnInit(): void {
    localStorage.setItem('ruta', 'security');
  }

  descargarDB(){
    console.log('Descargando archivo DB');
    this.MS.crearBackUp();
  }

}


