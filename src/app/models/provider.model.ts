import {SafeUrl} from '@angular/platform-browser';

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
