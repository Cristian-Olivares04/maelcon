import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-general-settings',
  templateUrl: './general-settings.component.html',
  styleUrls: ['./general-settings.component.css', '../../../forms_styles.css']
})
export class GeneralSettingsComponent implements OnInit {
  actionVal:any = 0;
  
  constructor() { }

  ngOnInit(): void {
  }

  actionAct(value:any){
    this.actionVal = value;
  }

}
