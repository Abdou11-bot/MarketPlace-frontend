import {environment} from '../../environments/environment';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Injectable, Input} from '@angular/core';
import {Observable} from 'rxjs';
import { LocalStorageService } from './localStorage.service';
import { SessionStorageService } from './sessionStorage.service';

@Injectable({providedIn: 'root'})
export class QuotationService {
  constructor(private http: HttpClient) {  }
  RequestQuotaion(quotation): Promise<any>  {
    return this.http.post<any>(environment.SERVER_API_URL + '/api/quotation/add',quotation).toPromise();
  }
}
