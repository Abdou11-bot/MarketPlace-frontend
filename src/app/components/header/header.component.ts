import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../../services/localStorage.service';
import { SessionStorageService } from '../../services/sessionStorage.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import{ProductService} from '../../services/product.service';
import{ProviderModel} from '../../models/provider.model';
import{ProductModel} from '../../models/product.model';
import{SpecialityModel} from '../../models/speciality.model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  researchFlag=true;
  researchParams = { 'product': '', 'provider' : '' , 'speciality': ''}
  collection = { count: 0, specialities: Array<SpecialityModel> () };
  constructor(private ProductService: ProductService, private StorageService: LocalStorageService, private router:Router) { }

  ngOnInit(): void {
    this.ProductService.getAllSpecialities().then(response => {
      for (const resp of response) {
        this.collection.specialities.push(new SpecialityModel(resp));
      }
    });
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
//    let result:string ='<div><form ><div> <label for="product">Produit: </label><input type="text" class="form-control" id="product" placeholder="" #product="ngModel"><label for="provider">Fournisseur: </label><input type="text" class="form-control" id="provider" placeholder="" #provider="ngModel"></div><div><label >Specialitées</label><select> <option value="0" selected>--------</option>';
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
      /*    if(product != ''){
            researchParams.product = Number(product);
          }
          if(provider != '' ){
            researchParams.provider = Number(provider);
          }*/
        }}).then((result) =>  {
          if (result.value) {
//            this.router.navigate(['/produits'],{state:{'speciality': this.researchParams.speciality,'provider':this.researchParams.provider, 'product':this.researchParams.product,'type':'research'}});
//            this.router.navigate(['/produits']).then(() => {window.location.reload(); });
            this.StorageService.storeType('research');
            this.StorageService.storeResearchParams(this.researchParams.speciality,this.researchParams.provider,this.researchParams.product);
            this.router.navigate(['/produits']).then(() => {window.location.reload(); });
          } else if (result.dismiss === Swal.DismissReason.cancel) {
            Swal.fire('Annuler','error')
          }
      })
    }
}
