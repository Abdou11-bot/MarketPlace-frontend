import { Inject, Injectable } from '@angular/core';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';
// key that is used to access the data in local storageconst STORAGE_KEY = 'local_todolist';
@Injectable()
export class LocalStorageService {
    constructor(@Inject(LOCAL_STORAGE) private storage: StorageService) { }

    public clearStorage(){
      this.storage.clear();
    }
    /* W I S H L I S T   B E G I N */
    public storeOnStorage(product: number): boolean {
      if(this.productExists(product)){
        return true;
      }
      let initialJSON=[];
      if(this.getFromStorage() != JSON.stringify([])){
        initialJSON=JSON.parse(this.getFromStorage());
      }
      initialJSON.push(product);
      this.storage.set('products', JSON.stringify(initialJSON));
      return this.productExists(product);
    }
    public getFromStorage(): string {
      if((this.storage.get('products')==null)||(this.storage.get('products')==undefined )){
        return JSON.stringify([]);
      }
      return this.storage.get('products');
    }
    public wishlistIsEmpty(): boolean {
      if(this.getFromStorage()==JSON.stringify([])){
        return true;
      }
      return false;
    }
    public productExists(id: number): boolean {
      if(this.wishlistIsEmpty()){
        return  false;
      }
      let responseJSON=[];
      responseJSON=JSON.parse(this.getFromStorage());
      for(let i=0;i<responseJSON.length;i++){
        if(responseJSON[i]==id){
          return true;
        }
      }
      return false;
    }
    public deleteProduct(id: number): boolean {
      if(!this.productExists(id)){
        return true;
      }
      let initialJSON=[];
      let finalJSON=[];
      initialJSON=JSON.parse(this.getFromStorage());
      for(let element of initialJSON){
        if(element!=id){
          finalJSON.push(element);
        }
      }
        this.storage.remove('products');
      if(finalJSON.length!=0)
        for(let element of finalJSON){
          this.storeOnStorage(Number(element));
        }
      return this.productExists(id);
    }
/*  W I S H L I S T     E N D */

/* C O M P L A I N T   B E G I N */
    public complaintExists(id: number): boolean {
      if(this.complaintIsEmpty()){
        return  false;
      }
      let responseJSON=[];
      responseJSON=JSON.parse(this.getComplaint());
      for(let i=0;i<responseJSON.length;i++){
        if(responseJSON[i]==id){
          return true;
        }
      }
      return false;
    }
    public storeComplaint(product: number): boolean {
      if(this.complaintExists(product)){
        return true;
      }
      let initialJSON=[];
      if(this.getComplaint()!=' '){
        initialJSON=JSON.parse(this.getComplaint());
      }
      initialJSON.push(product);
      this.storage.set('complaint', JSON.stringify(initialJSON));
      return this.complaintExists(product);
    }
    public getComplaint(): string {
      if((this.storage.get('complaint')==null)||(this.storage.get('complaint')==undefined )){
        return ' ';
      }
      return this.storage.get('complaint');
    }
    public complaintIsEmpty(): boolean {
      if(this.getComplaint()==' '){
        return true;
      }
      return false;
    }
    public deleteComplaint(id: number): boolean {
      if(!this.complaintExists(id)){
        return true;
      }
      let initialJSON=[];
      let finalJSON=[];
      initialJSON=JSON.parse(this.getComplaint());
      for(let element of initialJSON){
        if(element!=id){
          finalJSON.push(element);
        }
      }
        this.storage.remove('complaint');
      if(finalJSON.length!=0)
        for(let element of finalJSON){
          this.storeComplaint(Number(element));
        }
      return this.complaintExists(id);
    }
    /* C O M P L A I N T   E N D */
    /* L O G I N   B E G I N */
    public storeUserOnStorage(login: string) {
      this.storage.set('login', login);
    }
    public getUserFromStorage(): string {
      if((this.storage.get('login')===null)||(this.storage.get('login')===undefined )){
        return JSON.stringify([]);
      }
      return this.storage.get('login');
    }
    public clearLogin(){
      this.storage.remove('login');
    }
    /* L O G I N   E N D */

    /* M E D E C I N   B E G I N */

    public MedecinExists(): boolean {
      if(this.getMedecin() == null || this.getMedecin() == undefined || this.getMedecin().trim() == ''){
        return  false;
      }
      return true;
    }
    public storeMedecin(login: string) {
      this.storage.set('medecin', login);
    }
    public getMedecin(): string {
     /* if((this.storage.get('medecin')==null)||(this.storage.get('medecin')==undefined )){
        return ' ';
      }*/
      return this.storage.get('medecin');
    }
    public clearMedecin(){
      this.storage.remove('medecin');
    }
    /* M E D E C I N   E N D  */

    /* S E A R C H   B E G I N */
    public storeResearchParams(speciality: string,provider: string,product: string) {
      this.storage.set('speciality', speciality);
      this.storage.set('provider', provider);
      this.storage.set('product', product);
    }
    storeType(type:string){
      this.storage.set('type', type);
    }
    storeSpeciality(speciality:string){
      this.storage.set('speciality', speciality);
    }
    public getSpeciality(): string {
      if((this.storage.get('speciality')!=null)&&(this.storage.get('speciality')!=undefined )){
        return this.storage.get('speciality');
      }
      return ' ';
    }
    public getType(): string {
      if((this.storage.get('type')!=null)&&(this.storage.get('type')!=undefined )){
        return this.storage.get('type');
      }
      return 'speciality';
    }
    public getResearchParams(): string {
      let result = ' ';
      if((this.storage.get('speciality')!=null)&&(this.storage.get('speciality')!=undefined )){
        result+= this.storage.get('speciality');
      }
      if((this.storage.get('provider')!=null)||(this.storage.get('provider')!=undefined )){
        result+=', ' + this.storage.get('provider');
      }
      if((this.storage.get('product')!=null)||(this.storage.get('product')!=undefined )){
        result+=', ' + this.storage.get('product');
      }
      return result;
    }
    public clearResearchParams(){
        this.storage.remove('speciality');
        this.storage.remove('provider');
        this.storage.remove('product');
        this.storage.remove('type');
    }
    /* S E A R C H   E N D */

}
