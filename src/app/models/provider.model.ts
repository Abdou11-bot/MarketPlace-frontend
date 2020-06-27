import {SafeUrl} from '@angular/platform-browser';
import {SocietyModel} from './society.model';
import {SpecialityModel} from './speciality.model';

export  class ProviderModel {
  id: number;
  lastname: string;
  firstname: string;
  admin: boolean;
  email: string;
  password: string;
  date: string;
  tel: string;
  status: number;
  type: boolean;
  society: SocietyModel;
  specialities:Array<SpecialityModel>;
  constructor(obj: any) {
      this.id = obj.id;
      this.date = obj.date;
      this.lastname = obj.lastname;
      this.firstname = obj.firstname;
      this.admin = obj.admin;
      this.email = obj.email;
      this.password = obj.password;
      this.tel = obj.tel;
      this.status = obj.status;
      this.type = obj.type;
      this.society= new SocietyModel(obj.society);
      if(obj.specialities != undefined &&obj.specialities != null ){
        this.specialities= Array<SpecialityModel> ();
        for(let speciality of obj.specialities){
          this.specialities.push(new SpecialityModel(speciality));
        }
      }
  }
}
