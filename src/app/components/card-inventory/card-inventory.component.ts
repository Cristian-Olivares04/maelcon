import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-card-inventory',
  templateUrl: './card-inventory.component.html',
  styleUrls: ['./card-inventory.component.css']
})
export class CardInventoryComponent implements OnInit {
  actionVal:any = 0;
  activo:any = true;
  t = {
      id_objeto : 3,
      consultar: true,
      actualizar: false,
      eliminar: false,
      crear: false
    };

  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {
  }

  actionAct(value:any){
    this.actionVal = value;
  }

  activOption(value:Boolean){
    this.activo = value;
  }

  openModal(content:Object) {
    this.modalService.open(content, {backdropClass: 'light-red-backdrop', size: 'xl' });
  }


}
