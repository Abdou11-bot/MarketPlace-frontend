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
import{MedecinModel} from '../../../../models/medecin.model';
import{ComplaintModel} from '../../../../models/complaint.model';
import{SpecialityModel} from '../../../../models/speciality.model';

@Component({
  selector: 'app-admin-medecin-content',
  templateUrl: './admin-medecin-content.component.html',
  styleUrls: ['./admin-medecin-content.component.css']

})
export class AdminMedecinContentComponent implements OnInit , OnDestroy {
  collection = { nbSpecialities: 0, medecins: Array<MedecinModel> ()};
  config: any;
  constructor(private StorageService: LocalStorageService, private router: Router, public sanitizer: DomSanitizer,
            private ProviderService: ProviderService, private ComplaintService : ComplaintService) {  }
  ngOnDestroy(){
  }

  ngOnInit(): void {
    this.ProviderService.getAllMedecins().then(response => {
        for(let resp of response){
          this.collection.medecins.push(new MedecinModel(resp));
        }
    });
    this.config = {
      itemsPerPage: 5,
      currentPage: 1,
      totalItems: this.collection.medecins.length
    };
  }
  pageChanged(event) {
    this.config.currentPage = event;
  }
  customSort(filter:number){
    if(filter==1)
     this.collection.medecins.sort((a,b) => a.lastname.localeCompare(b.lastname));
    if(filter==2)
      this.collection.medecins.sort((a,b) => a.firstname.localeCompare(b.firstname));
    if(filter==3)
      this.collection.medecins.sort((a,b) => a.email.localeCompare(b.email));
    if(filter==4)
      this.collection.medecins.sort((a,b) => a.tel.localeCompare(b.tel));
    if(filter == 5)
      this.collection.medecins.sort((a,b) => a.speciality.name.localeCompare(b.speciality.name));
  }
  reverseCustomSort(filter:number){
    if(filter==1){
      this.customSort(1);
      this.collection.medecins.reverse();
    }
    if(filter==2){
      this.customSort(2);
      this.collection.medecins.reverse();
    }
    if(filter==3){
      this.customSort(3);
      this.collection.medecins.reverse();
    }
    if(filter==4){
      this.customSort(4);
      this.collection.medecins.reverse();
    }
    if(filter==5){
      this.customSort(5);
      this.collection.medecins.reverse();
    }
  }
}

