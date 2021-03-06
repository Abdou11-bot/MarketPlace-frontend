import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MDBBootstrapModule } from 'angular-bootstrap-md';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {RouterModule, Routes} from "@angular/router";
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { CategoriebarComponent } from './components/categoriebar/categoriebar.component';
import { ContactComponent } from './components/contact/contact.component';
import { AdminHomeComponent } from './components/admin/components/admin-home/admin-home.component';
import { AdminHeaderComponent } from './components/admin/components/admin-header/admin-header.component';
import { AdminMessageContentComponent } from './components/admin/components/admin-message-content/admin-message-content.component';
import { AdminProviderContentComponent } from './components/admin/components/admin-provider-content/admin-provider-content.component';
import { AdminComplaintContentComponent } from './components/admin/components/admin-complaint-content/admin-complaint-content.component';
import { AdminStatisticsContentComponent } from './components/admin/components/admin-statistics-content/admin-statistics-content.component';
import { AdminMedecinContentComponent } from './components/admin/components/admin-medecin-content/admin-medecin-content.component';
import { AdminSpecialityContentComponent } from './components/admin/components/admin-speciality-content/admin-speciality-content.component';
import { AdminProfileContentComponent } from './components/admin/components/admin-profile-content/admin-profile-content.component';
import { AdminMenuBarComponent } from './components/admin/components/admin-menu-bar/admin-menu-bar.component';
import { MedecinHomeComponent } from './components/medecin/components/medecin-home/medecin-home.component';
import { MedecinHeaderComponent } from './components/medecin/components/medecin-header/medecin-header.component';
import { MedecinQuotationContentComponent } from './components/medecin/components/medecin-quotation-content/medecin-quotation-content.component';
import { MedecinComplaintContentComponent } from './components/medecin/components/medecin-complaint-content/medecin-complaint-content.component';
import { MedecinWishlistContentComponent } from './components/medecin/components/medecin-wishlist-content/medecin-wishlist-content.component';
import { MedecinProfileContentComponent } from './components/medecin/components/medecin-profile-content/medecin-profile-content.component';
import { MedecinMenuBarComponent } from './components/medecin/components/medecin-menu-bar/medecin-menu-bar.component';
import { ProviderHomeComponent } from './components/provider/components/provider-home/provider-home.component';
import { ProviderHeaderComponent } from './components/provider/components/provider-header/provider-header.component';
import { ProviderQuotationContentComponent } from './components/provider/components/provider-quotation-content/provider-quotation-content.component';
import { ProviderProfileContentComponent } from './components/provider/components/provider-profile-content/provider-profile-content.component';
import { ProviderStatisticsContentComponent } from './components/provider/components/provider-statistics-content/provider-statistics-content.component';
import { ProviderProductContentComponent } from './components/provider/components/provider-product-content/provider-product-content.component';
import { ProviderComplaintContentComponent } from './components/provider/components/provider-complaint-content/provider-complaint-content.component';
import { ProviderMenuBarComponent } from './components/provider/components/provider-menu-bar/provider-menu-bar.component';
import { WishlistComponent } from './components/wishlist/wishlist.component';
import { LoginComponent } from './components/login/login.component';
import { ListproduitsComponent } from './components/listproduits/listproduits.component';
import { ListspecialitiesComponent } from './components/listspecialities/listspecialities.component';
import { DetailProduitsComponent } from './components/detailProduits/detailproduits.component';
import { CartdevisComponent } from './components/cartdevis/cartdevis.component';
import {NgxPaginationModule} from 'ngx-pagination';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {MatCardModule} from '@angular/material/card';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatIconModule} from '@angular/material/icon';
import {MatDialogModule} from '@angular/material/dialog';
import {CommonModule} from '@angular/common';
import { StorageServiceModule } from 'ngx-webstorage-service';
import { LocalStorageService } from './services/localStorage.service';
import { SessionStorageService } from './services/sessionStorage.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

const routes: Routes = [
   { path: 'home', component: HomeComponent },
   { path: 'login', component: LoginComponent },
    { path: 'contact', component: ContactComponent },
    { path: 'about', component: AboutComponent },
    { path: 'wishlist', component: WishlistComponent },
    { path: 'produits/:id', component: ListproduitsComponent },
    { path: 'specialities', component: ListspecialitiesComponent },
    { path: 'produit/detail/:id', component: DetailProduitsComponent },
    { path: 'admin/home',  component: AdminHomeComponent },
    { path: 'admin/messages/:list/:ind',  component: AdminMessageContentComponent },
    { path: 'admin/provider/:list/:ind/:op',  component: AdminProviderContentComponent },
    { path: 'admin/medecin',  component: AdminMedecinContentComponent },
    { path: 'admin/specialities',  component: AdminSpecialityContentComponent },
    { path: 'admin/profile',  component: AdminProfileContentComponent },
    { path: 'admin/complaint/:list/:ind',  component: AdminComplaintContentComponent },
    { path: 'admin/statistics/:type/:diag',  component: AdminStatisticsContentComponent },
    { path: 'admin/**',  component: AdminHomeComponent },
    { path: 'medecin/home',  component: MedecinHomeComponent },
    { path: 'medecin/quotation',  component: MedecinQuotationContentComponent },
    { path: 'medecin/wishlist',  component: MedecinWishlistContentComponent },
    { path: 'medecin/profile',  component: MedecinProfileContentComponent },
    { path: 'medecin/complaint',  component: MedecinComplaintContentComponent },
    { path: 'medecin/**',  component: MedecinHomeComponent },
    { path: 'provider/home',  component: ProviderHomeComponent },
    { path: 'provider/quotation',  component: ProviderQuotationContentComponent },
    { path: 'provider/statistics/:type/:diag',  component: ProviderStatisticsContentComponent },
    { path: 'provider/profile',  component: ProviderProfileContentComponent },
    { path: 'provider/product',  component: ProviderProductContentComponent},
    { path: 'provider/complaint',  component: ProviderComplaintContentComponent },
    { path: 'provider/**',  component: ProviderHomeComponent },
    { path: '**', redirectTo: '/home', pathMatch: 'full' }
 ];
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    FooterComponent,
    HeaderComponent,
    CategoriebarComponent,
    ContactComponent,
    WishlistComponent,
    LoginComponent,
    ListproduitsComponent,
    ListspecialitiesComponent,
    DetailProduitsComponent,
    AdminHomeComponent,
    AdminHeaderComponent,
    AdminMenuBarComponent,
    AdminMessageContentComponent,
    AdminProviderContentComponent,
    AdminProfileContentComponent,
    AdminMedecinContentComponent,
    AdminSpecialityContentComponent,
    AdminComplaintContentComponent,
    AdminStatisticsContentComponent,
    MedecinHomeComponent,
    MedecinHeaderComponent,
    MedecinMenuBarComponent,
    MedecinQuotationContentComponent,
    MedecinProfileContentComponent,
    MedecinWishlistContentComponent,
    MedecinComplaintContentComponent,
    ProviderStatisticsContentComponent,
    ProviderQuotationContentComponent,
    ProviderProductContentComponent,
    ProviderMenuBarComponent,
    ProviderHeaderComponent,
    ProviderProfileContentComponent,
    ProviderComplaintContentComponent,
    ProviderHomeComponent,
    CartdevisComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    MDBBootstrapModule,
    AppRoutingModule,
    CommonModule,
    NgxPaginationModule,
    NgbModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    MatCardModule,
    MatGridListModule,
    MatIconModule,
    MatDialogModule,
    StorageServiceModule,
    BrowserAnimationsModule,

  ],
  providers: [LocalStorageService,SessionStorageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
