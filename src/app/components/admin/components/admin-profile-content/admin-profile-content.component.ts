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
import{ProviderModel} from '../../../../models/provider.model';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-admin-profile-content',
  templateUrl: './admin-profile-content.component.html',
  styleUrls: ['./admin-profile-content.component.css']

})
export class AdminProfileContentComponent implements OnInit , OnDestroy {
  admin: ProviderModel;
  updateFlag= false;
  constructor(private StorageService: LocalStorageService, private router: Router, public sanitizer: DomSanitizer,private ProviderService: ProviderService) {  }
  ngOnDestroy(){
  }

  ngOnInit(): void {
    this.ProviderService.getAdmin().then(response => {
      if(response!=null){
        this.admin = new ProviderModel(response);
      }
    });
  }

  changeUpdateFlag(val: boolean){
    this.updateFlag = val;
  }

  updateProfile(){
    const Data = new FormData();
    Data.append('admin', JSON.stringify(this.admin));
    alert(this.admin.password);
    this.ProviderService.updateAdmin(Data).then(response => {
      if(response != null){
        this.admin = new ProviderModel(response);
        this.openSuccessModal('Administateur Modifié');
        this.updateFlag = false;
      }else{
        this.openFailedModal('Operation Echouée','Erreur');
      }
    });
  }

  openSuccessModal(message)
  {
    Swal.fire({text: message,icon: 'success'});
  }
  openFailedModal(error,message)
  {
    Swal.fire(error, message, 'error')
  }
}

