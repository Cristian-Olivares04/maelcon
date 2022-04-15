import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cloudinary',
  templateUrl: './cloudinary.component.html',
  styleUrls: ['./cloudinary.component.css', '../../../forms_styles.css']
})
export class CloudinaryComponent implements OnInit {
  actionVal:any = 0;

  constructor() { }

  ngOnInit(): void {
  }

  actionAct(value:any){
    this.actionVal = value;
  }

}
