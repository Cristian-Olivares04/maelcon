import { Component, Input, OnInit, PipeTransform } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Cliente } from 'src/app/interfaces/characters.interface';
import { VentasService } from 'src/app/services/ventas.service';
import Swal from 'sweetalert2';

function search(CLIENTES, text: string, pipe: PipeTransform): Cliente[] {
  return CLIENTES.filter(cli => {
    const term = text.toLowerCase();
    return cli.NOMBRE_CLIENTE.toLowerCase().includes(term)
        || cli.RTN.toLowerCase().includes(term)
        || cli.DIRECCION_CLIENTE.toLowerCase().includes(term)
        || cli.TELEFONO_CLIENTE.toLowerCase().includes(term);
  });
}

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css'],
  providers: [DecimalPipe]
})
export class CustomersComponent implements OnInit {
  clientesInter: Observable<Cliente[]>;
  filter = new FormControl('');
  clientes:Cliente[]=[]
  msj=''
  enam=false

  @Input() datosCustomer:Cliente={
    ID_CLIENTE: 0,
    NOMBRE_CLIENTE: '',
    RTN: '',
    DIRECCION_CLIENTE: '',
    TELEFONO_CLIENTE: ''
  }

  constructor(private VS:VentasService, private pipe: DecimalPipe, private modalService: NgbModal) {
    this.clientes= this.VS._clientes;
    this.clientesInter = this.filter.valueChanges.pipe(
      startWith(''),
      map(text => search(this.clientes, text, this.pipe))
    );
  }

  ngOnInit(): void {
    this.clientes= this.VS._clientes;
    this.clientesInter = this.filter.valueChanges.pipe(
      startWith(''),
      map(text => search(this.clientes, text, this.pipe))
    );
  }

  openModalAct(content:Object, id:number) {
    console.log('escogio cliente con id: ',id)
    for (let i = 0; i < this.clientes.length; i++) {
      const element = this.clientes[i];
      if(element.ID_CLIENTE==id){
        this.datosCustomer = element;
      }
    }
    this.modalService.open(content, {backdropClass: 'light-red-backdrop', size: 'lg', centered: true });
  }

  openModal(content:Object) {
    this.modalService.open(content, {backdropClass: 'light-red-backdrop', size: 'lg', centered: true });
  }

  crearCliente(){
    console.log('datosCliente', this.datosCustomer)
    this.VS.crearCliente(this.datosCustomer).subscribe((resp) => {
      //console.log('resp',resp);
      this.VS.obtenerClientes();
      if(resp['mensaje'][0]['CODIGO']==1){
        Swal.fire({
          title: `Bien hecho...`,
          text:  `Cliente creado exitosamente`,
          confirmButtonText: 'OK',
        }).then((result) => {
          if (result.isConfirmed) {
            this.clientes=this.VS._clientes;
            this.clientesInter = this.filter.valueChanges.pipe(
              startWith(''),
              map(text => search(this.clientes,text, this.pipe))
            );
            let dc = document.getElementById("closeAddProv");
            dc?.click()
          } else {
            this.clientes=this.VS._clientes;
            this.clientesInter = this.filter.valueChanges.pipe(
              startWith(''),
              map(text => search(this.clientes,text, this.pipe))
            );
            //console.log(`modal was dismissed by ${result.dismiss}`);
          }
        })
      }else{
        Swal.fire({
          icon: 'error',
          title: 'Oops... No se pudo crear el proveedor',
          text: `${resp}`
        })
        //console.log('no',resp);
      }
    });
    this.datosCustomer={
      ID_CLIENTE: 0,
      NOMBRE_CLIENTE: '',
      RTN: '',
      DIRECCION_CLIENTE: '',
      TELEFONO_CLIENTE: ''
    }
  }

  actCliente(){
    console.log('datosCliente', this.datosCustomer)
    this.VS.actualizarCliente(this.datosCustomer, this.datosCustomer.ID_CLIENTE).subscribe((resp) => {
      //console.log('resp',resp);
      if(resp['mensaje'][0]['CODIGO']==1){
        for (let i = 0; i < this.clientes.length; i++) {
          const element = this.clientes[i];
          if(element.ID_CLIENTE==this.datosCustomer.ID_CLIENTE){
            this.clientes[i].DIRECCION_CLIENTE=this.datosCustomer.DIRECCION_CLIENTE
            this.clientes[i].NOMBRE_CLIENTE=this.datosCustomer.NOMBRE_CLIENTE
            this.clientes[i].RTN=this.datosCustomer.RTN
            this.clientes[i].TELEFONO_CLIENTE=this.datosCustomer.TELEFONO_CLIENTE
          }
        }
        this.VS._clientes=this.clientes;
        Swal.fire({
          title: `Bien hecho...`,
          text:  `Cliente actualizado exitosamente`,
          confirmButtonText: 'OK',
        }).then((result) => {
          if (result.isConfirmed) {
            let dc = document.getElementById("closeActCus");
            dc?.click()
          } else {
            let dc = document.getElementById("closeActCus");
            dc?.click()
            //console.log(`modal was dismissed by ${result.dismiss}`);
          }
        })
      }else{
        Swal.fire({
          icon: 'error',
          title: 'Oops... No se pudo actualizar el cliente',
          text: 'Uno o mas campos del cliente son utilizados por alguien más.'
        })
        //console.log('no',resp);
      }
    });
    this.datosCustomer={
      ID_CLIENTE: 0,
      NOMBRE_CLIENTE: '',
      RTN: '',
      DIRECCION_CLIENTE: '',
      TELEFONO_CLIENTE: ''
    }
  }

  evaluarDatos(opcion:any) {
    let rtn=false;
    let nP=false;
    let tF=false;
    let PR=false;
    if (this.datosCustomer.RTN.length!=14) {
      rtn=true;
      this.msj='RTN necesita 14 digitos sin guiones'
    }
    if (this.datosCustomer.NOMBRE_CLIENTE.length<3) {
      nP=true;
      this.msj='Nombre prveedor muy corto'
    }
    if (this.verificacionTelefono()) {
      tF=true
      this.msj='Telefono necesita 8 digitos sin guiones'
    }
    if (this.datosCustomer.DIRECCION_CLIENTE.length<=0) {
      this.datosCustomer.DIRECCION_CLIENTE='Sin Especificar'
    }
    if(!rtn && !nP && !tF){
      let cR=false
      let pR=false
      let nR=false
      let mR=false
      for (let i = 0; i < this.clientes.length; i++) {
        const element = this.clientes[i];
        if(element.ID_CLIENTE != this.datosCustomer.ID_CLIENTE){
          if(element.RTN == this.datosCustomer.RTN){
            cR=true;
          }
          if(element.TELEFONO_CLIENTE == this.datosCustomer.TELEFONO_CLIENTE){
            pR=true
          }
          if(element.NOMBRE_CLIENTE == this.datosCustomer.NOMBRE_CLIENTE){
            nR=true
          }
          if(element.DIRECCION_CLIENTE == this.datosCustomer.DIRECCION_CLIENTE){
            mR=true
          }
        }
      }
      if(cR && pR && nR && mR){
        PR=true
      }
      if(!PR){
        if(opcion=='add'){
          this.crearCliente();
        }else{
          this.actCliente();
        }
        this.enam=false
      }else{
        this.enam=true
        this.msj='Ya existe un proveedor con los mismos datos'
      }
    }else{
      this.enam=true;
    }
  }

  verificacionTelefono(){
    const regexi = /^([0-9]){8}$/;
    if(regexi.test(this.datosCustomer.TELEFONO_CLIENTE)){
      return false;
    }else{
      return true;
    }
  }

}
