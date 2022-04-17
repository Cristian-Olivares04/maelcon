import { Component, OnInit, PipeTransform } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Bitacora } from 'src/app/interfaces/objects.interface';
import { MantenimientoService } from 'src/app/services/mantenimiento.service';

@Component({
  selector: 'app-binnacle',
  templateUrl: './binnacle.component.html',
  styleUrls: ['./binnacle.component.css'],
  providers: [DecimalPipe]
})
export class BinnacleComponent implements OnInit {
  msjCheck='';
  bitacora: Bitacora[] = [];
  bitacora2: Bitacora[] = [];

  bitacoraInter: Observable<Bitacora[]>;
  filter = new FormControl('');

  constructor(pipe: DecimalPipe, private MS:MantenimientoService) {
    this.bitacoraInter = this.filter.valueChanges.pipe(
      startWith(''),
      map(text => this.search(text, pipe))
    );
  }

  ngOnInit(): void {
    this.obtenerUsuarios();
  }

  obtenerUsuarios(){
    this.MS.obtenerRegistrosBitacora().subscribe((resp) => {
      //console.log('resp',resp);
      if(resp['mensaje'][0]['CODIGO']==1){
        this.bitacora = resp['BITACORA'];
        this.bitacora2 = resp['BITACORA'];
      }else{
        //console.log('no',resp);
        this.msjCheck=`No se pudo obtener la lista de usuarios`
      }
    });
  }

  search(text: string, pipe: PipeTransform): Bitacora[] {
    return this.bitacora2.filter(bita => {
      const term = text.toLowerCase();
      return bita.ID_USUARIO
          || pipe.transform(bita.ID_USUARIO).includes(term)
          || pipe.transform(bita.ID_OBJETO).includes(term)
          || pipe.transform(bita.ACCION).toLowerCase.includes(term)
          || pipe.transform(bita.DESCRIPCION).toLowerCase.includes(term)
          || pipe.transform(bita.INFORMACION_ANTERIOR).toLowerCase.includes(term)
          || pipe.transform(bita.INFORMACION_ACTUAL).toLowerCase.includes(term)
          || pipe.transform(bita.FECHA_BITACORA).toLowerCase.includes(term);
    });
  }

}
