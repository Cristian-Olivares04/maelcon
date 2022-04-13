import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.css', '../../../forms_styles.css']
})
export class UpdatePasswordComponent implements OnInit {

  public segundaContrasena: string = '';
  public primeraContrasena: string = '';
  public validacionContrasena:Boolean = false;
  public activate = false;

  constructor() { }

  ngOnInit(): void {
  }

  validarContrasena(){
    if(this.primeraContrasena != this.segundaContrasena){
      this.validacionContrasena = true;
      this.activate=false;
    }
  }
}
