import { Component, OnInit } from '@angular/core';
import{ProductService} from '../../services/product.service';
import{QuotationService} from '../../services/quotation.service';
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
import{ComplaintService} from '../../services/complaint.service';
import{ComplaintModel} from '../../models/complaint.model';

@Component({
  selector: 'app-detailproduits',
  templateUrl: './detailproduits.component.html',
  styleUrls: ['./detailproduits.component.css']
})
export class DetailProduitsComponent implements OnInit {

  wishlistFlag: boolean = false;
  complaintFlag: boolean = false;
  Complaint= new ComplaintModel({'product':{'provider':{},'images': [],'speciality': {}}});
  product= new ProductModel({'provider':{},'images': [],'speciality': {}});
  quotation= new QuotationModel({'product':{'provider':{},'images': [],'speciality': {}}});
  constructor( private router:Router, private ProductService: ProductService, private QuotationService: QuotationService,
     public sanitizer: DomSanitizer,private StorageService: LocalStorageService, public ComplaintService : ComplaintService) {
  //  this.StorageService.clearStorage();
    this.ProductService.getProduct(this.router.getCurrentNavigation().extras.state.id).then(
      response => {
        this.product= new ProductModel(response);
        this.wishlistFlag = this.StorageService.productExists(this.product.id);
        this.complaintFlag = this.StorageService.complaintExists(this.product.id);
        this.ProductService.incrementView(this.product.id);
      }
    );
  }

  setWishlistOperation(operation: string, id:number){
    if(operation == 'add'){
      let exists = this.StorageService.productExists(id);
      if(!exists){
        this.StorageService.storeOnStorage(id);
      }
    }
    if(operation == 'delete'){
      let exists = false;
      while(!exists){
        exists=this.StorageService.deleteProduct(id);
      }
    }
    this.wishlistFlag = this.StorageService.productExists(this.product.id);
  }

  sendComplaint(operation: string, id:number){
    if(operation == 'add'){
      let exists = this.StorageService.complaintExists(this.product.id);
      if(!exists){
        this.StorageService.storeComplaint(id);
      }
    }
    if(operation == 'delete'){
      let exists = false;
      while(!exists){
        exists=this.StorageService.deleteComplaint(id);
      }
    }
    this.complaintFlag = this.StorageService.complaintExists(this.product.id);
  }

  ngOnInit() {

  }

   sane(imagrSrc: any) {
      return this.sanitizer.bypassSecurityTrustResourceUrl(imagrSrc);
    }

  gotoHome() {
    this.router.navigate(['home']).then(() => {window.location.reload(); });
  }

  onSubmitQuotation(){
    let today :string = new Date().toISOString().substring(0,10);
    this.quotation.date = today;
    this.quotation.product=this.product;
    const Data = new FormData();
    Data.append('quotation', JSON.stringify(this.quotation));
    this.QuotationService.RequestQuotaion(Data).then(response => {
      if(response!=null){
        this.openSuccessModal('Reussi !');
      }else{
        this.openFailedModal('Echec','Veuillez reessayer');
      }
    });
  }

