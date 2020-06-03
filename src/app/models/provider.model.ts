import {SafeUrl} from '@angular/platform-browser';
import {SocietyModel} from './society.model';

export  class ProviderModel {
  id: number;
  lastname: string;
  firstname: string;
  admin: boolean;
  email: string;
  password: string;
  tel: string;
  status: number;
  type: boolean;
  society: SocietyModel;
  constructor(obj: any) {
      this.id = obj.id;
      this.lastname = obj.lastname;
      this.firstname = obj.firstname;
      this.admin = obj.admin;
      this.email = obj.email;
      this.password = obj.password;
      this.tel = obj.tel;
      this.status = obj.status;
      this.type = obj.type;
  }
}
