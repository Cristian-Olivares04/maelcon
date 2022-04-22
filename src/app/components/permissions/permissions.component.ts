import { Component, OnInit, PipeTransform, Input } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Object, PermisosRol, Permission, Role } from 'src/app/interfaces/objects.interface';
import { MantenimientoService } from 'src/app/services/mantenimiento.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

function search(PERMISOS: any, text: string, pipe: PipeTransform): PermisosRol[] {
  //console.log('permisos',PERMISOS);
  return PERMISOS.filter(ob => {
    const term = text.toLowerCase();
    return ob.OBJETOS.toLowerCase().includes(term)
        || pipe.transform(ob.PERMISO_INSERCION).includes(term)
        || pipe.transform(ob.PERMISO_ELIMINACION).includes(term)
        || pipe.transform(ob.PERMISO_ACTUALIZACION).includes(term)
        || pipe.transform(ob.PERMISO_CONSULTAR).includes(term)
        || ob.ROL.toLowerCase().includes(term)
        || pipe.transform(ob.ID_ROL).includes(term)
  });
}


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
  roles:Role[]=this.MS._roles;
  objetos:Object[]=this.MS._objects;
  condition=false;
  act=false;
  ins=false;
  elim=false;
  con=false;

  datosPermiso:Permission={
    ID_OBJETO: 0,
    ID_ROL: 0,
    INSERTAR: 0,
    ELIMINAR: 0,
    ACTUALIZAR: 0,
    CONSULTAR: 0,
    CREADO_POR: 0
  }

  constructor( private MS:MantenimientoService,private pipe: DecimalPipe, private modalService: NgbModal, private US:UsuariosService, private _Router:Router) {
    this.permisosInter = this.filter.valueChanges.pipe(
      startWith(''),
      map(text => search(this.permisosRol, text, this.pipe))
    );
  }

  ngOnInit(): void {
    this.MS.obtenerPermisos();
    this.permisosRol=this.MS._permisosRol;
    this.roles=this.MS._roles;
    this.objetos=this.MS._objects;
    this.permisosInter = this.filter.valueChanges.pipe(
      startWith(''),
      map(text => search(this.permisosRol, text, this.pipe))
    );
    //console.log('Permisos', this.permisosRol)
    this.condition=true
  }

  openModal(content:any) {
    this.datosPermiso={
      ID_OBJETO: 1,
      ID_ROL: 1,
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
    if(this.act==true){
      this.datosPermiso.ACTUALIZAR=1;
    }else{
      this.datosPermiso.ACTUALIZAR=0;
    }
    if(this.elim==true){
      this.datosPermiso.ELIMINAR=1;
    }else{
      this.datosPermiso.ELIMINAR=0;
    }
    if(this.ins==true){
      this.datosPermiso.INSERTAR=1;
    }else{
      this.datosPermiso.INSERTAR=0;
    }
    if(this.con==true){
      this.datosPermiso.CONSULTAR=1;
    }else{
      this.datosPermiso.CONSULTAR=0;
    }
    //console.log(this.datosPermiso)
    this.MS.crearPermiso(this.datosPermiso).subscribe((resp) => {
      if(resp[0]['CODIGO']==1){
        this.MS.obtenerPermisos();
        Swal.fire({
          title: `Bien hecho...`,
          text:  `Permiso creado exitosamente`,
          confirmButtonText: 'OK',
        }).then((result) => {
          if (result.isConfirmed) {
            this.permisosRol=this.MS._permisosRol;
            this.permisosInter = this.filter.valueChanges.pipe(
              startWith(''),
              map(text => search(this.permisosRol, text, this.pipe))
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

  obtenerPermisos(){
    this.MS.obtenerPermisos();
    this.permisosRol=this.MS._permisosRol;
    //console.log('objs', this.objects)
  }


}
