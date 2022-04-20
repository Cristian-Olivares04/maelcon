import { Component, Input, OnInit } from '@angular/core';
import { saveAs } from 'file-saver';
import { MantenimientoService } from 'src/app/services/mantenimiento.service';
import { parseJsonText } from 'typescript';

@Component({
  selector: 'app-backup',
  templateUrl: './backup.component.html',
  styleUrls: ['./backup.component.css', '../../../forms_styles.css']
})
export class BackupComponent implements OnInit {

  @Input() datosBackUp = {
    nombre:''
  }

  constructor(private MS:MantenimientoService) { }

  ngOnInit(): void {
  }

  download() {
    this.MS.obtenerRegistrosBitacora().subscribe((resp) => {
      var Bita = JSON.stringify(resp['BITACORA'])
			let blob:any = new Blob([Bita], { type: 'text' });
      console.log(blob)
			saveAs(blob, this.datosBackUp.nombre);
			}), (error: any) => console.log('Error downloading the file'),
			() => console.info('File downloaded successfully');

	}
}
