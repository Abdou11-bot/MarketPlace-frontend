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
  selector: 'app-listproduits',
  templateUrl: './listproduits.component.html',
  styleUrls: ['./listproduits.component.css']
})

  /*  let type = '';
    type = this.router.getCurrentNavigation().extras.state.type;
    if(type == '' || type == 'speciality'){
      this.ProductService.getAllProductsForSpeciality(this.router.getCurrentNavigation().extras.state.SpecialityId).then(response => {
        for (const resp of response) {
          this.collection.products.push(new ProductModel(resp));
        }
      });
      this.collection.count = this.collection.products.length;
      this.config = {
        itemsPerPage: 99,
        currentPage: 1,
        totalItems: this.collection.count
      };
    }
    if(type == 'research'){
      let speciality = this.router.getCurrentNavigation().extras.state.speciality;
      let provider = this.router.getCurrentNavigation().extras.state.provider;
      let product = this.router.getCurrentNavigation().extras.state.product;
      this.ProductService.getResearchResult(speciality,product,provider).then(response => {
        for (const resp of response) {
          this.collection.products.push(new ProductModel(resp));
        }
      });
      this.collection.count = this.collection.products.length;
      this.config = {
        itemsPerPage: 99,
        currentPage: 1,
        totalItems: this.collection.count
      };
    }
    if(this.collection.count == 0){
      this.erreurFlag = true;
      this.openFailedModal('Aucun resultat trouvé !',' ');}
  }
  */
export class ListproduitsComponent implements OnInit {

  erreurFlag = false;
  product= new ProductModel({'provider':{},'images': [],'speciality': {}});
  public selectedFile;
  public selectedImages;
  config: any;
  collection = { count: 0, products: Array<ProductModel> () };
  id: number;
  closeResult: string;
  constructor(public ProductService : ProductService, public sanitizer: DomSanitizer, private router: Router,
               public StorageService: LocalStorageService, private modalService: NgbModal, public dialog: MatDialog) {}

  customSort(filter:number){
    if(filter==1)
      this.collection.products.sort((a,b) => a.name.localeCompare(b.name));
    if(filter == 2)
      this.collection.products.sort((a,b) => a.id - b.id);
    if(filter == 3)
      this.collection.products.sort((a,b) => a.nombreVue - b.nombreVue);
    if(filter == 4)
      this.collection.products.sort((a,b) => a.speciality.name.localeCompare(b.speciality.name));
  }

  ngOnInit(): void {
    let type = ' ';
    type = this.StorageService.getType();
    if(type.trim() == 'speciality'){
      this.ProductService.getAllProductsForSpeciality(Number(this.StorageService.getSpeciality())).then(response => {
        for (const resp of response) {
          this.collection.products.push(new ProductModel(resp));
        }
        this.verifyError();
      });
      this.collection.count = this.collection.products.length;
    /*    this.config = {
          itemsPerPage: 99,
          currentPage: 1,
          totalItems: this.collection.count
        };
      */
    }else{
      let ResearchParamsString  = this.StorageService.getResearchParams();
      let ResearchParams = ResearchParamsString.split(',');
      let speciality = ResearchParams[0];
      let provider = ResearchParams[1];
      let product = ResearchParams[2];
      this.ProductService.getResearchResult(speciality.trim(),product.trim(),provider.trim()).then(response => {
        for (const resp of response) {
          this.collection.products.push(new ProductModel(resp));
        }
        this.verifyError();
      });
      this.collection.count = this.collection.products.length;
/*        this.config = {
          itemsPerPage: 99,
          currentPage: 1,
          totalItems: this.collection.count
        };
  */
    }
  }
  verifyError(){
    if(this.collection.products.length == 0){
      this.erreurFlag = true;
      this.openFailedModal('Aucun resultat trouvé !',' ');
    }
  }
 sane(imagrSrc: any) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(imagrSrc);
  }

  openFailedModal(error,message)
  {
    Swal.fire(error, message, 'error')
  }

