import { Inject, Injectable } from '@angular/core';
import { SESSION_STORAGE, StorageService } from 'ngx-webstorage-service';
// key that is used to access the data in local storageconst STORAGE_KEY = 'local_todolist';
@Injectable()
export class SessionStorageService {
    constructor(@Inject(SESSION_STORAGE) private storage: StorageService) { }
    public storeOnStorage(product: string) {
      //this.storage.clear();
//      let currentList = this.storage.get('products') || '';
//      currentList = product;
//      this.storage.set('products', currentList);
      this.storage.set('products', product);
    }
   public getFromStorage(): string {
        //   this.storage.clear();
       if((this.storage.get('products')===null)||(this.storage.get('products')===undefined )){
         return JSON.stringify([]);
       }
       return this.storage.get('products');
     }
}
