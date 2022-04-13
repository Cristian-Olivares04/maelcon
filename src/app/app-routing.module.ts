import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { InicioSesionComponent } from './auth/inicio-sesion/inicio-sesion.component';
import { RegistroComponent } from './auth/registro/registro.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { AdministrationComponent } from './pages/administration/administration.component';
import { SalesComponent } from './pages/sales/sales.component';
import { SecurityComponent } from './pages/security/security.component';
import { ShoppingComponent } from './pages/shopping/shopping.component';

const routes: Routes = [
  {
    path: '',
    component: AppComponent,
    pathMatch: 'full'
  },
  {
      path: 'login',
      component: InicioSesionComponent,
  },
  {
      path: 'sign-up',
      component: RegistroComponent
  },
  {
      path: 'sales',
      component: SalesComponent
  },
  {
      path: 'shopping',
      component: ShoppingComponent
  },
  {
      path: 'administration',
      component: AdministrationComponent
  },
  {
    path: 'security',
    component: SecurityComponent
},
  {
      path: 'home-signed',
      component: SidebarComponent
  },
  {
      path: 'home-usigned',
      component: NavbarComponent
  },
  {
      path: '**',
      redirectTo: ''
  }
]

@NgModule({
  imports: [
      BrowserModule,
      RouterModule.forRoot( routes )
  ],
  exports: [
      RouterModule
  ]
})

export class AppRoutingModule {}
export const ArrayOfComponents = [InicioSesionComponent, RegistroComponent]

