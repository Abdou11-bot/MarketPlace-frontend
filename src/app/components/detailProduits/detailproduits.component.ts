import { Component, OnInit } from '@angular/core';
import{ProductService} from '../../services/product.service';
import{ImageModel} from '../../models/image.model';
import{QuotationModel} from '../../models/quotation.model';
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

  product= new ProductModel({'provider':{},'images': [],'speciality': {}});
  quotation= new QuotationModel({'product':{'provider':{},'images': [],'speciality': {}}});
    constructor(private router:Router, private ProductService: ProductService, public sanitizer: DomSanitizer) {
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

  onSubmitQuotation(){
    if((this.quotation.firstname=='' || this.quotation.firstname==null || this.quotation.firstname== undefined) ||
    (this.quotation.lastname=='' || this.quotation.lastname==null || this.quotation.lastname== undefined) ||
    (this.quotation.quantity==0 || this.quotation.quantity==null || this.quotation.quantity== undefined) ||
    (this.quotation.email=='' || this.quotation.email==null || this.quotation.email== undefined) ||
    (this.quotation.postalCode==0 || this.quotation.email==null || this.quotation.email== undefined))
    {
      Swal.fire('Reessayer',)
      return;
    }
    this.quotation.product=this.product;
      Swal.fire('reussi',)
  }

   openRequestQuotationModal(){
      Swal.fire({
        title: ``,
        html: `
        <div>
          <div class="ht__bradcaump__area" style="background: rgba(0, 0, 0, 0) url(assets/images/bg/2.jpg) no-repeat scroll center center / cover ;">
            <div class="ht__bradcaump__wrap">
              <div class="container">
                <div class="row">
                  <div class="col-xs-12">
                    <div class="bradcaump__inner text-center">
                      <h2 class="bradcaump-title">Cart</h2>
                      <nav class="bradcaump-inner">
                        <a class="breadcrumb-item" href="index.html">Devis</a>
                        <span class="brd-separetor">/</span>
                        <span class="breadcrumb-item active">Devis</span>
                      </nav>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div class="container custom-container ">
              <div class="col-md-auto">
                <form #QuotationFormAdd="ngForm">
                  <div class="modal-body">
                    <div class="form-group">
                      <input type="text" [(ngModel)]="quotation.firstname"
                             class="form-control form-input-size"
                             style=" height:25%; font-size:25px;"
                             id="firstnameAdd"
                             name="firstnameAdd"
                             placeholder="Enter your firstname"
                             required >
                    </div>
                    <div class="form-group">
                      <input type="text" [(ngModel)]="quotation.lastname"
                             class="form-control form-input-size"
                             style=" height:25%; font-size:25px;"
                             id="lastnameAdd"
                             name="lastnameAdd"
                             placeholder="Enter your lastname"
                             required>
                    </div>
                    <div class="form-group">
                      <input type="text" [(ngModel)]="quotation.email"
                             class="form-control form-input-size"
                             style=" height:25%; font-size:25px;"
                             id="emailAdd"
                             name="emailAdd"
                             placeholder="Enter your email"
                             required >
                    </div>
                     <div class="form-group">
                      <input type="text" [(ngModel)]="quotation.address"
                             class="form-control form-input-size"
                             style=" height:25%; font-size:25px;"
                             id="addressAdd"
                             name="addressAdd"
                             placeholder="Enter your address"
                             required >
                    </div>
                    <div class="form-group">
                      <input type="text" [(ngModel)]="quotation.quantity"
                             class="form-control form-input-size"
                             style=" height:25%; font-size:25px;"
                             id="quantityAdd"
                             name="quantityAdd"
                             placeholder="Enter the quantity"
                             required >
                    </div>
                    <div class="form-group">
                      <input type="text" [(ngModel)]="quotation.postalCode"
                             class="form-control form-input-size"
                             style=" height:25%; font-size:25px;"
                             id="postalCodeAdd"
                             name="postalCodeAdd"
                             placeholder="Enter your postalCode"
                             required >
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>`,
        showCancelButton: true,
        confirmButtonText: 'Demander un devis',
        width: '80%',
        cancelButtonText: 'Annuler'
      }).then((result) => {
          if (result.value) {
            this.onSubmitQuotation();
            Swal.fire(
              'Ajouter!',
            )
          } else if (result.dismiss === Swal.DismissReason.cancel) {
            Swal.fire(
              'Annuler',
          )
        }
      })
    }


}
