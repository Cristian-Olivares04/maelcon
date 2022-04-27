import { Component, OnInit } from '@angular/core';
import { MantenimientoService } from 'src/app/services/mantenimiento.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {

  constructor(private MS:MantenimientoService) { }

  ngOnInit(): void {
  }

  descargarDB(){
    console.log('Descargando archivo DB');
    this.MS.crearBackUp();
  }

}
