import { Component, Input, OnInit, PipeTransform } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Role } from 'src/app/interfaces/objects.interface';
import { MantenimientoService } from 'src/app/services/mantenimiento.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css'],
  providers: [DecimalPipe]
})
export class RolesComponent implements OnInit {
  rolesInter:Observable<Role[]>
  filter = new FormControl('');
  roles:Role[]=this.MS._roles;
  condition=false;


  constructor(private MS:MantenimientoService, pipe: DecimalPipe, private modalService: NgbModal, private _Router:Router, private US:UsuariosService) {
    this.rolesInter = this.filter.valueChanges.pipe(
      startWith(''),
      map(text => this.search(text, pipe))
    );
  }

  ngOnInit(): void {
    this.MS.obtenerObjetos();
    this.roles=this.MS._roles;
    //console.log('ROLES', this.roles)
    this.condition=true
  }

  @Input() datoRole:Role={
    ID_ROL: 0,
    ROL: '',
    DESCRIPCION: '',
    FECHA_CREACION: '',
    CREADO_POR: 0,
    FECHA_MODIFICACION: '',
    MODIFICADO_POR: this.US._usuarioActual
  }

  openModal(content:Object) {
    var fechaAct = new Date();
    this.datoRole={
      ID_ROL: 0,
      ROL: '',
      DESCRIPCION: '',
      FECHA_CREACION: fechaAct.toLocaleDateString(),
      CREADO_POR: this.US._usuarioActual,
      FECHA_MODIFICACION: '',
      MODIFICADO_POR: 0
    }
    this.modalService.open(content, {backdropClass: 'light-red-backdrop', size: 'lg' });
  }

  editarRol(content:any,id:any) {
    for (let i = 0; i < this.roles.length; i++) {
      if(this.roles[i].ID_ROL==id){
        this.datoRole=this.roles[i];
      }
    }
    this.modalService.open(content, {backdropClass: 'light-red-backdrop', size: 'lg' });
  }

  actRol(id:any){
    //console.log(this.datoRole)
    var fechaAct = new Date();
    this.datoRole.FECHA_MODIFICACION=fechaAct.toLocaleDateString();
    this.MS.actualizarRol(this.datoRole, id).subscribe((resp) => {
      //console.log('resp rol',resp)
      if(resp[0]['CODIGO']==1){
        Swal.fire({
          title: `Bien hecho...`,
          text:  `Rol actualizado exitosamente`,
          confirmButtonText: 'OK',
        }).then((result) => {
          if (result.isConfirmed) {
            for (let i = 0; i < this.roles.length; i++) {
              if(this.roles[i].ID_ROL==id){
                this.roles[i].ROL=this.datoRole.ROL;
                this.roles[i].DESCRIPCION=this.datoRole.DESCRIPCION;
              }
            }
            this.modalService.dismissAll();
            this._Router.navigate(['/security']);
          } else {
            for (let i = 0; i < this.roles.length; i++) {
              if(this.roles[i].ID_ROL==id){
                this.roles[i].ROL=this.datoRole.ROL;
                this.roles[i].DESCRIPCION=this.datoRole.DESCRIPCION;
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

  crearRol(){
    //console.log(this.datoRole)
    this.MS.crearRol(this.datoRole).subscribe((resp) => {
      //console.log('resp rol',resp)
      if(resp[0]['CODIGO']==1){
        this.MS.obtenerRoles();
        Swal.fire({
          title: `Bien hecho...`,
          text:  `Rol creado exitosamente`,
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

  search(text: string, pipe: PipeTransform): Role[] {
    return this.roles.filter(ob => {
      const term = text.toLowerCase();
      return ob.ROL.toLowerCase().includes(term)
          || pipe.transform(ob.DESCRIPCION).toLowerCase().includes(term)
          || pipe.transform(ob.FECHA_CREACION).toLowerCase().includes(term)
          || pipe.transform(ob.CREADO_POR).includes(term);
    });
  }

  obtenerRoles(){
    this.MS.obtenerRoles();
    this.roles=this.MS._roles;
    //console.log('objs', this.roles)
  }
}
