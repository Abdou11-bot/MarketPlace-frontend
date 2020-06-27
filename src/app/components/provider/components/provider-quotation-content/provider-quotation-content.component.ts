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

@Component({
  selector: 'app-provider-quotation-content',
  templateUrl: './provider-quotation-content.component.html',
  styleUrls: ['./provider-quotation-content.component.css']

})
export class ProviderQuotationContentComponent implements OnInit , OnDestroy {
  detailFlag = false;
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
     return this.sanitizer.bypassSecurityTrustResourceUrl(imagrSrc);
   }
 }

