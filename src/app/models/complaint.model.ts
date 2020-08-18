import {SafeUrl} from '@angular/platform-browser';
import {ProductModel} from './product.model';
import {MedecinModel} from './medecin.model';

export  class ComplaintModel {
  id: number;
  type: number;
  objet: string;
  name: string;
  message: string;
  date: string;
  email: string;
  product: ProductModel;
  vue: boolean;
  medecin: MedecinModel;
  constructor(obj: any) {
      this.id = obj.id;
      this.type = obj.type;
      this.name = obj.name;
      this.objet = obj.objet;
      this.message = obj.message;
      this.email = obj.email;
      this.date = obj.date;
      this.vue = obj.vue;
      this.product = new ProductModel(obj.product);
      this.medecin = obj.medecin;
  }
}
