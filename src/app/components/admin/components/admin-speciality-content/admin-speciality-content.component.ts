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
import{SpecialityModel} from '../../../../models/speciality.model';
import {environment} from '../../../../../environments/environment';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-admin-speciality-content',
  templateUrl: './admin-speciality-content.component.html',
  styleUrls: ['./admin-speciality-content.component.css']

})
export class AdminSpecialityContentComponent implements OnInit , OnDestroy {
  collection = { specialities: Array<SpecialityModel> ()};
  config: any;
  public selectedImage;
  SpecialityAdd =  new SpecialityModel({});
  SpecialityUpdate =  new SpecialityModel({});
  constructor(private StorageService: LocalStorageService, private router: Router, public sanitizer: DomSanitizer, private ProviderService: ProviderService) {  }
  ngOnDestroy(){
  }

 sane(imagrSrc: any) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(environment.SERVER_RESOURCE_URL+imagrSrc);
  }
  ngOnInit(): void {
    this.ProviderService.getAllSpecialities().then(response => {
        for(let resp of response){
          this.collection.specialities.push(new SpecialityModel(resp));
        }
    });
    this.config = {
      itemsPerPage: 5,
      currentPage: 1,
      totalItems: this.collection.specialities.length
    };
  }
  pageChanged(event) {
    this.config.currentPage = event;
  }
  customSort(filter:number){
    if(filter==1)
      this.collection.specialities.sort((a,b) => a.name.localeCompare(b.name));
  }
  reverseCustomSort(filter:number){
    if(filter==1){
      this.customSort(1);
      this.collection.specialities.reverse();
    }
  }
  updateSpeciality(ind: number){
  }
  deleteSpeciality(ind: number){
  }
  addSpeciality(){
     Swal.fire({
        title: `Ajouter Specialité`,
        html: `
          <div >
              <form  style=" margin: 3%; width: 90%; font-size: 25px; height: 30px">
                <div class="">
                  <div class="form-group">
                    <input type="text"
                           class="form-control form-input-size norme"
                           id="nameAdd"
                           name="nameAdd"
                           placeholder="Entrer le  nom"
                           required >
                  </div>
                  <div class="form-group">
                    <input type="number"
                           class="form-control form-input-size norme"
                           id="priceAdd"
                           name="priceAdd"
                           placeholder="Entrer le prix"
                           required >
                  </div>
                  <div class="form-group">
                    <label for="imagesAdd" style="float: left">Image</label>
                    <input type="file"
                           class="form-control form-input-size norme"
                           id="imageAdd"
                           name="imageAdd"
                           placeholder="Choisissez une image "
                           accept="image/*"
                           required>
                  </div>
                </div>
              </form>
          </div>
        `,
        showCancelButton: true,
        position: 'top',
        showClass: {popup: 'animate__animated animate__fadeInDown'},
        hideClass: {popup: 'animate__animated animate__fadeOutUp'},
        showCloseButton: true,
        width: '75%',
        confirmButtonText:'Ajouter',
        cancelButtonText:'Annuler',
        preConfirm: async () => {
          let priceAdd = ((<HTMLInputElement>document.getElementById('priceAdd')).value.trim());
          let nameAdd = ((<HTMLInputElement>document.getElementById('nameAdd')).value.trim());
          let imageAdd = (<HTMLInputElement>document.getElementById('imageAdd')).files[0];
          if(((Number(priceAdd) <=0) ||(nameAdd == '')) ){
             this.openFailedModal('Erreur','Verifier les données');
             return;
          }
          this.SpecialityAdd.priceSpeciality = Number(priceAdd);
          this.SpecialityAdd.name = nameAdd;
          this.selectedImage = imageAdd;
        }}).then((result) =>  {
          if (result.value) {
            const Data = new FormData();
            Data.append('speciality', JSON.stringify(this.SpecialityAdd));
            Data.append('image', this.selectedImage);
            this.ProviderService.addSpeciality(Data).then(response => {
              if(response != null){
                this.collection.specialities.push(new SpecialityModel(response));
                this.openSuccessModal('Specialitée Ajouté');
              }else{
                this.openFailedModal('Erreur','Operation Echoué');
              }
            });
          } else if (result.dismiss === Swal.DismissReason.cancel) {
            Swal.fire('error','Annuler')
          }
      })
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

