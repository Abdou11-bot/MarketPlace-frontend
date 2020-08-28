import { Component, OnInit, OnChanges} from '@angular/core';
//import { Component, OnInit, OnChanges, DoCheck} from '@angular/core';
import { LocalStorageService } from '../../services/localStorage.service';
import { SessionStorageService } from '../../services/sessionStorage.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import{ProductService} from '../../services/product.service';
import{ProviderService} from '../../services/provider.service';
import{ProviderModel} from '../../models/provider.model';
import{ProductModel} from '../../models/product.model';
import{SpecialityModel} from '../../models/speciality.model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnChanges {

  researchFlag=true;
  providerLogged=false;
  loginFlag=false;
  login;
  adminLogged=false;
  medecinLogged=false;
  researchParams = { 'product': '', 'provider' : '' , 'speciality': ''}
  collection = { count: 0, specialities: Array<SpecialityModel> () };
  constructor(private ProductService: ProductService, private ProviderService: ProviderService, private StorageService: LocalStorageService, private router:Router) { }

  displayUser(){
    let adminLoggedResponse = this.StorageService.getAdminLogin();
    if(adminLoggedResponse.trim() == 'admin'){
      this.adminLogged = true;
      this.providerLogged = false;
      this.medecinLogged = false;
    }else{
      this.adminLogged = false;
    }
    let providerLoggedResponse = this.StorageService.getProviderLogin();
    if(providerLoggedResponse.trim() == ''){
      this.providerLogged = false;
    }else{
      this.providerLogged = true;
      this.login = this.StorageService.getProviderLogin();
      this.adminLogged = false;
      this.medecinLogged = false;
    }
    let medecinLoggedResponse = this.StorageService.getMedecin();
    if(medecinLoggedResponse.trim() == ''){
      this.medecinLogged = false;
    }else{
      this.medecinLogged = true;
      this.login = this.StorageService.getMedecin();
      this.adminLogged = false;
      this.providerLogged = false;
    }
    this.loginFlag = this.loginIsHidden();
  }
  ngOnChanges(){
    this.displayUser();
  }
  ngOnInit(): void {
    this.displayUser();
  }

  loginIsHidden(){
    if(this.adminLogged || this.providerLogged || this.medecinLogged){
      return true;
    }
    return false;
  }
  openSuccessModal(message)
  {
    Swal.fire({text: message,icon: 'success'});
  }
  openFailedModal(error,message)
  {
    Swal.fire(error, message, 'error')
  }


  displayMenu() {
    let element = document.getElementById("dropdown-content");
    if (element.style.display === "block") {
      element.style.display = "none";
    } else {
      element.style.display = "block";
    }
  }

  getSpecialitiesString(){
    let result:string ='<div><form ><div><input type="text" class="form-control" id="product" placeholder="Recherche produit" #product="ngModel" style="align: center; margin: 3%; width: 90%;height:50px; font-size: 25px;"><input type="text" class="form-control " id="provider" placeholder="Recherche fournisseur" #provider="ngModel" style="align: center; margin: 3%; width: 90%;height:50px; font-size: 25px;"></div><select id="speciality" class="form-control " style="align: center; margin: 3%; width: 90%; height:50px;font-size: 25px;"> <option value="0" selected>Selectionner la specialité</option>';
    for(const speciality of this.collection.specialities){
      result+='<option value="'+speciality.id+'"> '+speciality.name+'</option>';
    }
    result+='</select></div></form></div>';
    return result;
  }

 openResearchModal(){
     Swal.fire({
        title: `Recherche`,
        html: this.getSpecialitiesString(),
        showCancelButton: true,
        position: 'top',
        showClass: {popup: 'animate__animated animate__fadeInDown'},
        hideClass: {popup: 'animate__animated animate__fadeOutUp'},
        showCloseButton: true,
        width: '50%',
        confirmButtonText:
            '<i class="ti-search"></i>',
        cancelButtonText:'<i class="glyphicon glyphicon-remove"></i>',
        preConfirm: async () => {
          let product = ((<HTMLInputElement>document.getElementById('product')).value.trim());
          let provider = ((<HTMLInputElement>document.getElementById('provider')).value.trim());
          let speciality = ((<HTMLInputElement>document.getElementById('speciality')).value.trim());
          if(speciality == '0' && product == '' && provider ==''){
            await this.openFailedModal('Erreur...', 'Aucun parametre ');
            return false;
          }
          this.researchParams.product = product;
          this.researchParams.provider = provider;
          this.researchParams.speciality = speciality;
        }}).then((result) =>  {
          if (result.value) {
            this.StorageService.storeType('research');
            this.StorageService.storeResearchParams(this.researchParams.speciality,this.researchParams.provider,this.researchParams.product);
            this.router.navigate(['/produits',0]);
          } else if (result.dismiss === Swal.DismissReason.cancel) {
            Swal.fire('Annuler','error')
          }
      })
    }

  logoutAdmin(){
    this.StorageService.storeAdminSpace('ClientSpace');
    this.StorageService.storeUserOnStorage('client');
    this.StorageService.storeAdminLogin('');
    this.router.navigate(['/home']).then(() => { window.location.reload();});
  }
  logoutProvider(){
    this.StorageService.storeAdminSpace('ClientSpace');
    this.StorageService.storeUserOnStorage('client');
    this.StorageService.storeProviderLogin('');
    this.router.navigate(['/home']).then(() => { window.location.reload();});
  }
  logoutMedecin(){
    this.StorageService.storeAdminSpace('ClientSpace');
    this.StorageService.storeUserOnStorage('client');
    this.StorageService.storeMedecin('');
    this.router.navigate(['/home']).then(() => { window.location.reload();});
  }
}
