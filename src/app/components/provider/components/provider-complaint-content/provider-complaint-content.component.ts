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
  selector: 'app-provider-complaint-content',
  templateUrl: './provider-complaint-content.component.html',
  styleUrls: ['./provider-complaint-content.component.css']

})
export class ProviderComplaintContentComponent implements OnInit , OnDestroy {
  detailFlag = false;
  Complaint= new ComplaintModel({'product':{'provider':{},'images': [],'speciality': {}}});
  collection = { nbSpecialities: 0, complaints: Array<ComplaintModel> () };
  constructor(private StorageService: LocalStorageService, private router: Router, public sanitizer: DomSanitizer,
            private ProviderService: ProviderService, private ComplaintService : ComplaintService) {  }
  ngOnDestroy(){
  }

  ngOnInit(): void {
    this.ComplaintService.getOwnedComplaint(this.StorageService.getProviderLogin()).then(response => {
        for(let resp of response){
          this.collection.complaints.push(new ComplaintModel(resp));
        }
    });
  }
  setVue(id:number) {
    this.ComplaintService.setComplaintvue(id).then(response => {
       this.Complaint= new ComplaintModel(response);
       for(let i = 0; i<this.collection.complaints.length; i++){
          if(this.collection.complaints[i].id==this.Complaint.id){
            this.collection.complaints[i].vue = true;
          }
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
  loadComplaint(i:number){
    this.Complaint = this.collection.complaints[i];
    this.detailFlag = true;
  }
  gotoList(){
    this.detailFlag = false;
  }
}

