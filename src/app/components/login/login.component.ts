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
import{ComplaintModel} from '../../models/complaint.model';
import{ComplaintService} from '../../services/complaint.service';

import { LocalStorageService } from '../../services/localStorage.service';
import { SessionStorageService } from '../../services/sessionStorage.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  ConnexionType : string = 'provider';
  MedecinLogin : boolean;
  displayLoginForm : boolean = true;
  displayRegister : boolean = false;
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
  Complaint= new ComplaintModel({'product':{'provider':{},'images': [],'speciality': {}}});
  collection = { Specialities: Array<SpecialityModel> (), selectedSpecialities: Array<SpecialityModel> ()  };
  SpecialitiesSelectedPrice: number;
  constructor(private ProviderService: ProviderService,private router:Router,private StorageService: LocalStorageService,
             public LoginService : LoginService, public ComplaintService : ComplaintService, public ProductService : ProductService) {}
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
  changeDisplayRegister(index:number){
    if(index==2){
      this.displayRegister = true;
    }else{
      this.displayRegister = false;
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

  SpecialityChecked(value:boolean, speciality:SpecialityModel){
    if(value){
      this.SpecialitiesSelectedPrice += speciality.price;
      this.collection.selectedSpecialities.push(speciality)
    }else{
      this.SpecialitiesSelectedPrice -= speciality.price;
      let specialitiesTemp = [];
      for(let specialityTemp of this.collection.selectedSpecialities){
        if(speciality.id != specialityTemp.id)
          specialitiesTemp.push(specialityTemp);
      }
      this.collection.selectedSpecialities = specialitiesTemp;
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
    this.MedecinLogin = value;
    if(value)
      this.ConnexionType = 'admin';
    else
      this.ConnexionType = 'provider';
  }

  public SocietyRepChanged(value:boolean){
      this.SocietyRepVerification = value;
  }

  public onFormSubmited(value:boolean){
    this.verificationLogin = value;
  }
  onSubmit(event: any){
     if(this.LoginData.password.trim()===''){
      this.openFailedModal('Erreur','Verifier le password');
      this.verificationLogin = false;
    }else{
      if(this.MedecinLogin){
        let medecin = this.LoginService.loginMedecin(this.LoginData.Email,this.LoginData.password);
        if(medecin!=null){
          this.verificationLogin = true;
          this.StorageService.storeUserOnStorage('medecin');
          this.StorageService.storeMedecin(this.LoginData.Email);
          this.router.navigate(['/medecin/home']).then(() => { window.location.reload();});
        }else{
          this.verificationLogin = false;
          this.openFailedModal('Echec','Veuillez reessayer');
        }
      }else{
        const Data = new FormData();
        Data.append('login', this.LoginData.Email);
        Data.append('password', this.LoginData.password);
        this.LoginService.login(Data).then(response => {
          if(Number(response) != -1){
            this.StorageService.storeUserOnStorage(this.LoginData.Email);
            this.verificationLogin = true;
            if(Number(response) == 1){
              this.StorageService.storeUserOnStorage('admin');
              this.StorageService.storeAdminLogin('admin');
              this.router.navigate(['/admin/home']).then(() => { window.location.reload();});
            }else{
              this.StorageService.storeUserOnStorage('provider');
              this.StorageService.storeProviderLogin(this.LoginData.Email);
              this.router.navigate(['/provider/home']).then(() => { window.location.reload();});
            }
          }else{
            this.openFailedModal('Erreur','Reessayer');
            this.verificationLogin = false;
          }
        });
      }
    }
  }

  onSubmitRegister(event: any){
    this.LoginService.register(this.RegisterData.email,JSON.stringify(this.RegisterData),JSON.stringify(this.SocietyData),this.collection.selectedSpecialities).then(async response => {
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
  alert(JSON.stringify(this.MedecinData));
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
    if(this.RegisterData.password==this.ConfirmPassword){
      this.verificationPassword = true;
    }else{
      this.verificationPassword = false;
    }
  }
  MedecinComfirmPassword(){
    if(this.MedecinData.password==this.ConfirmPassword){
      this.verificationPassword = true;
    }else{
      this.verificationPassword = false;
    }
  }
  ForgetPaswordModal(){
    Swal.fire({
        title: ``,
        html: `
            <form  #ComplaintFormAdd="ngForm">
              <div class="modal-body">
                <div class="single-contact-form form-group" >
                  <div class="contact-box">
                    <input type="email" [(ngModel)]="Complaint.email"
                      class="form-control form-input-size"
                      style=" height:25%; font-size:25px;"
                      id="emailAdd"
                      name="emailAdd"
                      placeholder="Entrer votre email"
                      required #emailAdd="ngModel">
                  </div>
                </div>
              </div>
            </form>
            `,
        showCancelButton: true,
        confirmButtonText: 'Envoyé',
        width: '60%',
        cancelButtonText: 'Annuler',
        preConfirm: async () => {
          let email = ((<HTMLInputElement>document.getElementById('emailAdd')).value.trim());
          this.Complaint.name = 'Mot de passe oublié';
          this.Complaint.objet = 'Mot de passe oublié';
          if(email == "" ){
            await this.openFailedModal('Erreur...', 'Vérifier l\'email ');
            this.ForgetPaswordModal();
            return false;
          }
          this.Complaint.email = email;
          this.Complaint.message = 'Mot de passe oublié';
      }}).then((result) =>  {
        if (result.value) {
            this.onSubmitForgetPasword();
        } else if (result.dismiss === Swal.DismissReason.cancel) {
            Swal.fire(
              'Annuler',
        )
      }
    })
  }
  onSubmitForgetPasword(){
    const Data = new FormData();
    Data.append('message', this.Complaint.message);
    Data.append('objet', this.Complaint.objet);
    Data.append('email', this.Complaint.email);
    Data.append('name', this.Complaint.name);
    this.ComplaintService.contactUs(Data).then(response => {
      if(response!=null){
        this.openSuccessModal('Réussi!');
      }else{
        this.openFailedModal('Erreur', 'Réessayer');
      }
    });
  }
  ProvidersExists(){
    this.ProviderService.providersExists(this.RegisterData.email).then(response => {
      if(response){
        this.openFailedModal('Erreur', 'Il exist deja un compte pour cet email');
        this.RegisterData.email='';
      }
    });
  }
  MedecinExists(){
    this.ProviderService.medecinExists(this.MedecinData.email).then(response => {
      if(response){
        this.openFailedModal('Erreur', 'Il exist deja un compte pour cet email');
        this.MedecinData.email='';
      }
    });
  }
}
