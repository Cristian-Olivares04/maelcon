import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Proveedor } from 'src/app/interfaces/characters.interface';
import { Category, Product } from 'src/app/interfaces/objects.interface';
import { ComprasService } from 'src/app/services/compras.service';
import { InventarioService } from 'src/app/services/inventario.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css', '../../../forms_styles.css']
})
export class ProductComponent implements OnInit {
  _productosCP:Product[]=[];
  _productos:any[]=[];
  _productos2:any[]=[];
  _proveedores:Proveedor[]=[];
  _categorias:Category[]=[];

  @Input() datosProd:Product={
    ID_PRODUCTO: 0,
    ID_PROVEEDOR: 1,
    NOMBRE_PRODUCTO: '',
    MARCA_PRODUCTO: '',
    DESCRIPCION_PRODUCTO: '',
    IMG_PRODUCTO: '',
    ESTADO: 0,
    ID_CATEGORIA: 1
  }

  constructor(private IN:InventarioService, private CP:ComprasService, private _Router:Router) {
    this.CP.obtenerProductos();
    this.IN.obtenerProductosCompletos();
    this.CP.obtenerProveedores();
    this.IN.obtenerInventario();
    this.IN.obtenerCategorias();
    this._productos = this.IN._products;
    this._productos2 = this.IN._products;
    this._proveedores = this.CP._proveedores;
    this._productosCP = this.CP._products;
    this._categorias = this.IN._categorias;
  }

  ngOnInit(): void {
  }

  crearProd(){
    console.log('datosProd',this.datosProd)
    /* this.IN.crearProducto(this.datosProd).subscribe((resp) => {
      //console.log('resp',resp['Objetos']);
      if(resp['mensaje'][0]['CODIGO']==1){
        Swal.fire({
          title: `Bien hecho...`,
          text:  `Producto creado exitosamente`,
          confirmButtonText: 'OK',
        }).then((result) => {
          if (result.isConfirmed) {
            localStorage.setItem('ruta', 'inventory');
            this._Router.navigate(['/inventory/path?refresh=1']);
          } else {
            console.log(`modal was dismissed by ${result.dismiss}`);
            localStorage.setItem('ruta', 'inventory');
            this._Router.navigate(['/inventory/path?refresh=1']);
          }
        })
      }else{
        //console.log('no',resp);
      }
    }); */
  }

}
