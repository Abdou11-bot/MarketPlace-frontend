import { Inject, Injectable } from '@angular/core';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';
// key that is used to access the data in local storageconst STORAGE_KEY = 'local_todolist';
@Injectable()
export class LocalStorageService {
    constructor(@Inject(LOCAL_STORAGE) private storage: StorageService) { }
    public storeOnStorage(product: string) {
      this.storage.set('products', product);
    }
    public getFromStorage(): string {
      if((this.storage.get('products')===null)||(this.storage.get('products')===undefined )){
        return JSON.stringify([]);
      }
      return this.storage.get('products');
    }
    public storeUserOnStorage(login: string) {
      this.storage.set('login', login);
    }
    public getUserFromStorage(): string {
      if((this.storage.get('login')===null)||(this.storage.get('login')===undefined )){
        return JSON.stringify([]);
      }
      return this.storage.get('login');
    }
    public clearStorage(){
      this.storage.clear();
    }
}
