import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-card-sales',
  templateUrl: './card-sales.component.html',
  styleUrls: ['./card-sales.component.css']
})
export class CardSalesComponent implements OnInit {
  shopping = false;
  actionVal:any = 0;
  activo:any = true;

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
