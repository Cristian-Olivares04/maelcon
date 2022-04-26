import { Component, Input, OnInit, PipeTransform } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Proveedor } from 'src/app/interfaces/characters.interface';
import { ComprasService } from 'src/app/services/compras.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

function search(PROVEEDOR:any, text: string, pipe: PipeTransform): Proveedor[] {
  return PROVEEDOR.filter(prov => {
    const term = text.toLowerCase();
    return prov.NOMBRE_PROVEEDOR.toLowerCase().includes(term)
        || pipe.transform(prov.ID_PROVEEDOR).includes(term)
        || prov.RTN.toLowerCase().includes(term)
        || prov.CORREO_PROVEEDOR.toLowerCase().includes(term)
        || prov.TELEFONO_PROVEEDOR.toLowerCase().includes(term);
  });
}

@Component({
  selector: 'app-providers',
  templateUrl: './providers.component.html',
  styleUrls: ['./providers.component.css', '../../../forms_styles.css'],
  providers: [DecimalPipe]
})
export class ProvidersComponent implements OnInit {
  actionVal:any = 0;
  provInter: Observable<Proveedor[]>;
  _proveedores:Proveedor[]=[];
  filter = new FormControl('');
  modal=false;

  @Input() datosProv:Proveedor={
    ID_PROVEEDOR: 0,
    RTN: '',
    NOMBRE_PROVEEDOR: '',
    TELEFONO_PROVEEDOR: '',
    CORREO_PROVEEDOR: ''
  }

  constructor(private CP:ComprasService, private pipe: DecimalPipe, private _Router:Router, private modalService:NgbModal) {
    this.CP.obtenerProveedores();
    this._proveedores=this.CP._proveedores;
    this.provInter = this.filter.valueChanges.pipe(
      startWith(''),
      map(text => search(this._proveedores,text, this.pipe))
    );
  }

  ngOnInit(): void {
    this._proveedores=this.CP._proveedores;
    this.provInter = this.filter.valueChanges.pipe(
      startWith(''),
      map(text => search(this._proveedores,text, this.pipe))
    );
  }

  actionAct(value:any){
    this.actionVal = value;
  }

  openModal(content:Object,id:any) {
    console.log("escogio el proveedor: ", id);
    for(let prov of this._proveedores){
      if(prov.ID_PROVEEDOR==id){
        this.datosProv=prov;
      }
    }
    this.modalService.open(content, {backdropClass: 'light-red-backdrop', size: 'lg', centered: true });
  }

  actualizarProv(id:any){
    console.log('datosProveedor', this.datosProv)
    /* this.CP.actualizarProveedor(this.datosProv, id).subscribe((resp) => {
      //console.log('resp',resp);
      if(resp[0]['CODIGO']==1){
        Swal.fire({
          title: `Bien hecho...`,
          text:  `Usuario actualizado exitosamente`,
          confirmButtonText: 'OK',
        }).then((result) => {
          if (result.isConfirmed) {
            localStorage.setItem('ruta', 'administration');
            this._Router.navigate(['/administration/path?refresh=1']);
          } else {
            console.log(`modal was dismissed by ${result.dismiss}`);
            localStorage.setItem('ruta', 'administration');
            this._Router.navigate(['/administration/path?refresh=1']);
          }
        })
      }else{
        //console.log('no',resp);
      }
    }); */
  }
}
