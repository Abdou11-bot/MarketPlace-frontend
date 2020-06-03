import { Component, OnInit } from '@angular/core';
import{ProductService} from '../../services/product.service';
import{ImageModel} from '../../models/image.model';
import{ProviderModel} from '../../models/provider.model';
import{ProductModel} from '../../models/product.model';
import{SpecialityModel} from '../../models/speciality.model';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {EventEmitter, Input, Output, TemplateRef, ViewEncapsulation} from '@angular/core';
import {Router} from '@angular/router';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {DomSanitizer} from '@angular/platform-browser';
import {MatDialog} from '@angular/material/dialog';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']

})
export class HomeComponent implements OnInit {
  config: any;
  collection = { count: 0, products: Array<ProductModel> (), specialities: Array<SpecialityModel> () };
  closeResult: string;
  constructor(public ProductService : ProductService, public sanitizer: DomSanitizer) {  }

  ngOnInit(): void {
    this.ProductService.getAllSpecialities().then(response => {
      for (const resp of response) {
        this.collection.specialities.push(new SpecialityModel (resp));
      }
    });
    this.ProductService.getAllProducts().then(response => {
      for (const resp of response) {
        this.collection.products.push(new ProductModel (resp));
      }
    });
    this.collection.count = this.collection.products.length;
    this.config = {
      itemsPerPage: 20,
      currentPage: 1,
      totalItems: this.collection.count
    };
  }

  sane(imagrSrc: any) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(imagrSrc);
  }

  SpecialityExists(id: number){
    for(let product of this.collection.products){
      if(product.speciality.id==id)
        return true;
    }
    return false;
  }
}

