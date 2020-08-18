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
import{ProductModel} from '../../../../models/product.model';
import{ComplaintModel} from '../../../../models/complaint.model';

@Component({
  selector: 'app-provider-header',
  templateUrl: './provider-header.component.html',
  styleUrls: ['./provider-header.component.css']

})
export class ProviderHeaderComponent implements OnInit, OnDestroy {
  provider: ProviderModel;
  collection = { nbSpecialities: 0, products: Array<ProductModel> (), complaints: Array<ComplaintModel> () };
  constructor( private StorageService: LocalStorageService, private router:Router, public sanitizer: DomSanitizer,
              private ProviderService: ProviderService, private ComplaintService : ComplaintService) {  }
  ngOnDestroy(){
  }

  ngOnInit(): void {
    let AdminSpaceResponse = this.StorageService.getUserFromStorage();
    if(AdminSpaceResponse.trim() != 'provider'){
      this.router.navigate(['/home']);
    }
    this.ProviderService.getProfil(this.StorageService.getProviderLogin()).then(response => {
      if(response!=null){
        this.provider = new ProviderModel(response);
      }
    });
    this.ComplaintService.getOwnedComplaint(this.StorageService.getProviderLogin()).then(response => {
        for(let resp of response){
          this.collection.complaints.push(new ComplaintModel(resp));
        }
    });

  }
  ngDoCheck(): void {
    let AdminSpaceResponse = this.StorageService.getUserFromStorage();
    if(AdminSpaceResponse.trim() != 'provider'){
      this.router.navigate(['/home']);
    }
  }
  logout(){
    this.StorageService.storeUserOnStorage('client');
    this.StorageService.storeProviderLogin('');
    this.router.navigate(['/home']).then(() => { window.location.reload();});
  }

  getMessages(): number{
    if(this.collection.complaints.length == 0){
      return 0;
    }else{
      let nbrequest = 0;
      for(let request of this.collection.complaints){
        if(!request.vue ){
          nbrequest += 1;
        }
      }
      return nbrequest;
    }
  }
}

