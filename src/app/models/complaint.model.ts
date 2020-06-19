import {SafeUrl} from '@angular/platform-browser';
import {ProductModel} from './product.model';

export  class ComplaintModel {
  id: number;
  objet: string;
  name: string;
  message: string;
  email: string;
  product: ProductModel;
  vue: boolean;
  constructor(obj: any) {
      this.id = obj.id;
      this.name = obj.name;
      this.objet = obj.objet;
      this.message = obj.message;
      this.email = obj.email;
      this.vue = obj.vue;
      this.product = new ProductModel(obj.product);
  }
}
