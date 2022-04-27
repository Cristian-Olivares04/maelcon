import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AyudaService } from 'src/app/services/ayuda.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private router: Router, private HP:AyudaService) {
    this.HP.pag = 0;
    this.HP.obtenerInfAyudaAct();
    this.router.navigate([`/login`])
  }

  ngOnInit(): void {
  }

}
