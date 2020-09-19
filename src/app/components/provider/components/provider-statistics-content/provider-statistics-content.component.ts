import { Component, OnInit , OnDestroy, OnChanges} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {EventEmitter, Input, Output, TemplateRef, ViewEncapsulation} from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {DomSanitizer} from '@angular/platform-browser';
import {MatDialog} from '@angular/material/dialog';
import { LocalStorageService } from '../../../../services/localStorage.service';
import { SessionStorageService } from '../../../../services/sessionStorage.service';
import{ProviderService} from '../../../../services/provider.service';
import{ProductService} from '../../../../services/product.service';
import{ComplaintService} from '../../../../services/complaint.service';
import{ProviderModel} from '../../../../models/provider.model';
import{ProductModel} from '../../../../models/product.model';
import{QuotationModel} from '../../../../models/quotation.model';
import{ComplaintModel} from '../../../../models/complaint.model';
import{SpecialityModel} from '../../../../models/speciality.model';
import{QuotationService} from '../../../../services/quotation.service';

@Component({
  selector: 'app-provider-statistics-content',
  templateUrl: './provider-statistics-content.component.html',
  styleUrls: ['./provider-statistics-content.component.css']

})
export class ProviderStatisticsContentComponent implements OnInit , OnDestroy ,OnChanges{

  public chartType: string = 'bar';

  public chartDatasets: Array<any> = [{ data: [], label: ''}];

  public chartLabels: Array<any> = [];

  public chartColors: Array<any> = [{
    backgroundColor: [
      'rgba(255, 99, 132, 0.2)',
      'rgba(54, 162, 235, 0.2)',
      'rgba(255, 206, 86, 0.2)',
      'rgba(75, 192, 192, 0.2)',
      'rgba(153, 102, 255, 0.2)',
      'rgba(255, 159, 64, 0.2)'
    ],
    borderColor: [
      'rgba(255,99,132,1)',
      'rgba(54, 162, 235, 1)',
      'rgba(255, 206, 86, 1)',
      'rgba(75, 192, 192, 1)',
      'rgba(153, 102, 255, 1)',
      'rgba(255, 159, 64, 1)'
    ],
    borderWidth: 2,
    }
  ];

  public chartOptions: any = {responsive: true};


  public evolutionChartType: string = 'line';

  public evolutionChartDatasets: Array<any> = [{ data: [], label: ''}];

  public evolutionChartLabels: Array<any> = [];

  public evolutionChartColors: Array<any> = [{
      backgroundColor: 'rgba(0, 137, 132, .2)',
      borderColor: 'rgba(0, 10, 130, .7)',
      borderWidth: 2,
    }
  ];

  public evolutionChartOptions: any = {responsive: true};

  collection = { count: 0, products: Array<ProductModel> (), specialities: Array<SpecialityModel> (), complaints: Array<ComplaintModel> (),  quotations : Array<QuotationModel>()};
  subMenuFlag1 = true;
  subMenuFlag2 = false;
  subMenuFlag3 = false;
  quotationEvolutionFlag = false;
  complaintEvolutionFlag = false;
  MostViewedProduct = new ProductModel({'provider':{},'images': [],'speciality': {}});;
  MostRequestProduct = new ProductModel({'provider':{},'images': [],'speciality': {}});;
  MostClaimedProduct = new ProductModel({'provider':{},'images': [],'speciality': {}});;
  constructor(private StorageService: LocalStorageService, private activatedRoute:ActivatedRoute, private router: Router, public sanitizer: DomSanitizer,
            private ProviderService: ProviderService, private ComplaintService : ComplaintService, private QuotationService : QuotationService) {  }
  ngOnDestroy(){
  }
  ngOnChanges(){
  }

