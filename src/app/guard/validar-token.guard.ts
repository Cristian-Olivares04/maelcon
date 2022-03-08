import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { UsuariosService } from '../services/usuarios.service';

@Injectable({
  providedIn: 'root'
})
export class ValidarTokenGuard implements CanActivate, CanLoad {

  constructor(private UsuariosService: UsuariosService, private router: Router){}

  canActivate(): Observable<boolean> | boolean {
    console.log('canActivate');
    return this.UsuariosService.validarToken()
      .pipe(
        tap( valid => {
          if(!valid){
            this.router.navigateByUrl('/login');
          }
        })
      );
  }

  canLoad(): Observable<boolean> | boolean {
    console.log('canLoad');
    return this.UsuariosService.validarToken()
      .pipe(
        tap(valid => {
          if(!valid){
            this.router.navigateByUrl('/login');
          }
        })
      );
  }
}
