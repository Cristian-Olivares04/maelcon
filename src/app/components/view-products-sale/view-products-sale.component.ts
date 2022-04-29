import { Component, EventEmitter, Input, OnInit, PipeTransform } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SaleDetail } from 'src/app/interfaces/objects.interface';
import { ComprasService } from 'src/app/services/compras.service';
import { VentasService } from 'src/app/services/ventas.service';

function searchDetProd(DETALLE, text: string, pipe: PipeTransform): SaleDetail[] {
  return DETALLE.filter(det => {
    const term = text.toLowerCase();
    return det.NOMBRE_PRODUCTO.toLowerCase().includes(term)
        || det.MARCA_PRODUCTO.toLowerCase().includes(term)
        || pipe.transform(det.PRECIO_UNITARIO).includes(term)
        || pipe.transform(det.CANTIDAD_PRODUCTO).includes(term)
        || pipe.transform(det.SUB_TOTAL).includes(term);
  });
}

@Component({
  selector: 'app-view-products-sale',
  templateUrl: './view-products-sale.component.html',
  styleUrls: ['./view-products-sale.component.css'],
  providers: [DecimalPipe]
})
export class ViewProductsSaleComponent implements OnInit {
  @Input() viewOption:any;
  filter = new FormControl('');
  @Input() listaDetalle:any;
  listDetalleVenta:any;
  detalleInter: Observable<SaleDetail[]>;

  constructor(private VS:VentasService,private pipe: DecimalPipe, private modalService: NgbModal) {
    this.listDetalleVenta=this.VS._detallesVenta;
    this.listaDetalle=this.listDetalleVenta;

    this.detalleInter = this.filter.valueChanges.pipe(
      startWith(''),
      map(text => searchDetProd(this.listDetalleVenta ,text, this.pipe))
    );
  }

  ngOnInit(): void {
    //console.log('listaDetalles: ', this.listDetalleVenta)
  }

  openModal(content:Object) {
    this.modalService.open(content, {backdropClass: 'light-red-backdrop', size: 'lg' });
  }

}
