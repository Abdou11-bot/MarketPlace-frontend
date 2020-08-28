import {environment} from '../../environments/environment';
 import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Injectable, Input} from '@angular/core';
import {Observable} from 'rxjs';
import {ProductModel} from '../models/product.model';
import {ProviderModel} from '../models/provider.model';
import {SpecialityModel} from '../models/speciality.model';

@Injectable({providedIn: 'root'})
export class ProductService {
  constructor(private http: HttpClient) {
  }
  getAllProducts(): Promise<Array<ProductModel>> {
    return this.http.get<Array<ProductModel>>(environment.SERVER_API_URL + '/api/product').toPromise();
  }

  getAllProductsForSpeciality(id: number): Promise<Array<ProductModel>> {
    return this.http.get<Array<ProductModel>>(environment.SERVER_API_URL + '/api/product/productsforSpeciality/'+id).toPromise();
  }

  getProductsSimilarTo(id: number): Promise<Array<ProductModel>> {
    return this.http.get<Array<ProductModel>>(environment.SERVER_API_URL + '/api/product/getProductsSimilarTo/'+id).toPromise();
  }

  getProduct(id: number): Promise<ProductModel> {
    return this.http.get<ProductModel>(environment.SERVER_API_URL + '/api/provider/getproduct/'+id).toPromise();
  }
  blockProduct(id: number): Promise<any> {
    return this.http.get<ProductModel>(environment.SERVER_API_URL + '/api/admin/blockproduct/'+id).toPromise();
  }

  activateProduct(id: number): Promise<any> {
    return this.http.get<ProductModel>(environment.SERVER_API_URL + '/api/admin/activateproduct/'+id).toPromise();
  }

  incrementView(id: number): Promise<any> {
    const Data = new FormData();
    Data.append('data', id+'');
    return this.http.post<ProductModel>(environment.SERVER_API_URL + '/api/product/increment',Data).toPromise();
  }

  getMostViewProduct(): Promise<ProductModel> {
    return this.http.get<ProductModel>(environment.SERVER_API_URL + '/api/product/mostview').toPromise();
  }

  getProducts(data: string): Promise<Array<ProductModel>> {
    let params = new HttpParams();
    params = params.append('chaine', data);
    return this.http.get<Array<ProductModel>>(environment.SERVER_API_URL + '/api/product/productsids',{params: params}).toPromise();
  }
  existsInWishlist(login: string, product_id: number): Promise<any> {
    return this.http.get<any>(environment.SERVER_API_URL + '/api/medecin/existsInWishlist/'+login+'/'+product_id).toPromise();
  }
  getWishlist(login: string): Promise<Array<ProductModel>> {
    return this.http.get<Array<ProductModel>>(environment.SERVER_API_URL + '/api/medecin/getWishlist/'+login).toPromise();
  }
  addToWishlist(login: string,id:number): Promise<Array<ProductModel>> {
    return this.http.put<Array<ProductModel>>(environment.SERVER_API_URL + '/api/medecin/addtowishlist/'+login+'/'+id,null).toPromise();
  }
  deleteFromWishlist(login: string,id:number): Promise<any> {
    return this.http.put<any>(environment.SERVER_API_URL + '/api/medecin/deletfromwishlist/'+login+'/'+id,null).toPromise();
  }
  emptyWishlist(login: string): Promise<any> {
    return this.http.put<any>(environment.SERVER_API_URL + '/api/medecin/emptywishlist/'+login,null).toPromise();
  }
  getResearchResult(speciality:string, product: string, provider: string): Promise<Array<ProductModel>> {
    if(speciality != '0' && provider!='' &&product!=''){
      let params = new HttpParams();
      params = params.append('params', speciality);
      params = params.append('params', provider);
      params = params.append('params', product);
      return this.http.get<Array<ProductModel>>(environment.SERVER_API_URL + '/api/product/researchAll',{params: params}).toPromise();
    }
    if(speciality != '0' &&(product == '' && provider == '')){
      let params = new HttpParams();
      params = params.append('param', speciality);
      params = params.append('type', 'speciality');
      return this.http.get<Array<ProductModel>>(environment.SERVER_API_URL + '/api/product/research',{params: params}).toPromise();
    }
    if(product!='' &&(speciality == '0' && provider == '')){
      let params = new HttpParams();
      params = params.append('param', product);
      params = params.append('type', 'product');
      return this.http.get<Array<ProductModel>>(environment.SERVER_API_URL + '/api/product/research',{params: params}).toPromise();
    }
    if(provider != '' &&(product == '' && speciality == '0')){
      let params = new HttpParams();
      params = params.append('param', provider);
      params = params.append('type', 'provider');
      return this.http.get<Array<ProductModel>>(environment.SERVER_API_URL + '/api/product/research',{params: params}).toPromise();
    }
    if(speciality == '0'  &&(product != '' && provider != '')){
      let params = new HttpParams();
      params = params.append('param', provider);
      params = params.append('param', product);
      params = params.append('type', 'ProviderAndProduct');
      return this.http.get<Array<ProductModel>>(environment.SERVER_API_URL + '/api/product/researchTwoParams',{params: params}).toPromise();
    }
    if(product == '' &&(provider != '' && speciality != '0' )){
      let params = new HttpParams();
      params = params.append('param', speciality);
      params = params.append('param', provider);
      params = params.append('type', 'SpecialityAndProvider');
      return this.http.get<Array<ProductModel>>(environment.SERVER_API_URL + '/api/product/researchTwoParams',{params: params}).toPromise();
    }
    if(provider == '' &&(product != '' && speciality != '0' )){
      let params = new HttpParams();
      params = params.append('param', speciality);
      params = params.append('param', product);
      params = params.append('type', 'SpecialityAndProduct');
      return this.http.get<Array<ProductModel>>(environment.SERVER_API_URL + '/api/product/researchTwoParams',{params: params}).toPromise();
    }
  }

}
