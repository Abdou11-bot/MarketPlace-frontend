import { Component, OnInit } from '@angular/core';
import{ImageModel} from '../../models/image.model';
import{ProviderModel} from '../../models/provider.model';
import{ComplaintModel} from '../../models/complaint.model';
import{ProviderService} from '../../services/provider.service';
import{ProductService} from '../../services/product.service';
import{ComplaintService} from '../../services/complaint.service';
import{SpecialityModel} from '../../models/speciality.model';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {EventEmitter, Input, Output, TemplateRef, ViewEncapsulation} from '@angular/core';
import {Router} from '@angular/router';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {DomSanitizer} from '@angular/platform-browser';
import {MatDialog} from '@angular/material/dialog';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { LocalStorageService } from '../../services/localStorage.service';
import { SessionStorageService } from '../../services/sessionStorage.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  Administrator= new ProviderModel({});
  Complaint= new ComplaintModel({'product':{'provider':{},'images': [],'speciality': {}}});
  constructor(private StorageService: LocalStorageService,public ProductService : ProductService,public ComplaintService : ComplaintService,private ProviderService: ProviderService, private router: Router) { }

  ngOnInit(): void {
 //   this.StorageService.storeAdminSpace('ClientSpace');
    this.ProviderService.getAdmin().then(response => {
        this.Administrator = new ProviderModel(response);
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

  onSubmit(){
    const Data = new FormData();
    Data.append('message', this.Complaint.message);
    Data.append('objet', this.Complaint.objet);
    Data.append('email', this.Complaint.email);
    Data.append('name', this.Complaint.name);
    this.ComplaintService.contactUs(Data).then(response => {
      if(response!=null){
        this.openSuccessModal('Réussi!');
      }else{
        this.openFailedModal('Erreur', 'Reessayer');
      }
    });
  }
}
