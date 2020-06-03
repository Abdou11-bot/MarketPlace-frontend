import {environment} from '../../environments/environment';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Injectable, Input} from '@angular/core';
import {Observable} from 'rxjs';
import { LocalStorageService } from './localStorage.service';
import { SessionStorageService } from './sessionStorage.service';
import{ProductService} from './product.service';

@Injectable({providedIn: 'root'})
export class ComplaintService {
  constructor(private http: HttpClient) {  }
  SendComplaint(complaint): Promise<any>  {
    return this.http.post<any>(environment.SERVER_API_URL + '/api/complaint/contactUs',complaint).toPromise();
  }
}
