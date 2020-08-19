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
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-medecin-complaint-content',
  templateUrl: './medecin-complaint-content.component.html',
  styleUrls: ['./medecin-complaint-content.component.css']

})
export class MedecinComplaintContentComponent implements OnInit , OnDestroy {
    detailFlag = false;
    config: any;
    Complaint= new ComplaintModel({'product':{'provider':{},'images': [],'speciality': {}}});
    collection = { nbSpecialities: 0, complaints: Array<ComplaintModel> () };
    constructor(private StorageService: LocalStorageService, private router: Router, public sanitizer: DomSanitizer,
              private ProviderService: ProviderService, private ComplaintService : ComplaintService) {  }
    ngOnDestroy(){
    }

    ngOnInit(): void {
      this.ComplaintService.getSentComplaint(this.StorageService.getMedecin()).then(response => {
          for(let resp of response){
            this.collection.complaints.push(new ComplaintModel(resp));
          }
      });
      this.config = {
        itemsPerPage: 5,
        currentPage: 1,
        totalItems: this.collection.complaints.length
      };
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

    pageChanged(event) {
      this.config.currentPage = event;
    }
    loadComplaint(i:number){
      this.Complaint = this.collection.complaints[i];
      this.detailFlag = true;
    }
    gotoList(){
      this.detailFlag = false;
    }
  openSuccessModal(message)
  {
    Swal.fire({text: message,icon: 'success'});
  }
  openFailedModal(error,message)
  {
    Swal.fire(error, message, 'error')
  }
   deletecomplaint(id:number){
      this.ComplaintService.deletecomplaint(id).then(response => {
        if(Boolean(response)){
          this.openSuccessModal('Reclamations supprimée');
          this.retirer(id);
          this.detailFlag = false;
        }else{
          this.openFailedModal('Erreur','Operation Echouée');
        }
      });
   }
  retirer(id: number){
    let complaintArrayTemp = [];
    for(let complaint of this.collection.complaints){
      if(complaint.id != id)
        complaintArrayTemp.push(complaint);
    }
    this.collection.complaints = complaintArrayTemp;
  }
}

