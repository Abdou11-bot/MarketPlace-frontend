import {Component, EventEmitter, Input, Output, ViewEncapsulation} from '@angular/core';
import {ClientModel} from '../client.Model';
import {ClientService} from '../client.service';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-client-update',
  templateUrl: './client-update.component.html',
  styleUrls: ['./client-update.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ClientUpdateComponent {
  client: ClientModel = new ClientModel({});
  id: number;
  constructor(private Service: ClientService, private router: Router) {
      this.client = new ClientModel({});
      this.id = this.router.getCurrentNavigation().extras.state.id;
      this.Service.getClient(this.id).then( response => this.client = response);
  };

  submitted = false;

  save() {
    this.Service.updateClient(this.id, this.client).subscribe(data => console.log(data), error => console.log(error));
    this.client = new ClientModel({});
   // this.goToList();
  }

  onSubmit() {
    this.submitted = true;
    this.save();
  }

  goToList() {
      this.router.navigate(['clients/list']).then(() => {window.location.reload();});
  }
}
