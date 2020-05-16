import { Component } from '@angular/core';
import{Meta} from '@angular/platform-browser';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'siteecommerce';
  constructor(
    private meta : Meta
  ) {
    meta.addTag({name :'viewport', content :'width=device-width, initial-scale=1'},true);
    meta.addTag({name :'description', content :''},true);
    meta.addTag({name :'description', content :''},true);
  }

}
