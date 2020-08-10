import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MDBBootstrapModule } from 'angular-bootstrap-md';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {RouterModule, Routes} from "@angular/router";
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { BlogComponent } from './components/blog/blog.component';
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
import { AdminProfileContentComponent } from './components/admin/components/admin-profile-content/admin-profile-content.component';
import { AdminMenuBarComponent } from './components/admin/components/admin-menu-bar/admin-menu-bar.component';
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
import { DevisComponent } from './components/devis/devis.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
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
    // { path: 'blog-detail', component: BlogDetailsComponent },
    { path: 'about', component: AboutComponent },
     { path: 'blog', component: BlogComponent },
    { path: 'devis', component: DevisComponent },
    { path: 'admin', component: DashboardComponent },
    { path: 'wishlist', component: WishlistComponent },
    { path: 'produits/:id', component: ListproduitsComponent },
    { path: 'specialities', component: ListspecialitiesComponent },
    { path: 'produit/detail/:id', component: DetailProduitsComponent },
    { path: 'admin/home',  component: AdminHomeComponent },
    { path: 'admin/messages',  component: AdminMessageContentComponent },
    { path: 'admin/provider',  component: AdminProviderContentComponent },
    { path: 'admin/medecin',  component: AdminMedecinContentComponent },
    { path: 'admin/profile',  component: AdminProfileContentComponent },
    { path: 'admin/complaint',  component: AdminComplaintContentComponent },
    { path: 'admin/statistics',  component: AdminStatisticsContentComponent },
    { path: 'admin/**',  component: AdminHomeComponent },
    { path: 'provider/home',  component: ProviderHomeComponent },
    { path: 'provider/quotation',  component: ProviderQuotationContentComponent },
    { path: 'provider/statistics',  component: ProviderStatisticsContentComponent },
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
    BlogComponent,
    FooterComponent,
    HeaderComponent,
    CategoriebarComponent,
    ContactComponent,
    WishlistComponent,
    LoginComponent,
    ListproduitsComponent,
    ListspecialitiesComponent,
    DetailProduitsComponent,
    DevisComponent,
    DashboardComponent,
    AdminHomeComponent,
    AdminHeaderComponent,
    AdminMenuBarComponent,
    AdminMessageContentComponent,
    AdminProviderContentComponent,
    AdminProfileContentComponent,
    AdminMedecinContentComponent,
    AdminComplaintContentComponent,
    AdminStatisticsContentComponent,
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
