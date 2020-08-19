import { Component, OnInit } from '@angular/core';
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
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { LocalStorageService } from '../../services/localStorage.service';
import { SessionStorageService } from '../../services/sessionStorage.service';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-listproduits',
  templateUrl: './listproduits.component.html',
  styleUrls: ['./listproduits.component.css']
})

export class ListproduitsComponent implements OnInit {

  erreurFlag = false;
  product= new ProductModel({'provider':{},'images': [],'speciality': {}});
  public selectedFile;
  public selectedImages;
  config: any;
  collection = { count: 0, products: Array<ProductModel> () };
  id: number;
  closeResult: string;
  constructor(public ProductService : ProductService, public sanitizer: DomSanitizer, private router: Router,private activatedRoute: ActivatedRoute,
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
//    this.StorageService.storeAdminSpace('ClientSpace');
    let type = ' ';
    type = this.StorageService.getType();
    if(type.trim() == 'speciality'){
      this.ProductService.getAllProductsForSpeciality(Number(this.activatedRoute.snapshot.paramMap.get('id'))).then(response => {
        for (const resp of response) {
          let productTemp = new ProductModel(resp);
          if(!productTemp.blocked && (productTemp.provider.status==1)){
            this.collection.products.push(productTemp);
          }
        }
        this.verifyError();
      });
      this.collection.count = this.collection.products.length;
        this.config = {
          itemsPerPage: 10,
          currentPage: 1,
          totalItems: this.collection.count
        };
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
      this.config = {
          itemsPerPage: 10,
          currentPage: 1,
          totalItems: this.collection.count
        };
    }
  }
  verifyError(){
    if(this.collection.products.length == 0){
      this.erreurFlag = true;
      this.openFailedModal('Aucun resultat trouvé !',' ');
    }
  }
 sane(imagrSrc: any) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(environment.SERVER_RESOURCE_URL+imagrSrc);
  }

  openFailedModal(error,message)
  {
    Swal.fire(error, message, 'error')
  }

  pageChanged(event) {
    this.config.currentPage = event;
  }

  public gotoProductDetails(url, id) {
      this.router.navigate([url, id]);
  }
}
