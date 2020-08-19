import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import{ProductModel} from '../../models/product.model';
import{ProductService} from '../../services/product.service';
import{ImageModel} from '../../models/image.model';
import{ProviderModel} from '../../models/provider.model';
import {DomSanitizer} from '@angular/platform-browser';
import { LocalStorageService } from '../../services/localStorage.service';
import { SessionStorageService } from '../../services/sessionStorage.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import{QuotationService} from '../../services/quotation.service';
import{QuotationModel} from '../../models/quotation.model';
import{LoginService} from '../../services/login.service';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})

export class WishlistComponent implements OnInit {
  medecinFlag: boolean = false;
  collection = { count: 0, products: Array<ProductModel> () };
  quotation= new QuotationModel({'product':{'provider':{},'images': [],'speciality': {}}});
  constructor(private StorageService: LocalStorageService, private router:Router, private QuotationService: QuotationService,
            private LoginService: LoginService, private ProductService: ProductService, public sanitizer: DomSanitizer) {
  }

  ngOnInit() {
    this.medecinFlag = this.StorageService.MedecinExists();
    this.getWishlist();
//    this.StorageService.storeAdminSpace('ClientSpace');
  }
  empty(){
    this.StorageService.clearStorage();
    window.location.reload();
  }
  openDeleteProduct(index: number){
    Swal.fire({
        title: `Retirer de la liste des souhaits?`,
        html: `
          <div class="form-group modal-footer">
                <a class="btn btn-success btn-lg " title="Retirer de la liste des souhaits"  routerLink="/wishlist" [state]="{ id: `+index+`, operation: 'delete' }" >Oui</a>
                <button type="button" class="btn btn-danger btn-lg" (click)="Swal.close()">Annuler</button>
          </div>`,
        width: '50%'
        });
  }

  openEmptyModal(message){
    Swal.fire({text: message,icon: 'info'});
  }
  getWishlist(){
    if(this.StorageService.getMedecin() == ''){
      if(this.StorageService.wishlistIsEmpty()){
        this.openEmptyModal('La liste est vide !');
        return ;
      }
      let responseSTRING=JSON.stringify(this.StorageService.getFromStorage());
      responseSTRING = responseSTRING.substr(2);
      responseSTRING = responseSTRING.slice(0, -1);
      responseSTRING = responseSTRING.slice(0, -1);
      let responseARRAY = responseSTRING.split('null');
      responseSTRING = '';
      for(let element of responseARRAY){
        responseSTRING += element;
      }
      this.ProductService.getProducts(responseSTRING).then(
        response => {
          for(let product of response){
            this.collection.products.push(new ProductModel(product));
          }
        }
      );
    }else{
      this.ProductService.getWishlist(this.StorageService.getMedecin()).then(response => {
          for(let resp of response){
            this.collection.products.push(new ProductModel(resp));
          }
      });
    }
  }

