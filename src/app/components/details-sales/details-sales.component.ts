import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-details-sales',
  templateUrl: './details-sales.component.html',
  styleUrls: ['./details-sales.component.css', '../../../forms_styles.css']
})
export class DetailsSalesComponent implements OnInit {
  shopping = false;
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
