import {Component, EventEmitter, Input, Output, ViewEncapsulation} from '@angular/core';
import {ClientModel} from '../client.Model';
import {ClientService} from '../client.service';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-client-add',
  templateUrl: './client-add.component.html',
  styleUrls: ['./client-add.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ClientAddComponent {
  client: ClientModel = new ClientModel({});
  constructor(private Service: ClientService, private router: Router) {
      this.client = new ClientModel({});
    };

  submitted = false;

  save() {
    this.Service.createClient(this.client)
      .subscribe(data => console.log(data), error => console.log(error));
    this.client = new ClientModel({});
    this.goToList();
  }

  onSubmit() {
    this.submitted = true;
    this.save();
  }

  goToList() {
      this.router.navigate(['clients/list']).then(() => {window.location.reload();});
  }
}
