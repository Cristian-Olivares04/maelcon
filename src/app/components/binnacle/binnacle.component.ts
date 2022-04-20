import { Component, OnInit, PipeTransform } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Bitacora } from 'src/app/interfaces/objects.interface';
import { MantenimientoService } from 'src/app/services/mantenimiento.service';


function search(BITACORA: any, text: string, pipe: PipeTransform): Bitacora[] {
  console.log(BITACORA);
  return BITACORA.filter(bita => {
    const term = text.toLowerCase();
    if( bita.INFORMACION_ANTERIOR == null){
      return pipe.transform(bita.ID_USUARIO).includes(term)
        || pipe.transform(bita.ID_OBJETO).toLowerCase().includes(term)
        || bita.ACCION.toLowerCase().includes(term)
        || bita.DESCRIPCION.toLowerCase().includes(term)
        || bita.INFORMACION_ACTUAL.toLowerCase().includes(term)
        || bita.FECHA_BITACORA.toLowerCase().includes(term);
    }else{
      return pipe.transform(bita.ID_USUARIO).includes(term)
        || pipe.transform(bita.ID_OBJETO).toLowerCase().includes(term)
        || bita.ACCION.toLowerCase().includes(term)
        || bita.DESCRIPCION.toLowerCase().includes(term)
        || bita.INFORMACION_ANTERIOR.toLowerCase().includes(term)
        || bita.INFORMACION_ACTUAL.toLowerCase().includes(term)
        || bita.FECHA_BITACORA.toLowerCase().includes(term);
    }
  });
}

@Component({
  selector: 'app-binnacle',
  templateUrl: './binnacle.component.html',
  styleUrls: ['./binnacle.component.css'],
  providers: [DecimalPipe]
})
export class BinnacleComponent implements OnInit {
  msjCheck='';
  binnacle:Boolean = true;
  bitacora2:Bitacora[] = [];
  bitacoraInter: Observable<Bitacora[]>;
  filter = new FormControl('');

  headersArray:any = [
    "#",
    "USUARIO",
    "OBJETO",
    "ACCION",
    "DESCRIPCION",
    "INFORMACION ANTERIOR",
    "INFORMACION ACTUAL",
    "FECHA"
  ];

  constructor( private pipe: DecimalPipe, private MS:MantenimientoService) {
    this.bitacoraInter = this.filter.valueChanges.pipe(
      startWith(''),
      map(text => search(this.bitacora2, text, this.pipe))
    );
  }

  ngOnInit(): void {
    this.MS.obtenerRegistrosBitacora().subscribe((resp) => {
      //console.log('resp',resp);
      if(resp['mensaje'][0]['CODIGO']==1){
        this.bitacora2 = resp['BITACORA'];
        this.bitacoraInter = this.filter.valueChanges.pipe(
          startWith(''),
          map(text => search(this.bitacora2, text, this.pipe))
        );
      }else{
        //console.log('no',resp);
        this.msjCheck=`No se pudo obtener la lista de usuarios`
      }
    });
  }

  obtenerBitacora(){
    this.MS.obtenerRegistrosBitacora().subscribe((resp) => {
      //console.log('resp',resp);
      if(resp['mensaje'][0]['CODIGO']==1){
        this.bitacora2 = resp['BITACORA'];
      }else{
        //console.log('no',resp);
        this.msjCheck=`No se pudo obtener la lista de usuarios`
      }
    });
  }

  viewDownload(value:Boolean){
    this.binnacle = value;
  }

}
