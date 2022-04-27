import { Component, Input, OnInit, PipeTransform } from '@angular/core';
import { DatePipe, DecimalPipe } from '@angular/common';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Help } from 'src/app/interfaces/objects.interface';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { AyudaService } from 'src/app/services/ayuda.service';

function search(HELP: any, text: string, pipe: PipeTransform): Help[] {
  //console.log('ob',HELP);
  return HELP.filter(ob => {
    const term = text.toLowerCase();
    return ob.TIPO.toLowerCase().includes(term)
        || ob.TITULO.toLowerCase().includes(term)
        || ob.ENLACE.toLowerCase().includes(term)
        || ob.FECHA_CREACION.includes(term);
  });
}

@Component({
  selector: 'app-info-table',
  templateUrl: './info-table.component.html',
  styleUrls: ['./info-table.component.css', "../../../forms_styles.css"],
  providers: [DecimalPipe]
})

export class InfoTableComponent implements OnInit {
  HelpInter:Observable<Help[]>
  filter = new FormControl('');
  Help:Help[]=this.MA._ayuda;
  condition=false;
  fechaAct:any;

  constructor( private MA:AyudaService, private datepipe:DatePipe, private pipe: DecimalPipe, private modalService: NgbModal, private _Router:Router) {
    let currentDateTime = this.datepipe.transform((new Date), 'yyyy-MM-dd');
    this.fechaAct = currentDateTime;
    this.MA.obtenerInfoAyuda();
    this.Help=this.MA._ayuda;
    for(let i = 0; i < this.Help.length; i++){
      //this.Help[i].FECHA_CREACION = this.datepipe.transform((this.Help[i].FECHA_CREACION).toString(), 'yyyy-MM-dd');
    }
    console.log(this.Help);
    this.HelpInter = this.filter.valueChanges.pipe(
      startWith(''),
      map(text => search(this.Help, text, this.pipe))
    );
    this.condition=true
  }

  ngOnInit(): void {
  }

  @Input() datoHelp:Help={
    ID_INFO: 0,
    TIPO: '',
    TITULO: '',
    ENLACE: '',
    FECHA_CREACION: '',
    ESTADO: true
  }

  openModal(content:any) {
    this.datoHelp={
      ID_INFO: 0,
      TIPO: '',
      TITULO: '',
      ENLACE: '',
      FECHA_CREACION: '',
      ESTADO: true
    }
    this.modalService.open(content, {backdropClass: 'light-red-backdrop', size: 'lg' });
  }

  crearInfo(){
    this.MA.crearInfAyuda(this.datoHelp).subscribe((resp) => {
      if(resp["mensaje"][0]["CODIGO"]==1){
        this.MA.obtenerInfoAyuda();
        Swal.fire({
          title: `Bien hecho...`,
          text:  `Información creado exitosamente`,
          confirmButtonText: 'OK',
        }).then((result) => {
          if (result.isConfirmed) {
            this.Help = this.MA._ayuda;
            this.HelpInter = this.filter.valueChanges.pipe(
              startWith(''),
              map(text => search(this.Help, text, this.pipe))
            );
            this.modalService.dismissAll();
            localStorage.setItem('ruta', 'administration');
            this._Router.navigate(['/administration/path?refresh=1']);
          } else {
            this.modalService.dismissAll();
            console.log(`modal was dismissed by ${result.dismiss}`);
            localStorage.setItem('ruta', 'administration');
            this._Router.navigate(['/administration/path?refresh=1']);
          }
        })
      }else{
        Swal.fire({
          title: `Ocurrio un error`,
          text:  resp["mensaje"][0]["MENSAJE"],
          confirmButtonText: 'OK',
        }).then((result) => {
          if (result.isConfirmed) {
            this.modalService.dismissAll();
            localStorage.setItem('ruta', 'administration');
            this._Router.navigate(['/administration/path?refresh=1']);
          } else {
            this.modalService.dismissAll();
            console.log(`modal was dismissed by ${result.dismiss}`);
            localStorage.setItem('ruta', 'administration');
            this._Router.navigate(['/administration/path?refresh=1']);
          }
        });
      }
    });
  }

  updateInfo(content:any, id:any){
    for (let i = 0; i < this.Help.length; i++) {
      if(this.Help[i].ID_INFO == id){
        this.datoHelp= this.Help[i];
        console.log(this.datoHelp);
      }
    }
    this.modalService.open(content, {backdropClass: 'light-red-backdrop', size: 'lg' });
  }

  actInfo(id:any){
    console.log(this.datoHelp)
    this.MA.actualizarInfAyuda(this.datoHelp, id).subscribe((resp) => {
      if(resp["mensaje"][0]["CODIGO"] == 1){
        Swal.fire({
          title: `Bien hecho...`,
          text:  `Información actualizada exitosamente`,
          confirmButtonText: 'OK',
        }).then((result) => {
          if (result.isConfirmed) {
            this.modalService.dismissAll();
            localStorage.setItem('ruta', 'administration');
            this._Router.navigate(['/administration/path?refresh=1']);
          } else {
            this.modalService.dismissAll();
            console.log(`modal was dismissed by ${result.dismiss}`);
            localStorage.setItem('ruta', 'administration');
            this._Router.navigate(['/administration/path?refresh=1']);
          }
        })
      }else{
        Swal.fire({
          title: `Ocurrio un error`,
          text:  resp["mensaje"][0]["MENSAJE"],
          confirmButtonText: 'OK',
        }).then((result) => {
          if (result.isConfirmed) {
            this.modalService.dismissAll();
            localStorage.setItem('ruta', 'administration');
            this._Router.navigate(['/administration/path?refresh=1']);
          } else {
            this.modalService.dismissAll();
            console.log(`modal was dismissed by ${result.dismiss}`);
            localStorage.setItem('ruta', 'administration');
            this._Router.navigate(['/administration/path?refresh=1']);
          }
        });
      }
    });
  }

}
