import { Component, OnInit, PipeTransform, Input } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PermisosRol, Permission } from 'src/app/interfaces/objects.interface';
import { MantenimientoService } from 'src/app/services/mantenimiento.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-permissions',
  templateUrl: './permissions.component.html',
  styleUrls: ['./permissions.component.css'],
  providers: [DecimalPipe]
})
export class PermissionsComponent implements OnInit {
  permisosInter:Observable<PermisosRol[]>
  filter = new FormControl('');
  permisosRol:PermisosRol[]=this.MS._permisosRol;
  condition=false;

  constructor( private MS:MantenimientoService, pipe: DecimalPipe, private modalService: NgbModal, private US:UsuariosService, private _Router:Router) {
    this.permisosInter = this.filter.valueChanges.pipe(
      startWith(''),
      map(text => this.search(text, pipe))
    );
  }

  ngOnInit(): void {
    this.MS.obtenerPermisos();
    this.permisosRol=this.MS._permisosRol;
    //console.log('Permisos', this.permisosRol)
    this.condition=true
  }


  @Input() datoObjeto:Permission={
    ID_OBJETO: 0,
    ID_ROL: 0,
    INSERTAR: 0,
    ELIMINAR: 0,
    ACTUALIZAR: 0,
    CONSULTAR: 0,
    CREADO_POR: 0
  }

  openModal(content:any) {
    this.datoObjeto={
      ID_OBJETO: 0,
      ID_ROL: 0,
      INSERTAR: 0,
      ELIMINAR: 0,
      ACTUALIZAR: 0,
      CONSULTAR: 0,
      CREADO_POR: this.US._usuarioActual
    }
    this.modalService.open(content, {backdropClass: 'light-red-backdrop', size: 'lg' });
  }

  /* editPermiso(content:any,id:any) {
    for (let i = 0; i < this.permisosRol.length; i++) {
      if(this.permisosRol[i].OBJETOS==id){
        this.datoObjeto=this.permisosRol[i];
      }
    }
    this.modalService.open(content, {backdropClass: 'light-red-backdrop', size: 'lg' });
  }

  actPermiso(id:any){
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
  } */

  crearPermiso(){
    //console.log(this.datoObjeto)
    this.MS.crearPermiso(this.datoObjeto).subscribe((resp) => {
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

  search(text: string, pipe: PipeTransform): PermisosRol[] {
    return this.permisosRol.filter(ob => {
      const term = text.toLowerCase();
      return ob.OBJETOS.toLowerCase().includes(term)
          || pipe.transform(ob.PERMISO_INSERCION).includes(term)
          || pipe.transform(ob.PERMISO_ELIMINACION).includes(term)
          || pipe.transform(ob.PERMISO_ACTUALIZACION).includes(term)
          || pipe.transform(ob.PERMISO_CONSULTAR).includes(term)
          || pipe.transform(ob.ROL).toLowerCase.includes(term)
          || pipe.transform(ob.ID_ROL).includes(term)
    });
  }

  obtenerPermisos(){
    this.MS.obtenerPermisos();
    this.permisosRol=this.MS._permisosRol;
    //console.log('objs', this.objects)
  }


}
