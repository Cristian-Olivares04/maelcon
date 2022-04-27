import { Component, Input, OnInit, PipeTransform } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Help } from 'src/app/interfaces/objects.interface';
import { AyudaService } from 'src/app/services/ayuda.service';

function search(Help: any, text: string, pipe: PipeTransform): Help[] {
  //console.log('ob',Help);
  return Help.filter(info => {
    const term = text.toLowerCase();
    return info.TITULO.toLowerCase().includes(term)
        || info.TIPO.toLowerCase().includes(term)
        || info.ENLACE.toLowerCase().includes(term)
        || info.FECHA_CREACION.toLowerCase().includes(term);
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
  infor:Help[]=this.MA._ayuda;

  constructor(private MA:AyudaService, private pipe: DecimalPipe, private modalService: NgbModal) {
    this.MA.obtenerInfoAyuda();
    this.infor=this.MA._ayuda;
    this.HelpInter = this.filter.valueChanges.pipe(
      startWith(''),
      map(text => search(this.infor, text, this.pipe))
    );
   }

  ngOnInit(): void {
  }

  openModal(content:any) {
    this.modalService.open(content, {backdropClass: 'light-red-backdrop', size: 'lg' });
  }
}
