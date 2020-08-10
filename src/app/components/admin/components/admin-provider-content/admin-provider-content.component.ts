import { Component, OnInit , OnDestroy} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {EventEmitter, Input, Output, TemplateRef, ViewEncapsulation} from '@angular/core';
import {Router} from '@angular/router';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {DomSanitizer} from '@angular/platform-browser';
import {MatDialog} from '@angular/material/dialog';
import { LocalStorageService } from '../../../../services/localStorage.service';
import { SessionStorageService } from '../../../../services/sessionStorage.service';
import{ProviderService} from '../../../../services/provider.service';
import{ProductService} from '../../../../services/product.service';
import{ComplaintService} from '../../../../services/complaint.service';
import{ProviderModel} from '../../../../models/provider.model';
import{ProductModel} from '../../../../models/product.model';
import{QuotationModel} from '../../../../models/quotation.model';
import{ComplaintModel} from '../../../../models/complaint.model';
import{SpecialityModel} from '../../../../models/speciality.model';

@Component({
  selector: 'app-admin-provider-content',
  templateUrl: './admin-provider-content.component.html',
  styleUrls: ['./admin-provider-content.component.css']

})
export class AdminProviderContentComponent implements OnInit , OnDestroy {
  detailFlag = false;
  complaintFlag = false;
  requestFlag = true;
  config1: any;
  config2: any;
  config: any;
  provider = new ProviderModel({'society':{}});
  ownedProducts = Array<ProductModel>();
  quotations= Array<QuotationModel> ();
  claimedProducts = Array<ProductModel> ();
  product= new ProductModel({'provider':{},'images': [],'speciality': {}});
  collection = { nbSpecialities: 0, providers: Array<ProviderModel> ()};
  constructor(private StorageService: LocalStorageService, private router: Router, public sanitizer: DomSanitizer,
            private ProviderService: ProviderService, private ProductService: ProductService, private ComplaintService : ComplaintService) {  }
  ngOnDestroy(){
  }

  ngOnInit(): void {
    this.ProviderService.getAllProviders().then(response => {
        for(let resp of response){
          this.collection.providers.push(new ProviderModel(resp));
        }
        if(response.length == 0){
        }
        this.config1 = {
          itemsPerPage: 5,
          currentPage: 1,
          totalItems: this.getProvidersRequests()
        };
        this.config2 = {
          itemsPerPage: 5,
          currentPage: 1,
          totalItems: this.claimedProducts.length
        };
        this.config = {
          itemsPerPage: 5,
          currentPage: 1,
          totalItems: this.collection.providers.length
        };
    });
  }
  pageChanged1(event) {
    this.config1.currentPage = event;
  }
  pageChanged2(event) {
    this.config2.currentPage = event;
  }
  pageChanged(event) {
    this.config.currentPage = event;
  }
  getProvidersRequests(): number{
    if(this.collection.providers.length == 0){
      return 0;
    }else{
      let nbrequest = 0;
      for(let request of this.collection.providers){
        if(request.status == 0){
          nbrequest += 1;
        }
      }
      return nbrequest;
    }
  }

  loadData(i:number){
    this.provider = this.collection.providers[i];
    this.ProviderService.getOwnedProductsByProvider(this.provider.id).then(response => {
      for(let resp of response){
        this.ownedProducts.push(new ProductModel(resp));
      }
      this.ProviderService.getClaimedProductsToProvider(this.provider.id).then(response => {
        for(let resp of response){
          this.claimedProducts.push(new ProductModel(resp));
        }
        this.ProviderService.getQuotationsSendToProvider(this.provider.id).then(response => {
          for(let resp of response){
            this.quotations.push(new QuotationModel(resp));
          }
        });
      });
    });
    this.detailFlag = true;
    this.complaintFlag = false;
    this.requestFlag = false;
  }
  displayDetailProvider(){
    this.detailFlag = true;
    this.complaintFlag = false;
    this.requestFlag = false;
  }
  displayListClaimedProducts(){
    this.detailFlag = false;
    this.complaintFlag = true;
    this.requestFlag = true;
  }
  displayRequestsList(){
    this.detailFlag = false;
    this.complaintFlag = false;
    this.requestFlag = true;
  }
  displayCompleteList(){
    this.detailFlag = false;
    this.complaintFlag = false;
    this.requestFlag = false;
  }
  blockProduct(i:number){
    this.ProductService.blockProduct(this.claimedProducts[i].id).then(response => {
      if(response){
        this.claimedProducts[i].blocked = true;
      }
    });
  }
  activateProduct(i:number){
    this.ProductService.activateProduct(this.claimedProducts[i].id).then(response => {
      if(response){
        this.claimedProducts[i].blocked = false;
      }
    });
  }
  blockprovider(){
    this.ProviderService.blockprovider(this.provider.id).then(response => {
      if(response){
        this.provider.status = -1;
      }
      for(let i; i<this.collection.providers.length;i++){
        if(this.collection.providers[i].id == this.provider.id)
          this.collection.providers[i].status = -1;
      }
    });
  }
  activateprovider(){
    this.ProviderService.activateprovider(this.provider.id).then(response => {
      if(response){
        this.provider.status = 1;
      }
      for(let i; i<this.collection.providers.length;i++){
        if(this.collection.providers[i].id == this.provider.id)
          this.collection.providers[i].status = 1;
      }
    });
  }

  customSort(filter:number){
    if(filter==1)
     this.collection.providers.sort((a,b) => a.lastname.localeCompare(b.lastname));
    if(filter==2)
     this.collection.providers.sort((a,b) => a.firstname.localeCompare(b.firstname));
    if(filter==3)
      this.collection.providers.sort((a,b) => a.email.localeCompare(b.email));
    if(filter==4)
      this.collection.providers.sort((a,b) => a.tel.localeCompare(b.tel));
    if(filter==5)
      this.collection.providers.sort((a,b) => Number(a.type) - Number(b.type));
    if(filter==6)
      this.claimedProducts.sort((a,b) => Number(a.blocked) - Number(b.blocked));
    if(filter == 7)
      this.claimedProducts.sort((a,b) => a.name.localeCompare(b.name));
  }
  reverseCustomSort(filter:number){
    if(filter==1){
      this.customSort(1);
      this.collection.providers.reverse();
    }
    if(filter==2){
      this.customSort(2);
      this.collection.providers.reverse();
    }
    if(filter==3){
      this.customSort(3);
      this.collection.providers.reverse();
    }
    if(filter==4){
      this.customSort(4);
      this.collection.providers.reverse();
    }
    if(filter==5){
      this.customSort(5);
      this.collection.providers.reverse();
    }
    if(filter==6){
      this.customSort(6);
      this.claimedProducts.reverse();
    }
    if(filter==7){
      this.customSort(7);
      this.claimedProducts.reverse();
    }
  }
}

