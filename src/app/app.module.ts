import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

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
    { path: 'produits', component: ListproduitsComponent },
    { path: 'specialities', component: ListspecialitiesComponent },
    { path: 'produit/detail', component: DetailProduitsComponent },
    { path: 'admin',  loadChildren: () => import('./components/admin/admin.module').then(m => m.AdminModule) },
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
    CartdevisComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
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
    BrowserAnimationsModule
  ],
  providers: [LocalStorageService,SessionStorageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
