import { Component, Input, OnInit } from '@angular/core';
import { saveAs } from 'file-saver';
import { MantenimientoService } from 'src/app/services/mantenimiento.service';

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
		this.MS.downloadFile().subscribe((resp) => {
			let blob:any = new Blob([resp], { type: 'text/csv' });
			//const url = window.URL.createObjectURL(resp);
			//window.open(url);
			saveAs(blob, this.datosBackUp.nombre);
			}), (error: any) => console.log('Error downloading the file'),
			() => console.info('File downloaded successfully');
	}
}
