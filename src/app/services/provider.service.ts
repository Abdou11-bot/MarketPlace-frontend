import {environment} from '../../environments/environment';
 import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Injectable, Input} from '@angular/core';
import {Observable} from 'rxjs';
import {ProductModel} from '../models/product.model';
import {MedecinModel} from '../models/medecin.model';
import {ProviderModel} from '../models/provider.model';
import {SpecialityModel} from '../models/speciality.model';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    Authorization: 'user:10419e44-5261-4c7b-811a-8bff2742ce51'
  })
};
@Injectable({providedIn: 'root'})
export class ProviderService {
  public httpOptions= 'Basic ' + window.btoa( 'user:10419e44-5261-4c7b-811a-8bff2742ce51');
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
  getOwnedProductsByProviderLogin(login: string): Promise<Array<ProductModel>> {
    return this.http.get<Array<ProductModel>>(environment.SERVER_API_URL + '/api/provider/getownedproductsbylogin/'+login).toPromise();
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
    return this.http.get<Array<SpecialityModel>>(environment.SERVER_API_URL + '/api/provider/specialities',httpOptions).toPromise();
  }
  getAllSpecialitiesSuscribed(): Promise<Array<SpecialityModel>> {
    return this.http.get<Array<SpecialityModel>>(environment.SERVER_API_URL + '/api/provider/getallspecialitiessuscribed').toPromise();
  }

  getProvider(id: number): Promise<ProviderModel> {
    return this.http.get<ProviderModel>(environment.SERVER_API_URL + '/api/provider/getProfil/' + id).toPromise();
  }

  getProfil(login: string): Promise<ProviderModel> {
    return this.http.get<ProviderModel>(environment.SERVER_API_URL + '/api/provider/getProfilData/' + login).toPromise();
  }
  getAdmin(): Promise<ProviderModel> {
    return this.http.get<ProviderModel>(environment.SERVER_API_URL + '/api/admin/getAdmin').toPromise();
  }
  providersExists(login:string): Promise<any> {
    return this.http.get<any>(environment.SERVER_API_URL + '/api/admin/providersExists/'+login).toPromise();
  }
  medecinExists(login:string): Promise<any> {
    return this.http.get<any>(environment.SERVER_API_URL + '/api/admin/medecinExists/'+login).toPromise();
  }
  updateProfil(data,login: string): Promise<ProviderModel> {
    return this.http.put<ProviderModel>(environment.SERVER_API_URL + '/api/provider/updateProfil/'+login, data).toPromise();
  }
  updateAdmin(data): Promise<ProviderModel> {
    return this.http.put<ProviderModel>(environment.SERVER_API_URL + '/api/admin/updateAdmin',data).toPromise();
  }
  deleteproduct(id: number): Promise<any> {
    return this.http.delete<any>(environment.SERVER_API_URL + '/api/provider/deleteproduct/'+id).toPromise();
  }
  addProduct(data,login): Promise<ProductModel> {
    return this.http.post<ProductModel>(environment.SERVER_API_URL + '/api/provider/addproduct/'+login,data).toPromise();
  }
  updateClient(data): Promise<ProductModel> {
    return this.http.put<ProductModel>(environment.SERVER_API_URL + '/api/provider/updateproduct',data).toPromise();
  }
}
