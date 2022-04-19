import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { DownloadComponent } from './components/download/download.component';
import { GeneralSettingsComponent } from './components/general-settings/general-settings.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { AdministrationComponent } from './pages/administration/administration.component';
import { InventoryComponent } from './pages/inventory/inventory.component';
import { SalesComponent } from './pages/sales/sales.component';
import { SecurityComponent } from './pages/security/security.component';
import { SeeConfigComponent } from './pages/see-config/see-config.component';
import { ShoppingComponent } from './pages/shopping/shopping.component';

const routes: Routes = [
  {
    path: '',
    component: AppComponent,
    pathMatch: 'full'
  },
  {
      path: 'login',
      component: LoginComponent,
  },
  {
      path: 'sign-up',
      component: SignupComponent
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
    path: 'inventory',
    component: InventoryComponent
  },
  {
    path: 'download',
    component: DownloadComponent
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
      path: 'edit-config',
      component: GeneralSettingsComponent
  },
  {
      path: 'see-config',
      component: SeeConfigComponent
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
export const ArrayOfComponents = [LoginComponent, SignupComponent]

