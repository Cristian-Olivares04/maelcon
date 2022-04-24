import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment'
import { UsuariosService } from './usuarios.service';
import { Help } from '../interfaces/objects.interface';

@Injectable({
  providedIn: 'root'
})
export class AyudaService {
  private bUA = environment.baseUrl;
  public pag = 0;
  public _ayuda:Help[]=[];
  public _ayudaActiva:Help[]=[];

  constructor(private http:HttpClient) {
    this.obtenerInfAyudaAct();
    this.obtenerInfoAyuda();
  }

  //funcion para crear informacion de ayuda
  crearInfAyuda( data:Help): Observable<any>{
    return this.http.post<Help>(`${this.bUA}/module/helpers/helpInfo`, data);
  }

  //funcion para actualizar una informacion de ayuda
  actualizarInfAyuda( data:Help, id:any): Observable<any>{
    return this.http.put<Help>(`${this.bUA}/module/helpers/helpInfo/${id}`, data);
  }

  //funcion para obtener la informacion de ayuda
  obtenerInfoAyuda(){
    this.http.get<any>(`${this.bUA}/module/helpers/helpInfo`).subscribe((resp) => {
      //console.log('resp ayuda',resp['Objetos']);
      if(resp['mensaje'][0]['CODIGO']==1){
        this._ayuda=resp['Objetos'];
      }else{
        //console.log('no',resp);
      }
    });
  }

  //funcion para obtener una informacion de ayuda activa
  obtenerInfAyudaAct(){
    this.http.get<any>(`${this.bUA}/module/helpers/data`).subscribe((resp) => {
      //console.log('resp ayuda',resp['Objetos']);
      if(resp['mensaje'][0]['CODIGO']==1){
        this._ayudaActiva=resp['Objetos'];
      }else{
        //console.log('no',resp);
      }
    });
  }

}
