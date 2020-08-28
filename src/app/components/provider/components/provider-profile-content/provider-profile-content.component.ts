import { Component, OnInit , OnDestroy} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {EventEmitter, Input, Output, TemplateRef, ViewEncapsulation} from '@angular/core';
import {Router} from '@angular/router';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {DomSanitizer} from '@angular/platform-browser';
import {MatDialog} from '@angular/material/dialog';
import { LocalStorageService } from '../../../../services/localStorage.service';
import { SessionStorageService } from '../../../../services/sessionStorage.service';
import{ProviderService} from '../../../../services/provider.service';
import{ProviderModel} from '../../../../models/provider.model';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import{SpecialityModel} from '../../../../models/speciality.model';
import{SocietyModel} from '../../../../models/society.model';

@Component({
  selector: 'app-provider-profile-content',
  templateUrl: './provider-profile-content.component.html',
  styleUrls: ['./provider-profile-content.component.css']

})
export class ProviderProfileContentComponent implements OnInit , OnDestroy {
  provider: ProviderModel;
  updateFlag= false;
  SpecialitiesSelectedPrice = 0;
  societyData = new SocietyModel({});
  collection = { specialities: Array<SpecialityModel> () , ownedSpecialities: Array<SpecialityModel> (), selectedSpecialities: Array<SpecialityModel> () };
  constructor(private StorageService: LocalStorageService, private router: Router, public sanitizer: DomSanitizer,private ProviderService: ProviderService) {  }
  ngOnDestroy(){
  }

  ngOnInit(): void {
    this.ProviderService.getAllSpecialities().then(response => {
      for(let resp of response){
        this.collection.specialities.push( new SpecialityModel(resp));
      }
    });
    this.ProviderService.getProfil(this.StorageService.getProviderLogin()).then(response => {
      if(response!=null){
        this.provider = new ProviderModel(response);
        this.societyData = this.provider.society;
        for(let speciality of this.provider.specialities){
          this.collection.ownedSpecialities.push( speciality);
          this.SpecialitiesSelectedPrice += speciality.priceSpeciality ;
          this.collection.selectedSpecialities = this.collection.ownedSpecialities;
        }
      }
    });
  }

  changeUpdateFlag(val: boolean){
    this.updateFlag = val;
  }
  updateProfile(){
    const Data = new FormData();
    Data.append('provider', JSON.stringify(this.provider));
    Data.append('society', JSON.stringify(this.societyData));
    for(let i=0; i<this.collection.selectedSpecialities.length;i++){
      Data.append('specialities', JSON.stringify(this.collection.selectedSpecialities[i]));
    }
    this.ProviderService.updateProfil(Data,this.StorageService.getProviderLogin()).then(response => {
      if(response != null){
        this.provider = new ProviderModel(response);
        this.StorageService.storeProviderLogin(this.provider.email);
        this.societyData = this.provider.society;
        this.SpecialitiesSelectedPrice = 0;
        this.collection.ownedSpecialities = [];
        for(let speciality of this.provider.specialities){
          this.collection.ownedSpecialities.push( speciality);
          this.SpecialitiesSelectedPrice += speciality.priceSpeciality ;
          this.collection.selectedSpecialities = this.collection.ownedSpecialities;
        }
        this.openSuccessModal('Fournisseur Modifié');
        this.updateFlag = false;
      }else{
        this.openFailedModal('Operation Echouée','Erreur');
      }
    });
  }
  specialityExists(id:number){
    for(let speciality of this.collection.ownedSpecialities){
      if(speciality.id == id){
        return true;
      }
    }
    return false;
  }
  SpecialityChecked(value:boolean, speciality:SpecialityModel){
    if(value){
      this.SpecialitiesSelectedPrice += speciality.priceSpeciality ;
      this.collection.selectedSpecialities.push(speciality)
    }else{
      this.SpecialitiesSelectedPrice -= speciality.priceSpeciality ;
      let specialitiesTemp = [];
      for(let specialityTemp of this.collection.selectedSpecialities){
        if(speciality.id != specialityTemp.id)
          specialitiesTemp.push(specialityTemp);
      }
      this.collection.selectedSpecialities = specialitiesTemp;
    }
  }
  getDate(chaine:string): string{
    let dateArray = chaine.split('T');
    return dateArray[0];
  }
  getHour(chaine:string): string{
    let dateArray = chaine.split('T');
    let hourArray = dateArray[1].split('.');
    return hourArray[0];
  }
  openSuccessModal(message)
  {
    Swal.fire({text: message,icon: 'success'});
  }
  openFailedModal(error,message)
  {
    Swal.fire(error, message, 'error')
  }
}

