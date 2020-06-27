import {Component, EventEmitter, Input, OnInit, Output, OnDestroy, TemplateRef, ViewEncapsulation} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {Router} from '@angular/router';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {DomSanitizer} from '@angular/platform-browser';
import {MatDialog} from '@angular/material/dialog';
import { LocalStorageService } from '../../../../services/localStorage.service';
import { SessionStorageService } from '../../../../services/sessionStorage.service';
import{ProviderService} from '../../../../services/provider.service';
import{ProductService} from '../../../../services/product.service';
import{ComplaintService} from '../../../../services/complaint.service';
import{ProviderModel} from '../../../../models/provider.model';
import{ProductModel} from '../../../../models/product.model';
import{QuotationModel} from '../../../../models/quotation.model';
import{ComplaintModel} from '../../../../models/complaint.model';
import{SpecialityModel} from '../../../../models/speciality.model';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-provider-product-content',
  templateUrl: './provider-product-content.component.html',
  styleUrls: ['./provider-product-content.component.css']

})
export class ProviderProductContentComponent implements OnInit , OnDestroy {
  config: any;
  closeResult: string;
  ProductAdd: ProductModel =  new ProductModel({'provider':{},'images': [],'speciality': {}});
  ProductUpdate: ProductModel =  new ProductModel({'provider':{},'images': [],'speciality': {}});
  id: number;
  public selectedCatalogue;
  public selectedImages;
  images : any;
  detailFlag = false;
  provider = new ProviderModel({'society':{}});
  ownedProducts = Array<ProductModel>();
  quotations= Array<QuotationModel> ();
  claimedProducts = Array<ProductModel> ();
  product= new ProductModel({'provider':{},'images': [],'speciality': {}});
  collection = { count: 0, products: Array<ProductModel> (), specialities: Array<SpecialityModel> ()};
  constructor(private StorageService: LocalStorageService, private router: Router, public sanitizer: DomSanitizer, public dialog: MatDialog,
              private ProviderService: ProviderService, private ComplaintService : ComplaintService, private modalService: NgbModal) {  }
  ngOnDestroy(){
  }

  ngOnInit(): void {
    this.ProviderService.getProfil(this.StorageService.getProviderLogin()).then(response => {
        if(response != null ){
          for(let resp of response.specialities){
            this.collection.specialities.push(new SpecialityModel(resp));
          }
        }
    });
    this.ProviderService.getOwnedProductsByProviderLogin(this.StorageService.getProviderLogin()).then(response => {
        for(let resp of response){
          this.collection.products.push(new ProductModel(resp));
        }
    });
    this.collection.count = this.collection.products.length;
        this.config = {
          itemsPerPage: 3,
          currentPage: 1,
          totalItems: this.collection.count
        };
  }
  getCatalogueName(productTemp) : string{
    if(productTemp == undefined || productTemp == null || productTemp.catalogue == '' || productTemp.catalogue == undefined || productTemp.catalogue == null ){
      return '';
    }
    let pathArray = productTemp.catalogue.split('http://localhost:8080/catalogues/');
    let nameArray = pathArray[1].split('/');
    return nameArray[2];
  }
  loadproduct(i:number){
    this.product = this.collection.products[i+((this.config.currentPage-1)*this.config.itemsPerPage)];
    this.detailFlag = true;
  }
  deleteproduct(id:number){
    this.ProviderService.deleteproduct(id).then(response => {
      if(response){
        let arrayProducts = [];
        for(let i =0;i<this.collection.products.length;i++){
          if(this.collection.products[i].id != id){
            arrayProducts.push(this.collection.products[i]);
          }
        }
        this.collection.products=arrayProducts;
        this.collection.count = this.collection.products.length;
        this.config.totalItems = this.collection.count;
        this.displayList();
      }
    });
  }
  displayList(){
      this.detailFlag = false;
  }

