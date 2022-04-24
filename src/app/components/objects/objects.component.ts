import { Component, Input, OnInit, PipeTransform } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MantenimientoService } from 'src/app/services/mantenimiento.service';
import { Object } from 'src/app/interfaces/objects.interface';
import { UsuariosService } from 'src/app/services/usuarios.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

function search(OBJECT: any, text: string, pipe: PipeTransform): Object[] {
  //console.log('ob',OBJECT);
  return OBJECT.filter(ob => {
    const term = text.toLowerCase();
    return ob.OBJETOS.toLowerCase().includes(term)
        || ob.TIPO_OBJETO.toLowerCase().includes(term)
        || ob.DESCRIPCION.toLowerCase().includes(term)
        || pipe.transform(ob.CREADO_POR).includes(term);
  });
}

@Component({
  selector: 'app-objects',
  templateUrl: './objects.component.html',
  styleUrls: ['./objects.component.css'],
  providers: [DecimalPipe]
})
export class ObjectsComponent implements OnInit {
  objectsInter:Observable<Object[]>
  filter = new FormControl('');
  objects:Object[]=this.MS._objects;
  condition=false;

  constructor( private MS:MantenimientoService, private pipe: DecimalPipe, private modalService: NgbModal, private US:UsuariosService, private _Router:Router) {
    this.objects=this.MS._objects;
    this.objectsInter = this.filter.valueChanges.pipe(
      startWith(''),
      map(text => search(this.objects, text, this.pipe))
    );
  }

  ngOnInit(): void {
    this.objects=this.MS._objects;
    this.objectsInter = this.filter.valueChanges.pipe(
      startWith(''),
      map(text => search(this.objects, text, this.pipe))
    );
    this.condition=true
  }

  @Input() datoObjeto:Object={
    ID_OBJETO: 0,
    OBJETOS: '',
    TIPO_OBJETO: '',
    DESCRIPCION: '',
    CREADO_POR: 0
  }

  openModal(content:any) {
    this.datoObjeto={
      ID_OBJETO: 0,
      OBJETOS: '',
      TIPO_OBJETO: '',
      DESCRIPCION: '',
      CREADO_POR: this.US._usuarioActual
    }
    this.modalService.open(content, {backdropClass: 'light-red-backdrop', size: 'lg' });
  }

  editObj(content:any,id:any) {
    for (let i = 0; i < this.objects.length; i++) {
      if(this.objects[i].ID_OBJETO==id){
        this.datoObjeto=this.objects[i];
      }
    }
    this.modalService.open(content, {backdropClass: 'light-red-backdrop', size: 'lg' });
  }

  actObjeto(id:any){
    //console.log(this.datoObjeto)
    this.MS.actualizarObjeto(this.datoObjeto, id).subscribe((resp) => {
      if(resp[0]['CODIGO']==1){
        Swal.fire({
          title: `Bien hecho...`,
          text:  `Objeto actualizado exitosamente`,
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
        //console.log('no',resp);
      }
    });
  }

  crearObj(){
    //console.log(this.datoObjeto)
    this.MS.crearObjeto(this.datoObjeto).subscribe((resp) => {
      if(resp[0]['CODIGO']==1){
        this.MS.obtenerObjetos();
        Swal.fire({
          title: `Bien hecho...`,
          text:  `Objeto creado exitosamente`,
          confirmButtonText: 'OK',
        }).then((result) => {
          if (result.isConfirmed) {
            this.objects=this.MS._objects;
            this.objectsInter = this.filter.valueChanges.pipe(
              startWith(''),
              map(text => search(this.objects, text, this.pipe))
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
        //console.log('no',resp);
      }
    });
  }

  obtenerObjetos(){
    this.MS.obtenerObjetos();
    this.objects=this.MS._objects;
    //console.log('objs', this.objects)
  }

}
