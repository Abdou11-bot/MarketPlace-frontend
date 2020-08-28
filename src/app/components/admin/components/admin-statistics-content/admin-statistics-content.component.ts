import { Component, OnInit , OnDestroy} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {EventEmitter, Input, Output, TemplateRef, ViewEncapsulation} from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {DomSanitizer} from '@angular/platform-browser';
import {MatDialog} from '@angular/material/dialog';
import { LocalStorageService } from '../../../../services/localStorage.service';
import { SessionStorageService } from '../../../../services/sessionStorage.service';
import{ProviderService} from '../../../../services/provider.service';
import{ComplaintService} from '../../../../services/complaint.service';
import{ProviderModel} from '../../../../models/provider.model';
import{MedecinModel} from '../../../../models/medecin.model';
import{ComplaintModel} from '../../../../models/complaint.model';
import{SpecialityModel} from '../../../../models/speciality.model';
import{ProductService} from '../../../../services/product.service';
import{ProductModel} from '../../../../models/product.model';
import{QuotationModel} from '../../../../models/quotation.model';
import{QuotationService} from '../../../../services/quotation.service';
import {Chart} from 'chart.js'
@Component({
  selector: 'app-admin-statistics-content',
  templateUrl: './admin-statistics-content.component.html',
  styleUrls: ['./admin-statistics-content.component.css']

})
export class AdminStatisticsContentComponent implements OnInit , OnDestroy {


  public pieChartLabels:string[] = [];
  public pieChartData:number[] = [];
  public pieChartType:string = 'pie';


  collection = { medecins: Array<MedecinModel> (), specialities: Array<SpecialityModel> (), providers : Array<ProviderModel>()};
  subMenuFlag1 = true;
  subMenuFlag2 = false;
  MostSpecialitySubscribedByMedecin;
  MostSpecialitySubscribedByProvider;
  constructor(private StorageService: LocalStorageService, private activatedRoute:ActivatedRoute, private router: Router, public sanitizer: DomSanitizer, private ProviderService: ProviderService) {  }

  ngOnDestroy(){
  }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(){
    this.collection.specialities.length = 0;
    this.collection.providers.length = 0;
    this.collection.medecins.length = 0;
    this.ProviderService.getAllSpecialities().then(response => {
        for(let resp of response){
          this.collection.specialities.push(new SpecialityModel(resp));
        }
    });
    if(this.activatedRoute.snapshot.paramMap.get('type') == 'medecins'){
      this.subMenuFlag1 = true;
      this.subMenuFlag2 = false;
      this.ProviderService.getAllMedecins().then(response => {
          for(let resp of response){
            this.collection.medecins.push(new MedecinModel(resp));
          }
          this.loadMedecinData();
      });
    }else{
      this.subMenuFlag1 = false;
      this.subMenuFlag2 = true;
      this.ProviderService.getAllProviders().then(response => {
          for(let resp of response){
            let provider = new ProviderModel(resp);
            if(provider.admin != true)
              this.collection.providers.push(provider);
          }
          this.loadProviderData();
      });
    }
  }
  getNBMedecins(speciality : SpecialityModel){
    let i=0;
    for(let specialityTemp of this.collection.specialities){
      if(specialityTemp.id == speciality.id)
        i+=1;
    }
    return i;
  }
  getNBProviders(speciality : SpecialityModel){
    let i=0;
    for(let providerTemp of this.collection.providers){
      for(let specialityTemp of providerTemp.specialities){
        if(specialityTemp.id == speciality.id)
          i+=1;
      }
    }
    return i;
  }
  getMostSpecialitySubscribedByMedecin(){
    if(this.collection.medecins.length == 0)
      return new SpecialityModel({});
    let speciality = this.collection.medecins[0].speciality;
    for(let medecin of this.collection.medecins){
      if(this.getNBMedecins(medecin.speciality) < this.getNBMedecins(speciality)){
        speciality = medecin.speciality;
      }
    }
    return speciality;
  }
  getMostSpecialitySubscribedByProvider(){
    if(this.collection.providers.length == 0)
      return new SpecialityModel({});
    let speciality = this.collection.providers[0].specialities[0];
    for(let provider of this.collection.providers){
      for(let specialityTemp of provider.specialities){
        if(this.getNBProviders(speciality) < this.getNBProviders(specialityTemp)){
          speciality = specialityTemp;
        }
      }
    }
    return speciality;
  }
  loadMedecinData(){
    this.pieChartType='pie';
    this.pieChartLabels = [];
    this.pieChartData =[];
    for(let medecin of this.collection.medecins){
      if(!this.dataExistsInChart(this.pieChartLabels,medecin.speciality.name)){
        this.pieChartLabels.push(medecin.speciality.name);
        this.pieChartData.push(this.getNBMedecins(medecin.speciality));
      }
    }
    this.MostSpecialitySubscribedByMedecin = this.getMostSpecialitySubscribedByMedecin();
  }
  loadProviderData(){
    this.pieChartType='pie';
    this.pieChartLabels = [];
    this.pieChartData =[];
    for(let provider of this.collection.providers){
      for(let speciality of provider.specialities){
        if(!this.dataExistsInChart(this.pieChartLabels,speciality.name)){
          this.pieChartLabels.push(speciality.name);
          this.pieChartData.push(this.getNBProviders(speciality));
        }
      }
    }
    this.MostSpecialitySubscribedByProvider = this.getMostSpecialitySubscribedByProvider();
  }
  dataExistsInChart(chartLabelsParam, data){
    for(let label of chartLabelsParam){
      if(label == data){
        return true;
      }
    }
    return false;
  }
  setSubMenu(i:number){
    if(i==1){
      this.router.navigate(['/admin/statistics/','medecins','defaut']).then(() => {this.ngOnInit();});
    }
    if(i==2){
      this.router.navigate(['/admin/statistics/','fournisseurs','defaut']).then(() => {this.ngOnInit();});
    }
  }
  getDate(chaine:string): string{
    let dateArray = chaine.split('T');
    return dateArray[0];
  }
    public chartClicked(e: any): void { }
    public chartHovered(e: any): void { }
}

