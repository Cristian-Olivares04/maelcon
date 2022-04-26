import { Component, EventEmitter, Input, OnInit, PipeTransform } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PurchaseDetail } from 'src/app/interfaces/objects.interface';
import { ComprasService } from 'src/app/services/compras.service';

interface Country {
  name: string;
  flag: string;
  area: number;
  population: number;
}

const COUNTRIES: Country[] = [
  {
    name: 'United States',
    flag: 'a/a4/Flag_of_the_United_States.svg',
    area: 9629091,
    population: 324459463
  },
  {
    name: 'China',
    flag: 'f/fa/Flag_of_the_People%27s_Republic_of_China.svg',
    area: 9596960,
    population: 1409517397
  },
  {
    name: 'United States',
    flag: 'a/a4/Flag_of_the_United_States.svg',
    area: 9629091,
    population: 324459463
  },
  {
    name: 'China',
    flag: 'f/fa/Flag_of_the_People%27s_Republic_of_China.svg',
    area: 9596960,
    population: 1409517397
  }
];

function search(text: string, pipe: PipeTransform): Country[] {
  return COUNTRIES.filter(country => {
    const term = text.toLowerCase();
    return country.name.toLowerCase().includes(term)
        || pipe.transform(country.area).includes(term)
        || pipe.transform(country.population).includes(term);
  });
}

function searchDetProd(DETALLE, text: string, pipe: PipeTransform): PurchaseDetail[] {
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
  selector: 'app-view-products',
  templateUrl: './view-products.component.html',
  styleUrls: ['./view-products.component.css'],
  providers: [DecimalPipe]
})
export class ViewProductsComponent implements OnInit {
  @Input() viewOption:any;
  countries: Observable<Country[]>;
  filter = new FormControl('');
  @Input() listaDetalle:any;
  listDetalleCompr:any;
  detalleInter: Observable<PurchaseDetail[]>;

  constructor(private CP:ComprasService,private pipe: DecimalPipe, private modalService: NgbModal) {
    this.listDetalleCompr=this.CP._detallesCompras;
    this.listaDetalle=this.listDetalleCompr;
    this.countries = this.filter.valueChanges.pipe(
      startWith(''),
      map(text => search(text, this.pipe))
    );

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
