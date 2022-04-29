import { Component, OnInit } from '@angular/core';
import { Help } from 'src/app/interfaces/objects.interface';
import { AyudaService } from 'src/app/services/ayuda.service';

@Component({
  selector: 'app-information-v2',
  templateUrl: './information-v2.component.html',
  styleUrls: ['./information-v2.component.css']
})
export class InformationV2Component implements OnInit {
  Help:Help[] = this.MA._ayuda;

  constructor(private MA:AyudaService) {
    this.MA.obtenerInfoAyuda();
   }

  ngOnInit(): void {
    localStorage.setItem('ruta', 'information-v2');
  }

}
