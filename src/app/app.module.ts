/*Imported Modules*/
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SidebarModule } from 'ng-sidebar';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';

/*Created Modules*/
import { AppRoutingModule } from './app-routing.module';

/*Created Components*/
import { AppComponent } from './app.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { SalesComponent } from './pages/sales/sales.component';
import { ShoppingComponent } from './pages/shopping/shopping.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AdministrationComponent } from './pages/administration/administration.component';
import { FormDatabaseComponent } from './components/form-database/form-database.component';
import { FormMailComponent } from './components/form-mail/form-mail.component';
import { GeneralSettingsComponent } from './components/general-settings/general-settings.component';
import { UpdatePasswordComponent } from './components/update-password/update-password.component';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    LoginComponent,
    SignupComponent,
    SalesComponent,
    ShoppingComponent,
    NavbarComponent,
    AdministrationComponent,
    FormDatabaseComponent,
    FormMailComponent,
    GeneralSettingsComponent,
    UpdatePasswordComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgbModule,
    SidebarModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
