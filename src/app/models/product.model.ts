import {SafeUrl} from '@angular/platform-browser';
import {ProviderModel} from './provider.model';
import {SpecialityModel} from './speciality.model';
import {ImageModel} from './image.model';

export  class ProductModel {
  id: number;
  name: string;
  description: string;
  catalogue: string;
  reference: string;
  nombreVue: number;
  marque: string;
  blocked: boolean;
  provider: ProviderModel;
  images: Array<ImageModel>;
  speciality: SpecialityModel;
  constructor(obj: any) {
    if(obj != null){
      this.id = obj.id;
      this.name = obj.name;
      this.description = obj.description;
      this.catalogue = obj.catalogue;
      this.reference = obj.reference;
      this.nombreVue = obj.nombreVue;
      this.marque = obj.marque;
      this.blocked = obj.blocked;
      this.provider = new ProviderModel(obj.provider);
      this.speciality = new SpecialityModel(obj.speciality);
      this.images = obj.images;
    }
  }
}