  ngOnInit(): void {
    this.loadData();
  }
  loadData(){
    this.collection.specialities.length = 0;
    this.collection.complaints.length = 0;
    this.collection.quotations.length = 0;
    this.collection.products.length = 0;
    this.ProviderService.getOwnedProductsByProviderLogin(this.StorageService.getProviderLogin()).then(response => {
      for(let resp of response){
        this.collection.products.push(new ProductModel(resp));
      }
      this.loadViewData();
    });
    this.QuotationService.getAllQuotationSendToProvider(this.StorageService.getProviderLogin()).then(response => {
      for(let resp of response){
        this.collection.quotations.push(new QuotationModel(resp));
      }
      this.loadQuotationData();
    });
    this.ComplaintService.getOwnedComplaint(this.StorageService.getProviderLogin()).then(response => {
      for(let resp of response){
        this.collection.complaints.push(new ComplaintModel(resp));
      }
      this.loadComplaintData();
    });
    if(this.activatedRoute.snapshot.paramMap.get('type') == 'vue'){
      this.subMenuFlag1 = true;
      this.subMenuFlag2 = false;
      this.subMenuFlag3 = false;
      this.quotationEvolutionFlag = false;
      this.complaintEvolutionFlag = false;
    }
    if(this.activatedRoute.snapshot.paramMap.get('type') == 'demande'){
      this.subMenuFlag1 = false;
      this.subMenuFlag2 = true;
      this.subMenuFlag3 = false;
mplaintEvolutionFlag = false;
    }
    if(this.activatedRoute.snapshot.paramMap.get('type') == 'reclamation'){
      this.subMenuFlag1 = false;
      this.subMenuFlag      this.quotationEvolutionFlag = false;
      this.co2 = false;
      this.subMenuFlag3 = true;
      this.quotationEvolutionFlag = false;
      this.complaintEvolutionFlag = false;
    }
  }
  getNBQuotation(product : ProductModel){
    let i=0;
    for(let quotation of this.collection.quotations){
      if(quotation.product.id == product.id)
        i+=1;
    }
    return i;
  }
  getNBComplaint(product : ProductModel){
    let i=0;
    for(let complaint of this.collection.complaints){
      if(complaint.product.id == product.id)
        i+=1;
    }
    return i;
  }
  getMostClaimedProduct(){
    if(this.collection.complaints.length == 0)
      return new ProductModel({});
    let product = this.collection.complaints[0].product;
    for(let complaint of this.collection.complaints){
      if(this.getNBComplaint(complaint.product) > this.getNBComplaint(product) ){
        product = complaint.product;
      }
    }
    return product;
  }
  getMostRequestProduct(){
    if(this.collection.quotations.length == 0)
      return new ProductModel({});
    let product = this.collection.quotations[0].product;
    for(let quotation of this.collection.quotations){
      if(this.getNBQuotation(quotation.product) > this.getNBQuotation(product) ){
        product = quotation.product;
      }
    }
    return product;
  }
  getMostView(){
    if(this.collection.products.length == 0)
      return new ProductModel({});
    let product = this.collection.products[0];
    for(let productTemp of this.collection.products){
      if(product.nombreVue < productTemp.nombreVue){
        product = productTemp;
      }
    }
    return product;
  }
  loadViewData(){
    this.chartLabels = [];
    let dataTable =[];
    for(let product of this.collection.products){
        this.chartLabels.push(product.name);
        dataTable.push(product.nombreVue);
    }
    this.chartDatasets = [{ data: dataTable, label: 'Nombre de Vue' }];
    this.MostViewedProduct = this.getMostView();
  }
  loadQuotationData(){
    this.chartLabels = [];
    let dataTable =[];
    for(let quotation of this.collection.quotations){
      if(!this.dataExistsInChart(this.chartLabels,quotation.product.name)){
        this.chartLabels.push(quotation.product.name);
        dataTable.push(this.getNBQuotation(quotation.product));
      }
    }
    this.chartDatasets = [{ data: dataTable, label: 'Demande de devis' }];
    this.MostClaimedProduct = this.getMostClaimedProduct();
    this.evolutionChartLabels = [];
    dataTable =[];
    for(let quotation of this.collection.quotations){
      if(!this.dataExistsInChart(dataTable,this.getDate(quotation.date))){
        dataTable.push(this.getDate(quotation.date));
      }
    }
    dataTable.sort();
    let nbTotal = 0;
    let Axis_Y = [];
    for(let i =0; i<dataTable.length; i++){
      nbTotal = 0;
      for(let quotation of this.collection.quotations){
        if(this.getDate(quotation.date) == dataTable[i]){
          nbTotal += 1;
        }
      }
      this.evolutionChartLabels.push(dataTable[i]);
      Axis_Y.push(nbTotal);
    }
    this.evolutionChartDatasets = [{ data: Axis_Y, label: 'Demande de devis' }];
  }
  dataExistsInChart(chartLabelsParam, data){
    for(let label of chartLabelsParam){
      if(label == data){
        return true;
      }
    }
    return false;
  }
  loadComplaintData(){
    this.chartLabels = [];
    let dataTable =[];
    for(let complaint of this.collection.complaints){
      if(!this.dataExistsInChart(this.chartLabels,complaint.product.name)){
        this.chartLabels.push(complaint.product.name);
        dataTable.push(this.getNBComplaint(complaint.product));
      }
    }
    this.chartDatasets = [{ data: dataTable, label: 'Reclamation' }];
    this.MostRequestProduct = this.getMostRequestProduct();
    this.evolutionChartLabels = [];
    dataTable =[];
    for(let complaint of this.collection.complaints){
      if(!this.dataExistsInChart(dataTable,this.getDate(complaint.date))){
        dataTable.push(this.getDate(complaint.date));
      }
    }
    dataTable.sort();
    let nbTotal = 0;
    let Axis_Y = [];
    for(let i =0; i<dataTable.length; i++){
      nbTotal = 0;
      for(let complaint of this.collection.complaints){
        if(this.getDate(complaint.date) == dataTable[i]){
          nbTotal += 1;
        }
      }
      this.evolutionChartLabels.push(dataTable[i]);
      Axis_Y.push(nbTotal);
    }
    this.evolutionChartDatasets = [{ data: Axis_Y, label: 'Reclamation' }];
  }
  setSubMenu(i:number){
    if(i==1){
      this.router.navigate(['/provider/statistics/','vue','defaut']).then(() => {this.loadData();});
    }
    if(i==2){
      this.router.navigate(['/provider/statistics/','demande','defaut']).then(() => {this.loadData();});
    }
    if(i==3){
      this.router.navigate(['/provider/statistics/','reclamation','defaut']).then(() => {this.loadData();});
    }
  }
  displayEvolution(i:number){
    if(i==1){
      this.quotationEvolutionFlag = true;
      this.setSubMenu(2);
    }
    if(i==2){
      this.complaintEvolutionFlag = true;
      this.setSubMenu(3);
    }
  }
  cancelDisplayEvolution(i:number){
    if(i==1){
      this.quotationEvolutionFlag = false;
      this.setSubMenu(2);
    }
    if(i==2){
      this.complaintEvolutionFlag = false;
      this.setSubMenu(3);
    }
  }
  getDate(chaine:string): string{
    let dateArray = chaine.split('T');
    return dateArray[0];
  }
    public chartClicked(e: any): void { }
    public chartHovered(e: any): void { }
}

