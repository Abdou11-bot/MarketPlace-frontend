import { Component, OnInit } from '@angular/core';
import{ProductService} from '../../services/product.service';
import{ProviderService} from '../../services/provider.service';
import{ImageModel} from '../../models/image.model';
import{ProviderModel} from '../../models/provider.model';
import{SpecialityModel} from '../../models/speciality.model';
import{ProductModel} from '../../models/product.model';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {EventEmitter, Input, Output, TemplateRef, ViewEncapsulation} from '@angular/core';
import {Router} from '@angular/router';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {DomSanitizer} from '@angular/platform-browser';
import {MatDialog} from '@angular/material/dialog';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { LocalStorageService } from '../../services/localStorage.service';
import { SessionStorageService } from '../../services/sessionStorage.service';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-listspecialities',
  templateUrl: './listspecialities.component.html',
  styleUrls: ['./listspecialities.component.css']
})
export class ListspecialitiesComponent implements OnInit {

  config: any;
  collection = { count: 0, specialities: Array<SpecialityModel> () };
  constructor(private ProviderService: ProviderService,public ProductService : ProductService, public sanitizer: DomSanitizer,
  private StorageService: LocalStorageService,  private router: Router) {

  }
  ngOnInit(): void {
 //   this.StorageService.storeAdminSpace('ClientSpace');
    this.ProviderService.getAllSpecialities().then(response => {
      for (const resp of response) {
        this.collection.specialities.push(new SpecialityModel(resp));
      }
    });
    this.collection.count = this.collection.specialities.length;
    this.config = {
      itemsPerPage: 10,
      currentPage: 1,
      totalItems: this.collection.count
    };
  }
 sane(imageSrc: any) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(environment.SERVER_RESOURCE_URL+imageSrc);
  }
  gotoListProductsOfSpeciality(id:number){
      this.StorageService.storeType('speciality');
      this.StorageService.storeSpeciality(''+id);
      this.router.navigate(['/produits/',id]);
    }
  customSort(filter:number){
    if(filter==1)
      this.collection.specialities.sort((a,b) => a.name.localeCompare(b.name));
    if(filter == 2)
      this.collection.specialities.sort((a,b) => a.id - b.id);
    if(filter == 3)
      this.collection.specialities.sort((a,b) => a.priceSpeciality  - b.priceSpeciality );
  }

  pageChanged(event) {
    this.config.currentPage = event;
  }

}
