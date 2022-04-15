import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-form-database',
  templateUrl: './form-database.component.html',
  styleUrls: ['./form-database.component.css', '../../../forms_styles.css']
})
export class FormDatabaseComponent implements OnInit {
  actionVal:any = 0;

  constructor() { }

  ngOnInit(): void {
  }

  actionAct(value:any){
    this.actionVal = value;
  }
}
