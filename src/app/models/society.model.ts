import {SafeUrl} from '@angular/platform-browser';

export  class SocietyModel {
  id: number;
  name: string;
  tel: string;
  email: string;
  constructor(obj: any) {
    if(obj != null){
      this.id = obj.id;
      this.name = obj.name;
      this.tel = obj.numero_tel;
      this.email = obj.email;
    }
  }
}
