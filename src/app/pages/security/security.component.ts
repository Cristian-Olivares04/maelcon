import { Component, OnInit } from '@angular/core';
import { MantenimientoService } from 'src/app/services/mantenimiento.service';

@Component({
  selector: 'app-security',
  templateUrl: './security.component.html',
  styleUrls: ['./security.component.css']
})
export class SecurityComponent implements OnInit {
  disabled = false;

  constructor(private MS:MantenimientoService) { }

  ngOnInit(): void {
    localStorage.setItem('ruta', 'security');
  }

  descargarDB(){
    console.log('Descargando archivo DB');
    this.MS.crearBackUp();
    /* try {
      this.MS.crearBackUp({"name":"MAELCON_RESPALDO"}).subscribe((resp) => {
        var r = JSON.parse(resp)
        console.log('ejemplo',r)
        let blob = new Blob(['\ufeff' + resp], { type: 'text/plain;charset=utf-8;' });
        let dwldLink = document.createElement("a");
        let url = URL.createObjectURL(blob);
        let isSafariBrowser = navigator.userAgent.indexOf('Safari') != -1 && navigator.userAgent.indexOf('Chrome') == -1;
        if (isSafariBrowser) {  //if Safari open in new window to save file with random filename.
          dwldLink.setAttribute("target", "_blank");
        }
        dwldLink.setAttribute("href", url);
        dwldLink.setAttribute("download", `MAELCON_RESPALDO.sql`);
        dwldLink.style.visibility = "hidden";
        document.body.appendChild(dwldLink);
        dwldLink.click();
        document.body.removeChild(dwldLink);

        console.log('resp DB',blob);
      });
    } catch (error) {
      console.log('resp error',error);
    } */

  }

}