  getSpecialitiesStringAdd(){
    let result:string ='<select id="specialityAdd" class="form-control "> <option value="-1" selected>Selectionner la specialité</option>';
    for(let i=0;i< this.collection.specialities.length;i++){
      result+='<option value="'+i+'"> '+this.collection.specialities[i].name+'</option>';
    }
    result+='</select>';
    return result;
  }
 openAddProductModal(){
     Swal.fire({
        title: `Ajouter produit`,
        html: `
          <div >
              <form  style=" margin: 3%; width: 90%; font-size: 25px; height: 30px">
                <div class="">
                  <div class="form-group">
                    <input type="text" [(ngModel)]="ProductAdd.name"
                           class="form-control form-input-size norme"
                           id="nameAdd"
                           name="nameAdd"
                           placeholder="Entrer le  nom"
                           required #nameAdd="ngModel">
                  </div>
                  <div class="form-group">
                    <input type="text" [(ngModel)]="ProductAdd.reference"
                           class="form-control form-input-size norme"
                           id="referenceAdd"
                           name="referenceAdd"
                           placeholder="Entrer la reference"
                           required #referenceAdd="ngModel">
                  </div>
                  <div class="form-group">
                    <input type="text" [(ngModel)]="ProductAdd.marque"
                           class="form-control form-input-size norme"
                           id="marqueAdd"
                           name="marqueAdd"
                           placeholder="Entrer la marque"
                           required #marqueAdd="ngModel">
                  </div>
                  <div class="form-group">
                  `+this.getSpecialitiesStringAdd()+`
                  </div>
                  <div class="form-group">
                    <textarea type="text" [(ngModel)]="ProductAdd.description"
                              class="form-control form-input-size norme"
                              id="descriptionAdd"
                              name="descriptionAdd"
                              placeholder="Entrer la description"
                              required #descriptionAdd="ngModel"></textarea>
                  </div>
                  <div class="form-group">
                    <label for="catalogueAdd" style="float: left">Catalogue</label>
                    <input type="file" [(ngModel)]="ProductAdd.catalogue"
                           class="form-control form-input-size norme"
                           id="catalogueAdd"
                           name="catalogueAdd"
                           placeholder="Choisissez le catalogue "
                           required #catalogueAdd="ngModel"
                           accept="application/pdf"">

                  </div>
                  <div class="form-group">
                    <label for="imagesAdd" style="float: left">Image</label>
                    <input type="file" [(ngModel)]="ProductAdd.images"
                           class="form-control form-input-size norme"
                           id="imagesAdd"
                           name="imagesAdd"
                           multiple
                           placeholder="Choisissez les imagee "
                           required #imagesAdd="ngModel"
                           accept="image/*">
                  </div>
                </div>
              </form>
          </div>
        `,
        showCancelButton: true,
        position: 'top',
        showClass: {popup: 'animate__animated animate__fadeInDown'},
        hideClass: {popup: 'animate__animated animate__fadeOutUp'},
        showCloseButton: true,
        width: '75%',
        confirmButtonText:'Ajouter',
        cancelButtonText:'Annuler',
        preConfirm: async () => {
          let descriptionAdd = ((<HTMLInputElement>document.getElementById('descriptionAdd')).value.trim());
          let marqueAdd = ((<HTMLInputElement>document.getElementById('marqueAdd')).value.trim());
          let referenceAdd = ((<HTMLInputElement>document.getElementById('referenceAdd')).value.trim());
          let nameAdd = ((<HTMLInputElement>document.getElementById('nameAdd')).value.trim());
          let specialityAdd = ((<HTMLInputElement>document.getElementById('specialityAdd')).value.trim());
          let catalogueAdd = (<HTMLInputElement>document.getElementById('catalogueAdd')).files;
          let imagesAdd = (<HTMLInputElement>document.getElementById('imagesAdd')).files;
          if((descriptionAdd == '') ||(marqueAdd == '') ||(referenceAdd == '')
              ||(nameAdd == '') ||(Number(specialityAdd) == -1) ||(catalogueAdd.length == 0) ){
             this.openFailedModal('Erreur','Verifier les données');
             return;
          }
          this.ProductAdd.description = descriptionAdd;
          this.ProductAdd.marque = marqueAdd;
          this.ProductAdd.reference = referenceAdd;
          this.ProductAdd.name = nameAdd;
          this.ProductAdd.speciality = this.collection.specialities[Number(specialityAdd)];
          this.selectedCatalogue = catalogueAdd[0];
          this.selectedImages = imagesAdd;
        }}).then((result) =>  {
          if (result.value) {
            const Data = new FormData();
            Data.append('product', JSON.stringify(this.ProductAdd));
            Data.append('catalogue', this.selectedCatalogue);
            for(let i=0; i<this.selectedImages.length;i++){
              Data.append('images', this.selectedImages[i]);
            }
            this.ProviderService.addProduct(Data,this.StorageService.getProviderLogin()).then(response => {
              if(response != null){
                this.collection.products.push(new ProductModel(response));
                this.openSuccessModal('Produit Ajouté');
              }else{
                this.openFailedModal('Erreur','Operation Echoué');
              }
            });
          } else if (result.dismiss === Swal.DismissReason.cancel) {
            Swal.fire('error','Annuler')
          }
      })
    }

