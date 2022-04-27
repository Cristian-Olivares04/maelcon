/*Imported Modules*/
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SidebarModule } from 'ng-sidebar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { BinnacleComponent } from './components/binnacle/binnacle.component';
import { SecurityComponent } from './pages/security/security.component';
import { BackupComponent } from './components/backup/backup.component';
import { UsersComponent } from './components/users/users.component';
import { UpdateUserComponent } from './components/update-user/update-user.component';
import { RolesComponent } from './components/roles/roles.component';
import { ObjectsComponent } from './components/objects/objects.component';
import { PermissionsComponent } from './components/permissions/permissions.component';
import { CloudinaryComponent } from './components/cloudinary/cloudinary.component';
import { CardInventoryComponent } from './components/card-inventory/card-inventory.component';
import { InventoryComponent } from './pages/inventory/inventory.component';
import { ProductComponent } from './components/product/product.component';
import { ProvidersComponent } from './components/providers/providers.component';
import { SignupAdmonComponent } from './auth/signup-admon/signup-admon.component';
import { DownloadComponent } from './components/download/download.component';
import { CardShoppingComponent } from './components/card-shopping/card-shopping.component';
import { ListProductsComponent } from './components/list-products/list-products.component';
import { DetailsShoppingComponent } from './components/details-shopping/details-shopping.component';
import { ViewProductsComponent } from './components/view-products/view-products.component';
import { CardSalesComponent } from './components/card-sales/card-sales.component';
import { DetailsSalesComponent } from './components/details-sales/details-sales.component';
import { CustomersComponent } from './components/customers/customers.component';
import { CommissionsComponent } from './components/commissions/commissions.component';
import { InformationComponent } from './pages/information/information.component';
import { InformationV2Component } from './pages/information-v2/information-v2.component';
import { PaginatePipe } from './pipes/paginate.pipe';
import { DatePipe } from '@angular/common';
import { CategoriesComponent } from './components/categories/categories.component';

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
    BinnacleComponent,
    SecurityComponent,
    BackupComponent,
    UsersComponent,
    UpdateUserComponent,
    RolesComponent,
    ObjectsComponent,
    PermissionsComponent,
    CloudinaryComponent,
    CardInventoryComponent,
    InventoryComponent,
    ProductComponent,
    ProvidersComponent,
    SignupAdmonComponent,
    DownloadComponent,
    CardShoppingComponent,
    ListProductsComponent,
    DetailsShoppingComponent,
    ViewProductsComponent,
    CardSalesComponent,
    DetailsSalesComponent,
    CustomersComponent,
    CommissionsComponent,
    InformationComponent,
    InformationV2Component,
    PaginatePipe,
    CategoriesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
    SidebarModule.forRoot(),
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
