import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {ClientListComponent} from './client-list.component';
import {NgxPaginationModule} from 'ngx-pagination';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

const routes = [
  {
    path: 'list',
    component: ClientListComponent
  }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        CommonModule,
        NgxPaginationModule,
        NgbModule,
      ReactiveFormsModule,
      FormsModule
    ],
  declarations: [
    ClientListComponent
  ]
})
export class ClientListModule { }
