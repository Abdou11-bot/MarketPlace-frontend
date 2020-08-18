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
@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.css']

})
export class AdminHeaderComponent implements OnInit, OnDestroy {
  collection = { nbSpecialities: 0, providers: Array<ProviderModel> (), complaints: Array<ComplaintModel> () };
  constructor( private StorageService: LocalStorageService, private router:Router, public sanitizer: DomSanitizer,
              private ProviderService: ProviderService, private ComplaintService : ComplaintService) {  }
  ngOnDestroy(){
  }

  ngOnInit(): void {
    let AdminSpaceResponse = this.StorageService.getUserFromStorage();
    if(AdminSpaceResponse.trim() != 'admin'){
      this.router.navigate(['/home']);
    }

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
  }
  ngDoCheck(): void {
    let AdminSpaceResponse = this.StorageService.getUserFromStorage();
    if(AdminSpaceResponse.trim() != 'admin'){
      this.router.navigate(['/home']);
    }
  }
  logout(){
    this.StorageService.storeUserOnStorage('client');
    this.StorageService.storeAdminLogin('');
    this.router.navigate(['/home']).then(() => { window.location.reload();});
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

