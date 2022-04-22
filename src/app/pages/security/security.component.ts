import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-security',
  templateUrl: './security.component.html',
  styleUrls: ['./security.component.css']
})
export class SecurityComponent implements OnInit {
  disabled = false;

  constructor() { }

  ngOnInit(): void {
    localStorage.setItem('ruta', 'security');
  }

  descargarDB(){
    console.log('Descargando archivo DB');
  }

}
