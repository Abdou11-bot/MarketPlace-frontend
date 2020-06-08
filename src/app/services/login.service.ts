import {environment} from '../../environments/environment';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Injectable, Input} from '@angular/core';
import {Observable} from 'rxjs';
import { LocalStorageService } from './localStorage.service';
import { SessionStorageService } from './sessionStorage.service';
import{ProductService} from './product.service';

@Injectable({providedIn: 'root'})
export class LoginService {
  constructor(private http: HttpClient, private StorageService: LocalStorageService) {
    this.StorageService.clearStorage();
  }
  login(logindata,admin): Promise<any> {
    let params = new HttpParams();
    params = params.append('login', logindata.get('login'));
    params = params.append('password', logindata.get('password'));
    let loginResponse = this.http.get<any>(environment.SERVER_API_URL + '/api/admin/login/'+admin,{params: params}).toPromise();
    if(loginResponse){
      this.StorageService.storeUserOnStorage(logindata.get('login'));
    }
    return loginResponse;
  }
  register(data:string,society:string,collection:any): Promise<any>  {
    const Data = new FormData();
        Data.append('data', data);
        Data.append('society', society);
        for(let i=0; i<collection.Specialities.length;i++){
          Data.append('specialities', JSON.stringify(collection.Specialities[i]));
        }
    return this.http.post<any>(environment.SERVER_API_URL + '/api/provider/register',Data).toPromise();
  }
}
