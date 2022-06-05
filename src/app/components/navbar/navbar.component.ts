import { Location } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AyudaService } from 'src/app/services/ayuda.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  op='login';
  op2=''
  @Output() actUser = new EventEmitter<any>();

  constructor(private HP:AyudaService, private location:Location, private router:Router) {
    this.HP.pag = 0;
    const ruta = this.location.path();
    const ArrRuta = ruta.split('/');
    console.log('ruta=',ruta, 'ArrRuta[1]='+ArrRuta[1])
    if(ArrRuta.length>=1){
      if(ArrRuta[1] !== "recovery-password"){
        this.op='login'
      }else{
        this.op2='recovery'
      }
    }
    this.HP.obtenerInfoAyuda();
  }

  ngOnInit(): void {
    this.HP.pag = 0;
    this.op2=''
    const ruta = this.location.path();
    const ArrRuta = ruta.split('/');
    console.log('ruta=',ruta, 'ArrRuta[1]='+ArrRuta[1])
    if(ArrRuta.length>=1){
      if(ArrRuta[1] !== "recovery-password"){
        this.op='login'
      }else{
        this.op2='recovery'
      }
    }
    this.HP.obtenerInfoAyuda();
  }

  change(opcion){
    if(opcion=='login'){
      this.router.navigate([`/login`]);
    }else{
      this.router.navigate([`/information-v2`]);
    }
    this.op=opcion;
    this.op2=''
  }

  actualizarUser(opcion){
    this.actUser.emit(opcion);
    this.op2=''
  }

  loguearse(opcion){
    this.op2='';
    this.op=opcion
    this.actUser.emit(false);
  }
}
