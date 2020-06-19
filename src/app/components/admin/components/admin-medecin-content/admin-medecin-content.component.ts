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
  }
}

