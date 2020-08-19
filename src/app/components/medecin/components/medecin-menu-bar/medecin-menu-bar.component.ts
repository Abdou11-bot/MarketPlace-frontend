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
  selector: 'app-medecin-menu-bar',
  templateUrl: './medecin-menu-bar.component.html',
  styleUrls: ['./medecin-menu-bar.component.css']

})
export class MedecinMenuBarComponent implements OnInit, OnDestroy {
  constructor( private StorageService: LocalStorageService, private router: Router, public sanitizer: DomSanitizer) {  }

  ngOnDestroy(){
    this.StorageService.storeAdminSpace('ClientSpace');
  }
  ngOnInit(): void {
    this.StorageService.storeAdminSpace('AdminSpace');
  }
  gotoHome(){
//    this.router.navigate(["/home"]).then(() => {window.location.reload(); });
    this.router.navigate(["/home"]);
  }
}

