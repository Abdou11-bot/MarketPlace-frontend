import {environment} from '../../environments/environment';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Injectable, Input} from '@angular/core';
import {Observable} from 'rxjs';
import { LocalStorageService } from './localStorage.service';
import { SessionStorageService } from './sessionStorage.service';
import{ProductService} from './product.service';
import {MedecinModel} from '../models/medecin.model';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Injectable({providedIn: 'root'})
export class LoginService {
  constructor(private http: HttpClient, private StorageService: LocalStorageService) {
    this.StorageService.clearStorage();
  }
  login(logindata): Promise<number> {
    let params = new HttpParams();
    params = params.append('login', logindata.get('login'));
    params = params.append('password', logindata.get('password'));
    return this.http.get<number>(environment.SERVER_API_URL + '/api/admin/login',{params: params}).toPromise();
  }
openFailedModal(error,message)
  {
    Swal.fire(error, message, 'error')
  }
providerExists(email):Promise<any>{
	return this.http.get<any>(environment.SERVER_API_URL +         	'/api/provider/verification/'+email).toPromise();
}

  register(email,data:string,society:string,collection:any): Promise<any>  {
    let exists = false;
    this.providerExists(email).then(response => {
      if(response){
        this.openFailedModal('erreur','UN compte existe deja 			avec 	cet email');
        exists = true;
      }
    });
    if(exists ){
      return null;
    }
    const Data = new FormData();
    Data.append('data', data);
    Data.append('society', society);
    for(let i=0; i<collection.length;i++){
      Data.append('specialities', JSON.stringify(collection[i]));
    }
    return this.http.post<any>(environment.SERVER_API_URL + '/api/provider/register',Data).toPromise();

  }
  loginMedecin(login:string,password:string): Promise<MedecinModel> {
    let params = new HttpParams();
    params = params.append('login', login);
    params = params.append('password', password);
    let loginResponse = this.http.get<MedecinModel>(environment.SERVER_API_URL + '/api/medecin/logging',{params: params}).toPromise();
    if(loginResponse != null){
      this.StorageService.storeMedecin(login);
    }
    return loginResponse;
  }
  getMedecinById(id:number): Promise<MedecinModel>{
    return this.http.get<MedecinModel>(environment.SERVER_API_URL + '/api/medecin/get/'+id).toPromise();
  }
  getMedecin(email:string): Promise<MedecinModel>{
    return this.http.get<MedecinModel>(environment.SERVER_API_URL + '/api/medecin/getByLogin/'+email).toPromise();
  }
  registerMedecin(data:string,speciality:string): Promise<any>  {
    const Data = new FormData();
    Data.append('data', data);
    Data.append('speciality', speciality);
    return this.http.post<any>(environment.SERVER_API_URL + '/api/medecin/add',Data).toPromise();
  }
}
