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
import{ComplaintService} from '../../../../services/complaint.service';
import{ProviderModel} from '../../../../models/provider.model';
import{ComplaintModel} from '../../../../models/complaint.model';
import{SpecialityModel} from '../../../../models/speciality.model';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']

})
export class AdminHomeComponent implements OnInit , OnDestroy {
 collection = { nbSpecialities: 0, providers: Array<ProviderModel> (), complaints: Array<ComplaintModel> (), specialities: Array<SpecialityModel> () };
   constructor(private StorageService: LocalStorageService, private router: Router, public sanitizer: DomSanitizer,
             private ProviderService: ProviderService, private ComplaintService : ComplaintService) {  }
   ngOnDestroy(){
   }

   ngOnInit(): void {
     this.ProviderService.getAllProviders().then(response => {
         for(let resp of response){
           this.collection.providers.push(new ProviderModel(resp));
         }
     });
     this.ComplaintService.getAllComplaint().then(response => {
         for(let resp of response){
           this.collection.complaints.push(new ComplaintModel(resp));
         }
     });
     this.ProviderService.getAllSpecialitiesSuscribed().then(response => {
         for(let resp of response){
           this.collection.specialities.push(new SpecialityModel(resp));
         }
     });
     this.ProviderService.getAllSpecialities().then(response => {
       this.collection.nbSpecialities = response.length;
     });
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
   getSpecialitiesSuscribed(): number{
     if(this.collection.specialities.length == 0){
       return 0;
     }else{
       return Number(((this.collection.specialities.length / this.collection.nbSpecialities)*100).toPrecision(4));
     }
   }
}