    getSpecialitiesStringUpdate(){
      let result:string ='<select id="specialityUpdate" class="form-control "> <option value="-1" selected>Selectionner la specialité</option>';
      for(let i=0;i< this.collection.specialities.length;i++){
        if(this.ProductUpdate.speciality.id == this.collection.specialities[i].id){
          result+='<option value="'+i+'" selected> '+this.collection.specialities[i].name+'</option>';
        }else{
          result+='<option value="'+i+'"> '+this.collection.specialities[i].name+'</option>';
        }
      }
      result+='</select>';
      return result;
    }
    getProductImage(productTemp){
      let result:string ='<div>';
      for(let i=0;i< productTemp.images.length;i++){
        result+='<img src="'+(productTemp.images[i].path)+'" style="margin-left:5px;margin-right:5px; width: 100px  !important; height: 100px  !important;" alt="'+productTemp.name+'">';
      }
      result+='</div>';
      return result;
    }
 openUpdateProductModal(){
     this.ProductUpdate = this.product;
     Swal.fire({
        title: `Modifier produit`,
        html: `
          <div >
              <form >
                <div class="">
                  <div class="form-group">
                    <input type="text" [(ngModel)]="ProductUpdate.name"
                           class="form-control form-input-size norme"
                           id="nameUpdate"
                           name="nameUpdate"
                           placeholder="Entrer le  nom" value="`+(this.ProductUpdate.name+'')+`"
                           required #nameUpdate="ngModel">
                  </div>
                  <div class="form-group">
                    <input type="text" [(ngModel)]="ProductUpdate.reference"
                           class="form-control form-input-size norme"
                           id="referenceUpdate"
                           name="referenceUpdate"
                           placeholder="Entrer la reference" value="`+(this.ProductUpdate.reference+'')+`"
                           required #referenceUpdate="ngModel">
                  </div>
                  <div class="form-group">
                    <input type="text" [(ngModel)]="ProductUpdate.marque"
                           class="form-control form-input-size norme"
                           id="marqueUpdate"
                           name="marqueUpdate"
                           placeholder="Entrer la marque" value="`+(this.ProductUpdate.marque+'')+`"
                           required #marqueUpdate="ngModel">
                  </div>
                  <div class="form-group">
                  `+this.getSpecialitiesStringUpdate()+`
                  </div>
                  <div class="form-group">
                    <textarea type="text" [(ngModel)]="ProductUpdate.description"
                              class="form-control form-input-size norme"
                              id="descriptionUpdate"
                              name="descriptionUpdate"
                              placeholder="Entrer la description"
                              required #descriptionUpdate="ngModel"> `+(this.ProductUpdate.description+'')+`</textarea>
                  </div>
                  <div class="form-group">
                    <label for="catalogueAdd" style="float: left">Catalogue : <a href="product.catalogue" download="`+(this.getCatalogueName(this.ProductUpdate)+'')+`">`+(this.getCatalogueName(this.ProductUpdate)+'')+`</a></label>
                    <input type="file" [(ngModel)]="ProductUpdate.catalogue"
                           class="form-control form-input-size norme"
                           id="catalogueUpdate"
                           name="catalogueUpdate"
                           placeholder="Choisissez le catalogue "
                           required #catalogueUpdate="ngModel"
                           accept="application/pdf"">

                  </div>
                  <div class="form-group">
                    <label for="imagesAdd" style="float: left">Image</label>
                    <input type="file" [(ngModel)]="ProductUpdate.images"
                           class="form-control form-input-size norme"
                           id="imagesUpdate"
                           name="imagesUpdate"
                           multiple
                           placeholder="Choisissez les imagee "
                           required #imagesUpdate="ngModel"
                           accept="image/*">
                  </div>
                  <label> Les images actuelles du produit: </label>
                  `+(this.getProductImage(this.ProductUpdate))+`
                </div>
              </form>
          </div>
        `,
        showCancelButton: true,
        customClass: 'norme',
        position: 'top',
        showClass: {popup: 'animate__animated animate__fadeInDown'},
        hideClass: {popup: 'animate__animated animate__fadeOutUp'},
        showCloseButton: true,
        width: '75%',
        confirmButtonText:'Modifier',
        cancelButtonText:'Annuler',
        preConfirm: async () => {
          let descriptionUpdate = ((<HTMLInputElement>document.getElementById('descriptionUpdate')).value.trim());
          let marqueUpdate = ((<HTMLInputElement>document.getElementById('marqueUpdate')).value.trim());
          let referenceUpdate = ((<HTMLInputElement>document.getElementById('referenceUpdate')).value.trim());
          let nameUpdate = ((<HTMLInputElement>document.getElementById('nameUpdate')).value.trim());
          let specialityUpdate = ((<HTMLInputElement>document.getElementById('specialityUpdate')).value.trim());
          let catalogueUpdate = (<HTMLInputElement>document.getElementById('catalogueUpdate')).files;
          let imagesUpdate = (<HTMLInputElement>document.getElementById('imagesUpdate')).files;
          if((descriptionUpdate == '') ||(marqueUpdate == '') ||(referenceUpdate == '')
              ||(nameUpdate == '') ||(Number(specialityUpdate) == -1) ){
             this.openFailedModal('Erreur','Verifier les données');
             return;
          }
          this.ProductUpdate.description = descriptionUpdate;
          this.ProductUpdate.marque = marqueUpdate;
          this.ProductUpdate.reference = referenceUpdate;
          this.ProductUpdate.name = nameUpdate;
          this.ProductUpdate.speciality = this.collection.specialities[Number(specialityUpdate)];
          this.selectedCatalogue = catalogueUpdate[0];
          this.selectedImages = imagesUpdate;
        }}).then((result) =>  {
          if (result.value) {
            const Data = new FormData();
            Data.append('product', JSON.stringify(this.ProductUpdate));
            if(this.selectedImages.length!=0){
            alert('images');
              for(let i=0; i<this.selectedImages.length;i++){
                Data.append('images', this.selectedImages[i]);
              }
            }
            if(this.selectedCatalogue.length!=0){
              Data.append('catalogue', this.selectedCatalogue);
            }
            this.ProviderService.updateClient(Data).then(response => {
              if(response != null){
                for(let i=0; i<this.collection.products.length;i++){
                  if(this.collection.products[i].id == response.id){
                    this.collection.products[i] = new ProductModel(response);
                  }
                }
                this.openSuccessModal('Produit Modifié');
              }else{
                this.openFailedModal('Erreur','Operation Echouée');
              }
            });
          } else if (result.dismiss === Swal.DismissReason.cancel) {
            this.openFailedModal('Erreur','Operation Annulée');
          }
      })
    }

