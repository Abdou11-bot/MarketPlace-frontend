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
  selector: 'app-admin-complaint-content',
  templateUrl: './admin-complaint-content.component.html',
  styleUrls: ['./admin-complaint-content.component.css']

})
export class AdminComplaintContentComponent implements OnInit , OnDestroy {
  detailFlag = false;
  config: any;
  Complaint= new ComplaintModel({'product':{'provider':{},'images': [],'speciality': {}}});
  collection = { nbSpecialities: 0, complaints: Array<ComplaintModel> () };
  constructor(private StorageService: LocalStorageService, private router: Router, public sanitizer: DomSanitizer,
            private ProviderService: ProviderService, private ComplaintService : ComplaintService) {  }
  ngOnDestroy(){
  }

  ngOnInit(): void {
    this.ComplaintService.getAllComplaint().then(response => {
        for(let resp of response){
		let complaint = new ComplaintModel(resp);
		if(complaint .product != null){
			this.collection.complaints.push(complaint );	
		}
        }
    });
    this.config = {
      itemsPerPage: 5,
      currentPage: 1,
      totalItems: this.collection.complaints.length
    };
  }

  pageChanged(event) {
    this.config.currentPage = event;
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
  loadComplaint(i:number){
    this.Complaint = this.collection.complaints[i];
    this.detailFlag = true;
  }
  gotoList(){
    this.detailFlag = false;
  }

  customSort(filter:number){
    if(filter==1)
      this.collection.complaints.sort((a,b) => Number(a.vue) - Number(b.vue));
    if(filter==2)
     this.collection.complaints.sort((a,b) => a.name.localeCompare(b.name));
    if(filter==3)
      this.collection.complaints.sort((a,b) => a.objet.localeCompare(b.objet));
    if(filter==4)
      this.collection.complaints.sort((a,b) => a.email.localeCompare(b.email));
    if(filter==5)
      this.collection.complaints.sort((a,b) => a.product.name.localeCompare(b.product.name));
    if(filter == 6)
      this.collection.complaints.sort((a,b) => a.product.provider.lastname.localeCompare(b.product.provider.lastname));
  }
  reverseCustomSort(filter:number){
    if(filter==1){
      this.customSort(1);
      this.collection.complaints.reverse();
    }
    if(filter==2){
      this.customSort(2);
      this.collection.complaints.reverse();
    }
    if(filter==3){
      this.customSort(3);
      this.collection.complaints.reverse();
    }
    if(filter==4){
      this.customSort(4);
      this.collection.complaints.reverse();
    }
    if(filter==5){
      this.customSort(5);
      this.collection.complaints.reverse();
    }
    if(filter==6){
      this.customSort(6);
      this.collection.complaints.reverse();
    }
  }
}

