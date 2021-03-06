import { Component, OnInit } from '@angular/core';
import {SpecialityModel} from '../../models/speciality.model';
import{ProviderService} from '../../services/provider.service';
import{ProductService} from '../../services/product.service';
import{ImageModel} from '../../models/image.model';
import{ProviderModel} from '../../models/provider.model';
import{ProductModel} from '../../models/product.model';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {EventEmitter, Input, Output, TemplateRef, ViewEncapsulation} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {DomSanitizer} from '@angular/platform-browser';
import {MatDialog} from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { LocalStorageService } from '../../services/localStorage.service';
import { SessionStorageService } from '../../services/sessionStorage.service';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-categoriebar',
  templateUrl: './categoriebar.component.html',
  styleUrls: ['./categoriebar.component.css']
})
export class CategoriebarComponent implements OnInit {

  config: any;
  product= new ProductModel({'provider':{},'images': [{}],'speciality': {}});
   collection = { count: 0, specialities: Array<SpecialityModel> () };
   closeResult: string;
   constructor(public ProductService : ProductService,private ProviderService: ProviderService, public sanitizer: DomSanitizer,
    private StorageService: LocalStorageService,  private router: Router, private activatedRoute: ActivatedRoute) {   }

  gotoListProductsOfSpeciality(id:number){
      this.StorageService.storeType('speciality');
      this.StorageService.storeSpeciality(''+id);
      this.router.navigate(['/produits/',id]);
    }

   ngOnInit(): void {
//    this.StorageService.storeAdminSpace('ClientSpace');
        this.ProviderService.getAllSpecialities().then(response => {
           for (const resp of response) {
                 this.collection.specialities.push(new SpecialityModel (resp));
           }
           this.ProductService.getMostViewProduct().then(response =>{
                      this.product = new ProductModel(response);
                   });
        });
        this.collection.count = this.collection.specialities.length;
        this.config = {
          itemsPerPage: 20,
          currentPage: 1,
          totalItems: this.collection.count
        };
   }
  sane(imagrSrc: any) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(environment.SERVER_RESOURCE_URL+imagrSrc);
   }

  public gotoProductDetails(url, id) {
      this.router.navigate([url, id]);
  }
}
