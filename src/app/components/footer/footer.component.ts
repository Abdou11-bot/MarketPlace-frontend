import { Component, OnInit, OnChanges, DoCheck} from '@angular/core';
import{ProviderModel} from '../../models/provider.model';
import{ProviderService} from '../../services/provider.service';
import {Router} from '@angular/router';
import { LocalStorageService } from '../../services/localStorage.service';
import { SessionStorageService } from '../../services/sessionStorage.service';
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit, OnChanges, DoCheck {
  Administrator= new ProviderModel({'society':{},'specilities':[{}]});
  AdminSpace=false;

  constructor(private ProviderService: ProviderService,  private router: Router, private StorageService: LocalStorageService) { }

  ngOnChanges(){
    let AdminSpaceResponse = this.StorageService.getAdminSpace();
    if(AdminSpaceResponse.trim() == 'AdminSpace'){
      this.AdminSpace = true;
    }else{
      this.AdminSpace = false;
    }
  }

  ngDoCheck(){
    let AdminSpaceResponse = this.StorageService.getAdminSpace();
    if(AdminSpaceResponse.trim() == 'AdminSpace'){
      this.AdminSpace = true;
    }else{
      this.AdminSpace = false;
    }
  }
  ngOnInit(): void {
    let AdminSpaceResponse = this.StorageService.getAdminSpace();
    if(AdminSpaceResponse.trim() == 'AdminSpace'){
      this.AdminSpace = true;
    }else{
      this.AdminSpace = false;
    }
    this
      this.ProviderService.getAdmin().then(response => {
          this.Administrator = new ProviderModel(response);
      });
    }

}
