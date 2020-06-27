import { Component, OnInit } from '@angular/core';
import{LoginService} from '../../services/login.service';
import{ProviderService} from '../../services/provider.service';
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
import{MedecinModel} from '../../models/medecin.model';
import Swal from 'sweetalert2/dist/sweetalert2.js';

import { LocalStorageService } from '../../services/localStorage.service';
import { SessionStorageService } from '../../services/sessionStorage.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  ConnexionType : string = 'provider';
  AdminVerification : boolean;
  displayLoginForm : boolean = true;
  SocietyRepVerification : boolean = false;
  verificationLogin : boolean = true;
  verificationRegister : boolean = true;
  verificationPassword : boolean = true;
  ConfirmPassword='';
  MedecinSpecilality;
  LoginData = {Email:'',password:''};
  RegisterData = new ProviderModel({});
  MedecinData = new MedecinModel({});
  SocietyData = new SocietyModel({});
  collection = { Specialities: Array<SpecialityModel> () };
  SpecialitiesSelectedPrice: number;
  constructor(private ProviderService: ProviderService,private router:Router,public LoginService : LoginService, public ProductService : ProductService,private StorageService: LocalStorageService) {}
  ngOnInit(): void {
    this.StorageService.storeAdminSpace('ClientSpace');
    this.ProviderService.getAllSpecialities().then(response => {
        for (const resp of response) {
          this.collection.Specialities.push(new SpecialityModel(resp));
        }
    });
    this.SpecialitiesSelectedPrice = 0;
  }

  changeDisplayForm(index:number){
    if(index==1){
      this.displayLoginForm = true;
    }else{
      this.displayLoginForm = false;
    }
  }
  openSuccessModal(message)
  {
    Swal.fire({text: message,icon: 'success'});
  }
  openFailedModal(error,message)
  {
    Swal.fire(error, message, 'error')
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
      this.openFailedModal('Erreur','Verifier le password');
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
          this.openSuccessModal('Bienvenue');
          this.verificationLogin = true;
          if(this.AdminVerification){
            this.StorageService.storeUserOnStorage('admin');
            this.router.navigate(['/admin/home']);
          }else{
            this.StorageService.storeUserOnStorage('provider');
            this.StorageService.storeProviderLogin(this.LoginData.Email);
            this.router.navigate(['/provider/home']);
          }
        }else{
          this.openFailedModal('Erreur','Reessayer');
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
    this.LoginService.register(JSON.stringify(this.RegisterData),JSON.stringify(this.SocietyData),this.collection).then(async response => {
      if(response!=null){
        this.verificationRegister = true;
        await this.openSuccessModal('Reussi');
        this.router.navigate(['/home']);
      }else{
        this.verificationRegister = false;
        this.openFailedModal('Erreur','Reessayer');
      }
    });
  }

  onSubmitMedecin(event: any){
    this.LoginService.registerMedecin(JSON.stringify(this.MedecinData),this.MedecinSpecilality).then(async response => {
      if(response!=null){
        this.verificationRegister = true;
        await this.openSuccessModal('Reussi');
        this.router.navigate(['/home']);
      }else{
        this.verificationRegister = false;
        this.openFailedModal('Erreur','Reessayer');
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
  MedecinComfirmPassword(){
  //alert(this.RegisterData.password);
  //alert(this.ConfirmPassword);
  //alert(this.RegisterData.password===this.ConfirmPassword);
    if(this.MedecinData.password==this.ConfirmPassword){
      this.verificationPassword = true;
    }else{
      this.verificationPassword = false;
    }
  }
}
