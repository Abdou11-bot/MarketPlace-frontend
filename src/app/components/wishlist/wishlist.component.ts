import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import{ProductModel} from '../../models/product.model';
import{ProductService} from '../../services/product.service';
import{ImageModel} from '../../models/image.model';
import{ProviderModel} from '../../models/provider.model';
import {DomSanitizer} from '@angular/platform-browser';
import { LocalStorageService } from '../../services/localStorage.service';
import { SessionStorageService } from '../../services/sessionStorage.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})

export class WishlistComponent implements OnInit {
  collection = { count: 0, products: Array<ProductModel> () };
  constructor(private StorageService: LocalStorageService, private router:Router,
            private ProductService: ProductService, public sanitizer: DomSanitizer) {
  //  this.StorageService.clearStorage();
    this.ProductService.getProduct(this.router.getCurrentNavigation().extras.state.id).then(
      response => { this.getData(response); }
    );
  }
  getData(response: any){
    let exists=false;
    let responseJSON=[];
    responseJSON=JSON.parse(this.StorageService.getFromStorage());
    for(let i=0;i<responseJSON.length;i++){
      if(responseJSON[i].id===response.id){
        exists=true;
        break;
      }
    }
    if(!exists){
      responseJSON.push(new ProductModel(response));
      this.StorageService.storeOnStorage(JSON.stringify(responseJSON));
    }
    for(let i=0;i<responseJSON.length;i++){
      this.collection.products.push(new ProductModel(responseJSON[i]));
    }
  }

  ngOnInit() {
  }

 sane(imagrSrc: any) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(imagrSrc);
  }
}
