import {SafeUrl} from '@angular/platform-browser';

export  class SpecialityModel {
  id: number;
  name: string;
  image: string;
  price: number;
  constructor(obj: any) {
      this.id = obj.id;
      this.name = obj.name;
      this.image = obj.image;
      this.price = obj.priceSpeciality;
  }
}
