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
import{ProviderModel} from '../../../../models/provider.model';
import{QuotationModel} from '../../../../models/quotation.model';
import{SpecialityModel} from '../../../../models/speciality.model';
import {environment} from '../../../../../environments/environment';

@Component({
  selector: 'app-provider-quotation-content',
  templateUrl: './provider-quotation-content.component.html',
  styleUrls: ['./provider-quotation-content.component.css']

})
export class ProviderQuotationContentComponent implements OnInit , OnDestroy {
  detailFlag = false;
  config: any;
  quotation= new QuotationModel({'product':{'provider':{},'images': [],'speciality': {}}});
  collection = { nbSpecialities: 0, quotations: Array<QuotationModel> () };
  constructor(private StorageService: LocalStorageService, private router: Router, public sanitizer: DomSanitizer,
            private ProviderService: ProviderService, private QuotationService : QuotationService) {  }
  ngOnDestroy(){
  }

  ngOnInit(): void {
    this.QuotationService.getAllQuotationSendToProvider(this.StorageService.getProviderLogin()).then(response => {
        for(let resp of response){
          this.collection.quotations.push(new QuotationModel(resp));
        }
    });
    this.config = {
      itemsPerPage: 5,
      currentPage: 1,
      totalItems: this.collection.quotations.length
    };
  }

  pageChanged(event) {
    this.config.currentPage = event;
  }
  traiter(id:number) {
    this.QuotationService.traiterQuotation(id).then(response => {
       this.quotation= new QuotationModel(response);
       for(let i = 0; i<this.collection.quotations.length; i++){
          if(this.collection.quotations[i].id==this.quotation.id){
            this.collection.quotations[i].traiter = true;
          }
       }
    });
  }
  loadQuotation(i:number){
    this.quotation = this.collection.quotations[i];
    this.detailFlag = true;
  }
  getDate(chaine:string): string{
    let dateArray = chaine.split('T');
    return dateArray[0];
  }
  getHour(chaine:string): string{
    let dateArray = chaine.split('T');
    let hourArray = dateArray[1].split('.');
    return hourArray[0];
  }
  gotoList(){
    this.detailFlag = false;
  }
  sane(imagrSrc: any) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(environment.SERVER_RESOURCE_URL+imagrSrc);
   }

  customSort(filter:number){
    if(filter==1)
      this.collection.quotations.sort((a,b) => Number(a.traiter) - Number(b.traiter));
    if(filter==2)
     this.collection.quotations.sort((a,b) => a.lastname.localeCompare(b.lastname));
    if(filter==3)
      this.collection.quotations.sort((a,b) => a.email.localeCompare(b.email));
    if(filter==4)
      this.collection.quotations.sort((a,b) => a.address.localeCompare(b.address));
    if(filter==5)
      this.collection.quotations.sort((a,b) => a.postalCode.localeCompare(b.postalCode));
    if(filter==6)
      this.collection.quotations.sort((a,b) => a.date.localeCompare(b.date));
    if(filter==7)
      this.collection.quotations.sort((a,b) => a.product.name.localeCompare(b.product.name));
    if(filter == 8)
      this.collection.quotations.sort((a,b) => (a.quantity) - (b.quantity));
  }
  reverseCustomSort(filter:number){
    if(filter==1){
      this.customSort(1);
      this.collection.quotations.reverse();
    }
    if(filter==2){
      this.customSort(2);
      this.collection.quotations.reverse();
    }
    if(filter==3){
      this.customSort(3);
      this.collection.quotations.reverse();
    }
    if(filter==4){
      this.customSort(4);
      this.collection.quotations.reverse();
    }
    if(filter==5){
      this.customSort(5);
      this.collection.quotations.reverse();
    }
    if(filter==6){
      this.customSort(6);
      this.collection.quotations.reverse();
    }
    if(filter==7){
      this.customSort(7);
      this.collection.quotations.reverse();
    }
    if(filter==8){
      this.customSort(8);
      this.collection.quotations.reverse();
    }
  }
}
