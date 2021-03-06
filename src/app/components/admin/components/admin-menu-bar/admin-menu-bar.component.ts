import { Component, OnInit , OnDestroy} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {EventEmitter, Input, Output, TemplateRef, ViewEncapsulation} from '@angular/core';
import {Router} from '@angular/router';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {DomSanitizer} from '@angular/platform-browser';
import {MatDialog} from '@angular/material/dialog';
import { LocalStorageService } from '../../../../services/localStorage.service';
import { SessionStorageService } from '../../../../services/sessionStorage.service';
@Component({
  selector: 'app-admin-menu-bar',
  templateUrl: './admin-menu-bar.component.html',
  styleUrls: ['./admin-menu-bar.component.css']

})
export class AdminMenuBarComponent implements OnInit, OnDestroy {
  constructor( private StorageService: LocalStorageService, private router: Router, public sanitizer: DomSanitizer) {  }

  ngOnDestroy(){
    this.StorageService.storeAdminSpace('ClientSpace');
  }
  ngOnInit(): void {
    this.StorageService.storeAdminSpace('AdminSpace');
  }
  gotoHome(){
    this.router.navigate(["/home"]);
  }
  gotoMessages(){
    this.router.navigate(['/admin/messages/','liste','defaut']);
  }
  gotoComplaints(){
    this.router.navigate(['/admin/complaint/','liste','defaut']);
  }
  gotoProviders(){
    this.router.navigate(['/admin/provider/','demandes','defaut','defaut']);
  }
  gotoStats(){
    this.router.navigate(['/admin/statistics/','medecins','defaut']);
  }
}

