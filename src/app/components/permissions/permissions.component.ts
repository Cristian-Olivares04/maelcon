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
        || ob.ROL.toLowerCase().includes(term)
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
  enam=false;
  msj=''
  act=false;
  ins=false;
  elim=false;
  con=true;
  _permisos:any;

  datosPermiso:Permission={
    ID_OBJETO: 0,
    ID_ROL: 0,
    PERMISO_INSERCION: 0,
    PERMISO_ELIMINACION: 0,
    PERMISO_ACTUALIZACION: 0,
    PERMISO_CONSULTAR: 1,
    CREADO_POR: 0,
    MODIFICADO_POR: 0
  }

  @Input() datos:PermisosRol={
    OBJETOS: '',
    PERMISO_INSERCION: 0,
    PERMISO_ELIMINACION: 0,
    PERMISO_ACTUALIZACION: 0,
    PERMISO_CONSULTAR: 0,
    ROL: '',
    ID_ROL: 0,
    ID_OBJETO: 0,
    CREADO_POR: 0,
    MODIFICADO_POR: 0
  }

  constructor( private MS:MantenimientoService,private pipe: DecimalPipe, private modalService: NgbModal, private US:UsuariosService, private _Router:Router) {
    this.MS.obtenerPermisos();
    this.permisosRol=this.MS._permisosRol;
    this.roles=this.MS._roles;
    this.objetos=this.MS._objects;
    for (let i = 0; i < this.US._permisos.length; i++) {
      if(this.US._permisos[i].ID_OBJETO==5){
        this._permisos=this.US._permisos[i];
      }
    }
    this.permisosInter = this.filter.valueChanges.pipe(
      startWith(''),
      map(text => search(this.permisosRol, text, this.pipe))
    );
    //console.log('Permisos', this.permisosRol)
    this.condition=true
    this.permisosInter = this.filter.valueChanges.pipe(
      startWith(''),
      map(text => search(this.permisosRol, text, this.pipe))
    );
  }

  ngOnInit(): void {
  }

  openModal(content:any) {
    this.datosPermiso={
      ID_OBJETO: 1,
      ID_ROL: 1,
      PERMISO_INSERCION: 0,
      PERMISO_ELIMINACION: 0,
      PERMISO_ACTUALIZACION: 0,
      PERMISO_CONSULTAR: 1,
      CREADO_POR: this.US._usuarioActual,
      MODIFICADO_POR: 0
    }
    this.modalService.open(content, {backdropClass: 'light-red-backdrop', size: 'lg' });
  }

  editPermiso(content:any,idRol:any, idOb:any) {
    console.log('escogio ', idRol, idOb)
    for (let i = 0; i < this.permisosRol.length; i++) {
      if(this.permisosRol[i].ID_ROL==idRol && this.permisosRol[i].ID_OBJETO==idOb){
        this.datos=this.permisosRol[i];
        if(this.datos.PERMISO_ACTUALIZACION==1){
          this.act=true;
        }else{
          this.act=false;
        }
        if(this.datos.PERMISO_ELIMINACION==1){
          this.elim=true;
        }else{
          this.elim=false;
        }
        if(this.datos.PERMISO_INSERCION==1){
          this.ins=true;
        }else{
          this.ins=false;
        }
        if(this.datos.PERMISO_CONSULTAR==1){
          this.con=true;
        }else{
          this.con=false;
        }
      }
    }
    this.modalService.open(content, {backdropClass: 'light-red-backdrop', size: 'lg' });
  }

  actPermiso(){
    if(this.act==true){
      this.datos.PERMISO_ACTUALIZACION=1;
    }else{
      this.datos.PERMISO_ACTUALIZACION=0;
    }
    if(this.elim==true){
      this.datos.PERMISO_ELIMINACION=1;
    }else{
      this.datos.PERMISO_ELIMINACION=0;
    }
    if(this.ins==true){
      this.datos.PERMISO_INSERCION=1;
    }else{
      this.datos.PERMISO_INSERCION=0;
    }
    if(this.con==true){
      this.datos.PERMISO_CONSULTAR=1;
    }else{
      this.datos.PERMISO_CONSULTAR=0;
    }
    console.log(this.datos)
    this.datos.MODIFICADO_POR=this.US._usuarioActual
    this.MS.actualizarPermiso(this.datos, this.datos.ID_OBJETO).subscribe((resp) => {
      console.log('resp permiso', resp)
      if(resp['mensaje'][0]['CODIGO']==1){
        this.MS.obtenerPermisos();
        Swal.fire({
          title: `Bien hecho...`,
          text:  `Permiso creado exitosamente`,
          confirmButtonText: 'OK',
        }).then((result) => {
          if (result.isConfirmed) {
            this.US.obtenerInfoUsuario().subscribe((resp) => {
              if(resp['mensaje'][0]['CODIGO']==1){
                this.US._permisos = resp['permisos'];
                for (let i = 0; i < this.US._permisos.length; i++) {
                  if(this.US._permisos[i].ID_OBJETO==5){
                    this._permisos=this.US._permisos[i];
                  }
                }
              }else{
                console.log("falso no retorno");
              }
            });
            this.permisosRol=this.MS._permisosRol;
            this.permisosInter = this.filter.valueChanges.pipe(
              startWith(''),
              map(text => search(this.permisosRol, text, this.pipe))
            );
            this.modalService.dismissAll();
          } else {
            this.modalService.dismissAll();
            console.log(`modal was dismissed by ${result.dismiss}`);
          }
        })
      }else{
        Swal.fire({
          icon: 'error',
          title: 'Oops... No se pudo actualizar el permiso',
          text: `${resp}`
        })
        //console.log('no',resp);
      }
    });
  }

  crearPermiso(){
    if(this.act==true){
      this.datosPermiso.PERMISO_ACTUALIZACION=1;
    }else{
      this.datosPermiso.PERMISO_ACTUALIZACION=0;
    }
    if(this.elim==true){
      this.datosPermiso.PERMISO_ELIMINACION=1;
    }else{
      this.datosPermiso.PERMISO_ELIMINACION=0;
    }
    if(this.ins==true){
      this.datosPermiso.PERMISO_INSERCION=1;
    }else{
      this.datosPermiso.PERMISO_INSERCION=0;
    }
    if(this.con==true){
      this.datosPermiso.PERMISO_CONSULTAR=1;
    }else{
      this.datosPermiso.PERMISO_CONSULTAR=0;
    }
    console.log(this.datosPermiso)
    this.MS.crearPermiso(this.datosPermiso).subscribe((resp) => {
      console.log('resp permiso', resp)
      if(resp['mensaje'][0]['CODIGO']==1){
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
          } else {
            this.modalService.dismissAll();
            console.log(`modal was dismissed by ${result.dismiss}`);
          }
        })
      }else{
        Swal.fire({
          icon: 'error',
          title: 'Oops... No se pudo crear el permiso',
          text: `${resp}`
        })
        //console.log('no',resp);
      }
    });
  }

  obtenerPermisos(){
    this.MS.obtenerPermisos();
    this.permisosRol=this.MS._permisosRol;
    //console.log('objs', this.objects)
  }

  evaluarDatos(opcion:any, op:any) {
    let PR = false
    let cR=false
    let pR=0
    if(op=='add'){
      for (let i = 0; i < this.permisosRol.length; i++) {
        const element = this.permisosRol[i];
        if(element.ID_ROL == this.datosPermiso.ID_ROL && element.ID_OBJETO == this.datosPermiso.ID_OBJETO ){
          cR=true
        }
      }
    }else{
      for (let i = 0; i < this.permisosRol.length; i++) {
        const element = this.permisosRol[i];
        if(element.ID_ROL == this.datos.ID_ROL && element.ID_OBJETO == this.datos.ID_OBJETO ){
          pR++
          console.log(pR)
        }
      }
      if(pR!=1){
        cR=true
      }
    }
    if(cR){
      PR=true
    }
    if(!PR){
      if(opcion=='add'){
        this.crearPermiso();
      }else{
        this.actPermiso();
      }
      this.enam=false
    }else{
      this.enam=true
      this.msj='Ya existe un permiso con los mismos datos'
    }
  }


}
