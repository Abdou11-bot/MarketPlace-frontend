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
import{QuotationService} from '../../../../services/quotation.service';
import{ComplaintService} from '../../../../services/complaint.service';
import{ProviderModel} from '../../../../models/provider.model';
import{ComplaintModel} from '../../../../models/complaint.model';
import{SpecialityModel} from '../../../../models/speciality.model';
import{ProductModel} from '../../../../models/product.model';
import{QuotationModel} from '../../../../models/quotation.model';

@Component({
  selector: 'app-provider-main-content',
  templateUrl: './provider-main-content.component.html',
  styleUrls: ['./provider-main-content.component.css']

})
export class ProviderMainContentComponent implements OnInit , OnDestroy {
  collection = { nbSpecialities: 0, products: Array<ProductModel> (), complaints: Array<ComplaintModel> (), quotations: Array<QuotationModel> () };
  constructor(private StorageService: LocalStorageService, private router: Router, public sanitizer: DomSanitizer,
            private ProviderService: ProviderService, private ComplaintService : ComplaintService, private QuotationService :QuotationService) {  }
  ngOnDestroy(){
  }

  ngOnInit(): void {
    this.ProviderService.getOwnedProductsByProviderLogin(this.StorageService.getProviderLogin()).then(response => {
            for(let resp of response){
              this.collection.products.push(new ProductModel(resp));
            }
        });
    this.ComplaintService.getOwnedComplaint(this.StorageService.getProviderLogin()).then(response => {
            for(let resp of response){
              this.collection.complaints.push(new ComplaintModel(resp));
            }
        });
    this.QuotationService.getAllQuotationSendToProvider(this.StorageService.getProviderLogin()).then(response => {
        for(let resp of response){
          this.collection.quotations.push(new QuotationModel(resp));
        }
    });
  }
  getComplaintsRequests(): number{
    if(this.collection.complaints.length == 0){
      return 0;
    }else{
      let nbrequest = 0;
      for(let request of this.collection.complaints){
        if((!request.vue) && (request.product != null) ){
          nbrequest += 1;
        }
      }
      return nbrequest;
    }
  }
  getQuotationsRequests(): number{
    if(this.collection.quotations.length == 0){
      return 0;
    }else{
      let nbrequest = 0;
      for(let request of this.collection.quotations){
        nbrequest += 1;
      }
      return nbrequest;
    }
  }
  getMessages(): number{
    if(this.collection.complaints.length == 0){
      return 0;
    }else{
      let nbrequest = 0;
      for(let request of this.collection.complaints){
        if((!request.vue) && (request.product == null) ){
          nbrequest += 1;
        }
      }
      return nbrequest;
    }
  }
}

