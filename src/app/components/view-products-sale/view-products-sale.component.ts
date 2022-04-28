import { Component, EventEmitter, Input, OnInit, PipeTransform } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SaleDetail } from 'src/app/interfaces/objects.interface';
import { ComprasService } from 'src/app/services/compras.service';

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
  listDetalleCompr:any;
  detalleInter: Observable<SaleDetail[]>;

  constructor(private CP:ComprasService,private pipe: DecimalPipe, private modalService: NgbModal) {
    this.listDetalleCompr=this.CP._detallesCompras;
    this.listaDetalle=this.listDetalleCompr;

    this.detalleInter = this.filter.valueChanges.pipe(
      startWith(''),
      map(text => searchDetProd(this.listaDetalle ,text, this.pipe))
    );
  }

  ngOnInit(): void {
  }

  openModal(content:Object) {
    this.modalService.open(content, {backdropClass: 'light-red-backdrop', size: 'lg' });
  }

}
