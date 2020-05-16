import { Component, OnInit } from '@angular/core';
import{ProductService} from '../../services/product.service';
import{ImageModel} from '../../models/image.model';
import{ProviderModel} from '../../models/provider.model';
import{ProductModel} from '../../models/product.model';
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
  selector: 'app-detailproduits',
  templateUrl: './detailproduits.component.html',
  styleUrls: ['./detailproduits.component.css']
})
export class DetailProduitsComponent implements OnInit {

  product= new ProductModel({'provider':{},'images': []});
  collection = { count: 0, products: Array<ProductModel> () };
    constructor(private StorageService: LocalStorageService, private router:Router,
              private ProductService: ProductService, public sanitizer: DomSanitizer) {
    //  this.StorageService.clearStorage();
      this.ProductService.getProduct(this.router.getCurrentNavigation().extras.state.id).then(
        response => { this.product= new ProductModel(response); }
      );
    }

    ngOnInit() {
    }

   sane(imagrSrc: any) {
      return this.sanitizer.bypassSecurityTrustResourceUrl(imagrSrc);
    }

}
