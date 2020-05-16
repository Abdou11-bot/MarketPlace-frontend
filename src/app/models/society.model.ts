import {SafeUrl} from '@angular/platform-browser';
import {ProviderModel} from './provider.model';

export  class SocietyModel {
  id: number;
  name: string;
  tel: string;
  email: string;
  constructor(obj: any) {
      this.id = obj.id;
      this.name = obj.name;
      this.tel = obj.numero_tel;
      this.email = obj.email;
  }
}
