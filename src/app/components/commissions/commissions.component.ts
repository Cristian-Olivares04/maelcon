import { Component, OnInit, PipeTransform } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Comission } from 'src/app/interfaces/objects.interface';
import { MantenimientoService } from 'src/app/services/mantenimiento.service';

function search(COMISIONES, text: string, pipe: PipeTransform): Comission[] {
  return COMISIONES.filter(COM => {
    const term = text.toLowerCase();
    return COM.USUARIO.toLowerCase().includes(term)
        || COM.CORREO_ELECTRONICO.toLowerCase().includes(term)
        || pipe.transform(COM.COMISION_EMPLEADO).includes(term)
        || pipe.transform(COM.ID_VENTA).includes(term)
        || pipe.transform(COM.TOTAL_VENTA).includes(term);
  });
}
@Component({
  selector: 'app-commissions',
  templateUrl: './commissions.component.html',
  styleUrls: ['./commissions.component.css', '../../../forms_styles.css'],
  providers: [DecimalPipe]
})
export class CommissionsComponent implements OnInit {
  comisionesInter: Observable<Comission[]>;
  filter = new FormControl('');
  comisiones:Comission[] = [];

  constructor(private MS:MantenimientoService, private pipe: DecimalPipe) {
    this.comisiones=this.MS._comisiones;
    this.comisionesInter = this.filter.valueChanges.pipe(
      startWith(''),
      map(text => search(this.comisiones,text, this.pipe))
    );
  }

  ngOnInit(): void {
    this.comisiones=this.MS._comisiones;
    console.log('comisiones ', this.comisiones)
    this.comisionesInter = this.filter.valueChanges.pipe(
      startWith(''),
      map(text => search(this.comisiones,text, this.pipe))
    );
  }
}
