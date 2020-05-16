import { Component, OnInit } from '@angular/core';
import{LoginService} from '../../services/login.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {EventEmitter, Input, Output, TemplateRef, ViewEncapsulation} from '@angular/core';
import {Router} from '@angular/router';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {DomSanitizer} from '@angular/platform-browser';
import {MatDialog} from '@angular/material/dialog';
import{ProviderModel} from '../../models/provider.model';
import{SpecialityModel} from '../../models/speciality.model';
import{ProductService} from '../../services/product.service';
import{SocietyModel} from '../../models/society.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  ConnexionType : string = 'provider';
  AdminVerification : boolean;
  SocietyRepVerification : boolean = false;
  verificationLogin : boolean = true;
  verificationPassword : boolean = true;
  ConfirmPassword='';
  LoginData = {Email:'',password:''};
  RegisterData = new ProviderModel({});
  SocietyData = new SocietyModel({});
  collection = { Specialities: Array<SpecialityModel> () };
  SpecialitiesSelectedPrice: number;
  constructor(public LoginService : LoginService, public ProductService : ProductService) {}
  ngOnInit(): void {
    this.ProductService.getAllSpecialities().then(response => {
        for (const resp of response) {
          this.collection.Specialities.push(new SpecialityModel(resp));
        }
    });
    this.SpecialitiesSelectedPrice = 0;
  }


  SpecialityChecked(value:boolean, id:number){
    if(value){
      this.SpecialitiesSelectedPrice+=this.getSpecialityPrice(id);
    }else{
      this.SpecialitiesSelectedPrice-=this.getSpecialityPrice(id);
    }
  }
  getSpecialityPrice(id:number): number{
    for(let i=0;i<this.collection.Specialities.length;i++){
      if(this.collection.Specialities[i].id==id){
        return this.collection.Specialities[i].price;
      }
    }
    return 0;
  }
  public onConnexionTypeChanged(value:boolean){
    this.AdminVerification = value;
    if(value)
      this.ConnexionType = 'admin';
    else
      this.ConnexionType = 'provider';
  }

  public SocietyRepChanged(value:boolean){
      this.SocietyRepVerification = value;
  //    if(value)
   //     this.ConnexionType = 'admin';
   //   else
   //     this.ConnexionType = 'provider';
  }

  public onFormSubmited(value:boolean){
    this.verificationLogin = value;
  }
  onSubmit(event: any){
//    alert(event.target.login.value);
//    alert(event.target.password.value);
    if(this.LoginData.password.trim()===''){
      alert("Echec");
      this.verificationLogin = false;
    }else{
      const Data = new FormData();
      if(this.AdminVerification){
        Data.append('login', 'admin');
      }else{
        Data.append('login', this.LoginData.Email);
      }
      Data.append('password', this.LoginData.password);
      this.LoginService.login(Data,this.ConnexionType).then(response => {
        if(response){
          alert("OK");
          this.verificationLogin = true;
        }else{
          alert("Echec");
          this.verificationLogin = false;
        }
      });
    }
  }

  onSubmitRegister(event: any){
    //    alert(JSON.stringify(this.product));
  /*  const Data = new FormData();
    Data.append('data', JSON.stringify(this.RegisterData));
    Data.append('society', JSON.stringify(this.SocietyData));
    for(let i=0; i<this.collection.Specialities.length;i++){
      Data.append('specialities', JSON.stringify(this.collection.Specialities[i]));
    }
    */
    this.LoginService.register(JSON.stringify(this.RegisterData),JSON.stringify(this.SocietyData),this.collection).then(response => {
      if(response!=null){
        alert("OK");
      }else{
        alert("Echec");
      }
    });
  }

  ProviderComfirmPassword(){
  //alert(this.RegisterData.password);
  //alert(this.ConfirmPassword);
  //alert(this.RegisterData.password===this.ConfirmPassword);
    if(this.RegisterData.password==this.ConfirmPassword){
      this.verificationPassword = true;
    }else{
      this.verificationPassword = false;
    }
  }
}
