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

  constructor( private MS:MantenimientoService, pipe: DecimalPipe, private modalService: NgbModal, private US:UsuariosService, private _Router:Router) {
    this.objectsInter = this.filter.valueChanges.pipe(
      startWith(''),
      map(text => this.search(text, pipe))
    );
  }

  ngOnInit(): void {
    this.MS.obtenerObjetos();
    this.objects=this.MS._objects;
    //console.log('OBJETOS', this.objects)
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
            for (let i = 0; i < this.objects.length; i++) {
              if(this.objects[i].ID_OBJETO==id){
                this.objects[i].OBJETOS=this.datoObjeto.OBJETOS;
                this.objects[i].TIPO_OBJETO=this.datoObjeto.TIPO_OBJETO;
                this.objects[i].DESCRIPCION=this.datoObjeto.DESCRIPCION;
              }
            }
            this.modalService.dismissAll();
            this._Router.navigate(['/security']);
          } else {
            for (let i = 0; i < this.objects.length; i++) {
              if(this.objects[i].ID_OBJETO==id){
                this.objects[i].OBJETOS=this.datoObjeto.OBJETOS;
                this.objects[i].TIPO_OBJETO=this.datoObjeto.TIPO_OBJETO;
                this.objects[i].DESCRIPCION=this.datoObjeto.DESCRIPCION;
              }
            }
            this.modalService.dismissAll();
            this._Router.navigate(['/security']);
            console.log(`modal was dismissed by ${result.dismiss}`);
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
        Swal.fire({
          title: `Bien hecho...`,
          text:  `Objeto creado exitosamente`,
          confirmButtonText: 'OK',
        }).then((result) => {
          if (result.isConfirmed) {
            this.modalService.dismissAll();
            this._Router.navigate(['/security']);
          } else {
            this.modalService.dismissAll();
            this._Router.navigate(['/security']);
            console.log(`modal was dismissed by ${result.dismiss}`);
          }
        })
      }else{
        //console.log('no',resp);
      }
    });
  }

  search(text: string, pipe: PipeTransform): Object[] {
    return this.objects.filter(ob => {
      const term = text.toLowerCase();
      return ob.OBJETOS.toLowerCase().includes(term)
          || pipe.transform(ob.TIPO_OBJETO).includes(term)
          || pipe.transform(ob.DESCRIPCION).toLowerCase().includes(term)
          || pipe.transform(ob.CREADO_POR).includes(term);
    });
  }

  obtenerObjetos(){
    this.MS.obtenerObjetos();
    this.objects=this.MS._objects;
    //console.log('objs', this.objects)
  }

}
