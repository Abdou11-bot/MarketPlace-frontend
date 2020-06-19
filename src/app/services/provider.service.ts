import {environment} from '../../environments/environment';
 import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Injectable, Input} from '@angular/core';
import {Observable} from 'rxjs';
import {ProductModel} from '../models/product.model';
import {MedecinModel} from '../models/medecin.model';
import {ProviderModel} from '../models/provider.model';
import {SpecialityModel} from '../models/speciality.model';

@Injectable({providedIn: 'root'})
export class ProviderService {
  constructor(private http: HttpClient) {
  }
  getAllProviders(): Promise<Array<MedecinModel>> {
    return this.http.get<Array<MedecinModel>>(environment.SERVER_API_URL + '/api/provider/getAllProviders').toPromise();
  }
  getAllMedecins(): Promise<Array<ProviderModel>> {
    return this.http.get<Array<ProviderModel>>(environment.SERVER_API_URL + '/api/medecin/getAll').toPromise();
  }
  getOwnedProductsByProvider(id: number): Promise<Array<ProductModel>> {
    return this.http.get<Array<ProductModel>>(environment.SERVER_API_URL + '/api/provider/getownedproducts/'+id).toPromise();
  }
  getClaimedProductsToProvider(id: number): Promise<Array<ProductModel>> {
    return this.http.get<Array<ProductModel>>(environment.SERVER_API_URL + '/api/provider/getclaimedproducts/'+id).toPromise();
  }
  getQuotationsSendToProvider(id:number){
    return this.http.get<Array<SpecialityModel>>(environment.SERVER_API_URL + '/api/provider/getquotations/'+id).toPromise();
  }
  blockprovider(id: number): Promise<any> {
    return this.http.get<ProductModel>(environment.SERVER_API_URL + '/api/admin/blockprovider/'+id).toPromise();
  }
  activateprovider(id: number): Promise<any> {
    return this.http.get<ProductModel>(environment.SERVER_API_URL + '/api/admin/activateprovider/'+id).toPromise();
  }
  getAllSpecialities(): Promise<Array<SpecialityModel>> {
    return this.http.get<Array<SpecialityModel>>(environment.SERVER_API_URL + '/api/provider/specialities').toPromise();
  }
  getAllSpecialitiesSuscribed(): Promise<Array<SpecialityModel>> {
    return this.http.get<Array<SpecialityModel>>(environment.SERVER_API_URL + '/api/provider/getallspecialitiessuscribed').toPromise();
  }

  getProvider(id: number): Promise<ProviderModel> {
    return this.http.get<ProviderModel>(environment.SERVER_API_URL + '/api/provider/getProfil/' + id).toPromise();
  }
  getAdmin(): Promise<ProviderModel> {
    return this.http.get<ProviderModel>(environment.SERVER_API_URL + '/api/admin/getAdmin').toPromise();
  }
/*
  createProduct(uploadData: FormData,provider) {
    // @ts-ignore
   return this.http.post('http://localhost:8080/api/provider/addproduct/'+provider, uploadData)
      .subscribe(res => {console.log(res); },
        err => console.log('Error Occured duringng uploading: ' + err)
      );
  }
  updateProduct(id: number, Product: ProductModel): Observable<any> {
    // @ts-ignore
    return this.http.put(environment.SERVER_API_URL + '/api/clients/edit/' + id, Product);
  }

  deleteProduct(id: number): Observable<any> {
    return this.http.delete(environment.SERVER_API_URL + '/api/clients/delete/' + id);
  }

  onUpLoad(uploadData, id: number) {
    return this.http.post('http://localhost:8080/api/image/uploadImage/' + id, uploadData)
      .subscribe(res => {console.log(res); },
        err => console.log('Error Occured duringng uploading: ' + err)
      );

  }

  getProductImage(id: number) {
    // @ts-ignore
    return this.http.get<string>('http://localhost:8080/api/image/uploadImage/' + id, {responseType: 'text'})
      .toPromise();
  }
*/
}
