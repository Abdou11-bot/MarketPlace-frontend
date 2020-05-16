import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {ClientDeleteComponent} from './client-delete.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

const routes = [
  {
    path: 'delete',
    component: ClientDeleteComponent
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
    ClientDeleteComponent
  ]
})
export class ClientDeleteModule { }