  deleteProductFromWishlist(product: number){
    if(this.StorageService.getMedecin() == ''){
      let exists = false;
      while(!exists){
        exists=this.StorageService.deleteProduct(product);
      }
    }else{
      this.ProductService.deleteFromWishlist(this.StorageService.getMedecin(),product).then(response => {
        if(response){
          this.openSuccessModal('Operation reussite');
          this.ngOnInit();
        }else{
          this.openFailedModal('error','Operation échoué');
        }
      });
    }

  }
  deleteProduct(product: number){
    this.deleteProductFromWishlist(product);
    this.ngOnInit();
  }
   openRequestQuotationModal(index: number){
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
                        <a class="breadcrumb-item" href="/home">Home</a>
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
                             [value]= "quotation.firstname"
                             placeholder="Entrer votre prenom"
                             required >
                    </div>
                    <div class="form-group">
                      <input type="text" [(ngModel)]="quotation.lastname"
                             class="form-control form-input-size"
                             style=" height:25%; font-size:25px;"
                             id="lastnameAdd"
                             name="lastnameAdd"
                             placeholder="Entrer votre nom"
                             required>
                    </div>
                    <div class="form-group">
                      <input type="email" [(ngModel)]="quotation.email"
                             class="form-control form-input-size"
                             style=" height:25%; font-size:25px;"
                             id="emailAdd"
                             name="emailAdd"
                             placeholder="Entrer votre adresse mail"
                             required >
                    </div>
                     <div class="form-group">
                      <input type="text" [(ngModel)]="quotation.address"
                             class="form-control form-input-size"
                             style=" height:25%; font-size:25px;"
                             id="addressAdd"
                             name="addressAdd"
                             placeholder="Entrer votre addresse"
                             required >
                    </div>
                    <div class="form-group">
                      <input type="number" [(ngModel)]="quotation.quantity"
                             class="form-control form-input-size"
                             style=" height:25%; font-size:25px;"
                             id="quantityAdd"
                             name="quantityAdd"
                             placeholder="Entrer la quantité"
                             required >
                    </div>
                    <div class="form-group">
                      <input type="text" [(ngModel)]="quotation.postalCode"
                             class="form-control form-input-size"
                             style=" height:25%; font-size:25px;"
                             id="postalCodeAdd"
                             name="postalCodeAdd"
                             placeholder="Entrer votre addresse postale"
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
            this.openRequestQuotationModal(index);
            return false;
          }
          this.quotation.firstname = firstname;
          if(lastname == "" ){
            await this.openFailedModal('Erreur...', 'Vérifier le nom ');
            this.openRequestQuotationModal(index);
            return false;
          }
          this.quotation.lastname = lastname;
          if(email == "" ){
            await this.openFailedModal('Erreur...', 'Vérifier l\'email ');
            this.openRequestQuotationModal(index);
            return false;
          }
          this.quotation.email = email;
          if(address == "" ){
            await this.openFailedModal('Erreur...', 'Vérifier l\'Adresse ');
            this.openRequestQuotationModal(index);
            return false;
          }
          this.quotation.address = address;
          if(quantity <= 0 ){
            await this.openFailedModal('Erreur...', 'Vérifier la quantité ');
            this.openRequestQuotationModal(index);
            return false;
          }
          this.quotation.quantity = quantity;
          if(code_postal == "" ){
            await this.openFailedModal('Erreur...', 'Vérifier l\'Adresse postale ');
            this.openRequestQuotationModal(index);
            return false;
          }
          this.quotation.postalCode = code_postal;
        }}).then((result) =>  {
          if (result.value) {
            this.onSubmitQuotation(index);
          } else if (result.dismiss === Swal.DismissReason.cancel) {
            Swal.fire(
              'Annuler',
          )
        }
      })
    }

  onSubmitQuotation(index: number){
    let today :string = new Date().toISOString().substring(0,10);
    this.quotation.date = today;
    this.quotation.product=this.collection.products[index];
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

  openSuccessModal(message)
  {
    Swal.fire({text: message,icon: 'success'});
  }
  openFailedModal(error,message)
  {
    Swal.fire(error, message, 'error')
  }

 sane(imagrSrc: any) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(environment.SERVER_RESOURCE_URL+imagrSrc);
  }

   openRequestQuotationMedecinModal(i:number){
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
                        <a class="breadcrumb-item" href="/home">Home</a>
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
        width: '60%',
        cancelButtonText: 'Annuler',
        preConfirm: async () => {
          let quantity =Number((<HTMLInputElement>document.getElementById('quantityAdd')).value.trim());
          let code_postal = ((<HTMLInputElement>document.getElementById('postalCodeAdd')).value.trim());
          if(quantity <= 0 ){
            await this.openFailedModal('Erreur...', 'Vérifier la quantité ');
            this.openRequestQuotationMedecinModal(i);
            return false;
          }
          this.quotation.quantity = quantity;
          if(code_postal == "" ){
            await this.openFailedModal('Erreur...', 'Vérifier l\'Adresse postale ');
            this.openRequestQuotationMedecinModal(i);
            return false;
          }
          this.quotation.postalCode = code_postal;
        }}).then((result) =>  {
          if (result.value) {
            this.onSubmitUserLoggedQuotation(i);
          } else if (result.dismiss === Swal.DismissReason.cancel) {
            Swal.fire(
              'Annuler',
          )
        }
      })
    }

  async onSubmitUserLoggedQuotation(i:number){
    let today :string = new Date().toISOString().substring(0,10);
    this.quotation.date = today;
    this.quotation.product=this.collection.products[i];
    let medecin = await this.LoginService.getMedecin(this.StorageService.getMedecin());
    this.quotation.firstname = medecin.firstname;
    this.quotation.lastname = medecin.lastname;
    this.quotation.email = medecin.email;
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

}
