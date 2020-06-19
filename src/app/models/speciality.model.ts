import {SafeUrl} from '@angular/platform-browser';

export  class SpecialityModel {
  id: number;
  name: string;
  image: string;
  price: number;
  constructor(obj: any) {
    if(obj != null){
      this.id = obj.id;
      this.name = obj.name;
      this.image = obj.image;
      this.price = obj.priceSpeciality;
    }
  }
  ListOfSpecialities(objs: Array<any>):Array<SpecialityModel> {
    let specialities = Array<SpecialityModel> ();
    for(let obj of objs){
      specialities.push(new SpecialityModel(obj));
    }
    return specialities;
  }
}
