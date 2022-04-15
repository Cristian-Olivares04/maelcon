import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-form-mail',
  templateUrl: './form-mail.component.html',
  styleUrls: ['./form-mail.component.css', '../../../forms_styles.css']
})
export class FormMailComponent implements OnInit {
  actionVal:any = 0;

  constructor() { }

  ngOnInit(): void {
  }

  actionAct(value:any){
    this.actionVal = value;
  }

}
