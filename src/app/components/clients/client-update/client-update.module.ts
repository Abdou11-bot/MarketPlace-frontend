import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {ClientUpdateComponent} from './client-update.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

const routes = [
  {
    path: 'update',
    component: ClientUpdateComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    ReactiveFormsModule,
    FormsModule
  ],
  declarations: [
    ClientUpdateComponent
  ]
})
export class ClientUpdateModule { }
