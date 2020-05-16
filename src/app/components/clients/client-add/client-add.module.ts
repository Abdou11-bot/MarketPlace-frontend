import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {ClientAddComponent} from './client-add.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

const routes = [
  {
    path: 'add',
    component: ClientAddComponent
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
    ClientAddComponent
  ]
})
export class ClientAddModule { }
