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
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-medecin-quotation-content',
  templateUrl: './medecin-quotation-content.component.html',
  styleUrls: ['./medecin-quotation-content.component.css']
})
export class MedecinQuotationContentComponent implements OnInit , OnDestroy {
    detailFlag = false;
    config: any;
    quotation= new QuotationModel({'product':{'provider':{},'images': [],'speciality': {}}});
    collection = { nbSpecialities: 0, quotations: Array<QuotationModel> () };
    constructor(private StorageService: LocalStorageService, private router: Router, public sanitizer: DomSanitizer,
              private ProviderService: ProviderService, private QuotationService : QuotationService) {  }
    ngOnDestroy(){
    }

    ngOnInit(): void {
      this.QuotationService.getSentQuotation(this.StorageService.getMedecin()).then(response => {
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
    customSort(filter:number){
      if(filter==1)
        this.collection.quotations.sort((a,b) => Number(a.traiter) - Number(b.traiter));
      if(filter==5)
        this.collection.quotations.sort((a,b) => a.product.name.localeCompare(b.product.name));
      if(filter == 6)
        this.collection.quotations.sort((a,b) => a.product.provider.lastname.localeCompare(b.product.provider.lastname));
    }
    reverseCustomSort(filter:number){
      if(filter==1){
        this.customSort(1);
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
    }

    pageChanged(event) {
      this.config.currentPage = event;
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
  openSuccessModal(message)
  {
    Swal.fire({text: message,icon: 'success'});
  }
  openFailedModal(error,message)
  {
    Swal.fire(error, message, 'error')
  }
   deleteQuotaion(id:number){
      this.QuotationService.deletequotation(id).then(response => {
        if(Boolean(response)){
          this.openSuccessModal('Demande supprimée');
          this.retirer(id);
          this.detailFlag = false;
        }else{
          this.openFailedModal('Erreur','Operation Echouée');
        }
      });
   }
  retirer(id: number){
    let quotationArrayTemp = [];
    for(let quotation of this.collection.quotations){
      if(quotation.id != id)
        quotationArrayTemp.push(quotation);
    }
    this.collection.quotations = quotationArrayTemp;
  }
}

