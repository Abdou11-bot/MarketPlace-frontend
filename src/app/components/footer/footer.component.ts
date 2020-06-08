import { Component, OnInit } from '@angular/core';
import{ProviderModel} from '../../models/provider.model';
import{ProductService} from '../../services/product.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  Administrator= new ProviderModel({});

  constructor(public ProductService : ProductService,  private router: Router) { }

   ngOnInit(): void {
      this.ProductService.getAdmin().then(response => {
          this.Administrator = new ProviderModel(response);
      });
    }

}
