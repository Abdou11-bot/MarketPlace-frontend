import { Component, OnInit } from '@angular/core';
import{ImageModel} from '../../models/image.model';
import{ProviderModel} from '../../models/provider.model';
import{ComplaintModel} from '../../models/complaint.model';
import{ProductService} from '../../services/product.service';
import{ComplaintService} from '../../services/complaint.service';
import{SpecialityModel} from '../../models/speciality.model';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {EventEmitter, Input, Output, TemplateRef, ViewEncapsulation} from '@angular/core';
import {Router} from '@angular/router';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {DomSanitizer} from '@angular/platform-browser';
import {MatDialog} from '@angular/material/dialog';
@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  Administrator= new ProviderModel({});
  Complaint= new ComplaintModel({'product':{'provider':{},'images': [],'speciality': {}}});
//  Complaint: ComplaintModel;
  constructor(public ProductService : ProductService,public ComplaintService : ComplaintService, public sanitizer: DomSanitizer, private router: Router) { }

  ngOnInit(): void {
    this.ProductService.getAdmin().then(response => {
        this.Administrator = new ProviderModel(response);
    });
  }

  onSubmit(){
    const Data = new FormData();
    Data.append('message', this.Complaint.message);
    Data.append('objet', this.Complaint.objet);
    Data.append('email', this.Complaint.email);
    Data.append('name', this.Complaint.name);
    this.ComplaintService.SendComplaint(Data).then(response => {
      if(response!=null){
        alert("OK");
      }else{
        alert("Echec");
      }
    });
  }
}