/*
opensweetalert()
  {
    Swal.fire({
        text: 'Hello!',
        icon: 'success'
      });
  }
  opensweetalertdng()
  {
   Swal.fire('Oops...', 'Something went wrong!', 'error')
  }

  opensweetalertcst(){
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this imaginary file!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {
      Swal.fire(
        'Deleted!',
        'Your imaginary file has been deleted.',
        'success'
      )
      // For more information about handling dismissals please visit
      // https://sweetalert2.github.io/#handling-dismissals
      } else if (result.dismiss === Swal.DismissReason.cancel) {
      Swal.fire(
        'Cancelled',
        'Your imaginary file is safe :)',
        'error'
      )
      }
    })
  }

  openAddproductModal(){
    Swal.fire({
      title: 'Ajouter un produit',
      html: `<div>
             <div class="container custom-container text-uppercase text-xl-left text-large float-left text-left">
               <div class="col-md-auto">
                 <form (ngSubmit)="onSubmit()" #productFormAdd="ngForm">
                   <div class="modal-body">
                     <div class="form-group">
                       <label class="float-left" for="nameAdd">Name</label>
                       <input type="text" [(ngModel)]="product.name"
                              class="form-control"
                              id="nameAdd"
                              name="nameAdd"
                              placeholder="Enter product name"
                              required #nameAdd="ngModel">
                     </div>
                     <div class="form-group">
                       <label for="referenceAdd">Reference</label>
                       <input type="text" [(ngModel)]="product.reference"
                              class="form-control"
                              id="referenceAdd"
                              name="referenceAdd"
                              placeholder="Enter your reference"
                              required #referenceAdd="ngModel">
                     </div>
                     <div class="form-group">
                       <label for="marqueAdd">Marque</label>
                       <input type="text" [(ngModel)]="product.marque"
                              class="form-control"
                              id="marqueAdd"
                              name="marqueAdd"
                              placeholder="Enter your marque"
                              required #marqueAdd="ngModel">
                     </div>
                     <div class="form-group">
                       <label for="descriptionAdd">Description</label>
                       <textarea type="text" [(ngModel)]="product.description"
                                 class="form-control"
                                 id="descriptionAdd"
                                 name="descriptionAdd"
                                 placeholder="Enter a description"
                                 required #descriptionAdd="ngModel">{{product.description}}</textarea>
                     </div>
                     <div class="form-group">
                       <label for="catalogueAdd">Catalogue</label>
                       <input type="file" [(ngModel)]="product.catalogue"
                              class="form-control"
                              id="catalogueAdd"
                              name="catalogueAdd"
                              placeholder="Choose your catalogue "
                              required #catalogueAdd="ngModel"
                              accept="application/pdf"
                              (change)="onFileChanged1($event)">
                     </div>
                     <div class="form-group">
                       <label for="imageAdd">Images</label>
                       <input type="file" [(ngModel)]="product.images"
                              class="form-control"
                              id="imageAdd"
                              name="imageAdd"
                              placeholder="Choose your image "
                              required #imageAdd="ngModel"
                              accept="image/*"
                       (change)="onFileChanged($event)" multiple>
                     </div>
                   </div>
                 </form>
               </div>
             </div>
           </div>`,
      showCancelButton: true,
      confirmButtonText: 'Ajouter',
      width: '80%',
      cancelButtonText: 'Annuler'
    }).then((result) => {
        if (result.value) {
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


public  onFileChanged1(event) {
    console.log(event);
//    this.selectedFile = event.target.files[0];
    this.selectedFile = event.target;
//        alert('Selected filed changed '+ this.selectedFile.files[0].name);
//    alert('Selected filed changed '+ this.selectedFile.name);
  }

public  onFileChanged(event) {
    console.log(event);
//    this.selectedFile = event.target.files[0];
    this.selectedImages = event.target;
//        alert('Selected filed changed '+ this.selectedFile.files[0].name);
//    alert('Selected filed changed '+ this.selectedFile.name);
  }


  delete() {
//    this.Service.deleteClient(this.id).subscribe(data => console.log(data), error => console.log(error));
//    this.goToList();
  }


async onUpload() {
    const uploadData = new FormData();
    for(let i=0;i<this.selectedImages.files.length;i++){
      uploadData.append('images', this.selectedImages.files[i]);
    }
    //uploadData.append('images', this.selectedImages.files);
//    uploadData.append('catalogue', this.selectedFile.files[]);
//    this.product.provider=new ProviderModel(this.ProductService.getProvider(45));
    this.product = new ProductModel(
    {"name":"angular test name","catalogue":"angular test catalogue",
    "reference":"angular test reference","nombreVue":4,
    "marque":"angular test marque","blocked":false,"description":"angular test desciption",
    "provider":""});
    alert(JSON.stringify(this.product));
    uploadData.append('product', JSON.stringify(this.product));
    await this.ProductService.createProduct(uploadData,45);
  }
onSubmit() {
    this.onUpload();
  }
*/

 /*  update() {
      /*this.Service.updateClient(this.id, this.clientUpdate)
        .subscribe(data => {
        console.log(data);
        this.clientUpdate = new ClientModel(data);
        this.onUpload(this.clientUpdate.id).then(response =>{
          this.clientUpdate = new ClientModel({});
          this.goToList();
        });
        }, error => console.log(error));
    }*/

}