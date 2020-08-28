import {environment} from '../../environments/environment';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Injectable, Input} from '@angular/core';
import {Observable} from 'rxjs';
import { LocalStorageService } from './localStorage.service';
import { SessionStorageService } from './sessionStorage.service';
import {ComplaintModel} from '../models/complaint.model';

@Injectable({providedIn: 'root'})
export class ComplaintService {
  constructor(private http: HttpClient) {  }
  contactUs(complaint): Promise<any>  {
    return this.http.post<any>(environment.SERVER_API_URL + '/api/complaint/contactUs',complaint).toPromise();
  }
  SendComplaint(complaint): Promise<any>  {
    return this.http.post<any>(environment.SERVER_API_URL + '/api/complaint/add',complaint).toPromise();
  }
  getAllComplaint(): Promise<Array<ComplaintModel>> {
    return this.http.get<Array<ComplaintModel>>(environment.SERVER_API_URL + '/api/complaint/getAll',).toPromise();
  }
  getOwnedComplaint(login: string): Promise<Array<ComplaintModel>> {
    return this.http.get<Array<ComplaintModel>>(environment.SERVER_API_URL + '/api/complaint/getOwnedComplaint/'+login).toPromise();
  }
  getSentComplaint(login: string): Promise<Array<ComplaintModel>> {
    return this.http.get<Array<ComplaintModel>>(environment.SERVER_API_URL + '/api/complaint/getSentComplaint/'+login).toPromise();
  }
  existsForMedecin(login: string, product_id: number): Promise<any> {
    return this.http.get<any>(environment.SERVER_API_URL + '/api/complaint/existsForMedecin/'+login+'/'+product_id).toPromise();
  }
  setComplaintvue(id: number): Promise<ComplaintModel> {
    return this.http.put<ComplaintModel>(environment.SERVER_API_URL + '/api/complaint/setvue/'+id,null).toPromise();
  }
  deletecomplaint(id: number): Promise<Array<any>>  {
    return this.http.delete<any>(environment.SERVER_API_URL + '/api/complaint/deletecomplaint/'+id).toPromise();
  }
}
