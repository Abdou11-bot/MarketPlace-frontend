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

  getAllSpecialities(): Promise<Array<SpecialityModel>> {
    return this.http.get<Array<SpecialityModel>>(environment.SERVER_API_URL + '/api/provider/specialities').toPromise();
  }
  getAllProductsForSpeciality(id: number): Promise<Array<ProductModel>> {
    return this.http.get<Array<ProductModel>>(environment.SERVER_API_URL + '/api/product/productsforSpeciality/'+id).toPromise();
  }

  getProduct(id: number): Promise<ProductModel> {
    return this.http.get<ProductModel>(environment.SERVER_API_URL + '/api/provider/getproduct/'+id).toPromise();
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
