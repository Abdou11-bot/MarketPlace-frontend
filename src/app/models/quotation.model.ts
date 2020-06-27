import {SafeUrl} from '@angular/platform-browser';
import {ProductModel} from './product.model';

export  class QuotationModel {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  address: string;
  quantity: number;
  postalCode: string;
  date: string;
  traiter: boolean;
  locality: string;
  product: ProductModel;
  constructor(obj: any) {
      this.id = obj.id;
      this.firstname = obj.firstname;
      this.lastname = obj.lastname;
      this.email = obj.email;
      this.address = obj.address;
      this.quantity = obj.quantity;
      this.postalCode = obj.postalCode;
      this.date = obj.date;
      this.traiter = Boolean(obj.traiter);
      this.locality = obj.locality;
      this.product = new ProductModel(obj.product);
  }
}
