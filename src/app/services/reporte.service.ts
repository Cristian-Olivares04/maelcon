import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Bitacora, Purchase, Sale } from '../interfaces/objects.interface';

@Injectable({
  providedIn: 'root'
})
export class ReporteService {
  private bUA = environment.baseUrl;

  constructor(private http:HttpClient) { 
  }

  //funcion para obtener las compras del reporte
  obtenerCompras(data:any):Observable<any>{
    return this.http.post<any>(`${this.bUA}/module/reports/shoppingReport`, data);
  }

  //funcion para obtener las ventas del reporte
  obtenerVentas(data:any):Observable<any>{
    return this.http.post<any>(`${this.bUA}/module/reports/salesReport`, data);
  }


  //funcion para obtener las compras del reporte
  obtenerBitacora(data:any):Observable<any>{
    return this.http.post<any>(`${this.bUA}/module/reports/binnacleReport`, data);
  }
}
