import {environment} from '../../environments/environment';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Injectable, Input} from '@angular/core';
import {Observable} from 'rxjs';
import { LocalStorageService } from './localStorage.service';
import { SessionStorageService } from './sessionStorage.service';
import{QuotationModel} from '../models/quotation.model';

@Injectable({providedIn: 'root'})
export class QuotationService {
  constructor(private http: HttpClient) {  }
  RequestQuotaion(quotation): Promise<any>  {
    return this.http.post<any>(environment.SERVER_API_URL + '/api/quotation/add',quotation).toPromise();
  }
  traiterQuotation(id: number): Promise<QuotationModel> {
    return this.http.get<QuotationModel>(environment.SERVER_API_URL + '/api/quotation/traiter/'+id).toPromise();
  }
  getAllQuotations(): Promise<Array<QuotationModel>> {
    return this.http.get<Array<QuotationModel>>(environment.SERVER_API_URL + '/api/quotation/getAll').toPromise();
  }
  getAllQuotationSendToProvider(login: string): Promise<Array<QuotationModel>>  {
    return this.http.get<Array<QuotationModel>>(environment.SERVER_API_URL + '/api/quotation/getalltoprovider/'+login).toPromise();
  }
}
