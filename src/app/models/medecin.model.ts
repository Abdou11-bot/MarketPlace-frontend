import {SafeUrl} from '@angular/platform-browser';
import {SpecialityModel} from './speciality.model';

export  class MedecinModel {
  id: number;
  lastname: string;
  firstname: string;
  admin: boolean;
  email: string;
  password: string;
  tel: string;
  speciality: SpecialityModel;
  constructor(obj: any) {
      this.id = obj.id;
      this.lastname = obj.nom;
      this.firstname = obj.prenom;
      this.admin = obj.admin;
      this.email = obj.email;
      this.password = obj.password;
      this.tel = obj.tel;
      this.speciality = new SpecialityModel(obj.speciality);
  }
}
