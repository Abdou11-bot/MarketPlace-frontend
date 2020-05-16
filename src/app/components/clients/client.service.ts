import {ClientModel} from './client.model';
import {environment} from '../../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable, Input} from '@angular/core';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';

@Injectable({providedIn: 'root'})
export class ClientService {

  constructor(private http: HttpClient, private router: Router) {
  }
  getAllClients(): Promise<Array<ClientModel>> {
    return this.http.get<Array<ClientModel>>(environment.SERVER_API_URL + '/api/clients').toPromise();
  }

  getClient(id: number): Promise<ClientModel> {
    return this.http.get<ClientModel>(environment.SERVER_API_URL + '/api/clients/' + id).toPromise();
  }

  createClient(client: ClientModel): Observable<ClientModel> {
    // @ts-ignore
    return this.http.post(environment.SERVER_API_URL + '/api/clients/add', client);
  }

  updateClient(id: number, client: ClientModel): Observable<ClientModel> {
    // @ts-ignore
    return this.http.put(environment.SERVER_API_URL + '/api/clients/edit/' + id, client);
  }

  deleteClient(id: number): Observable<any> {
    return this.http.delete(environment.SERVER_API_URL + '/api/clients/delete/' + id);
  }

}
