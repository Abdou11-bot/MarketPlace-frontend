import {SafeUrl} from '@angular/platform-browser';
import {ProductModel} from './product.model';
import {MedecinModel} from './medecin.model';

export  class QuotationModel {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  address: string;
  quantity: number;
  postalCode: string;
  tel: string;
  date: string;
  traiter: boolean;
  locality: string;
  product: ProductModel;
  medecin: MedecinModel;
  constructor(obj: any) {
      this.id = obj.id;
      this.firstname = obj.firstname;
      this.lastname = obj.lastname;
      this.email = obj.email;
      this.address = obj.address;
      this.quantity = obj.quantity;
      this.postalCode = obj.postalCode;
      this.tel = obj.tel;
      this.date = obj.date;
      this.traiter = Boolean(obj.traiter);
      this.locality = obj.locality;
      this.product = new ProductModel(obj.product);
      this.medecin = obj.medecin;
  }
}