  onSubmitComplaint(){
    this.Complaint.product=this.product;
    const Data = new FormData();
    Data.append('Complaint', JSON.stringify(this.Complaint));
    this.ComplaintService.SendComplaint(Data).then(response => {
      if(response!=null){
        this.sendComplaint('add',this.product.id);
        this.openSuccessModal('Reussi !');
      }else{
        this.openFailedModal('Echec','Veuillez reessayer');
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
                      <h2 class="bradcaump-title">Demande de Devis</h2>
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
                <form #QuotationFormAdd="ngForm">
                  <div class="modal-body">
                    <div class="single-contact-form">
                      <div class="contact-box message">
                          <input type="text" [(ngModel)]="quotation.firstname"
                                 class="form-control form-input-size"
                                 style=" height:25%; font-size:25px;"
                                 id="firstnameAdd"
                                 name="firstnameAdd"
                                 [value]= "quotation.firstname"
                                 placeholder="Entrer votre prenom"
                                 required >
                        </div>
                      </div>
                    <div class="single-contact-form">
                      <div class="contact-box message">
                        <input type="text" [(ngModel)]="quotation.lastname"
                               class="form-control form-input-size"
                               style=" height:25%; font-size:25px;"
                               id="lastnameAdd"
                               name="lastnameAdd"
                               placeholder="Entrer votre nom"
                               required>
                      </div>
                    </div>
                    <div class="single-contact-form">
                      <div class="contact-box message">
                        <input type="email" [(ngModel)]="quotation.email"
                               class="form-control form-input-size"
                               style=" height:25%; font-size:25px;"
                               id="emailAdd"
                               name="emailAdd"
                               placeholder="Entrer votre adresse mail"
                               required >
                      </div>
                    </div>
                    <div class="single-contact-form">
                      <div class="contact-box message">
                        <input type="text" [(ngModel)]="quotation.address"
                               class="form-control form-input-size"
                               style=" height:25%; font-size:25px;"
                               id="addressAdd"
                               name="addressAdd"
                               placeholder="Entrer votre addresse"
                               required >
                      </div>
                    </div>
                    <div class="single-contact-form">
                      <div class="contact-box message">
                        <input type="number" [(ngModel)]="quotation.quantity"
                               class="form-control form-input-size"
                               style=" height:25%; font-size:25px;"
                               id="quantityAdd"
                               name="quantityAdd"
                               placeholder="Entrer la quantité"
                               required >
                      </div>
                    </div>
                    <div class="single-contact-form">
                      <div class="contact-box message">
                        <input type="text" [(ngModel)]="quotation.postalCode"
                               class="form-control form-input-size"
                               style=" height:25%; font-size:25px;"
                               id="postalCodeAdd"
                               name="postalCodeAdd"
                               placeholder="Entrer votre addresse postale"
                               required >
                      </div>
                    </div>
                  </div>
                </form>
          </div>
        </div>`,
        showCancelButton: true,
        confirmButtonText: 'Demander un devis',
        width: '80%',
        cancelButtonText: 'Annuler',
        preConfirm: async () => {
          let firstname = ((<HTMLInputElement>document.getElementById('firstnameAdd')).value.trim());
          let lastname = ((<HTMLInputElement>document.getElementById('lastnameAdd')).value.trim());
          let email = ((<HTMLInputElement>document.getElementById('emailAdd')).value.trim());
          let address = ((<HTMLInputElement>document.getElementById('addressAdd')).value.trim());
          let quantity =Number((<HTMLInputElement>document.getElementById('quantityAdd')).value.trim());
          let code_postal = ((<HTMLInputElement>document.getElementById('postalCodeAdd')).value.trim());
          if(firstname == "" ){
            await this.openFailedModal('Erreur...', 'Vérifier le prenom ');
            this.openRequestQuotationModal();
            return false;
          }
          this.quotation.firstname = firstname;
          if(lastname == "" ){
            await this.openFailedModal('Erreur...', 'Vérifier le nom ');
            this.openRequestQuotationModal();
            return false;
          }
          this.quotation.lastname = lastname;
          if(email == "" ){
            await this.openFailedModal('Erreur...', 'Vérifier l\'email ');
            this.openRequestQuotationModal();
            return false;
          }
          this.quotation.email = email;
          if(address == "" ){
            await this.openFailedModal('Erreur...', 'Vérifier l\'Adresse ');
            this.openRequestQuotationModal();
            return false;
          }
          this.quotation.address = address;
          if(quantity <= 0 ){
            await this.openFailedModal('Erreur...', 'Vérifier la quantité ');
            this.openRequestQuotationModal();
            return false;
          }
          this.quotation.quantity = quantity;
          if(code_postal == "" ){
            await this.openFailedModal('Erreur...', 'Vérifier l\'Adresse postale ');
            this.openRequestQuotationModal();
            return false;
          }
          this.quotation.postalCode = code_postal;
        }}).then((result) =>  {
          if (result.value) {
            this.onSubmitQuotation();
          } else if (result.dismiss === Swal.DismissReason.cancel) {
            Swal.fire(
              'Annuler',
          )
        }
      })
    }

   openSendComplaintModal(){
      Swal.fire({
        title: ``,
        html: `
            <div class="ht__bradcaump__area" style="background: rgba(0, 0, 0, 0) url(assets/images/bg/2.jpg) no-repeat scroll center center / cover ;">
              <div class="ht__bradcaump__wrap">
                <div class="container">
                  <div class="row">
                    <div class="col-xs-12">
                      <div class="bradcaump__inner text-center">
                        <h2 class="bradcaump-title">Signalement</h2>
                        <nav class="bradcaump-inner">
                          <a class="breadcrumb-item" href="index.html">Signalement</a>
                          <span class="brd-separetor">/</span>
                          <span class="breadcrumb-item active">Signalement</span>
                        </nav>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <form  #ComplaintFormAdd="ngForm">
              <div class="modal-body">
                <div class="single-contact-form form-group" >
                  <div class="contact-box name">
                    <input type="text" [(ngModel)]="Complaint.name"
                      class="form-control form-input-size"
                      style=" height:25%; font-size:25px;"
                      id="nameAdd"
                      name="nameAdd"
                      placeholder="Entrer votre name"
                      required #nameAdd="ngModel">
                    <input type="text" [(ngModel)]="Complaint.email"
                      class="form-control form-input-size"
                      style=" height:25%; font-size:25px;"
                      id="emailAdd"
                      name="emailAdd"
                      placeholder="Entrer votre email"
                      required #emailAdd="ngModel">
                  </div>
                </div>
                <div class="single-contact-form">
                  <div class="contact-box subject">
                    <input type="text" [(ngModel)]="Complaint.objet"
                           class="form-control form-input-size"
                           style=" height:25%; font-size:25px;"
                           id="objetAdd"
                           name="objetAdd"
                           placeholder="Entrer l'objet"
                           required #objetAdd="ngModel">
                  </div>
                </div>
                <div class="single-contact-form">
                  <div class="contact-box message">
                    <textarea type="text" [(ngModel)]="Complaint.message"
                      class="form-control"
                      rows="5" cols="30"
                      style="font-size:25px;"
                      id="messageAdd"
                      name="messageAdd"
                      placeholder="Entrer votre message"
                      required #messageAdd="ngModel"></textarea>
                  </div>
                </div>
              </div>
            </form>
            `,
        showCancelButton: true,
        confirmButtonText: 'SEND',
        width: '80%',
        cancelButtonText: 'Annuler',
        preConfirm: async () => {
          let name = ((<HTMLInputElement>document.getElementById('nameAdd')).value.trim());
          let objet = ((<HTMLInputElement>document.getElementById('objetAdd')).value.trim());
          let email = ((<HTMLInputElement>document.getElementById('emailAdd')).value.trim());
          let message = ((<HTMLInputElement>document.getElementById('messageAdd')).value.trim());
          if(name == "" ){
            await this.openFailedModal('Erreur...', 'Vérifier le nom ');
            this.openSendComplaintModal();
            return false;
          }
          this.Complaint.name = name;
          if(objet == "" ){
            await this.openFailedModal('Erreur...', 'Vérifier l\'objet ');
            this.openSendComplaintModal();
            return false;
          }
          this.Complaint.objet = objet;
          if(email == "" ){
            await this.openFailedModal('Erreur...', 'Vérifier l\'email ');
            this.openSendComplaintModal();
            return false;
          }
          this.Complaint.email = email;
          this.Complaint.message = message;
        }}).then((result) =>  {
          if (result.value) {
            this.onSubmitComplaint();
          } else if (result.dismiss === Swal.DismissReason.cancel) {
            Swal.fire(
              'Annuler',
          )
        }
      })
    }

}
