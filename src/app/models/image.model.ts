import {SafeUrl} from '@angular/platform-browser';

export  class ImageModel {
  id: number;
  name: string;
  path: string;
  constructor(obj: any) {
      this.id = obj.id;
      this.name = obj.name;
      this.path = obj.path;
  }
  public convertMultiImages(objs : Array<any>) {
      let images = Array<ImageModel> ();
      for (const obj of objs) {
        images.push(new ImageModel(obj));
      }
      return images;
  }
}
