import { Component, OnInit } from '@angular/core';
import {SpecialityModel} from '../../models/speciality.model';
import{ProductService} from '../../services/product.service';
import{ImageModel} from '../../models/image.model';
import{ProviderModel} from '../../models/provider.model';
import{ProductModel} from '../../models/product.model';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {EventEmitter, Input, Output, TemplateRef, ViewEncapsulation} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {DomSanitizer} from '@angular/platform-browser';
import {MatDialog} from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
@Component({
  selector: 'app-categoriebar',
  templateUrl: './categoriebar.component.html',
  styleUrls: ['./categoriebar.component.css']
})
export class CategoriebarComponent implements OnInit {

  config: any;
   collection = { count: 0, specialities: Array<SpecialityModel> () };
   closeResult: string;
   constructor(public ProductService : ProductService, public sanitizer: DomSanitizer, private route: ActivatedRoute) {
     this.ProductService.getAllSpecialities().then(response => {
        for (const resp of response) {
              this.collection.specialities.push(new SpecialityModel (resp));
        }
     });
     this.collection.count = this.collection.specialities.length;
     this.config = {
       itemsPerPage: 20,
       currentPage: 1,
       totalItems: this.collection.count
     };
   }

   ngOnInit(): void {
   }
  sane(imagrSrc: any) {
     return this.sanitizer.bypassSecurityTrustResourceUrl(imagrSrc);
   }
   redirectToSpeciality(id:number){
   }
 }
