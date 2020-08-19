import { Component, OnInit , OnDestroy} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {EventEmitter, Input, Output, TemplateRef, ViewEncapsulation} from '@angular/core';
import {Router} from '@angular/router';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {DomSanitizer} from '@angular/platform-browser';
import {MatDialog} from '@angular/material/dialog';
import { LocalStorageService } from '../../../../services/localStorage.service';
import { SessionStorageService } from '../../../../services/sessionStorage.service';
import{ProductService} from '../../../../services/product.service';
import{ComplaintService} from '../../../../services/complaint.service';
import{ProductModel} from '../../../../models/product.model';
import{MedecinModel} from '../../../../models/medecin.model';
import{ComplaintModel} from '../../../../models/complaint.model';
import{SpecialityModel} from '../../../../models/speciality.model';
import {environment} from '../../../../../environments/environment';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-medecin-wishlist-content',
  templateUrl: './medecin-wishlist-content.component.html',
  styleUrls: ['./medecin-wishlist-content.component.css']

})
export class MedecinWishlistContentComponent implements OnInit , OnDestroy {
  collection = { nbSpecialities: 0, products: Array<ProductModel> ()};
  config: any;
  constructor(private StorageService: LocalStorageService, private router: Router, public sanitizer: DomSanitizer,
            private ProductService: ProductService) {  }
  ngOnDestroy(){
  }

  ngOnInit(): void {
  this.collection.products.length = 0;
    this.ProductService.getWishlist(this.StorageService.getMedecin()).then(response => {
        for(let resp of response){
          this.collection.products.push(new ProductModel(resp));
        }
    });
    this.config = {
      itemsPerPage: 5,
      currentPage: 1,
      totalItems: this.collection.products.length
    };
  }
  pageChanged(event) {
    this.config.currentPage = event;
  }
  customSort(filter:number){
    if(filter==1)
      this.collection.products.sort((a,b) => Number(a.blocked) - Number(b.blocked));
    if(filter==2)
     this.collection.products.sort((a,b) => a.name.localeCompare(b.name));
    if(filter==3)
      this.collection.products.sort((a,b) => a.reference.localeCompare(b.reference));
    if(filter==4)
      this.collection.products.sort((a,b) => a.marque.localeCompare(b.marque));
    if(filter==5)
      this.collection.products.sort((a,b) => (a.nombreVue) - (b.nombreVue));
  }
  reverseCustomSort(filter:number){
    if(filter==1){
      this.customSort(1);
      this.collection.products.reverse();
    }
    if(filter==2){
      this.customSort(2);
      this.collection.products.reverse();
    }
    if(filter==3){
      this.customSort(3);
      this.collection.products.reverse();
    }
    if(filter==4){
      this.customSort(4);
      this.collection.products.reverse();
    }
    if(filter==5){
      this.customSort(5);
      this.collection.products.reverse();
    }
  }
 sane(imageSrc: any) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(environment.SERVER_RESOURCE_URL+imageSrc);
  }
  getCatalogueName(productTemp) : string{
    if(productTemp == undefined || productTemp == null || productTemp.catalogue == '' || productTemp.catalogue == undefined || productTemp.catalogue == null ){
      return '';
    }
    let pathArray = productTemp.catalogue.split('http://localhost:8080/catalogues/');
    let nameArray = pathArray[1].split('/');
    return nameArray[2];
  }

  openSuccessModal(message)
  {
    Swal.fire({text: message,icon: 'success'});
  }
  openFailedModal(error,message)
  {
    Swal.fire(error, message, 'error')
  }

  deleteProduct(product_id:number){
    this.ProductService.deleteFromWishlist(this.StorageService.getMedecin(),product_id).then(response => {
      if(response){
        this.openSuccessModal('Operation reussite');
        this.ngOnInit();
      }else{
        this.openFailedModal('error','Operation échoué');
      }
    });
  }
}