  openSuccessModal(message)
  {
    Swal.fire({text: message,icon: 'success'});
  }
  openFailedModal(error,message)
  {
    Swal.fire(error, message, 'error')
  }

  async onUpload(id: number) {
    const uploadData = new FormData();
    uploadData.append('file', this.selectedCatalogue);
 /*   await this.ProviderService.onUpLoad(uploadData, id);
  */}




  delete() {
   /* this.ProviderService.deleteClient(this.id).subscribe(data => console.log(data), error => console.log(error));
    */this.goToList();
  }

  save() {
  /*  this.ProviderService.createClient(this.ProductAdd)
        .subscribe(data => {
          console.log(data);
          this.ProductAdd = new ProductModel(data);
          this.onUpload(this.ProductAdd.id).then(response =>{
            this.ProductAdd = new ProductModel({});
            this.goToList();
          });
        }, error => console.log(error));
  */}

  onSubmit() {
    this.save();
  }
  update() {
    /*this.ProviderService.updateClient(this.id, this.ProductUpdate)
      .subscribe(data => {
      console.log(data);
      this.ProductUpdate = new ProductModel(data);
      this.onUpload(this.ProductUpdate.id).then(response =>{
        this.ProductUpdate = new ProductModel({});
        this.goToList();
      });
      }, error => console.log(error));
 */ }
  goToList() {
    this.router.navigate(['provider/product']).then(() => {window.location.reload(); });
  }

  modalUpdate(updatemodal: TemplateRef<any>, id: number) {
   /* this.ProviderService.getClient(id).then( async response => this.ProductUpdate = await response);
    */this.open(updatemodal, id);
  }
  open(content, id: number) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title', centered: true, size: 'xl', scrollable: true})
      .result.then((result) => {this.closeResult = `Closed with: ${result}`;}, (reason) => {
    this.closeResult = `Dismissed ${this.getDismissReason(reason)}`; });
    this.id = id;
}

private getDismissReason(reason: any): string {
  if (reason === ModalDismissReasons.ESC) {
    return 'by pressing ESC';
  } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
    return 'by clicking on a backdrop';
  } else {
    return  `with: ${reason}`;
  }
}
  pageChanged(event) {
    this.config.currentPage = event;
  }
  sane(imagrSrc: any) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(imagrSrc);
  }
}

