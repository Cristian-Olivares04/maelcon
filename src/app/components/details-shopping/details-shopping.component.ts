import { Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-details-shopping',
  templateUrl: './details-shopping.component.html',
  styleUrls: ['./details-shopping.component.css', '../../../forms_styles.css']
})
export class DetailsShoppingComponent implements OnInit {
  shopping = true;
  activo:any = true;
  actionOption:Boolean = true;
  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {
  }

  openModal(content:Object) {
    this.modalService.open(content, {backdropClass: 'light-red-backdrop', size: 'xl' });
  }

  changeOption(value:Boolean){
    this.actionOption = value;
  }

}
