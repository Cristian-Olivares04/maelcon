import { Component, OnInit } from '@angular/core';
import { Help } from 'src/app/interfaces/objects.interface';
import { AyudaService } from 'src/app/services/ayuda.service';

@Component({
  selector: 'app-information-v2',
  templateUrl: './information-v2.component.html',
  styleUrls: ['./information-v2.component.css']
})
export class InformationV2Component implements OnInit {
  Help:Help[]=this.MA._ayuda;
  admin:string = "";
  ventas:string = "";
  compras:string = "";
  inventario:string = "";
  ubicacion:string = "";
  manual:string = "";

  constructor(private MA:AyudaService) {
    this.MA.obtenerInfoAyuda();
   }

  ngOnInit(): void {
    this.admin = this.Help[0].ENLACE;
    console.log(this.admin);
  }

}
