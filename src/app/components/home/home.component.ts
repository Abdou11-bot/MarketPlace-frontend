import { Component, OnInit } from '@angular/core';
import{ProductService} from '../../services/product.service';
import{ProviderService} from '../../services/provider.service';
import{ImageModel} from '../../models/image.model';
import{ProviderModel} from '../../models/provider.model';
import{ProductModel} from '../../models/product.model';
import{SpecialityModel} from '../../models/speciality.model';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {environment} from '../../../environments/environment';
import {EventEmitter, Input, Output, TemplateRef, ViewEncapsulation} from '@angular/core';
import {Router} from '@angular/router';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {DomSanitizer} from '@angular/platform-browser';
import {MatDialog} from '@angular/material/dialog';
import { LocalStorageService } from '../../services/localStorage.service';
import { SessionStorageService } from '../../services/sessionStorage.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']

})
export class HomeComponent implements OnInit {
  config: any;
  collection = { count: 0, products: Array<ProductModel> (), specialities: Array<SpecialityModel> () };
  closeResult: string;
  constructor(public ProductService : ProductService, private ProviderService: ProviderService, private StorageService: LocalStorageService,  private router: Router, public sanitizer: DomSanitizer) {  }

  ngOnInit(): void {
//    this.StorageService.storeAdminSpace('ClientSpace');
    this.ProviderService.getAllSpecialities().then(response => {
      for (const resp of response) {
        this.collection.specialities.push(new SpecialityModel (resp));
      }
    });
    this.ProductService.getAllProducts().then(response => {
      for (const resp of response) {
        let productTemp = new ProductModel(resp);
        if(!productTemp.blocked && (productTemp.provider.status==1)){
          this.collection.products.push(productTemp);
        }
      }
      this.customSort(3);
    });
    this.collection.count = this.collection.products.length;
    this.config = {
      itemsPerPage: 20,
      currentPage: 1,
      totalItems: this.collection.count
    };
  }


  customSort(filter:number){
    if(filter==1)
      this.collection.products.sort((a,b) => a.name.localeCompare(b.name));
    if(filter == 2)
      this.collection.products.sort((a,b) => a.id - b.id);
    if(filter == 3)
      this.collection.products.sort((a,b) => a.nombreVue - b.nombreVue);
    if(filter == 4)
      this.collection.products.sort((a,b) => a.speciality.name.localeCompare(b.speciality.name));
  }


  sane(imagrSrc: any) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(environment.SERVER_RESOURCE_URL+imagrSrc);
  }
   gotoListProductsOfSpeciality(id:number){
      this.StorageService.storeType('speciality');
      this.StorageService.storeSpeciality(''+id);
      this.router.navigate(['/produits/',id]);
    }

  SpecialityExists(id: number){
    for(let product of this.collection.products){
      if(product.speciality.id==id)
        return true;
    }
    return false;
  }

  public gotoProductDetails(url, id) {
      this.router.navigate([url, id]);
  }
}

